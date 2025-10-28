// ...existing code...
import { defineStore } from 'pinia';
import type { ListDocument, ListItem } from '../api/client';
import { deleteList as apiDeleteList } from '../api/client';
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
import { useAuthStore } from './auth';

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

    async create(name: string, ownerId?: string) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const owner = ownerId ?? auth.username;
        if (!owner) throw new Error('Owner required (login or supply ownerId).');
        await newList({ listName: name, listOwner: owner });
        await this.fetchAll();
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async addTask(listId: string, task: string, adder?: string) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = adder ?? auth.username;
        if (!actor) throw new Error('Adder required (login or provide adder).');
        const res = await addTaskToList({ list: listId, task, adder: actor });
        await this.refreshList(listId);
        return res;
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async removeTask(listId: string, task: string, deleter?: string) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = deleter ?? auth.username;
        if (!actor) throw new Error('Deleter required (login or provide deleter).');
        await deleteTaskFromList({ list: listId, task, deleter: actor });
        await this.refreshList(listId);
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async assignOrder(listId: string, task: string, newOrder: number, assigner?: string) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = assigner ?? auth.username;
        if (!actor) throw new Error('Assigner required (login or provide assigner).');
        await assignOrderInList({ list: listId, task, newOrder, assigner: actor } as any);
        await this.refreshList(listId);
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // ...existing code...
    async refreshList(listId: string) {
      try {
        const docs = await getListById({ listId });
        if (Array.isArray(docs) && docs.length > 0) {
          const updated = docs[0];
          if(!updated) return;
          const idx = this.lists.findIndex(l => (l._id || (l as any).list) === (updated._id || (updated as any).list));
          if (idx >= 0) this.lists[idx] = updated as any;
          else this.lists.push(updated as any);
        } else {
          // fallback to full reload
          await this.fetchAll();
        }
      } catch {
        // best-effort: reload all on error
        await this.fetchAll();
      }
    },
    async deleteList(listId: string, deleter?: string) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = deleter ?? auth.username;
        if (!actor) throw new Error('Deleter required (login or provide deleter).');
        await apiDeleteList({ list: listId, deleter: actor });
        // remove locally to keep UI in sync
        this.lists = this.lists.filter(l => ((l as any)._id ?? (l as any).list) !== listId);
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    }
}
});