<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h3>Dependencies for: {{ task?.taskName || task?.name }}</h3>

      <div class="current-deps" v-if="deps.length">
        <h4>Current dependencies</h4>
        <ul>
          <li v-for="d in deps" :key="d.depTask + '|' + d.depRelation">
            {{ labelFor(d.depTask) }} — <strong>{{ String(d.depRelation).toLowerCase().replace(/_/g, ' ') }}</strong>
            <button @click="removeDep(d)" title="Remove dependency">×</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <em>No dependencies</em>
      </div>

      <!-- add-dep now shows headers with dropdowns placed underneath -->
      <div class="add-dep">
        <div class="add-dep-group">
          <h5>Task</h5>
          <select id="addDep" v-model="newDep">
            <option value="">-- select task --</option>
            <option v-for="t in candidates" :key="t._id" :value="t._id">
              {{ t.taskName || t.name }}
            </option>
          </select>
        </div>

        <div class="add-dep-group">
          <h5>Relation</h5>
          <select id="relation" v-model="newRel">
            <option value="">-- select relation --</option>
            <option v-for="r in relations" :key="r" :value="r">{{ r.toLowerCase().replace(/_/g, ' ') }}</option>
          </select>
        </div>

        <div class="add-dep-actions">
          <button @click="addDep" :disabled="!newDep || !newRel">Add</button>
        </div>
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
// Backend now uses only 'precedes' and 'follows' (lowercase)
const relations = [ 'precedes', 'follows' ];

// local copy of dependencies as { depTask, depRelation }[] (normalize relation to lowercase)
const deps = ref<{ depTask: string; depRelation: string }[]>((props.task?.dependencies && Array.isArray(props.task.dependencies)) ? props.task.dependencies.map((d: any) => ({ depTask: d.depTask, depRelation: String(d.depRelation ?? '').toLowerCase() })) : []);
const newDep = ref('');
const newRel = ref('');

// candidate tasks to add (exclude the current task and already added deps)
const candidates = computed(() => {
  const all = Array.isArray(taskBank.tasks) ? taskBank.tasks : [];
  const cur = props.task;
  if (!cur) return [];
  return all.filter((t: any) => (t._id !== cur._id) && !deps.value.some(d => d.depTask === t._id));
});

// keep local deps in sync if prop changes
watch(() => props.task?.dependencies, (v) => {
  deps.value = Array.isArray(v) ? v.map((d: any) => ({ depTask: d.depTask, depRelation: String(d.depRelation ?? '').toLowerCase() })) : [];
});

function labelFor(id: string) {
  const t = (taskBank.tasks || []).find((x: any) => x._id === id);
  return t ? (t.taskName || t.name || id) : id;
}

function addDep() {
  if (!newDep.value || !newRel.value) return;
  const normRel = String(newRel.value).toLowerCase();
  if (!deps.value.some(d => d.depTask === newDep.value && d.depRelation === normRel)) {
    deps.value.push({ depTask: newDep.value, depRelation: normRel });
  }
  newDep.value = '';
  newRel.value = '';
}

function removeDep(entry: { depTask: string; depRelation: string }) {
  const normRel = String(entry.depRelation ?? '').toLowerCase();
  deps.value = deps.value.filter(d => !(d.depTask === entry.depTask && d.depRelation === normRel));
}

function onSave() {
  const t = props.task;
  if (!t) return;
  emit('save', { taskId: t._id ?? t.taskName ?? '', dependencies: deps.value });
}
</script>

<style scoped>
.modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; z-index:1000; }
.modal { background:white; padding:1rem; border-radius:6px; width:min(720px,95%); max-height:80vh; overflow:auto; }
.current-deps ul { list-style:none; padding:0; }
.current-deps li { display:flex; align-items:center; gap:.5rem; margin:.25rem 0; }
.current-deps button { margin-left:auto; }

/* new layout for dropdowns under headers */
.add-dep { display:grid; grid-template-columns: 1fr 1fr auto; gap:0.75rem; align-items:end; margin-top:.75rem; }
.add-dep-group h5 { margin:0 0 .25rem 0; font-size:0.9rem; font-weight:600; }
.add-dep-group select { width:100%; padding:.35rem; }
.add-dep-actions { display:flex; align-items:center; }

.actions { margin-top:1rem; display:flex; gap:.5rem; justify-content:flex-end; }
</style>
