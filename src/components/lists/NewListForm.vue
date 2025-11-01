// ...existing code...
<template>
  <form @submit.prevent="submit" class="new-list-form">
    <input v-model="name" placeholder="List name" required />
    <input v-model="owner" :placeholder="ownerPlaceholder" required />
    <button type="submit">Create List</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuthStore } from '../../stores/auth';

const auth = useAuthStore();
const name = ref('');
const owner = ref(auth.username || '');
const ownerPlaceholder = auth.username ? 'Owner ID' : 'Owner ID (login to default)';
watch(() => auth.username, (v) => { owner.value = v ?? owner.value; });

const emit = defineEmits<{ (e: 'create', payload: { name: string; owner: string }): void }>();

function submit() {
  if (!name.value || !owner.value) return;
  emit('create', { name: name.value, owner: owner.value });
  name.value = '';
}
</script>

// ...existing code...
<style scoped>
.new-list-form { display:flex; gap:.5rem; align-items:center; }
.new-list-form input { padding:.25rem .5rem; }

/* make the Create List button use the theme surface/text colors */
.new-list-form button {
  background: var(--surface);
  color: var(--text);
  border: 1px solid rgba(255,255,255,0.06);
  padding: .35rem .6rem;
  border-radius: 6px;
  cursor: pointer;
}

.new-list-form button:hover { filter: brightness(1.03); }
.new-list-form button:disabled { opacity: .6; cursor: not-allowed; }
</style>