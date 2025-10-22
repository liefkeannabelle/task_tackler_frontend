<template>
  <div class="taskbank-view">
    <h1>Task Bank</h1>

    <AddTaskForm @add="onAddTask" />

    <div v-if="store.loading">Loading...</div>
    <div v-if="store.error" class="error">{{ store.error }}</div>

    <div class="tasks">
      <TaskRow
        v-for="t in store.tasks"
        :key="t._id || t.taskName"
        :task="t"
        @delete="onDeleteTask"
        @edit-deps="() => onLoadDependencies(t._id || t.taskName)"
      />
    </div>

    <DependencyEditor
      v-if="activeTaskId"
      :task-id="activeTaskId"
      :dependencies="store.dependencies"
      @close="activeTaskId = ''"
      @add-dep="onAddDependency"
      @delete-dep="onDeleteDependency"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTaskBankStore } from '../stores/taskbank';
import AddTaskForm from '../components/taskbank/AddTaskForm.vue';
import TaskRow from '../components/taskbank/TaskRow.vue';
import DependencyEditor from '../components/taskbank/DependencyEditor.vue';

const store = useTaskBankStore();
const activeTaskId = ref('');

onMounted(() => {
  // optionally load any initial data if you implement it in the store
});

function onAddTask(payload: { adder: string; name: string; description?: string }) {
  return store.addTask(payload.adder, payload.name, payload.description);
}

function onDeleteTask(payload: { deleter: string; task: string }) {
  return store.deleteTask(payload.deleter, payload.task);
}

async function onLoadDependencies(taskId: string) {
  activeTaskId.value = taskId;
  await store.loadDependencies(taskId, ''); // supply getter if needed
}

function onAddDependency(payload: { adder: string; task1: string; task2: string; dependency: string }) {
  return store.addDependency(payload.adder, payload.task1, payload.task2, payload.dependency);
}

function onDeleteDependency(payload: { deleter: string; sourceTask: string; targetTask: string; relation: string }) {
  return store.deleteDependency(payload.deleter, payload.sourceTask, payload.targetTask, payload.relation);
}
</script>

<style scoped>
.taskbank-view { padding: 1rem; }
.tasks { margin-top: 1rem; display: grid; gap: .5rem; }
.error { color: red; }
</style>