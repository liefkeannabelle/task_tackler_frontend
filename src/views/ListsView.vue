<template>
  <!-- root gets lists-view so we can style it with theme variables -->
  <div class="lists-view">
    <h1>Lists</h1>

    <!-- show content only when a user is signed in (match Sessions/TaskBank behavior) -->
    <div v-if="userId">
      <div class="search-row">
        <ListSearch :owner-id="auth.username ?? (auth as any)?._id ?? null" @select-list="onSearchSelect" />
      </div>
      <div class="new-list-row">
        <NewListForm @create="createList" />
      </div>
      <div v-if="store.loading">Loading...</div>
      <div v-if="store.error" class="error">{{ store.error }}</div>
      <div v-for="l in store.lists" :key="l._id" :id="'list-' + (l._id ?? l.id)" tabindex="-1">
        <ListCard :list="(l ?? {}) as any" @add-task="onAddTask" @delete-task="onDeleteTask" @assign-order="onAssignOrder" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick, computed } from 'vue';
import { useListsStore } from '../stores/lists';
import { useTaskBankStore } from '../stores/taskbank';
import { useAuthStore } from '../stores/auth';
import NewListForm from '../components/lists/NewListForm.vue';
import ListSearch from '../components/lists/ListSearch.vue';
import ListCard from '../components/lists/ListCard.vue';

const store = useListsStore();
const taskBank = useTaskBankStore();
const auth = useAuthStore();

// Choose behavior when a list is selected from search: 'scroll' or 'bring-to-top'
// 'scroll' will scroll the selected list into view; 'bring-to-top' will reorder the
// displayed lists so the selected list is first. 'bring-to-top' is purely frontend-local
// unless you persist order to the backend.
const searchSelectBehavior: 'scroll' | 'bring-to-top' = 'scroll';

async function onSearchSelect(list: any | undefined) {
  if (!list) return;
  const targetId = `list-${list._id}`;

  if (searchSelectBehavior === 'scroll') {
    // try to find element immediately
    let el = document.getElementById(targetId);
    if (!el) {
      // if not present yet, wait for DOM updates (e.g., lists rendering) and try again
      await nextTick();
      el = document.getElementById(targetId) as HTMLElement | null;
    }

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      (el as HTMLElement).focus?.();
      return;
    }

    // fallback: set hash so navigation or server can handle it
    window.location.hash = `#${targetId}`;
    return;
  }

  if (searchSelectBehavior === 'bring-to-top') {
    // reorder the local lists array so the selected list is first
    const idx = (store.lists || []).findIndex((l: any) => l._id === list._id || l.id === list._id);
    if (idx > 0) {
      const copy = [...(store.lists || [])];
      const [item] = copy.splice(idx, 1);
      copy.unshift(item);
      // update store lists locally (non-persistent)
      store.lists = copy as any;
      // Optionally focus the moved element after DOM updates
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
    return;
  }
}

async function loadAll() {
  const ownerId = (auth as any)?._id ?? (auth as any)?.id ?? auth.username;
  console.debug('[ListsView] loadAll ownerId:', ownerId);
  await Promise.all([
    store.fetchAll(ownerId || undefined),
    taskBank.fetchAll(auth.username || undefined)
  ]);
}
const userId = computed(() => auth.username ?? (auth as any)?._id ?? '');

onMounted(async () => {
  try {
    if (userId.value) await loadAll();
  } catch (e) {
    console.error('initial data load failed', e);
  }
});

// watch auth changes: load when logged in, clear when logged out
watch(() => auth.username, async (newVal) => {
  try {
    if (newVal) {
      await loadAll();
    } else {
      // clear lists if user logged out so page shows header only
      store.lists = [] as any;
    }
  } catch (e) {
    console.error('reload on auth change failed', e);
  }
});

async function createList(payload: { name: string; owner?: string }) {
  try {
    // store.create now returns the created list id (or null)
    const createdId = await store.create(payload.name, payload.owner) as string | null;

    // attempt to scroll to the new list element (id format: list-<id>)
    if (createdId) {
      const targetId = `list-${createdId}`;

      // try immediate lookup, then await DOM updates and retry a couple times
      let el = document.getElementById(targetId) as HTMLElement | null;
      if (!el) {
        await nextTick();
        el = document.getElementById(targetId) as HTMLElement | null;
      }
      if (!el) {
        // give Vue another chance (if list rendering still pending)
        await nextTick();
        el = document.getElementById(targetId) as HTMLElement | null;
      }

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.focus?.();
      } else {
        // fallback to hash so navigation or deep-link handlers can pick it up
        window.location.hash = `#${targetId}`;
      }
    } else {
      // no id returned — refresh and try to scroll to the last list as a best-effort
      await nextTick();
      const lists = store.lists || [];
      if (lists.length > 0) {
        const last = lists[lists.length - 1];
        const targetId = `list-${(last as any)._id ?? (last as any).id}`;
        const el = document.getElementById(targetId);
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); (el as HTMLElement).focus?.(); }
      }
    }
  } catch (e) {
    console.error('createList error', e);
    // rethrow so callers can handle errors if needed
    throw e;
  }
}

async function onAddTask(payload: { listId: string; task: string; adder?: string }) {
  if (!payload?.listId || !payload?.task) return;
  try {
    await store.addTask(payload.listId, payload.task, payload.adder);
  } catch (e: any) {
    console.error('addTask failed', e);
    // show a user-friendly popup with the server-provided error when available
    let msg = (e && e.message) ? e.message : 'Failed to add task to list.';
    // try to show the task's human-friendly name instead of id in the error message
    try {
      const tid = payload.task;
      const found = (taskBank.tasks || []).find((t: any) => (t._id === tid || t.task === tid || t.id === tid));
      const display = found ? (found.taskName ?? found.name ?? tid) : tid;
      // replace any raw id occurrences in the server message with the display name
      if (typeof msg === 'string' && typeof tid === 'string' && tid && display) {
        msg = msg.split(tid).join(display);
      }
    } catch (replaceErr) {
      console.debug('could not replace task id in message', replaceErr);
    }
    alert(msg);
  }
}

async function onDeleteTask(payload: { listId: string; taskId: string; deleter?: string }) {
  if (!payload?.listId || !payload?.taskId) return;
  await store.removeTask(payload.listId, payload.taskId, payload.deleter);
}

async function onAssignOrder(payload: { listId: string; taskId: string; newOrder: number; assigner?: string }) {
  if (!payload?.listId || !payload?.taskId || typeof payload.newOrder !== 'number') return;
  await store.assignOrder(payload.listId, payload.taskId, payload.newOrder, payload.assigner);
}
</script>

<style scoped>
.error { color: #c00; margin: .5rem 0; }
.lists-view { padding: 1rem; }
.new-list-row { margin-bottom: 1rem; }
.search-row { margin-bottom: .5rem; }
</style>