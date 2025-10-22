<template>
  <div class="session-controls">
    <div class="row">
      <label>Select session:</label>
      <select v-model="selected" @change="emitChange">
        <option value="">-- none --</option>
        <option v-for="s in sessions" :key="s._id || s.session" :value="s._id || s.session">
          {{ s.title || s.listId || (s._id || s.session) }}
        </option>
      </select>

      <button @click="create">Create/Change</button>
    </div>

    <div class="row">
      <label>Ordering:</label>
      <input v-model="newOrdering" placeholder="ordering type" />
      <input v-model="setter" placeholder="Your ID" />
      <button @click="setOrdering">Set</button>

      <label>Format:</label>
      <input v-model="newFormat" placeholder="format" />
      <button @click="setFormat">Set</button>
    </div>

    <div class="row">
      <button @click="randomize">Randomize Order</button>
      <button @click="activate">Activate</button>
      <button @click="end">End</button>
      <button @click="del">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{
  sessions: Array<Record<string, any>>;
  active: Record<string, any> | null;
}>();

const emit = defineEmits<{
  (e: 'change-active', sessionId: string | null): void;
  (e: 'create-session', payload: { list: string; sessionOwner: string }): void;
  (e: 'change-session', payload: { list: string; sessionOwner: string }): void;
  (e: 'set-ordering', payload: { session: string; newType: string; setter: string }): void;
  (e: 'set-format', payload: { session: string; newFormat: string; setter: string }): void;
  (e: 'randomize', payload: { session: string; randomizer: string }): void;
  (e: 'activate', payload: { session: string; activator: string }): void;
  (e: 'end', payload: { session: string }): void;
  (e: 'delete', payload: { session: string }): void;
}>();

const selected = ref(props.active ? (props.active._id || props.active.session) : '');
watch(() => props.active, v => { selected.value = v ? (v._id || v.session) : ''; });

const newOrdering = ref('');
const newFormat = ref('');
const setter = ref('');
const actor = ref('');

function emitChange() {
  emit('change-active', selected.value || null);
}

function create() {
  const list = prompt('List ID for new session:') || '';
  const sessionOwner = prompt('Owner ID:') || '';
  if (!list || !sessionOwner) return;
  emit('create-session', { list, sessionOwner });
}

function setOrdering() {
  if (!selected.value || !newOrdering.value || !setter.value) return;
  emit('set-ordering', { session: selected.value, newType: newOrdering.value, setter: setter.value });
}

function setFormat() {
  if (!selected.value || !newFormat.value || !setter.value) return;
  emit('set-format', { session: selected.value, newFormat: newFormat.value, setter: setter.value });
}

function randomize() {
  if (!selected.value) return;
  const randomizer = prompt('Your ID to randomize:') || '';
  if (!randomizer) return;
  emit('randomize', { session: selected.value, randomizer });
}

function activate() {
  if (!selected.value) return;
  const activator = prompt('Your ID to activate:') || '';
  if (!activator) return;
  emit('activate', { session: selected.value, activator });
}

function end() {
  if (!selected.value) return;
  emit('end', { session: selected.value });
}

function del() {
  if (!selected.value) return;
  if (!confirm('Delete session?')) return;
  emit('delete', { session: selected.value });
}
</script>

<style scoped>
.session-controls { border:1px solid #ddd; padding:.75rem; border-radius:6px; margin-bottom:.75rem; }
.row { display:flex; gap:.5rem; align-items:center; margin-bottom:.5rem; }
</style>