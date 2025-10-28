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

<style scoped>
.new-list-form { display:flex; gap:.5rem; align-items:center; }
.new-list-form input { padding:.25rem .5rem; }
</style>
// ...existing code...