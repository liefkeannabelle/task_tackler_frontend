<template>
  <div class="list-item-row">
    <div class="info">
      <span class="order">{{ item.orderNumber }}</span>
      <span class="task">{{ displayName }}</span>
    </div>
    <div class="actions">
      <button @click="move(-1)">▲</button>
      <button @click="move(1)">▼</button>
      <button @click="requestDelete">Delete</button>
    </div>
  </div>
</template>

// ...existing code...
<script setup lang="ts">
import { computed } from 'vue';
import { useTaskBankStore } from '../../stores/taskbank';
import { useAuthStore } from '../../stores/auth';
import type { ListItem } from '../../api/client';

const props = defineProps<{ listId: string; item: ListItem }>();

const taskBank = useTaskBankStore();
const auth = useAuthStore();

// prefer item.name (new backend field), then nested task.name, then resolve via TaskBank, then id
const taskIdentifier = computed(() => {
  const it = props.item as any;
  return (it.task as string) ?? (it.taskId as string) ?? (it._id as string) ?? '';
});

const displayName = computed(() => {
  const it = props.item as any;
  if (typeof it.name === 'string' && it.name.trim()) return it.name;
  if (it.task && typeof it.task === 'object' && (it.task as any).taskName) return (it.task as any).taskName;
  const id = taskIdentifier.value;
  if (id) {
    // try to find in loaded taskBank tasks
    const found = (taskBank.tasks || []).find(t => (t as any)._id === id || (t as any).taskName === id);
    if (found) return (found as any).taskName ?? (found as any).name ?? id;
  }
  // fallback to any direct label on item
  return (it.taskName ?? it.name ?? id ?? '(unknown)') as string;
});

const emit = defineEmits<{
  (e: 'delete-task', payload: { listId: string; taskId: string; deleter: string }): void;
  (e: 'assign-order', payload: { listId: string; taskId: string; newOrder: number; assigner: string }): void;
}>();

function requestDelete() {
  const owner = props.listOwner ?? '';
  const user = auth.username ?? '';

  // If logged-in user is the owner, use it silently.
  // Otherwise ask (or block) — backend requires deleter === owner

  const deleter = auth.username ?? '';
  if (!deleter) {
    alert('Please log in to delete items.');
    return;
  }

  if (!deleter) return;
  emit('delete-task', { listId: props.listId, taskId: taskIdentifier.value || displayName.value, deleter });
}

function move(direction: number) {
  // prefer logged-in username; fallback to prompt for backwards compatibility
  const assigner = auth.username || prompt('Your ID to reorder this task:') || '';
  if (!assigner) return;
  const newOrder = (props.item.orderNumber || 0) + direction;
  if (newOrder < 1) return;
  emit('assign-order', { listId: props.listId, taskId: taskIdentifier.value || displayName.value, newOrder, assigner });
}
</script>
// ...existing code...

<style scoped>
.list-item-row { display:flex; justify-content:space-between; align-items:center; padding:.4rem; border-bottom:1px solid #eee; }
.info { display:flex; gap:.5rem; align-items:center; }
.order { width:2rem; text-align:center; color:#666; }
.actions button { margin-left:.25rem; }
</style>