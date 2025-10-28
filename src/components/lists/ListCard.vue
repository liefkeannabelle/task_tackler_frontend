<template>
  <div class="list-card">
    <header class="card-header">
      <h3>{{ list.title || list.listName || 'Untitled' }}</h3>
      <small>Owner: {{ list.owner }}</small>
      <button class="delete-list" @click="confirmDelete">Delete List</button>
    </header>

    <!-- ...existing code... -->
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
    <!-- ...existing code... -->

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
import { ref, computed, watch } from 'vue';
import ListItemRow from './ListItemRow.vue';
import { useTaskBankStore } from '../../stores/taskbank';
import { useAuthStore } from '../../stores/auth';

const props = defineProps<{ list: Record<string, any> }>();
const emit = defineEmits<{
  (e: 'add-task', payload: { listId: string; task: string; adder: string }): void;
  (e: 'delete-task', payload: { listId: string; taskId: string; deleter: string }): void;
  (e: 'assign-order', payload: { listId: string; taskId: string; newOrder: number; assigner: string }): void;
}>();

const taskBank = useTaskBankStore();
const auth = useAuthStore();

const search = ref('');
const selectedTaskId = ref<string>('');
const selectedTaskName = ref<string>('');
const adder = ref(auth.username || '');
const adderPlaceholder = auth.username ? 'Your ID' : 'Your ID (login to default)';
watch(() => auth.username, v => { if (v) adder.value = v; });

watch(() => taskBank.tasks, (t) => {
  console.debug('[ListCard] taskBank.tasks updated length=', (t || []).length);
  if ((t || []).length > 0) console.debug('[ListCard] first task sample', (t as any)[0]);
}, { immediate: true });

// items in this list
const items = computed(() => props.list.listItems || props.list.items || []);

// simple client-side filtering
const filtered = computed(() => {
  const q = (search.value || '').trim().toLowerCase();
  if (!q) return taskBank.tasks.slice(0, 20);
  return taskBank.tasks.filter(t => {
    const name = ((t as any).taskName ?? (t as any).name ?? '').toString().toLowerCase();
    const id = ((t as any)._id ?? '').toString().toLowerCase();
    return name.includes(q) || id.includes(q);
  }).slice(0, 50);
});

const showResults = computed(() => search.value.trim().length > 0);

// actions
function onSearch() {
  selectedTaskId.value = '';
  selectedTaskName.value = '';
}

function selectTask(t: any) {
  selectedTaskId.value = t._id ?? t.task ?? t.taskId ?? t.taskName ?? '';
  selectedTaskName.value = t.taskName ?? t.name ?? selectedTaskId.value;
  search.value = '';
}

function selectFirstIfAny() {
  if (filtered.value.length > 0) selectTask(filtered.value[0] as any);
}

function clearSelection() {
  selectedTaskId.value = '';
  selectedTaskName.value = '';
  search.value = '';
}

function addTask() {
  if (!selectedTaskId.value || !adder.value) return;
  emit('add-task', { listId: props.list._id || props.list.list, task: selectedTaskId.value, adder: adder.value });
  clearSelection();
}

function confirmDelete() {
  const label = list.title || list.listName || list._id || 'this list';
  if (!confirm(`Delete ${label}? This cannot be undone.`)) return;
  // call store; store will use auth.username if available
  listsStore.deleteList(list._id || list.list).catch((err) => {
    alert('Delete failed: ' + (err?.message ?? String(err)));
  });
}

function forwardDelete(payload: any) { emit('delete-task', payload); }
function forwardAssign(payload: any) { emit('assign-order', payload); }
</script>

<style scoped>
.list-card { border:1px solid #ddd; padding: .75rem; border-radius:6px; margin-bottom:.75rem; }
.card-header { display:flex; justify-content:space-between; align-items:center; }
.add-row { display:flex; gap:.5rem; margin:.5rem 0; position:relative; align-items:center; }
.add-row input { padding:.25rem .5rem; }
.results { position:absolute; top:2.6rem; left:0; right:0; max-height:12rem; overflow:auto; background:white; border:1px solid #ccc; z-index:10; margin:0; padding:0; list-style:none; }
.result-item { padding:.35rem .5rem; cursor:pointer; }
.result-item:hover { background:#f0f0f0; }
.selected { display:flex; gap:.5rem; align-items:center; }
.empty { color:#666; font-style:italic; }
</style>