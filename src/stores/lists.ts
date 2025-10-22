import { defineStore } from 'pinia';
import type { ListDocument, ListItem } from '../api/client';
import {
  getLists,
  newList,
  addTaskToList,
  deleteTaskFromList,
  assignOrderInList,
  getTasksInList,
  getListById,
  getListsByOwner
} from '../api/client';

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: [] as ListDocument[],
    loading: false as boolean,
    error: '' as string
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = '';
      try {
        this.lists = await getLists();
      } catch (e: any) {
        this.error = e?.message ?? String(e);
      } finally {
        this.loading = false;
      }
    },

    async create(name: string, ownerId: string) {
      this.loading = true;
      this.error = '';
      try {
        await newList({ listName: name, listOwner: ownerId });
        await this.fetchAll();
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async addTask(listId: string, task: string, adder: string) {
      this.loading = true;
      this.error = '';
      try {
        const res = await addTaskToList({ list: listId, task, adder });
        // optionally refresh list items
        await this.refreshList(listId);
        return res;
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async removeTask(listId: string, task: string, deleter: string) {
      this.loading = true;
      this.error = '';
      try {
        await deleteTaskFromList({ list: listId, task, deleter });
        await this.refreshList(listId);
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async assignOrder(listId: string, task: string, newOrder: number, assigner: string) {
      this.loading = true;
      this.error = '';
      try {
        await assignOrderInList({ list: listId, task, newOrder, assigner } as any);
        await this.refreshList(listId);
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async refreshList(listId: string) {
      try {
        const docs = await getListById({ listId });
        if (Array.isArray(docs) && docs.length > 0) {
          const updated = docs[0];
          if (updated) {
            const idx = this.lists.findIndex(l => (l._id || l.list) === (updated._id || updated.list));
            if (idx >= 0) this.lists[idx] = updated;
            else this.lists.push(updated);
        }

        //   const idx = this.lists.findIndex(l => (l._id || l.list) === (updated._id || updated.list));
        //   if (idx >= 0) this.lists[idx] = updated;
        //   else this.lists.push(updated);
        } else {
          // fallback: reload all
          await this.fetchAll();
        }
      } catch {
        await this.fetchAll();
      }
    },

    async fetchByOwner(ownerId: string) {
      this.loading = true;
      this.error = '';
      try {
        this.lists = await getListsByOwner({ ownerId });
        return this.lists;
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async fetchTasks(listId: string) {
      this.loading = true;
      this.error = '';
      try {
        const tasks = await getTasksInList({ listId });
        return tasks as ListItem[];
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    }
  }
});