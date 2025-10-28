<template>
  <div class="list-card">
    <header class="card-header">
      <h3>{{ list.title || list.listName || 'Untitled' }}</h3>
      <small>Owner: {{ list.owner }}</small>
      <button class="delete-list" @click="confirmDelete">Delete List</button>
    </header>

    <div class="add-row">
      <!-- search box -->
      <input
        v-model="search"
        @input="onSearch"
        @keydown.enter.prevent="selectFirstIfAny"
        placeholder="Search tasks by name..."
        aria-label="Search tasks"
      />

      <!-- results dropdown -->
      <ul v-if="showResults" class="results">
        <li
          v-for="t in filtered"
          :key="t._id || t.taskName"
          @click="selectTask(t)"
          class="result-item"
        >
          {{ (t as any).taskName ?? (t as any).name ?? (t as any)._id }}
        </li>
        <li v-if="filtered.length === 0" class="no-results">No matches</li>
      </ul>

      <!-- selected (required) -->
      <div class="selected" v-if="selectedTaskName">
        Selected: <strong>{{ selectedTaskName }}</strong>
        <button type="button" @click="clearSelection">Change</button>
      </div>

      <input v-model="adder" :placeholder="adderPlaceholder" />
      <button @click="addTask" :disabled="!selectedTaskId || !adder">Add</button>
    </div>

    <div v-if="items.length === 0" class="empty">No items</div>

    <div class="items">
      <ListItemRow
        v-for="it in items"
        :key="(it.task ?? it.taskId ?? it._id) + '-' + (it.orderNumber ?? '')"
        :list-id="list._id || list.list"
        :list-owner="list.owner || list.listOwner || list.ownerId"
        :item="it"
        @delete-task="forwardDelete"
        @assign-order="forwardAssign"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ListItemRow from './ListItemRow.vue';
import { ref, computed, watch } from 'vue';
import { useTaskBankStore } from '../../stores/taskbank';
import { useAuthStore } from '../../stores/auth';
import { useListsStore } from '../../stores/lists';

const props = defineProps<{ list: Record<string, any> }>();
const emit = defineEmits<{
  (e: 'add-task', payload: { listId: string; task: string; adder?: string }): void;
  (e: 'delete-task', payload: { listId: string; taskId: string; deleter?: string }): void;
  (e: 'assign-order', payload: { listId: string; taskId: string; newOrder: number; assigner?: string }): void;
  (e: 'list-deleted', payload: { listId: string }): void;
}>();

const taskBank = useTaskBankStore();
const auth = useAuthStore();
const listsStore = useListsStore();

// UI state used by the template
const search = ref('');
const showResults = ref(false);
const selectedTaskId = ref('');
const selectedTaskName = ref('');
const adder = ref(auth.username || '');
const adderPlaceholder = computed(() => auth.username || 'your-id');
watch(() => auth.username, v => { if (v) adder.value = v; });

// list items safe accessor (avoids reading undefined)
const items = computed(() => {
  const li = props.list?.listItems;
  return Array.isArray(li) ? li : [];
});

// filter TaskBank tasks by search query
const filtered = computed(() => {
  const q = (search.value || '').toLowerCase().trim();
  const all = taskBank.tasks ?? [];
  if (!q) return all.slice(0, 20);
  return all.filter((t: any) => {
    const name = (t.taskName ?? t.name ?? '').toString().toLowerCase();
    const id = (t._id ?? '').toString().toLowerCase();
    return name.includes(q) || id.includes(q);
  }).slice(0, 50);
});

// select a task from results
function selectTask(t: any) {
  selectedTaskId.value = t._id ?? t.task ?? t.taskId ?? '';
  selectedTaskName.value = t.taskName ?? t.name ?? '';
  search.value = selectedTaskName.value || '';
  showResults.value = false;
}

// clear selection UI
function clearSelection() {
  selectedTaskId.value = '';
  selectedTaskName.value = '';
  search.value = '';
  showResults.value = false;
}

// emit add-task after validation
function addTask() {
  if (!selectedTaskId.value) {
    alert('Please select a task from the results (do not type free text).');
    return;
  }
  const listId = props.list._id ?? props.list.list;
  if (!listId) {
    alert('Cannot determine list id.');
    return;
  }
  emit('add-task', { listId, task: selectedTaskId.value, adder: adder.value || undefined });
  clearSelection();
}

function forwardDelete(payload: any) { emit('delete-task', payload); }
function forwardAssign(payload: any) { emit('assign-order', payload); }

// show results while typing
function onSearch() {
  showResults.value = !!(search.value && search.value.trim());
}

// select first result when Enter is pressed
function selectFirstIfAny() {
  if (filtered.value && filtered.value.length > 0) {
    selectTask(filtered.value[0]);
  }
}

watch(search, (v) => {
  showResults.value = !!(v && v.trim());
});

// confirm and delete list using store; emit event on success
async function confirmDelete() {
  try {
    console.debug('[ListCard] confirmDelete clicked', props.list);
    const current = props.list;
    const label = current.title || current.listName || current._id || 'this list';
    if (!confirm(`Delete ${label}? This cannot be undone.`)) return;

    const id = current._id || current.list;
    if (!id) {
      console.warn('[ListCard] cannot determine list id', current);
      alert('Cannot determine list id to delete.');
      return;
    }

    console.debug('[ListCard] calling listsStore.deleteList', id);
    await listsStore.deleteList(id);
    console.debug('[ListCard] deleteList succeeded for', id);
    emit('list-deleted', { listId: id });
  } catch (err: any) {
    console.error('[ListCard] deleteList failed', err);
    alert('Delete failed: ' + (err?.message ?? String(err)));
  }
}
</script>

<style scoped>
.list-card { border:1px solid #ddd; padding: .75rem; border-radius:6px; margin-bottom:.75rem; }
.card-header { display:flex; justify-content:space-between; align-items:center; gap:.5rem; }
.delete-list { margin-left:.5rem; color:#fff; background:#c33; border:none; padding:.25rem .5rem; border-radius:4px; cursor:pointer; }
.add-row { display:flex; gap:.5rem; margin:.5rem 0; position:relative; align-items:center; }
.add-row input { padding:.25rem .5rem; }
.results { position:absolute; top:2.6rem; left:0; right:0; max-height:12rem; overflow:auto; background:white; border:1px solid #ccc; z-index:10; margin:0; padding:0; list-style:none; }
.result-item { padding:.35rem .5rem; cursor:pointer; }
.result-item:hover { background:#f0f0f0; }
.selected { display:flex; gap:.5rem; align-items:center; }
.empty { color:#666; font-style:italic; }
</style>