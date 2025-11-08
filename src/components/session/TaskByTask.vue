<template>
  <div class="task-by-task">
    <header class="bytask-header">
    <h3>{{ session?.title ?? 'Session' }}</h3>
      <div class="progress">
        <template v-if="!allComplete">{{ currentIndexDisplay }} / {{ totalItems }}</template>
        <template v-else>{{ totalItems }} / {{ totalItems }}</template>
      </div>
    </header>

    <div v-if="!hasItems" class="empty">No items in this session</div>

    <div v-else-if="!allComplete && hasItems" class="task-panel">
      <div class="task-card">
        <div class="task-body">
          <div class="task-name">{{ currentItemName }}</div>
          <div class="task-meta">{{ currentItem?.description ?? '' }}</div>
        </div>

        <div class="task-actions">
          <button v-if="showStart" class="action-btn start" @click="startCurrent">Start</button>
          <button v-if="showComplete" class="action-btn complete" @click="completeCurrent">Complete</button>
        </div>
      </div>
    </div>

    <div v-else-if="allComplete && sessionActive" class="completed-panel">
      <div class="task-card">
        <div class="task-name">All tasks completed</div>
        <div class="task-meta">You have finished all items in this session.</div>
        <div class="end-session-row">
          <button class="end-session-btn" @click="onEndSession">End session</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  session: Record<string, any> | null;
  items: Array<Record<string, any>>;
  taskStatuses?: Record<string, string>;
}>();

const emit = defineEmits<{
  (e: 'start-task', payload: { session: string; task: string }): void;
  (e: 'complete-task', payload: { session: string; task: string }): void;
  (e: 'end-session'): void;
  (e: 'end-session-no-confirm'): void;
  (e: 'refresh-items'): void;
}>();

const items = computed(() => props.items || []);
const totalItems = computed(() => items.value.length);

const sessionActive = computed(() => !!props.session?.active);

// determine ordering field
function orderFieldFor(session: any) {
  const orderingRaw = String(session?.ordering ?? session?.order ?? 'Default');
  const useRandom = orderingRaw.toLowerCase() === 'random';
  return useRandom ? 'randomOrder' : 'defaultOrder';
}

const sortedItems = computed(() => {
  const list = items.value.slice();
  const field = orderFieldFor(props.session);
  return list.sort((a: any, b: any) => (Number(a?.[field] ?? a?.orderNumber ?? 0) - Number(b?.[field] ?? b?.orderNumber ?? 0)));
});

const nextIndex = computed(() => sortedItems.value.findIndex((it: any) => (it?.itemStatus ?? (props.taskStatuses?.[it.task ?? it.taskId ?? '']) ?? 'Incomplete') !== 'Complete'));

const hasItems = computed(() => sortedItems.value && sortedItems.value.length > 0);
const allComplete = computed(() => hasItems.value && sortedItems.value.every((it: any) => (it?.itemStatus ?? (props.taskStatuses?.[it.task ?? it.taskId ?? '']) ?? 'Incomplete') === 'Complete'));

const currentIndex = computed(() => nextIndex.value >= 0 ? nextIndex.value : -1);
const currentItem = computed(() => (currentIndex.value >= 0 ? sortedItems.value[currentIndex.value] : null));

const currentItemName = computed(() => currentItem.value?.taskName ?? currentItem.value?.task ?? 'Unknown task');
const currentIndexDisplay = computed(() => (currentIndex.value >= 0 ? (currentIndex.value + 1) : 0));

const showStart = computed(() => sessionActive.value && currentItem.value && ((currentItem.value.itemStatus ?? 'Incomplete') === 'Incomplete'));
const showComplete = computed(() => sessionActive.value && currentItem.value && ((currentItem.value.itemStatus ?? 'Incomplete') === 'In Progress'));

function startCurrent() {
  const sid = props.session?._id ?? props.session?.session ?? null;
  if (!sid || !currentItem.value) return;
  const taskId = currentItem.value.taskId ?? currentItem.value.task ?? currentItem.value._id ?? null;
  if (!taskId) return;
  emit('start-task', { session: sid, task: taskId });
}

function completeCurrent() {
  const sid = props.session?._id ?? props.session?.session ?? null;
  if (!sid || !currentItem.value) return;
  const taskId = currentItem.value.taskId ?? currentItem.value.task ?? currentItem.value._id ?? null;
  if (!taskId) return;
  emit('complete-task', { session: sid, task: taskId });
}

function onEndSession() {
  emit('end-session-no-confirm');
}
</script>

<style scoped>
.task-by-task { border: 1px solid rgba(0,0,0,0.06); padding: .75rem; border-radius: 8px; background: var(--surface); color: var(--text); }
.bytask-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:.5rem; }
.task-panel { display:flex; justify-content:center; }
.task-card { width:100%; max-width:720px; padding: .75rem; border-radius:6px; background: var(--surface); border: 1px solid rgba(0,0,0,0.04); display:flex; align-items:center; justify-content:space-between; gap:1rem; }
.task-body { flex:1; }
.task-name { font-weight:600; margin-bottom:.25rem; }
.task-meta { color: var(--muted); }
.task-actions { display:flex; gap:.5rem; align-items:center; }
.action-btn { padding:.4rem .7rem; border-radius:6px; cursor:pointer; font-weight:600; }
.action-btn.start { background: var(--accent); color: var(--accent-foreground); border: none; }
.action-btn.complete { background: var(--accent); color: var(--accent-foreground); border: none; }
.action-btn:hover { filter: brightness(0.95); transform: translateY(-1px); }
.end-session-row { margin-top:1rem; display:flex; justify-content:center; }
.end-session-btn { background: var(--accent); color: var(--accent-foreground); border:none; padding:.5rem 1rem; border-radius:8px; cursor:pointer; font-weight:600; }
</style>
