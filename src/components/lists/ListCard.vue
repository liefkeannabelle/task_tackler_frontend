<template>
  <div class="list-card">
    <header class="card-header">
      <h3>{{ list.title || list.listName || 'Untitled' }}</h3>
      <small>Owner: {{ list.owner }}</small>
    </header>

    <div class="add-row">
      <input v-model="taskId" placeholder="Task ID or name" />
      <input v-model="adder" placeholder="Your ID" />
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
import { ref, computed } from 'vue';
import ListItemRow from './ListItemRow.vue';
const props = defineProps<{ list: Record<string, any> }>();
const emit = defineEmits<{
  (e: 'add-task', payload: { listId: string; task: string; adder: string }): void;
  (e: 'delete-task', payload: { listId: string; taskId: string; deleter: string }): void;
  (e: 'assign-order', payload: { listId: string; taskId: string; newOrder: number; assigner: string }): void;
}>();

const taskId = ref('');
const adder = ref('');

const items = computed(() => props.list.listItems || props.list.items || []);

function addTask() {
  if (!taskId.value || !adder.value) return;
  emit('add-task', { listId: props.list._id || props.list.list, task: taskId.value, adder: adder.value });
  taskId.value = '';
}

function forwardDelete(payload: any) {
  emit('delete-task', payload);
}

function forwardAssign(payload: any) {
  // payload has listId, taskId, newOrder, assigner
  emit('assign-order', payload);
}
</script>

<style scoped>
.list-card { border:1px solid #ddd; padding: .75rem; border-radius:6px; margin-bottom:.75rem; }
.card-header { display:flex; justify-content:space-between; align-items:center; }
.add-row { display:flex; gap:.5rem; margin:.5rem 0; }
.add-row input { padding:.25rem .5rem; }
.items { margin-top:.5rem; }
.empty { color:#666; font-style:italic; }
</style>