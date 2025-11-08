<template>
  <div class="taskbank-view">
  <h1>Task Bank</h1>



  <TaskSearch :ownerId="auth.username ?? (auth as any)?._id" />
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
        @edit-deps="onEditDeps"
      />
    </div>

    <!-- deps editor modal -->
    <TaskDepsEditor
      v-if="showDeps"
      :task="activeTask"
      @close="closeDepsEditor"
      @save="onDepsSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed, ref } from 'vue';
import { useTaskBankStore } from '../stores/taskbank';
import { useAuthStore } from '../stores/auth';
import TaskRow from '../components/taskbank/TaskRow.vue';
import AddTaskForm from '../components/taskbank/AddTaskForm.vue';
import TaskDepsEditor from '../components/taskbank/TaskDepsEditor.vue';
import TaskSearch from '../components/taskbank/TaskSearch.vue';

const taskBank = useTaskBankStore();
const auth = useAuthStore();

// expose a safe computed tasks array so template never sees undefined
const tasks = computed(() => (taskBank && Array.isArray(taskBank.tasks) ? taskBank.tasks : []));

const showDeps = ref(false);
const activeTask = ref<Record<string, any> | null>(null);

async function load() {
  try {
    await taskBank.fetchAll(auth.username || undefined);
  } catch (e) {
    console.error('taskBank.fetchAll failed', e);
  }
}

onMounted(() => load());
watch(() => auth.username, () => load());

function refresh() {
  load();
}

async function onAdd(payload: { name: string; description?: string }) {
  try {
    const adder = auth.username ?? (auth as any)?._id ?? undefined;
    await taskBank.addTask(adder, payload.name, payload.description);
    await load();
  } catch (e) {
    console.error('add task failed', e);
    const msg = (e as any)?.message ?? 'Failed to add task.';
    alert(msg);
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
  openDepsEditor(task);
}

function openDepsEditor(task: Record<string, any>) {
  console.debug('open deps editor for', task);
  activeTask.value = task;
  showDeps.value = true;
}

function closeDepsEditor() {
  showDeps.value = false;
  activeTask.value = null;
}

async function onDepsSaved(payload: { taskId: string; dependencies: { depTask: string; depRelation: string }[] }) {
  try {
    if (typeof (taskBank as any).updateDeps === 'function') {
      await (taskBank as any).updateDeps(payload.taskId, payload.dependencies);
    } else {
      console.warn('taskBank.updateDeps not available; dependencies not persisted.');
    }
    await load(); // refresh tasks to reflect changes
  } catch (e) {
    console.error('save deps failed', e);
  } finally {
    closeDepsEditor();
  }
}
</script>

<style scoped>
.taskbank-view {
  background: transparent; /* page background handled by global */
  padding: 1rem;
}

/* header panel */


/* task list container — group of panels */
.task-list {
  display:flex;
  flex-direction:column;
  gap:.5rem;
  margin-top:.75rem;
}
</style>