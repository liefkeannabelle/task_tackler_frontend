<template>
  <form @submit.prevent="onSubmit" class="create-session-form">
    <label for="listSearch">Choose list</label>
    <div class="list-search-inline" @keydown.escape="clearQuery">
      <input
        id="listSearch"
        type="search"
        v-model="query"
        @input="onInput"
        @keydown.down.prevent="focusNext"
        @keydown.up.prevent="focusPrev"
        @keydown.enter.prevent="acceptFocused"
        autocomplete="off"
        placeholder="Search your lists..."
        required
      />

      <ul v-if="showResults" class="results" role="listbox">
        <li v-for="(l, i) in matches" :key="listKey(l)" :class="{focused: i === focusedIndex}"
            @mousedown.prevent="selectList(l)" @mouseenter="focusedIndex = i">
          <div class="title">{{ listLabel(l) }}</div>
        </li>
      </ul>
    </div>

    <label>Ordering</label>
    <select v-model="ordering">
      <option value="Default">default</option>
      <option value="Random">random</option>
    </select>

    <label>Format</label>
    <select v-model="format">
      <option value="List">list</option>
      <option value="task-by-task">task-by-task</option>
    </select>

  <!-- Session title removed per UX update -->

    <div class="actions">
      <button type="submit" :disabled="!selectedList">Create session</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useListsStore } from '../../stores/lists';
import { useAuthStore } from '../../stores/auth';

const emit = defineEmits<{ (e: 'create', payload: { list: string; ordering: string; format: string; name?: string }): void }>();

const listsStore = useListsStore();
const auth = useAuthStore();

const selectedList = ref('');
const query = ref('');
const focusedIndex = ref(-1);
const ordering = ref<'Default'|'Random'>('Default');
const format = ref<'List' | 'task-by-task'>('List');

const lists = computed(() => Array.isArray(listsStore.lists) ? listsStore.lists : []);

const matches = computed(() => {
  const q = (query.value || '').trim().toLowerCase();
  if (!q) return lists.value.slice(0, 10);
  return lists.value.filter((l: any) => (listLabel(l) || '').toLowerCase().includes(q));
});

// Local control so we can hide the dropdown after an explicit selection
const showResultsLocal = ref(false);
const showResults = computed(() => showResultsLocal.value && matches.value && matches.value.length > 0);

function listIdFor(l: any){ return (l as any)._id ?? (l as any).list ?? ''; }
function listLabel(l: any){ return (l as any).title ?? (l as any).name ?? listIdFor(l); }
function listKey(l: any){ return listIdFor(l) || JSON.stringify(l); }

onMounted(async () => {
  const ownerId = (auth as any)?._id ?? auth.username;
  await listsStore.fetchAll(ownerId || undefined);
});

function onSubmit() {
  const payload = { list: selectedList.value, ordering: ordering.value, format: format.value };
  console.debug('[CreateSessionForm] submit payload:', payload);
  emit('create', payload);
}

function onInput() {
  focusedIndex.value = matches.value.length ? 0 : -1;
  showResultsLocal.value = true;
}

function clearQuery() {
  query.value = '';
  focusedIndex.value = -1;
}

function focusNext() {
  if (!matches.value.length) return;
  focusedIndex.value = (focusedIndex.value + 1) % matches.value.length;
}

function focusPrev() {
  if (!matches.value.length) return;
  focusedIndex.value = (focusedIndex.value - 1 + matches.value.length) % matches.value.length;
}

function acceptFocused() {
  if (focusedIndex.value >= 0 && matches.value[focusedIndex.value]) {
    selectList(matches.value[focusedIndex.value]);
  }
}

function selectList(l: any) {
  selectedList.value = listIdFor(l);
  query.value = listLabel(l);
  focusedIndex.value = -1;
  // hide results so they don't block following controls
  showResultsLocal.value = false;
}



</script>

<style scoped>
.create-session-form {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  max-width: 420px;
  /* surface panel behind the form to match other sections */
  background: var(--surface);
  padding: .75rem;
  border-radius: 8px;
  /* match session-list border/weight so colors feel the same */
  border: 1px solid rgba(0,0,0,0.06);
  color: var(--text);
}
.actions { margin-top: .5rem; display:flex; justify-content:flex-end; }

.list-search-inline { position: relative; }
.list-search-inline input[type="search"] { width:100%; padding:.5rem; border-radius:6px; border:1px solid rgba(0,0,0,0.06); }
.list-search-inline .results { position:absolute; left:0; right:0; z-index:30; max-height:200px; overflow:auto; background:var(--surface); border:1px solid rgba(0,0,0,0.06); margin-top:6px; list-style:none; padding:0; box-shadow:0 6px 18px rgba(0,0,0,0.08); }
.list-search-inline .results li { padding:.5rem; cursor:pointer; }
.list-search-inline .results li.focused { background: rgba(0,0,0,0.03); }
</style>