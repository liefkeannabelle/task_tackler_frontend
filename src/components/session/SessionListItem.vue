<template>
  <div class="session-list-item">
    <div class="item-main">
      <span class="item-name">{{ item.taskName ?? item.taskNameResolved ?? item.taskId ?? item.task ?? item._id }}</span>
      <span class="item-meta">(#{{ item.defaultOrder ?? item.randomOrder ?? '?' }})</span>
      <span class="item-status">[{{ item.itemStatus ?? status ?? 'Unknown' }}]</span>
    </div>

    <div class="item-actions">
      <button @click="onStart">Start</button>
      <button @click="onComplete">Complete</button>
      <button @click="onRemove">Remove</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// ...existing code...
const props = defineProps<{
  item: Record<string, any>;
  sessionId?: string;
  status?: string;
}>();

const emit = defineEmits(['start', 'complete', 'remove']);

function resolveTaskId(it: any) {
  return it?.taskId ?? it?.task ?? it?._id ?? null;
}

function onStart() {
  const task = resolveTaskId(props.item);
  console.debug('[SessionListItem] onStart', { task, item: props.item });
  emit('start', { task, item: props.item });
}

function onComplete() {
  const task = resolveTaskId(props.item);
  console.debug('[SessionListItem] onComplete', { task, item: props.item });
  emit('complete', { task, item: props.item });
}

function onRemove() {
  const task = resolveTaskId(props.item);
  console.debug('[SessionListItem] onRemove', { task, item: props.item });
  emit('remove', { task, item: props.item });
}
</script>

<style scoped>
.session-list-item { display:flex; justify-content:space-between; align-items:center; padding:.25rem .5rem; border:1px solid #eee; border-radius:4px; }
.item-name { font-weight:600; margin-right:.5rem; }
.item-meta { color:#666; margin-left:.5rem; }
.item-status { margin-left:.5rem; color:#333; }
.item-actions { display:inline-flex; gap:.25rem; }
</style>