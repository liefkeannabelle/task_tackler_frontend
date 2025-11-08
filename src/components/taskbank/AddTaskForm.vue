// ...existing code...
<template>
  <form @submit.prevent="submit" class="add-task-form">
    <input v-model="name" placeholder="Task name" required />
    <input v-model="description" placeholder="Description (optional)" />
    <button type="submit">Add Task</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const description = ref('');

const emit = defineEmits<{ (e: 'add', payload: { name: string; description?: string }): void }>();

function submit() {
  if (!name.value) return;
  // parent view/store will use the logged-in user as the adder
  emit('add', { name: name.value, description: description.value || undefined });
  name.value = '';
  description.value = '';
}
</script>

<style scoped>
.add-task-form {
  display: flex;
  gap: .5rem;
  align-items: center;
  /* surface panel behind the form */
  background: var(--surface);
  padding: .5rem;
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(0,0,0,0.02) inset;
}
.add-task-form input { padding:.25rem .5rem; }

/* make the Add Task button use the theme surface/text colors */
.add-task-form button {
  background: var(--surface);
  color: var(--text);
  border: 1px solid rgba(0,0,0,0.06);
  padding: .35rem .6rem;
  border-radius: 6px;
  cursor: pointer;
}
.add-task-form button:hover { filter: brightness(1.03); }
.add-task-form button:disabled { opacity: .6; cursor: not-allowed; }
</style>