<template>
  <div class="list-item-row">
    <div class="info">
      <span class="order">{{ item.orderNumber }}</span>
      <span class="task">{{ item.task }}</span>
      <small class="status">({{ item.taskStatus }})</small>
    </div>
    <div class="actions">
      <button @click="move(-1)">▲</button>
      <button @click="move(1)">▼</button>
      <button @click="requestDelete">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ listId: string; item: Record<string, any> }>();
const emit = defineEmits<{
  (e: 'delete-task', payload: { listId: string; taskId: string; deleter: string }): void;
  (e: 'assign-order', payload: { listId: string; taskId: string; newOrder: number; assigner: string }): void;
}>();

function requestDelete() {
  const deleter = prompt('Your ID to delete this task:') || '';
  if (!deleter) return;
  emit('delete-task', { listId: props.listId, taskId: props.item.task, deleter });
}

function move(direction: number) {
  // naive move by ±1; prompt for assigner id
  const assigner = prompt('Your ID to reorder this task:') || '';
  if (!assigner) return;
  const newOrder = (props.item.orderNumber || 0) + direction;
  if (newOrder < 1) return;
  emit('assign-order', { listId: props.listId, taskId: props.item.task, newOrder, assigner });
}
</script>

<style scoped>
.list-item-row { display:flex; justify-content:space-between; align-items:center; padding:.4rem; border-bottom:1px solid #eee; }
.info { display:flex; gap:.5rem; align-items:center; }
.order { width:2rem; text-align:center; color:#666; }
.actions button { margin-left:.25rem; }
</style>