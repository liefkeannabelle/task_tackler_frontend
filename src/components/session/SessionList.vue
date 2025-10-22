<template>
  <div class="session-list">
    <header>
      <h2>{{ session.title || session._id || session.session }}</h2>
      <small>Items: {{ items.length }}</small>
    </header>

    <div class="add-item">
      <input v-model="taskId" placeholder="Task ID" />
      <input v-model="defaultOrder" type="number" placeholder="default order (optional)" />
      <button @click="addItem">Add Item</button>
    </div>

    <div class="items">
      <SessionListItem
        v-for="it in items"
        :key="it._id || it.task"
        :item="it"
        :session-id="session._id || session.session"
        :status="taskStatuses[it.task || it.taskId || '']"
        @start="start"
        @complete="complete"
        @remove="remove"
      />
    </div>

    <button @click="$emit('refresh-items')">Refresh Items</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SessionListItem from './SessionListItem.vue';
const props = defineProps<{ session: Record<string, any>; items: Array<Record<string, any>>; taskStatuses: Record<string, string> }>();
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
  if (!taskId.value) return;
  emit('add-item', { session: props.session._id || props.session.session, task: taskId.value, defaultOrder: defaultOrder.value ?? undefined });
  taskId.value = '';
  defaultOrder.value = null;
}

function start(payload: { task: string }) {
  emit('start-task', { session: props.session._id || props.session.session, task: payload.task });
}

function complete(payload: { task: string }) {
  emit('complete-task', { session: props.session._id || props.session.session, task: payload.task });
}

function remove(payload: { task: string }) {
  emit('remove-item', { session: props.session._id || props.session.session, task: payload.task });
}
</script>

<style scoped>
.session-list { border:1px solid #eee; padding:.75rem; border-radius:6px; }
.add-item { display:flex; gap:.5rem; margin-bottom:.5rem; }
.items { display:flex; flex-direction:column; gap:.5rem; }
</style>