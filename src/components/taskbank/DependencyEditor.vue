<template>
  <div class="dependency-editor">
    <h3>Dependencies for {{ taskId }}</h3>
    <ul>
      <li v-for="d in dependencies" :key="d.depTask + d.depRelation">
        {{ d.depTask }} — {{ d.depRelation }}
        <button @click="deleteDep(d)">Remove</button>
      </li>
    </ul>

    <form @submit.prevent="addDep">
      <input v-model="task2" placeholder="Other task ID" required />
      <input v-model="relation" placeholder="Relation (string)" required />
      <input v-model="adder" placeholder="Your ID" required />
      <button type="submit">Add</button>
      <button type="button" @click="$emit('close')">Close</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ taskId: string; dependencies: Array<Record<string, any>> }>();
const emit = defineEmits<{
  (e: 'add-dep', payload: { adder: string; task1: string; task2: string; dependency: string }): void;
  (e: 'delete-dep', payload: { deleter: string; sourceTask: string; targetTask: string; relation: string }): void;
  (e: 'close'): void;
}>();

const task2 = ref('');
const relation = ref('');
const adder = ref('');

function addDep() {
  if (!adder.value || !task2.value || !relation.value) return;
  emit('add-dep', { adder: adder.value, task1: props.taskId, task2: task2.value, dependency: relation.value });
  task2.value = '';
  relation.value = '';
}

function deleteDep(d: Record<string, any>) {
  const deleter = prompt('Your ID to delete this dependency:') || '';
  if (!deleter) return;
  emit('delete-dep', { deleter, sourceTask: props.taskId, targetTask: d.depTask, relation: d.depRelation || d.dependency || '' });
}
</script>

<style scoped>
.dependency-editor { margin-top:1rem; padding: .75rem; border:1px solid #ddd; border-radius:6px; }
.dependency-editor ul { margin:0 0 1rem 0; padding:0; list-style:none; }
.dependency-editor li { padding:.25rem 0; display:flex; justify-content:space-between; }
</style>