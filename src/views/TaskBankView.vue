// ...existing code...
<template>
  <div>
    <h1>Task Bank</h1>

    <div class="controls">
      <span v-if="auth.isLoggedIn">Signed in as <strong>{{ auth.username }}</strong></span>
      <button @click="refresh" :disabled="taskBank.loading">Refresh</button>
    </div>

    <AddTaskForm @add="onAdd" />

    <div v-if="taskBank.loading">Loading tasks...</div>
    <div v-if="taskBank.error" class="error">{{ taskBank.error }}</div>

    <div v-if="tasks.length === 0 && !taskBank.loading" class="empty">No tasks found</div>

    <div class="task-list">
      <TaskRow
        v-for="t in tasks"
        :key="(t as any)._id || (t as any).taskName"
        :task="t"
        @delete="onDelete"
        @edit-deps="() => onEditDeps(t)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useTaskBankStore } from '../stores/taskbank';
import { useAuthStore } from '../stores/auth';
import TaskRow from '../components/taskbank/TaskRow.vue';
import AddTaskForm from '../components/taskbank/AddTaskForm.vue';

const taskBank = useTaskBankStore();
const auth = useAuthStore();

// expose a safe computed tasks array so template never sees undefined
const tasks = computed(() => (taskBank && Array.isArray(taskBank.tasks) ? taskBank.tasks : []));

async function load() {
  try {
    await taskBank.fetchAll(auth.username || undefined);
  } catch (e) {
    // fetch errors are surfaced on taskBank.error; keep console info for debugging
    console.error('taskBank.fetchAll failed', e);
  }
}

onMounted(() => load());
watch(() => auth.username, () => load());

function refresh() {
  load();
}

async function onAdd(payload: { adder: string; name: string; description?: string }) {
  try {
    await taskBank.addTask(payload.adder || undefined, payload.name, payload.description);
    await load();
  } catch (e) {
    console.error('add task failed', e);
  }
}

async function onDelete(payload: { deleter: string; task: string }) {
  try {
    await taskBank.deleteTask(payload.deleter || undefined, payload.task);
    await load();
  } catch (e) {
    console.error('delete task failed', e);
  }
}

function onEditDeps(task: any) {
  console.log('edit deps for', task);
}
</script>

<style scoped>
.controls { display:flex; gap:.5rem; align-items:center; margin-bottom:.5rem; }
.task-list { display:flex; flex-direction:column; gap:.5rem; margin-top:.5rem; }
.empty { color:#666; font-style:italic; }
.error { color:var(--danger, #c00); }
</style>
// ...existing code...