<template>
  <div class="task-row">
    <div class="meta">
      <strong>{{ task.taskName || task.name }}</strong>
      <small v-if="task.description"> — {{ task.description }}</small>
    </div>
    <div class="actions">
      <!-- emit the task as payload -->
      <button @click="$emit('edit-deps', task)">Dependencies</button>
      <button @click="requestDelete">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ task: Record<string, any> }>();
const emit = defineEmits<{ (e: 'delete', payload: { deleter: string; task: string }): void; (e: 'edit-deps', task: Record<string, any>): void }>();

function requestDelete() {
  const deleter = prompt('Your ID to delete this task:') || '';
  if (!deleter) return;
  emit('delete', { deleter, task: props.task._id || props.task.taskName || '' });
}
</script>

<style scoped>
.task-row { display:flex; justify-content:space-between; align-items:center; padding:.5rem; border:1px solid #eee; border-radius:4px; }
.actions button { margin-left:.5rem; }
</style>