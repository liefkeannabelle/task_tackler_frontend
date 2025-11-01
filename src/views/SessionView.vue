<template>
  <div class="session-view">
    <h1>Sessions</h1>

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
        <p><strong>Ordering:</strong> {{ displayedSession.ordering ?? displayedSession.order ?? 'Default' }}</p>
        <p><strong>Format:</strong> {{ displayedSession.format ?? 'List' }}</p>
        <p><strong>Status:</strong> {{ displayedSession.active ? 'Active' : 'Inactive' }}</p>

        <div class="actions">
          <button v-if="!displayedSession.active" @click="onActivate(displayedSessionId)" :disabled="activating">
            {{ activating ? 'Activating…' : 'Activate session' }}
          </button>

          <button v-else @click="onEndActive" :disabled="ending">
            {{ ending ? 'Ending…' : 'End session' }}
          </button>

          <button @click="openCreate">Change session</button>
        </div>
      </div>

      <div v-else>
        <p>You have no session. Create one or change session to start.</p>
        <button @click="openCreate">Create session</button>
      </div>

    </section>

    <SessionList
      v-if="store.activeSession"
      :key="sessionListKey"
      :session="store.activeSession"
      :items="itemsWithNames"
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
import { onMounted, ref, computed, watch } from 'vue';
import { useSessionStore } from '../stores/session';
import { useAuthStore } from '../stores/auth';
import { useTaskBankStore } from '../stores/taskbank';
import CreateSessionForm from '../components/session/CreateSessionForm.vue';
import SessionList from '../components/session/SessionList.vue';

const store = useSessionStore();
const auth = useAuthStore();
const taskBank = useTaskBankStore();

const showCreate = ref(false);
const activating = ref(false);
const ending = ref(false);

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

// resolve task name for a list item by looking up taskBank.tasks or using backend-provided name
function resolveTaskNameForItem(item: any) {
  if (!item) return 'Unknown Task';

  // Prefer backend-provided taskName
  if (item.taskName && String(item.taskName).trim().length) return item.taskName;

  // fall back to taskId lookup in task bank (only if backend did not provide it)
  const tId = item.taskId ?? item.task ?? item.bankTaskId ?? item.taskBankId ?? null;
  if (!tId) return item.taskName ?? 'Unknown Task';

  const found = (taskBank.tasks || []).find((t: any) =>
    t._id === tId || t.bankId === tId || t.id === tId
  );
  return found?.taskName ?? found?.name ?? item.taskName ?? 'Unknown Task';
}

// Enrich store.listItems in-place with taskName if backend didn't provide it.
// This ensures downstream components (SessionList) see item.taskName directly.
function enrichListItems() {
  const items = store.listItems || [];
  if (!items.length) return;
  const tasks = taskBank.tasks || [];

  // build quick lookup maps
  const byId = new Map((tasks || []).map((t: any) => [t._id, t]));
  const byBankId = new Map((tasks || []).map((t: any) => [t.bankId, t]));

  store.listItems = items.map((it: any) => {
    const backendName = it.taskName && String(it.taskName).trim() ? it.taskName : null;
    if (backendName) return { ...it, taskName: backendName };

    const tId = it.taskId ?? it.task ?? it.bankTaskId ?? it.taskBankId ?? null;
    let found = null;
    if (tId) {
      found = byId.get(tId) ?? byBankId.get(tId) ?? tasks.find((t: any) => t._id === tId || t.bankId === tId || t.id === tId);
    }
    return { ...it, taskName: found?.taskName ?? found?.name ?? it.taskName ?? it.taskId };
  });
}

// computed enriched items with task names (prefer backend taskName)
const itemsWithNames = computed(() => {
  const items = store.listItems || [];
  // ensure we return the store items (they should be enriched by enrichListItems)
  return items.map((it: any) => ({ ...it }));
});

// add this alias so template references to `items` resolve (fixes the Vue warn)
const items = itemsWithNames;

// key for SessionList to force rerender when session or item count changes
const sessionListKey = computed(() => {
  const sid = (store.activeSession as any)?._id ?? (store.activeSession as any)?.session ?? 'no-session';
  const len = (store.listItems || []).length;
  return `${sid}:${len}`;
});

// when store.listItems change, attempt to enrich using taskBank (if needed)
watch(
  () => store.listItems,
  async (newItems) => {
    console.debug('[SessionView] store.listItems changed', newItems);
    const missingName = (newItems || []).some((it: any) => !it.taskName);
    if (missingName) {
      try {
        if (!taskBank.tasks || !taskBank.tasks.length) {
          await taskBank.fetchAll();
          console.debug('[SessionView] fetched taskBank for name resolution', taskBank.tasks.length);
        }
        enrichListItems();
        console.debug('[SessionView] enriched listItems', store.listItems);
      } catch (err) {
        console.debug('[SessionView] taskBank.fetchAll/enrich failed', err);
      }
    }
  },
  { immediate: false }
);

// also watch taskBank.tasks — when tasks arrive, enrich any items missing names
watch(
  () => taskBank.tasks,
  (newTasks) => {
    if (!newTasks || !newTasks.length) return;
    enrichListItems();
  }
);

onMounted(async () => {
  // preload task bank so we can resolve names if backend didn't include them
  try {
    if (!taskBank.tasks || !taskBank.tasks.length) {
      await taskBank.fetchAll();
      console.debug('[SessionView] preloaded taskBank', taskBank.tasks?.length ?? 0);
    }
  } catch (err) {
    console.debug('[SessionView] taskBank fetch failed (ignorable):', err);
  }

  await store.fetchSessions();
  await store.fetchActiveForOwner(userId.value || undefined);
  console.debug('[SessionView] store.sessions', store.sessions);
  console.debug('[SessionView] userSessions', userSessions.value);
  if (store.activeSession) {
    await store.loadSessionListItems(store.activeSession._id || store.activeSession.session);
    // try to enrich immediately after loading
    try {
      if (!taskBank.tasks || !taskBank.tasks.length) {
        await taskBank.fetchAll();
      }
      enrichListItems();
    } catch (err) {
      console.debug('[SessionView] enrich after load failed', err);
    }

    // log what backend returned and what we will render
    console.debug('[SessionView] store.listItems (raw/enriched)', store.listItems);
    console.debug('[SessionView] itemsWithNames (computed)', itemsWithNames.value);
  }
});

function openCreate() { showCreate.value = true; }

// ...existing code...
async function handleCreate(payload: { list: string; ordering: string; format: string; name?: string }) {
  try {
    const sessionOwner = auth.username ?? (auth as any)?._id ?? '';
    // prefer a stable unique id for ownerId (fall back to username)
    const ownerId = (auth as any)?._id ?? auth.username ?? '';

    if (!sessionOwner) throw new Error('Not authenticated');

    const res = await store.changeSession({
      list: payload.list,
      sessionOwner,
      ownerId,                      // <-- include ownerId here
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
// ...existing code...

// ...existing code...
async function onActivate(sessionId: string | null) {
  const sid = (sessionId && typeof sessionId === 'object' && 'value' in sessionId)
    ? (sessionId as any).value
    : sessionId;

  if (!sid) {
    console.warn('[SessionView] onActivate called without a sessionId', sessionId);
    alert('No session selected to activate.');
    return;
  }

  const currentUser = userId.value || (auth.username ?? (auth as any)?._id ?? '');
  // find local session doc
  const localSession = (store.sessions || []).find((s: any) =>
    s._id === sid || s.session === sid || s.id === sid
  );

  console.debug('[SessionView] activating, sid=', sid, 'currentUser=', currentUser, 'localSession=', localSession);

  // client-side owner check to avoid server 403-like errors
  const sessionOwner = localSession?.owner ?? localSession?.sessionOwner ?? localSession?.ownerId ?? null;
  if (sessionOwner && sessionOwner !== currentUser) {
    alert(`You are not the owner of this session (owner: ${sessionOwner}). Sign in as that user to activate.`);
    return;
  }

  if (!currentUser) { alert('Not authenticated'); return; }
  activating.value = true;
  try {
    // send the exact shape the backend expects: { session, activator }
    await store.activateSession({
      session: sid,
      activator: currentUser
    } as any);

    await store.fetchSessions();
    await store.fetchActiveForOwner(currentUser || undefined);
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
// ...existing code...

async function onEndActive() {
  const session = displayedSession.value;
  if (!session) return;
  const sessionId = (session as any)._id ?? (session as any).session;
  const owner = auth.username ?? (auth as any)?._id ?? '';
  if (!owner) { alert('Not authenticated'); return; }
  if (!sessionId) return;

  if (!confirm('End the current session? This will mark it inactive.')) return;

  ending.value = true;
  try {
    await store.deactivateSession({ sessionId, sessionOwner: owner });
    // refresh local state
    await store.fetchSessions();
    await store.fetchActiveForOwner(owner);
  } catch (e: any) {
    console.error('End session failed', e);
    alert('End session failed: ' + (e?.message ?? String(e)));
  } finally {
    ending.value = false;
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
