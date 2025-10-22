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
</script>