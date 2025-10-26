// ...existing code...
<template>
  <div class="list-item-row">
    <div class="info">
      <span class="order">{{ item.orderNumber }}</span>
      <span class="task">{{ displayName }}</span>
      <small class="status">({{ item.taskStatus ?? '-' }})</small>
    </div>
    <div class="actions">
      <button @click="move(-1)">▲</button>
      <button @click="move(1)">▼</button>
      <button @click="requestDelete">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useTaskBankStore } from '../../stores/taskbank';

const props = defineProps<{ listId: string; item: Record<string, any> }>();

// debug
console.log('ListItemRow props.item (setup):', props.item);
watch(() => props.item, (newVal) => console.log('ListItemRow props.item (changed):', newVal), { immediate: true, deep: true });

const taskBank = useTaskBankStore();

// stable identifier (try multiple fields)
const taskIdentifier = computed(() => {
  const it = props.item as any;
  return it.taskId ?? it._id ?? it.task ?? it.taskName ?? it.name ?? '';
});

// display name: prefer store lookup, then any name fields, then id
const displayName = computed(() => {
  const id = taskIdentifier.value;
  const fromStore = id ? taskBank.getTaskName?.(id) : undefined;
  const it = props.item as any;
  return fromStore ?? it.taskName ?? it.task ?? it.name ?? id ?? '(unknown)';
});

const emit = defineEmits<{
  (e: 'delete-task', payload: { listId: string; taskId: string; deleter: string }): void;
  (e: 'assign-order', payload: { listId: string; taskId: string; newOrder: number; assigner: string }): void;
}>();

function requestDelete() {
  const deleter = prompt('Your ID to delete this task:') || '';
  if (!deleter) return;
  emit('delete-task', { listId: props.listId, taskId: taskIdentifier.value || displayName.value, deleter });
}

function move(direction: number) {
  const assigner = prompt('Your ID to reorder this task:') || '';
  if (!assigner) return;
  const newOrder = (props.item.orderNumber || 0) + direction;
  if (newOrder < 1) return;
  emit('assign-order', { listId: props.listId, taskId: taskIdentifier.value || displayName.value, newOrder, assigner });
}
</script>

<style scoped>
.list-item-row { display:flex; justify-content:space-between; align-items:center; padding:.4rem; border-bottom:1px solid #eee; }
.info { display:flex; gap:.5rem; align-items:center; }
.order { width:2rem; text-align:center; color:#666; }
.actions button { margin-left:.25rem; }
</style>