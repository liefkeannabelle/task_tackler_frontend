<template>
  <div class="task-search" @keydown.escape="close">
    <label class="sr-only" for="task-search-input">Search tasks</label>
    <div class="search-wrap">
      <input
        id="task-search-input"
        type="search"
        v-model="query"
        @input="onInput"
        @keydown.down.prevent="focusNext"
        @keydown.up.prevent="focusPrev"
        @keydown.enter.prevent="acceptFocused"
        autocomplete="off"
        placeholder="Search your tasks..."
        aria-autocomplete="list"
        aria-controls="task-search-results"
        :aria-expanded="showResults.toString()"
      />
      <button v-if="query" @click="clear" aria-label="Clear search">✕</button>
    </div>

    <ul
      v-if="showResults && matches.length"
      id="task-search-results"
      class="results"
      role="listbox"
      :aria-activedescendant="activeDescendantId"
    >
      <li
        v-for="(t, i) in matches"
        :key="taskId(t)"
        :id="`task-search-item-${taskId(t)}`"
        :class="{focused: i === focusedIndex}"
        role="option"
        @mousedown.prevent="select(t)"
        @mouseenter="focusedIndex = i"
      >
        <div class="title">{{ t.taskName || t.name || 'Untitled task' }}</div>
        <div class="meta">{{ t.description ? (t.description.slice(0,80) + (t.description.length>80? '…':'')) : '' }}</div>
      </li>
    </ul>

    <div v-if="showResults && !matches.length" class="no-results">No tasks found</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
// import useAuthStore from "@/stores/auth"; // adapt to your app

interface TaskDoc {
  _id: string;
  taskName?: string;
  name?: string;
  description?: string;
}

const props = defineProps<{
  ownerId?: string | null;
  minChars?: number;
  debounceMs?: number;
}>();

const ownerId = ref(props.ownerId ?? null);
const minChars = props.minChars ?? 1;
const debounceMs = props.debounceMs ?? 200;

const query = ref("");
const allTasks = ref<TaskDoc[]>([]);
const matches = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return [];
  return allTasks.value.filter((t) => {
    const title = (t.taskName || t.name || "").toLowerCase();
    const desc = (t.description || "").toLowerCase();
    return title.includes(q) || desc.includes(q);
  });
});

const showResults = computed(() => query.value.trim().length >= minChars && (matches.value.length > 0 || !matches.value.length));

// keyboard navigation
const focusedIndex = ref(-1);
watch(matches, () => {
  focusedIndex.value = matches.value.length ? 0 : -1;
});

const activeDescendantId = computed(() => {
  const m = matches.value[focusedIndex.value];
  return m ? `task-search-item-${taskId(m)}` : undefined;
});

let fetchTimer: number | null = null;

function debounceFetch() {
  if (fetchTimer) {
    clearTimeout(fetchTimer);
  }
  fetchTimer = setTimeout(() => { fetchTasks(); fetchTimer = null; }, debounceMs) as unknown as number;
}

async function fetchTasks() {
  // Resolve ownerId: prefer prop, then try auth store
  let owner = ownerId.value;
  if (!owner) {
    try {
      // const auth = useAuthStore(); owner = auth.user?._id ?? null;
    } catch (e) {
      // ignore
    }
  }

  if (!owner) {
    console.warn("TaskSearch: missing ownerId; call fetch with an ownerId prop or ensure auth store provides user._id");
    allTasks.value = [];
    return;
  }

  try {
    const res = await fetch('/api/TaskBank/listTasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ owner }),
    });
    const data = await res.json();
    if (data?.tasks && Array.isArray(data.tasks)) {
      allTasks.value = data.tasks;
    } else {
      allTasks.value = [];
    }
  } catch (err) {
    console.warn('TaskSearch: fetch error', err);
    allTasks.value = [];
  }
}

function onInput() {
  if (query.value.trim().length < minChars) return;
  debounceFetch();
}

function clear() { query.value = ""; focusedIndex.value = -1; }
function close() { clear(); }

function focusNext() {
  if (!matches.value.length) return;
  focusedIndex.value = (focusedIndex.value + 1) % matches.value.length;
  ensureFocusedVisible();
}
function focusPrev() {
  if (!matches.value.length) return;
  focusedIndex.value = (focusedIndex.value - 1 + matches.value.length) % matches.value.length;
  ensureFocusedVisible();
}

function ensureFocusedVisible() {
  const m = matches.value[focusedIndex.value];
  if (!m) return;
  const el = document.getElementById(`task-search-item-${taskId(m)}`);
  el?.scrollIntoView({ block: "nearest" });
}

function acceptFocused() {
  if (focusedIndex.value >= 0 && matches.value[focusedIndex.value]) {
    select(matches.value[focusedIndex.value]);
  }
}

function select(task: TaskDoc) {
  const id = taskId(task);
  const targetId = `task-${id}`;
  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    (el as HTMLElement).focus?.();
  } else {
    window.location.hash = `#${targetId}`;
  }
  query.value = "";
}

function taskId(t: any) { return t?._id ?? t?.id ?? t?.taskId ?? null; }

onMounted(() => { fetchTasks(); });
</script>

<style scoped>
.task-search { box-sizing: border-box; position: relative; width: 100%; max-width: 720px; margin: 0 auto .75rem; background: var(--surface); color: var(--text); padding: .6rem; border-radius: 8px; border: 1px solid rgba(0,0,0,0.06); }
.search-wrap { display:flex; gap:8px; align-items:center; }
input[type="search"] { flex:1; padding:8px; background: transparent; border:1px solid rgba(255,255,255,0.04); color: var(--text); border-radius:6px; }
.results { position:absolute; left:0; right:0; z-index:30; max-height:240px; overflow:auto; background:var(--surface); border:1px solid rgba(0,0,0,0.06); margin-top:6px; padding:0; list-style:none; box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
.results li { padding:8px; cursor:pointer; display:flex; flex-direction:column; gap:4px; }
.results li.focused { background: rgba(0,0,0,0.02); }
.no-results { margin-top:6px; color:var(--muted); }
.sr-only { position:absolute !important; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
</style>