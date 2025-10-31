<template>
  <div class="session-view">
    <h1>Sessions</h1>

    <div class="controls">
      <button @click="openCreate">Change / Create Session</button>
    </div>

    <div v-if="showCreate" class="create-session-modal">
      <CreateSessionForm @create="handleCreate" />
      <button class="cancel" @click="showCreate = false">Cancel</button>
    </div>

    <div v-if="store.loading">Loading...</div>
    <div v-if="store.error" class="error">{{ store.error }}</div>

    <section class="session-summary" v-if="userId">
      <h3>Your session</h3>

      <div v-if="displayedSession">
        <p><strong>Title:</strong> {{ displayedSession.title ?? 'Untitled' }}</p>
        <p><strong>List:</strong> {{ displayedSession.listId ?? displayedSession.list ?? '—' }}</p>
        <p><strong>Ordering:</strong> {{ displayedSession.ordering ?? displayedSession.order ?? 'Default' }}</p>
        <p><strong>Format:</strong> {{ displayedSession.format ?? 'List' }}</p>
        <p><strong>Status:</strong> {{ displayedSession.active ? 'Active' : 'Inactive' }}</p>

        <div class="actions">
          <button v-if="!displayedSession.active" @click="onActivate(displayedSessionId)" :disabled="activating">
            {{ activating ? 'Activating…' : 'Activate session' }}
          </button>
          <button @click="openCreate">Change session</button>
        </div>
      </div>

      <div v-else>
        <p>You have no session. Create one or change session to start.</p>
        <button @click="openCreate">Create session</button>
      </div>

      <!-- debug: list all sessions owned by user -->
      <div class="user-sessions" v-if="userSessions && userSessions.length">
        <h4>Your sessions (all)</h4>
        <ul>
          <li v-for="s in userSessions" :key="s._id ?? s.session">
            <strong>{{ s.title ?? 'Untitled' }}</strong>
            — {{ (s.active ? 'Active' : 'Inactive') }} — ordering: {{ s.ordering ?? s.order ?? 'Default' }} — format: {{ s.format ?? 'List' }}
          </li>
        </ul>
      </div>
    </section>

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
import { onMounted, ref, computed } from 'vue';
import { useSessionStore } from '../stores/session';
import { useAuthStore } from '../stores/auth';
import CreateSessionForm from '../components/session/CreateSessionForm.vue';
import SessionList from '../components/session/SessionList.vue';

const store = useSessionStore();
const auth = useAuthStore();

const showCreate = ref(false);
const activating = ref(false);

const userId = computed(() => auth.username ?? (auth as any)?._id ?? '');

// robust selector for sessions owned by the user (works with owner, sessionOwner, ownerId)
function matchesOwner(s: any, id: string) {
  if (!s || !id) return false;
  return ['owner', 'sessionOwner', 'ownerId', 'user'].some(k => (s[k] === id || s[k] == id));
}

// all sessions owned by user
const userSessions = computed(() => {
  if (!userId.value) return [];
  return (store.sessions || []).filter((s: any) => matchesOwner(s, userId.value));
});

// pick displayed session: prefer activeSession, else newest user session by _id
const displayedSession = computed(() => {
  if (!userId.value) return null;
  if (store.activeSession && matchesOwner(store.activeSession as any, userId.value)) return store.activeSession;
  const sessions = userSessions.value.slice().sort((a: any, b: any) => {
    // try createdAt or fallback to _id lexical ordering
    if (a.createdAt && b.createdAt) return (b.createdAt as any) > (a.createdAt as any) ? 1 : -1;
    return String(b._id ?? b.session ?? '').localeCompare(String(a._id ?? a.session ?? ''));
  });
  return sessions.length ? sessions[0] : null;
});

const displayedSessionId = computed(() => {
  const s = displayedSession.value as any | null;
  if (!s) return null;
  return s._id ?? s.session ?? null;
});

onMounted(async () => {
  await store.fetchSessions();
  await store.fetchActiveForOwner(userId.value || undefined);
  console.debug('[SessionView] store.sessions', store.sessions);
  console.debug('[SessionView] userSessions', userSessions.value);
  if (store.activeSession) {
    await store.loadSessionListItems(store.activeSession._id || store.activeSession.session);
  }
});

function openCreate() { showCreate.value = true; }

async function handleCreate(payload: { list: string; ordering: string; format: string; name?: string }) {
  try {
    const sessionOwner = auth.username ?? (auth as any)?._id ?? '';
    if (!sessionOwner) throw new Error('Not authenticated');

    const res = await store.changeSession({
      list: payload.list,
      sessionOwner,
      ordering: payload.ordering,
      format: payload.format,
      name: payload.name
    } as any);

    if (res && typeof res === 'object' && 'session' in res && (res as any).session) {
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

async function onActivate(sessionId: string | null) {
  if (!sessionId) return;
  if (!userId.value) { alert('Not authenticated'); return; }
  activating.value = true;
  try {
    await store.activateSession({ sessionId, sessionOwner: userId.value });
    await store.fetchSessions();
    await store.fetchActiveForOwner(userId.value || undefined);
    if (store.activeSession) {
      await store.loadSessionListItems(store.activeSession._id || store.activeSession.session);
    }
  } catch (e: any) {
    console.error('activate failed', e);
    alert('Activate failed: ' + (e?.message ?? String(e)));
  } finally {
    activating.value = false;
  }
}
</script>

<style scoped>
.session-view { padding: 1rem; }
.error { color: red; }
.create-session-modal { margin: 1rem 0; padding: .75rem; border: 1px solid #ddd; border-radius:6px; background:#fafafa; }
.create-session-modal .cancel { margin-top:.5rem; }
.session-summary { border: 1px solid #eee; padding: .75rem; margin: 1rem 0; border-radius:6px; background: #fff; }
.session-summary h3 { margin-top: 0; }
.controls { margin-bottom: 0.75rem; }
.actions { margin-top: .5rem; display:flex; gap:.5rem; }
.user-sessions { margin-top: .75rem; font-size: .95rem; color:#333; }
</style>