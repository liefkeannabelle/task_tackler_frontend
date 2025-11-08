<template>
  <div class="list-card">
    <header class="card-header">
      <h3>{{ list.title || list.listName || 'Untitled' }}</h3>
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

  <button @click="addTask" :disabled="!selectedTaskId">Add</button>
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
// auth store intentionally not required here; parent flows supply adder/deleter when needed
import { useListsStore } from '../../stores/lists';

const props = defineProps<{ list: Record<string, any> }>();
const emit = defineEmits<{
  (e: 'add-task', payload: { listId: string; task: string; adder?: string }): void;
  (e: 'delete-task', payload: { listId: string; taskId: string; deleter?: string }): void;
  (e: 'assign-order', payload: { listId: string; taskId: string; newOrder: number; assigner?: string }): void;
  (e: 'list-deleted', payload: { listId: string }): void;
}>();

const taskBank = useTaskBankStore();
const listsStore = useListsStore();

// UI state used by the template
const search = ref('');
const showResults = ref(false);
const selectedTaskId = ref('');
const selectedTaskName = ref('');
// we rely on the logged-in user from auth when emitting add-task (no adder input)

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
  emit('add-task', { listId, task: selectedTaskId.value });
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

// ...existing code...
<style scoped>
/* use theme variables for panel background + text so each card is a surface panel */
.list-card {
  background: var(--surface);
  color: var(--text);
  border: 1px solid rgba(255,255,255,0.06);
  padding: .75rem;
  border-radius: 6px;
  margin-bottom: .75rem;
}

/* header stays readable on surface */
.card-header { display:flex; justify-content:space-between; align-items:center; gap:.5rem; }
.card-header h3 { margin:0; }
.card-header small { color: var(--muted); }

/* make delete button stand out but fit theme */
.delete-list {
  margin-left:.5rem;
  color: var(--text);
  background: rgba(255,80,80,0.15);
  border: 1px solid rgba(255,80,80,0.25);
  padding:.25rem .5rem;
  border-radius:4px;
  cursor:pointer;
}

/* add-row and inputs */
.add-row { display:flex; gap:.5rem; margin:.5rem 0; position:relative; align-items:center; }
.add-row input { padding:.25rem .5rem; background: transparent; color: var(--text); border:1px solid rgba(255,255,255,0.04); border-radius:4px; }

/* results dropdown: keep it on top of surface but use a slightly elevated background */
.results {
  position:absolute;
  top:2.6rem;
  left:0;
  right:0;
  max-height:12rem;
  overflow:auto;
  background: var(--surface);
  border:1px solid rgba(255,255,255,0.04);
  z-index:10;
  margin:0;
  padding:0;
  list-style:none;
}
.result-item { padding:.35rem .5rem; cursor:pointer; color: var(--text); }
.result-item:hover { background: rgba(255,255,255,0.02); }
.selected { display:flex; gap:.5rem; align-items:center; color: var(--muted); }
.empty { color: var(--muted); font-style:italic; }

/* List items container */
.items { display:flex; flex-direction:column; gap:.5rem; margin-top:.5rem; }
</style>
// ...existing code...