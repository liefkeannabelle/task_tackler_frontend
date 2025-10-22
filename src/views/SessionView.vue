<template>
  <div class="session-view">
    <h1>Sessions</h1>

    <SessionControls
      :sessions="store.sessions"
      :active="store.activeSession"
      @change-active="store.setActiveSession"
      @create-session="createSession"
      @change-session="store.changeSession"
      @set-ordering="store.setOrdering"
      @set-format="store.setFormat"
      @randomize="store.randomizeOrder"
      @activate="store.activateSession"
      @end="store.endSession"
      @delete="store.deleteSession"
    />

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
import { onMounted } from 'vue';
import { useSessionStore } from '../stores/session';
import SessionControls from '../components/session/SessionControls.vue';
import SessionList from '../components/session/SessionList.vue';

const store = useSessionStore();

onMounted(async () => {
  await store.fetchSessions(); // load sessions (owner unspecified - implement owner param if needed)
  await store.fetchActiveForOwner(); // attempt to populate activeSession
  if (store.activeSession) {
    await store.loadSessionListItems(store.activeSession._id || store.activeSession.session);
  }
});

async function createSession(payload: { list: string; sessionOwner: string }) {
  await store.changeSession(payload);
  // refresh after creating/changing session
  await store.fetchSessions();
}
</script>

<style scoped>
.session-view { padding: 1rem; }
.error { color: red; }
</style>