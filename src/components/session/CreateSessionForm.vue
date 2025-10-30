<template>
  <form @submit.prevent="onSubmit" class="create-session-form">
    <label for="listSelect">Choose list</label>
    <select id="listSelect" v-model="selectedList" required>
      <option value="" disabled>-- select a list --</option>
      <option v-for="l in lists" :key="listKey(l)" :value="listIdFor(l)">{{ listLabel(l) }}</option>
    </select>

    <label>Ordering</label>
    <select v-model="ordering">
      <option value="Default">default</option>
      <option value="Random">random</option>
    </select>

    <label>Format</label>
    <select v-model="format">
      <option value="List">list</option>
    </select>

    <label for="sessionName">Session title (optional)</label>
    <input id="sessionName" v-model="name" placeholder="Session title" />

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
const ordering = ref<'Default'|'Random'>('Default');
const format = ref<'List'>('List');
const name = ref('');

const lists = computed(() => Array.isArray(listsStore.lists) ? listsStore.lists : []);

function listIdFor(l: any){ return (l as any)._id ?? (l as any).list ?? ''; }
function listLabel(l: any){ return (l as any).title ?? (l as any).name ?? listIdFor(l); }
function listKey(l: any){ return listIdFor(l) || JSON.stringify(l); }

onMounted(async () => {
  const ownerId = (auth as any)?._id ?? auth.username;
  await listsStore.fetchAll(ownerId || undefined);
});

function onSubmit() {
  const payload = { list: selectedList.value, ordering: ordering.value, format: format.value, name: name.value || undefined };
  console.debug('[CreateSessionForm] submit payload:', payload);
  emit('create', payload);
}

async function handleCreate(payload: { list: string; ordering: string; format: string; name?: string }) {
  console.debug('[SessionView] handleCreate payload:', payload);
  try {
    const sessionOwner = auth.username ?? (auth as any)?._id ?? '';
    if (!sessionOwner) throw new Error('Not authenticated');

    const res = await store.changeSession({ list: payload.list, sessionOwner, ordering: payload.ordering, format: payload.format, name: payload.name } as any);
    console.debug('[SessionView] changeSession result:', res);

    // safe checks
    if (res && typeof res === 'object' && 'session' in res && (res as any).session) {
      await store.fetchActiveForOwner(sessionOwner);
    } else {
      await store.fetchSessions();
      await store.fetchActiveForOwner(sessionOwner);
    }
  } catch (e: any) {
    console.error('[SessionView] create session failed', e);
    alert('Create session failed: ' + (e?.message ?? String(e)));
  } finally {
    showCreate.value = false;
  }
}

</script>

<style scoped>
.create-session-form { display:flex; flex-direction:column; gap:.5rem; max-width:420px; }
.actions { margin-top:.5rem; display:flex; justify-content:flex-end; }
</style>