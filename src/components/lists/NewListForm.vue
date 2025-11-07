// ...existing code...
<template>
  <form @submit.prevent="submit" class="new-list-form">
    <input v-model="name" placeholder="List name" required />
    <button type="submit">Create List</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const name = ref('');
const emit = defineEmits<{ (e: 'create', payload: { name: string }): void }>();

function submit() {
  if (!name.value) return;
  emit('create', { name: name.value });
  name.value = '';
}
</script>

// ...existing code...
<style scoped>
.new-list-form {
  display: flex;
  gap: .5rem;
  align-items: center;
  /* surface panel behind the form */
  background: var(--surface);
  padding: .5rem;
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(0,0,0,0.02) inset;
}
.new-list-form input { padding:.25rem .5rem; }

/* make the Create List button use the theme surface/text colors */
.new-list-form button {
  background: var(--surface);
  color: var(--text);
  border: 1px solid rgba(0,0,0,0.06);
  padding: .35rem .6rem;
  border-radius: 6px;
  cursor: pointer;
}

.new-list-form button:hover { filter: brightness(1.03); }
.new-list-form button:disabled { opacity: .6; cursor: not-allowed; }
</style>