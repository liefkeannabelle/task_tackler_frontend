<template>
  <div class="session-list">
    <header class="list-header">
      <h2>{{ session.title ?? session._id ?? session.session }}</h2>
      <small class="muted">Items: {{ items?.length ?? 0 }}</small>
    </header>

    <div class="add-item">
      <input v-model="taskId" placeholder="Task ID" />
      <input v-model.number="defaultOrder" type="number" placeholder="default order (optional)" />
      <button class="add-btn" @click="addItem">Add Item</button>
    </div>

    <div class="items">
      <SessionListItem
        v-for="it in items || []"
        :key="it._id ?? it.id ?? it.taskId ?? it.task"
        :item="it"
        :session-id="session._id ?? session.session"
        :status="taskStatuses?.[it.task ?? it.taskId ?? '']"
        @start="start"
        @complete="complete"
        @remove="remove"
      />
    </div>

    <div class="actions-row">
      <button class="refresh-btn" @click="$emit('refresh-items')">Refresh Items</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SessionListItem from './SessionListItem.vue';

const props = defineProps<{
  session: Record<string, any>;
  items: Array<Record<string, any>>;
  taskStatuses?: Record<string, string>;
}>();

const emit = defineEmits<{
  (e: 'start-task', payload: { session: string; task: string }): void;
  (e: 'complete-task', payload: { session: string; task: string }): void;
  (e: 'add-item', payload: { session: string; task: string; defaultOrder?: number }): void;
  (e: 'remove-item', payload: { session: string; task: string }): void;
  (e: 'refresh-items'): void;
}>();

const taskId = ref('');
const defaultOrder = ref<number | null>(null);

function addItem() {
  const sid = props.session?._id ?? props.session?.session;
  if (!sid) return;
  if (!taskId.value) return;
  emit('add-item', { session: sid, task: taskId.value, defaultOrder: defaultOrder.value ?? undefined });
  taskId.value = '';
  defaultOrder.value = null;
}

function start(payload: { task: string }) {
  const sid = props.session?._id ?? props.session?.session;
  if (!sid || !payload?.task) return;
  emit('start-task', { session: sid, task: payload.task });
}

function complete(payload: { task: string }) {
  const sid = props.session?._id ?? props.session?.session;
  if (!sid || !payload?.task) return;
  emit('complete-task', { session: sid, task: payload.task });
}

function remove(payload: { task: string }) {
  const sid = props.session?._id ?? props.session?.session;
  if (!sid || !payload?.task) return;
  emit('remove-item', { session: sid, task: payload.task });
}
</script>

<style scoped>
.session-list { border: 1px solid rgba(0,0,0,0.06); padding: .75rem; border-radius: 8px; background: var(--surface); color: var(--text); }
.list-header { display:flex; justify-content:space-between; align-items:center; margin-bottom: .5rem; }
.muted { color: var(--muted); }

.add-item { display:flex; gap:.5rem; margin-bottom:.75rem; align-items:center; }
.add-item input { padding:.35rem .5rem; border-radius:4px; border:1px solid rgba(255,255,255,0.04); background: transparent; color: var(--text); }
.add-btn {
  background: var(--surface); color: var(--text); border:1px solid rgba(255,255,255,0.06);
  padding:.4rem .65rem; border-radius:6px; cursor:pointer;
}
.items { display:flex; flex-direction:column; gap:.5rem; margin-bottom:.5rem; }

.actions-row { display:flex; justify-content:flex-end; }
.refresh-btn {
  background: transparent; color: var(--accent); border: 1px solid rgba(255,255,255,0.04);
  padding:.35rem .6rem; border-radius:6px; cursor:pointer;
}
</style>