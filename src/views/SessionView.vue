<template>
  <div class="session-view">
    <h1>Sessions</h1>

    <SessionControls
      :sessions="store.sessions"
      :active="store.activeSession"
      @change-active="store.setActiveSession"
      @create-session="openCreate"
      @change-session="store.changeSession"
      @set-ordering="store.setOrdering"
      @set-format="store.setFormat"
      @randomize="store.randomizeOrder"
      @activate="store.activateSession"
      @end="store.endSession"
      @delete="store.deleteSession"
    />

    <!-- create session form modal -->
    <div v-if="showCreate" class="create-session-modal">
      <CreateSessionForm @create="handleCreate" />
      <button class="cancel" @click="showCreate = false">Cancel</button>
    </div>

    <div v-if="store.loading">Loading...</div>
    <div v-if="store.error" class="error">{{ store.error }}</div>

    <SessionList
      v-if="store.activeSession"
      :session="store.activeSession"
      :items="store.listItems"
      :task-statuses="store.taskStatuses"
      @start-task="store.startTask"
      @complete-task="store.completeTask"
      @add-item="store.addListItem"
      @remove-item="store.removeListItem"
      @refresh-items="() => store.loadSessionListItems(store.activeSession!._id || store.activeSession!.session)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSessionStore } from '../stores/session';
import { useAuthStore } from '../stores/auth';
import SessionControls from '../components/session/SessionControls.vue';
import SessionList from '../components/session/SessionList.vue';
import CreateSessionForm from '../components/session/CreateSessionForm.vue';

const store = useSessionStore();
const auth = useAuthStore();

const showCreate = ref(false);

onMounted(async () => {
  await store.fetchSessions();
  await store.fetchActiveForOwner();
  if (store.activeSession) {
    await store.loadSessionListItems(store.activeSession._id || store.activeSession.session);
  }
});

// show the create form (triggered by SessionControls)
function openCreate() {
  showCreate.value = true;
}

// handle form submission from CreateSessionForm
  async function handleCreate(payload: { list: string; ordering: string; format: string; name?: string }) {
    try {
      const sessionOwner = auth.username ?? (auth as any)?._id ?? '';
      if (!sessionOwner) throw new Error('Not authenticated');
      console.debug('[SessionView] resolved sessionOwner:', sessionOwner);

      const res = await store.changeSession({
        list: payload.list,
        sessionOwner,
        ordering: payload.ordering,
        format: payload.format,
        name: payload.name
      } as any);
      console.debug('[SessionView] store.changeSession returned:', res);


      // if backend returned new session id, refresh active/session state
      if (res && 'session' in res && res.session) {
        await store.fetchActiveForOwner(sessionOwner);
      } else {
        await store.fetchSessions();
        await store.fetchActiveForOwner(sessionOwner);
      }
    } catch (e: any) {
      console.error('create session failed', e);
      alert('Create session failed: ' + (e?.message ?? String(e)));
    } finally {
      showCreate.value = false;
    }
  }
</script>

<style scoped>
.session-view { padding: 1rem; }
.error { color: red; }
.create-session-modal { margin: 1rem 0; padding: .75rem; border: 1px solid #ddd; border-radius:6px; background:#fafafa; }
.create-session-modal .cancel { margin-top:.5rem; }
</style>