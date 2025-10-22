<template>
  <form @submit.prevent="submit" class="add-task-form">
    <input v-model="name" placeholder="Task name" required />
    <input v-model="description" placeholder="Description (optional)" />
    <input v-model="adder" placeholder="Your ID" required />
    <button type="submit">Add Task</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const name = ref('');
const description = ref('');
const adder = ref('');
const emit = defineEmits<{ (e: 'add', payload: { adder: string; name: string; description?: string }): void }>();

function submit() {
  if (!name.value || !adder.value) return;
  emit('add', { adder: adder.value, name: name.value, description: description.value || undefined });
  name.value = '';
  description.value = '';
}
</script>

<style scoped>
.add-task-form { display:flex; gap:.5rem; align-items:center; }
.add-task-form input { padding:.25rem .5rem; }
</style>