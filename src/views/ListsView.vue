<template>
  <div>
    <h1>Lists</h1>
    <NewListForm @create="createList" />
    <div v-if="store.loading">Loading...</div>
    <div v-if="store.error" class="error">{{ store.error }}</div>
    <div v-for="l in store.lists" :key="l._id">
      <ListCard :list="l" @add-task="onAddTask" @delete-task="onDeleteTask" @assign-order="onAssignOrder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useListsStore } from '../stores/lists';
import { useTaskBankStore } from '../stores/taskbank';
import { useAuthStore } from '../stores/auth';
import NewListForm from '../components/lists/NewListForm.vue';
import ListCard from '../components/lists/ListCard.vue';

const store = useListsStore();
const taskBank = useTaskBankStore();
const auth = useAuthStore();

onMounted(async () => {
  // load lists and task bank (optionally scoped to the logged-in user)
  await Promise.all([
    store.fetchAll(),
    taskBank.fetchAll(auth.username || undefined)
  ]);
});

async function createList(payload: { name: string; owner: string }) {
  await store.create(payload.name, payload.owner);
}

async function onAddTask(payload: { listId: string; task: string; adder?: string }) {
  const { listId, task, adder } = payload;
  if (!listId || !task) return;
  await store.addTask(listId, task, adder);
}

async function onDeleteTask(payload: { listId: string; taskId: string; deleter?: string }) {
  const { listId, taskId, deleter } = payload;
  if (!listId || !taskId) return;
  await store.removeTask(listId, taskId, deleter);
}

async function onAssignOrder(payload: { listId: string; taskId: string; newOrder: number; assigner?: string }) {
  const { listId, taskId, newOrder, assigner } = payload;
  if (!listId || !taskId || typeof newOrder !== 'number') return;
  await store.assignOrder(listId, taskId, newOrder, assigner);
}
</script>

<style scoped>
.error { color: #c00; margin: .5rem 0; }
</style>