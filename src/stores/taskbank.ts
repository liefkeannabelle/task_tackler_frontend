import { defineStore } from 'pinia';
import type { TaskDocument, Dependency } from '../api/client';
import {
  addTaskToBank,
  deleteTaskFromBank,
  addDependency,
  deleteDependency,
  getDependencies,
  evaluateTaskOrder
} from '../api/client';

export const useTaskBankStore = defineStore('taskbank', {
  state: () => ({
    tasks: [] as TaskDocument[],
    dependencies: [] as Dependency[],
    loading: false as boolean,
    error: '' as string
  }),
  actions: {
    // add a task to the bank
    async addTask(adder: string, name: string, description?: string) {
      this.loading = true;
      this.error = '';
      try {
        const res = await addTaskToBank({ adder, name, description });
        // res.task is the new task id; you may want to refresh tasks from server if you have an endpoint
        return res;
      } catch (e: any) {
        this.error = e.message || String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // delete a task
    async deleteTask(deleter: string, task: string) {
      this.loading = true;
      this.error = '';
      try {
        await deleteTaskFromBank({ deleter, task });
        // locally remove if present
        this.tasks = this.tasks.filter(t => (t._id || t.taskName) !== task);
      } catch (e: any) {
        this.error = e.message || String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // add dependency
    async addDependency(adder: string, task1: string, task2: string, dependencyStr: string) {
      this.loading = true;
      this.error = '';
      try {
        const res = await addDependency({ adder, task1, task2, dependency: dependencyStr });
        // res.dependency contains the created dependency object
        return res;
      } catch (e: any) {
        this.error = e.message || String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // delete dependency
    async deleteDependency(deleter: string, sourceTask: string, targetTask: string, relation: string) {
      this.loading = true;
      this.error = '';
      try {
        await deleteDependency({ deleter, sourceTask, targetTask, relation });
        // refresh local dependency list if needed
        this.dependencies = this.dependencies.filter(d => !(d.depTask === targetTask && d.depRelation === relation));
      } catch (e: any) {
        this.error = e.message || String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // load dependencies for a task
    async loadDependencies(task: string, getter: string) {
      this.loading = true;
      this.error = '';
      try {
        const deps = await getDependencies({ getter, task });
        this.dependencies = deps;
        return deps;
      } catch (e: any) {
        this.error = e.message || String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // evaluate order between two tasks (returns array of results as per API)
    async evaluateOrder(owner: string, task1: string, task2: string) {
      this.loading = true;
      this.error = '';
      try {
        const res = await evaluateTaskOrder({ owner, task1, task2 });
        return res;
      } catch (e: any) {
        this.error = e.message || String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    }
  }
});