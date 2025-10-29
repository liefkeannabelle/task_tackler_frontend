ListCard.vue before dropdown
```
// ...existing code...
<template>
  <div class="list-card">
    <header class="card-header">
      <h3>{{ list.title || list.listName || 'Untitled' }}</h3>
      <small>Owner: {{ list.owner }}</small>
    </header>

    <div class="add-row">
      <input v-model="taskInput" list="tasks" placeholder="Task name or id" />
      <datalist id="tasks">
        <option v-for="t in taskBank.tasks" :key="(t as any)._id" :value="(t as any).taskName || (t as any)._id" />
      </datalist>

      <input v-model="adder" :placeholder="adderPlaceholder" />
      <button @click="addTask">Add</button>
    </div>

    <div v-if="items.length === 0" class="empty">No items</div>

    <div class="items">
      <ListItemRow
        v-for="it in items"
        :key="it.task + '-' + (it.orderNumber ?? '')"
        :list-id="list._id || list.list"
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

const taskInput = ref('');
const adder = ref(auth.username || '');
const adderPlaceholder = auth.username ? 'Your ID' : 'Your ID (login to default)';

watch(() => auth.username, v => { if (v) adder.value = v; });

const items = computed(() => props.list.listItems || props.list.items || []);

function addTask() {
  if (!taskInput.value || !adder.value) return;
  emit('add-task', { listId: props.list._id || props.list.list, task: taskInput.value, adder: adder.value });
  taskInput.value = '';
}
function forwardDelete(payload: any) { emit('delete-task', payload); }
function forwardAssign(payload: any) { emit('assign-order', payload); }
</script>

<style scoped>
.list-card { border:1px solid #ddd; padding: .75rem; border-radius:6px; margin-bottom:.75rem; }
.card-header { display:flex; justify-content:space-between; align-items:center; }
.add-row { display:flex; gap:.5rem; margin:.5rem 0; }
.add-row input { padding:.25rem .5rem; }
.items { margin-top:.5rem; }
.empty { color:#666; font-style:italic; }
</style>
// ...existing code...
```

ListsView.vue
```
<template>
  <div>
    <h1>Lists</h1>
    <NewListForm @create="createList" />
    <div v-if="store.loading">Loading...</div>
    <div v-if="store.error" class="error">{{ store.error }}</div>
    <div v-for="l in store.lists" :key="l._id">
      <ListCard :list="l" @add-task="onAddTask" @delete-task="onDeleteTask" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useListsStore } from '../stores/lists';
import NewListForm from '../components/lists/NewListForm.vue';
import ListCard from '../components/lists/ListCard.vue';

const store = useListsStore();
onMounted(() => store.fetchAll());

async function createList(payload: { name: string; owner: string }) {
  await store.create(payload.name, payload.owner);
}

async function onAddTask({ listId, taskId, adder }: any) {
  await store.addTask(listId, taskId, adder);
}

async function onDeleteTask({ listId, taskId, deleter }: any) {
  await store.removeTask(listId, taskId, deleter);
}
</script><template>
  <div>
    <h1>Lists</h1>
    <NewListForm @create="createList" />
    <div v-if="store.loading">Loading...</div>
    <div v-if="store.error" class="error">{{ store.error }}</div>
    <div v-for="l in store.lists" :key="l._id">
      <ListCard :list="l" @add-task="onAddTask" @delete-task="onDeleteTask" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useListsStore } from '../stores/lists';
import NewListForm from '../components/lists/NewListForm.vue';
import ListCard from '../components/lists/ListCard.vue';

const store = useListsStore();
onMounted(() => store.fetchAll());

async function createList(payload: { name: string; owner: string }) {
  await store.create(payload.name, payload.owner);
}

async function onAddTask({ listId, taskId, adder }: any) {
  await store.addTask(listId, taskId, adder);
}

async function onDeleteTask({ listId, taskId, deleter }: any) {
  await store.removeTask(listId, taskId, deleter);
}
</script>
```

ListView.vue
```
console.debug('[ListsView] module loaded, auth snapshot:', {
  username: auth?.username,
  id: (auth as any)?._id ?? (auth as any)?.id ?? (auth as any)?.userId,
  full: auth
});

onMounted(async () => {
  try {
    console.debug('auth store snapshot:', {
      username: auth.username,
      id: (auth as any)._id ?? (auth as any).id ?? (auth as any).userId,
      full: auth})
    await Promise.all([
      store.fetchAll(auth.username || undefined), // pass owner so backend filters
      taskBank.fetchAll(auth.username || undefined)
    ]);
  } catch (e) {
    console.error('initial data load failed', e);
  }
});
```