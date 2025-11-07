<template>
  <div class="session-list-item session-row">
    <div class="item-main">
        <span class="item-name">{{ item.taskName ?? item.taskNameResolved ?? item.taskId ?? item.task ?? item._id }}</span>
      </div>

      <div class="item-status">{{ item.itemStatus ?? status ?? 'Unknown' }}</div>

      <div class="item-actions">
      <button v-if="props.sessionActive" @click="onStart">Start</button>
      <button v-if="props.sessionActive" @click="onComplete">Complete</button>
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
  sessionActive?: boolean;
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
.session-list-item {
  /* visual container for a row; grid layout is provided by the shared .session-row class */
  border: 1px solid #eee;
  border-radius: 4px;
}
.session-row {
  display: grid;
  grid-template-columns: var(--session-grid, 1fr 160px auto);
  gap: 0.5rem;
  align-items: center;
  padding: .25rem .5rem;
  min-height: 34px;
}
.item-main { grid-column: 1; display:flex; align-items:center; gap:.5rem; }
.item-name { font-weight: 600; }
.item-meta { color: #666; margin-left: .5rem; }
.item-status { grid-column: 2; justify-self: center; text-align: center; color: var(--text); }
.item-actions { grid-column: 3; justify-self: end; display: inline-flex; gap: .25rem; }
</style>