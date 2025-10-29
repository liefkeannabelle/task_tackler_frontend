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
  getListsByOwner as apiGetListsByOwner
} from '../api/client';
import { useAuthStore } from './auth';

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: [] as ListDocument[],
    loading: false as boolean,
    error: '' as string
  }),
  actions: {
    async fetchAll(owner?: string) {
      this.loading = true;
      this.error = '';
      try {
        // always fetch the global list set from the backend (more reliable)
        const raw = await getLists();
        const docs = Array.isArray(raw) ? raw : [];

        // determine auth identifiers to filter by
        const auth = useAuthStore();
        const userId = (auth as any)?._id ?? (auth as any)?.id ?? (auth as any)?.userId;
        const username = auth?.username;

        if (userId || username) {
          this.lists = docs.filter((d: any) => {
            const ownerField = d.owner ?? d.listOwner ?? d.ownerId ?? d.userId;
            return ownerField === username || ownerField === userId;
          });
        } else {
          // no auth info -> show nothing (prevent leaking other users' lists)
          this.lists = [];
        }

        // optional enrichment hook
        if (typeof (this as any)._enrichListItems === 'function') {
          await (this as any)._enrichListItems();
        }

        return this.lists;
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        this.lists = [];
        throw e;
      } finally {
        this.loading = false;
      }
    },
    // async fetchAll(owner?: string) {
    //   this.loading = true;
    //   this.error = '';
    //   try {
    //     let docs: any[] = [];

    //     // if caller provided an owner identifier, try the owner-scoped backend endpoint first
    //     if (owner && owner.toString().trim()) {
    //       try {
    //         // backend `_getListsByOwner` may expect ownerId — call the API and accept either array or { lists: [] }
    //         const res: any = await apiGetListsByOwner({ owner: owner.toString().trim() });
    //         if (Array.isArray(res)) {
    //           docs = res;
    //         } else if (Array.isArray(res?.lists)) {
    //           docs = res.lists;
    //         } else {
    //           docs = [];
    //         }
    //       } catch (e) {
    //         // owner endpoint failed (404 or other) — fall back to global list fetch below
    //         console.warn('[lists] getListsByOwner failed, falling back to getLists()', e);
    //         const raw = await getLists();
    //         docs = Array.isArray(raw) ? raw : [];
    //       }
    //     } else {
    //       // no owner provided: fetch global lists
    //       const raw = await getLists();
    //       docs = Array.isArray(raw) ? raw : [];
    //     }

    //     // client-side safety filter: only keep lists that belong to the logged-in user
    //     const auth = useAuthStore();
    //     const userId = (auth as any)?._id ?? (auth as any)?.id ?? (auth as any)?.userId;
    //     const username = auth?.username;

    //     if (userId || username) {
    //       this.lists = docs.filter((d: any) => {
    //         // check several common owner fields
    //         const ownerField = d.owner ?? d.listOwner ?? d.ownerId ?? d.userId;
    //         return ownerField === username || ownerField === userId || ownerField === (username ?? userId);
    //       });
    //     } else {
    //       // no auth info — default to empty set to avoid leaking lists
    //       this.lists = [];
    //     }

    //     // optional enrichment if implemented elsewhere
    //     if (typeof (this as any)._enrichListItems === 'function') {
    //       await (this as any)._enrichListItems();
    //     }

    //     return this.lists;
    //   } catch (e: any) {
    //     this.error = e?.message ?? String(e);
    //     this.lists = [];
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
 // ...existing code...

    async create(name: string, ownerId?: string) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const owner = ownerId ?? auth.username;
        if (!owner) throw new Error('Owner required (login or supply ownerId).');
        await newList({ listName: name, listOwner: owner });
        await this.fetchAll(owner);
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
        await this.fetchAll(auth.username);
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
        await this.fetchAll(auth.username);
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
        await this.fetchAll(auth.username);
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
      const prev = [...this.lists]; // snapshot so we can restore on failure
      try {
        // prefer sending username (backend resolves it to an id), fall back to explicit deleter param
        const payloadUsername = auth.username ?? deleter;
        if (!payloadUsername) throw new Error('Deleter required (login or provide deleter).');

        // optimistic local removal so UI updates immediately
        this.lists = this.lists.filter(l => ((l as any)._id ?? (l as any).list) !== listId);

        // call API with the expected keys: { listId, username }
        await apiDeleteList({ list: listId, deleter: payloadUsername });

        // success: keep optimistic removal (no full refetch here)
        return {};
      } catch (e: any) {
        // restore previous state on error
        this.lists = prev;
        this.error = e?.message ?? String(e);
        console.error('[lists] deleteList error', e);
        throw e;
      } finally {
        this.loading = false;
      }
    }
    // },
    // async deleteList(listId: string, deleter?: string) {
    //   this.loading = true;
    //   this.error = '';
    //   const auth = useAuthStore();
    //   const prev = [...this.lists]; // snapshot so we can restore on failure
    //   try {
    //     const actor = deleter ?? auth.username;
    //     if (!actor) throw new Error('Deleter required (login or provide deleter).');

    //     // optimistic removal so UI updates immediately
    //     this.lists = this.lists.filter(l => ((l as any)._id ?? (l as any).list) !== listId);

    //     // call API
    //     await apiDeleteList({ list: listId, deleter: actor });

    //     // re-sync authoritative state (use best available owner identifier)
    //     const ownerId = (auth as any)?._id ?? (auth as any)?.id ?? (auth as any)?.userId ?? auth.username;
    //     await this.fetchAll(ownerId || undefined);
    //   } catch (e: any) {
    //     // restore previous state on error
    //     this.lists = prev;
    //     this.error = e?.message ?? String(e);
    //     console.error('[lists] deleteList error', e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // }
  }
});