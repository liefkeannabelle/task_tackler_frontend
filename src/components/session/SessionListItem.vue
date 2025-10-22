<template>
  <div class="session-list-item">
    <div class="left">
      <strong>{{ item.task || item.taskId }}</strong>
      <small v-if="item.defaultOrder">(#{{ item.defaultOrder }})</small>
      <small class="status">[{{ status || item.itemStatus || 'unknown' }}]</small>
    </div>
    <div class="actions">
      <button @click="start">Start</button>
      <button @click="complete">Complete</button>
      <button @click="remove">Remove</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ item: Record<string, any>; sessionId: string; status?: string }>();
const emit = defineEmits<{
  (e: 'start', payload: { task: string }): void;
  (e: 'complete', payload: { task: string }): void;
  (e: 'remove', payload: { task: string }): void;
}>();

function start() {
  emit('start', { task: props.item.task || props.item.taskId || props.item._id });
}

function complete() {
  emit('complete', { task: props.item.task || props.item.taskId || props.item._id });
}

function remove() {
  if (!confirm('Remove this item from session?')) return;
  emit('remove', { task: props.item.task || props.item.taskId || props.item._id });
}
</script>

<style scoped>
.session-list-item { display:flex; justify-content:space-between; align-items:center; padding:.5rem; border:1px solid #f0f0f0; border-radius:4px; }
.left { display:flex; gap:.5rem; align-items:center; }
.actions button { margin-left:.4rem; }
.status { color:#666; }
</style>