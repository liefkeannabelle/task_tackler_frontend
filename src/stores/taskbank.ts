// ...existing code...
import { defineStore } from 'pinia';
import type { TaskDocument, Dependency } from '../api/client';
import {
  listTasks,
  addTaskToBank,
  deleteTaskFromBank,
  addDependency,
  deleteDependency,
  getDependencies,
  evaluateTaskOrder,
  getTasks
} from '../api/client';
import { useAuthStore } from './auth';

export const useTaskBankStore = defineStore('taskbank', {
  state: () => ({
    tasks: [] as TaskDocument[],
    dependencies: [] as Dependency[],
    loading: false as boolean,
    error: '' as string
  }),
  getters: {
    tasksMap: (state) => {
      const map = new Map<string, TaskDocument>();
      for (const t of state.tasks) {
        const id = (t as any)._id ?? (t as any).taskName ?? '';
        if (id) map.set(id, t);
      }
      return map;
    },
    getTaskName: (state) => {
      return (id?: string) => {
        if (!id) return undefined;
        const t = state.tasks.find(x => (x as any)._id === id || (x as any).taskName === id || (x as any).name === id);
        return t ? ((t as any).taskName ?? (t as any).name ?? (t as any)._id) : undefined;
      };
    }
  },
  actions: {
    async fetchAll(owner?: string) {
      this.loading = true;
      this.error = '';
      try {
        const res = await listTasks({ owner });
        this.tasks = Array.isArray(res?.tasks) ? res.tasks : [];
        console.debug('[taskbank] fetched', this.tasks.length, 'tasks');
        if (this.tasks.length > 0) console.debug('[taskbank] sample item keys:', Object.keys(this.tasks[0] as any), 'sample:', this.tasks[0]);
        return this.tasks;
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        this.tasks = [];
        console.error('[taskbank] fetchAll error', e);
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async addTask(adder: string | undefined, name: string, description?: string) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = adder ?? auth.username;
        if (!actor) throw new Error('Adder required (login or provide adder).');
        const res = await addTaskToBank({ adder: actor, name, description });
        return res;
      } catch (e: any) {
        this.error = e.message || String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async deleteTask(deleter: string | undefined, task: string) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = deleter ?? auth.username;
        if (!actor) throw new Error('Deleter required (login or provide deleter).');
        await deleteTaskFromBank({ deleter: actor, task });
        this.tasks = this.tasks.filter(t => (t._id || (t as any).taskName) !== task);
      } catch (e: any) {
        this.error = e.message || String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // ...existing addDependency, deleteDependency, loadDependencies, evaluateOrder unchanged but can accept optional adder/deleter using auth similarly...
  }
});
// ...existing code...