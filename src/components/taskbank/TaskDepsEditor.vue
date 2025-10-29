<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h3>Dependencies for: {{ task?.taskName || task?.name }}</h3>

      <div class="current-deps" v-if="deps.length">
        <h4>Current dependencies</h4>
        <ul>
          <li v-for="d in deps" :key="d.depTask + '|' + d.depRelation">
            {{ labelFor(d.depTask) }} — <strong>{{ d.depRelation }}</strong>
            <button @click="removeDep(d)" title="Remove dependency">×</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <em>No dependencies</em>
      </div>

      <div class="add-dep">
        <label for="addDep">Add dependency</label>
        <select id="addDep" v-model="newDep">
          <option value="">-- select task --</option>
          <option v-for="t in candidates" :key="t._id" :value="t._id">
            {{ t.taskName || t.name }} ({{ t._id }})
          </option>
        </select>

        <label for="relation">Relation</label>
        <select id="relation" v-model="newRel">
          <option value="">-- select relation --</option>
          <option v-for="r in relations" :key="r" :value="r">{{ r }}</option>
        </select>

        <button @click="addDep" :disabled="!newDep || !newRel">Add</button>
      </div>

      <div class="actions">
        <button @click="onSave">Save</button>
        <button @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useTaskBankStore } from '../../stores/taskbank';

const props = defineProps<{ task: Record<string, any> | null }>();
const emit = defineEmits<{ (e: 'save', payload: { taskId: string; dependencies: { depTask: string; depRelation: string }[] }): void; (e: 'close'): void }>();

const taskBank = useTaskBankStore();

// relation options mirror backend RelationType
const relations = [
  'BLOCKS',
  'BLOCKED_BY',
  'PRECEDES',
  'FOLLOWS',
  'REQUIRES',
  'REQUIRED_BY'
];

// local copy of dependencies as { depTask, depRelation }[]
const deps = ref<{ depTask: string; depRelation: string }[]>((props.task?.dependencies && Array.isArray(props.task.dependencies)) ? props.task.dependencies.map((d: any) => ({ depTask: d.depTask, depRelation: d.depRelation })) : []);
const newDep = ref('');
const newRel = ref('');

// candidate tasks to add (exclude the current task and already added deps)
const candidates = computed(() => {
  const all = Array.isArray(taskBank.tasks) ? taskBank.tasks : [];
  if (!props.task) return [];
  return all.filter((t: any) => (t._id !== props.task._id) && !deps.value.some(d => d.depTask === t._id));
});

// keep local deps in sync if prop changes
watch(() => props.task?.dependencies, (v) => {
  deps.value = Array.isArray(v) ? v.map((d: any) => ({ depTask: d.depTask, depRelation: d.depRelation })) : [];
});

function labelFor(id: string) {
  const t = (taskBank.tasks || []).find((x: any) => x._id === id);
  return t ? (t.taskName || t.name || id) : id;
}

function addDep() {
  if (!newDep.value || !newRel.value) return;
  if (!deps.value.some(d => d.depTask === newDep.value && d.depRelation === newRel.value)) {
    deps.value.push({ depTask: newDep.value, depRelation: newRel.value });
  }
  newDep.value = '';
  newRel.value = '';
}

function removeDep(entry: { depTask: string; depRelation: string }) {
  deps.value = deps.value.filter(d => !(d.depTask === entry.depTask && d.depRelation === entry.depRelation));
}

function onSave() {
  if (!props.task) return;
  emit('save', { taskId: props.task._id ?? props.task.taskName ?? '', dependencies: deps.value });
}
</script>

<style scoped>
.modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; z-index:1000; }
.modal { background:white; padding:1rem; border-radius:6px; width:min(720px,95%); max-height:80vh; overflow:auto; }
.current-deps ul { list-style:none; padding:0; }
.current-deps li { display:flex; align-items:center; gap:.5rem; margin:.25rem 0; }
.current-deps button { margin-left:auto; }
.add-dep { margin-top:.75rem; display:flex; gap:.5rem; align-items:center; }
.actions { margin-top:1rem; display:flex; gap:.5rem; justify-content:flex-end; }
</style>
