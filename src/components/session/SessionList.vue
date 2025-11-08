<template>
  <div class="session-list">
    <header class="list-header">
      <h2>{{ session.title ?? session._id ?? session.session }}</h2>
      <small class="muted">Items: {{ items?.length ?? 0 }}</small>
    </header>

    <!-- grid container: header cells and item cells are direct children so they share the same column lines -->
  <div class="items-grid" role="list" :style="{ '--session-grid': sessionActive ? '1fr 160px auto' : '1fr 0px auto' }">
      <!-- background row that spans all columns and sits behind header cells -->
      <div class="items-header-bg" aria-hidden="true"></div>

      <!-- header cells are direct children of the grid so they align with item cells below -->
      <div class="item-main header">Task</div>
  <div v-if="sessionActive" class="item-status header">Status</div>
  <div v-if="sessionActive" class="item-actions header">Actions</div>

      <template v-for="(it, idx) in sortedItems" :key="it._id ?? it.id ?? it.taskId ?? it.task">
        <div class="item-row" role="listitem">
          <div class="item-main">
            <span class="item-name">{{ it.taskName ?? it.taskNameResolved ?? it.taskId ?? it.task ?? it._id }}</span>
          </div>
          <div v-if="sessionActive" class="item-status">{{ it.itemStatus ?? taskStatuses?.[it.task ?? it.taskId ?? ''] ?? 'Unknown' }}</div>
          <div class="item-actions">
            <button v-if="sessionActive && idx === nextIndex && ((it.itemStatus ?? 'Incomplete') === 'Incomplete')" @click="start({ task: (it.taskId ?? it.task ?? it._id) })">Start</button>
            <button v-if="sessionActive && idx === nextIndex && ((it.itemStatus ?? 'Incomplete') === 'In Progress')" @click="complete({ task: (it.taskId ?? it.task ?? it._id) })">Complete</button>
          </div>
        </div>
      </template>
    </div>

    <!-- end-session button when all items complete -->
    <div v-if="sessionActive && allComplete" class="end-session-row">
      <button class="end-session-btn" @click="onEndSession">End session</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// SessionListItem component replaced by inline rows to guarantee grid alignment

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
  (e: 'end-session'): void;
  (e: 'end-session-no-confirm'): void;
}>();

// computed ordering and next actionable item
const sortedItems = computed(() => {
  const items = props.items ?? [];
  if (!items || items.length === 0) return [];
  const orderingRaw = String(props.session?.ordering ?? props.session?.order ?? 'Default');
  const useRandom = orderingRaw.toLowerCase() === 'random';
  const field = useRandom ? 'randomOrder' : 'defaultOrder';
  return [...items].slice().sort((a: any, b: any) => {
    const aVal = Number(a?.[field] ?? a?.orderNumber ?? 0);
    const bVal = Number(b?.[field] ?? b?.orderNumber ?? 0);
    return aVal - bVal;
  });
});

const nextIndex = computed(() => sortedItems.value.findIndex((it: any) => (it?.itemStatus ?? 'Incomplete') !== 'Complete'));
const sessionActive = computed(() => !!props.session?.active);

const allComplete = computed(() => {
  const items = sortedItems.value || [];
  if (!items.length) return false;
  return items.every((it: any) => {
    const status = (it.itemStatus ?? (props.taskStatuses?.[it.task ?? it.taskId ?? '']) ?? 'Incomplete');
    return status === 'Complete';
  });
});

// add-item UI not currently used; declarations removed to avoid unused-declaration build errors

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

// remove-item UI not currently used; remove to avoid unused-declaration build errors

function onEndSession() {
  // Emit a special event that indicates no confirmation should be requested by the parent.
  // This lets the new 'End session' button end the session immediately without the prompt.
  emit('end-session-no-confirm');
}
</script>

<style scoped>
.session-list { border: 1px solid rgba(0,0,0,0.06); padding: .75rem; border-radius: 8px; background: var(--surface); color: var(--text); }
.list-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom: .5rem;
  /* match items-header sizing for consistent alignment */
  padding: .25rem .5rem;
  min-height: 34px;
}
.muted { color: var(--muted); }

.add-item { display:flex; gap:.5rem; margin-bottom:.75rem; align-items:center; }
.add-item input { padding:.35rem .5rem; border-radius:4px; border:1px solid rgba(255,255,255,0.04); background: transparent; color: var(--text); }
.add-btn {
  background: var(--surface); color: var(--text); border:1px solid rgba(255,255,255,0.06);
  padding:.4rem .65rem; border-radius:6px; cursor:pointer;
}
.session-list { border: 1px solid rgba(0,0,0,0.06); padding: .75rem; border-radius: 8px; background: var(--surface); color: var(--text); }
.session-list {
  /* shared grid columns for header + items to guarantee alignment */
  --session-grid: 1fr 160px auto;
}
.session-list {
  /* shared grid columns for header + items to guarantee alignment */
  --session-grid: 1fr 160px auto;
}
.session-list {
  /* shared grid columns for header + items to guarantee alignment */
  --session-grid: 1fr 160px auto;
}
.items-grid {
  display: grid;
  grid-template-columns: var(--session-grid);
  gap: 0.5rem;
  align-items: center;
  position: relative;
}
.items-header-bg {
  grid-column: 1 / -1;
  background: var(--accent);
  border-radius: 6px;
  min-height: 34px;
  z-index: 0;
}
.items-header-bg { grid-row: 1 / 2; }
.item-main.header { grid-column: 1; grid-row: 1; padding: .25rem .5rem; z-index: 1; font-weight: 600; color: var(--surface); }
.item-status.header { grid-column: 2; grid-row: 1; justify-self: center; text-align: center; color: var(--surface); padding: .25rem .5rem; z-index: 1; font-weight: 600; }
.item-actions.header { grid-column: 3; grid-row: 1; justify-self: end; color: var(--surface); padding: .25rem .5rem; z-index: 1; font-weight: 600; }
.items { display:flex; flex-direction:column; gap:.5rem; margin-bottom:.5rem; }
.item-row { grid-column: 1 / -1; display: contents; }
.item-row > .item-main, .item-row > .item-status, .item-row > .item-actions { padding: .25rem .5rem; }
.item-row > .item-main { grid-column: 1; display:flex; align-items:center; gap:.5rem; border-top-left-radius:4px; border-bottom-left-radius:4px; }
.item-row > .item-status { grid-column: 2; justify-self: center; text-align: center; color: var(--text); }
.item-row > .item-actions { grid-column: 3; justify-self: end; display: inline-flex; gap: .25rem; border-top-right-radius:4px; border-bottom-right-radius:4px; }

.actions-row { display:flex; justify-content:flex-end; }
.refresh-btn {
  background: transparent; color: var(--accent); border: 1px solid rgba(255,255,255,0.04);
  padding:.35rem .6rem; border-radius:6px; cursor:pointer;
}
.end-session-row {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.end-session-btn {
  background: var(--accent);
  color: var(--accent-foreground);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.end-session-btn:hover { opacity: 0.95; transform: translateY(-1px); }
</style>