// ...existing code...
import { defineStore } from 'pinia';
import type { ListDocument } from '../api/client';
import { deleteList as apiDeleteList } from '../api/client';
import {
  getLists,
  newList,
  addTaskToList,
  deleteTaskFromList,
  getListById,
  getListsByOwner as apiGetListsByOwner,
  assignOrderInList as apiAssignOrder
} from '../api/client';
import { useAuthStore } from './auth';
import { useTaskBankStore } from './taskbank';

// helper functions for dependency relation semantics
// (validation helpers are defined locally inside validateOrderConstraints)

/**
 * Validate that moving `taskId` to `newOrder` within the listItems doesn't violate dependencies.
 * listItems: Array of { task: string, orderNumber: number, name?: string }
 * tasksById: Map of taskId -> task object (task.dependencies is array of {depTask,depRelation})
 */
// ...existing code...
function validateOrderConstraints(
  listItems: any[] | undefined,
  taskId: string,
  newOrder: number,
  tasksById: Map<string, any> | undefined
): { valid: boolean; message?: string } {
  // normalize inputs
  const itemsInput = Array.isArray(listItems) ? listItems : [];
  const tasksMap = tasksById ?? new Map<string, any>();

  // build minimal items array (guarding missing fields)
  const items = itemsInput
    .map((it: any) => ({ task: it?.task, orderNumber: Number(it?.orderNumber ?? 0) }))
    .filter((it: any) => typeof it.task === 'string');

  const moving = items.find(i => i.task === taskId);
  if (!moving) return { valid: false, message: 'Task not found in list.' };

  // remove the moving item and reinsert with newOrder
  const without = items.filter(i => i.task !== taskId);

  // determine insert index (clamp)
  const insertIndex = Math.max(0, Math.min(without.length, Number(newOrder) - 1));
  without.splice(insertIndex, 0, { task: taskId, orderNumber: Number(newOrder) });

  // reassign contiguous order numbers
  for (let i = 0; i < without.length; i++) {
    const item = without[i];
    if (!item) continue;
    item.orderNumber = i + 1;
  }

  const orderMap = new Map<string, number>();
  for (const it of without) {
    if (it?.task) orderMap.set(it.task, Number(it.orderNumber));
  }

  // helper relation checks (same logic as before)
  // normalize check functions to accept lowercase 'precedes'/'follows' and be robust to legacy uppercase
  const relationRequiresEarlier = (r: string) => ['follows'].includes(String(r ?? '').toLowerCase());
  const relationRequiresLater = (r: string) => ['precedes'].includes(String(r ?? '').toLowerCase());

  function labelFor(id: string) {
    const t = tasksMap.get(id);
    return t ? (t.taskName ?? t.name ?? id) : id;
  }

  // validate subject dependencies
  for (const it of without) {
    const subj = it.task;
    const subjOrder = orderMap.get(subj);
    if (subjOrder === undefined) continue;
    const taskObj = tasksMap.get(subj);
    const deps = Array.isArray(taskObj?.dependencies) ? taskObj.dependencies : [];
    for (const d of deps) {
      const depTask = d?.depTask;
      const rel = d?.depRelation;
      if (!depTask || !rel) continue;
      const depOrder = orderMap.get(depTask);
      if (depOrder === undefined) continue;
      if (relationRequiresEarlier(rel) && !(depOrder < subjOrder)) {
        return { valid: false, message: `Dependency violated: '${labelFor(depTask)}' must appear before '${labelFor(subj)}' (${rel}).` };
      }
      if (relationRequiresLater(rel) && !(depOrder > subjOrder)) {
        return { valid: false, message: `Dependency violated: '${labelFor(depTask)}' must appear after '${labelFor(subj)}' (${rel}).` };
      }
    }
  }

  // validate reverse dependencies
  for (const [otherId, otherTaskObj] of tasksMap.entries()) {
    if (!orderMap.has(otherId)) continue;
    const otherDeps = Array.isArray(otherTaskObj?.dependencies) ? otherTaskObj.dependencies : [];
    for (const od of otherDeps) {
      if (od?.depTask === undefined || od?.depRelation === undefined) continue;
      const subj = od.depTask;
      if (!orderMap.has(subj)) continue;
      const rel = od.depRelation;
      const subjOrder = orderMap.get(subj)!;
      const otherOrder = orderMap.get(otherId)!;
      if (relationRequiresLater(rel) && !(subjOrder < otherOrder)) {
        return { valid: false, message: `Dependency violated: '${labelFor(subj)}' must appear before '${labelFor(otherId)}' (${rel}).` };
      }
      if (relationRequiresEarlier(rel) && !(subjOrder > otherOrder)) {
        return { valid: false, message: `Dependency violated: '${labelFor(subj)}' must appear after '${labelFor(otherId)}' (${rel}).` };
      }
    }
  }

  return { valid: true };
}
// ...existing code...

// legacy helper removed; use local labelFor inside validation where needed

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: [] as ListDocument[],
    loading: false as boolean,
    error: '' as string
  }),
  actions: {
    // async fetchAll(owner?: string) {
    //   this.loading = true;
    //   this.error = '';
    //   try {
    //     // always fetch the global list set from the backend (more reliable)
    //     const raw = await getLists();
    //     const docs = Array.isArray(raw) ? raw : [];

    //     // determine auth identifiers to filter by
    //     const auth = useAuthStore();
    //     const userId = (auth as any)?._id ?? (auth as any)?.id ?? (auth as any)?.userId;
    //     const username = auth?.username;

    //     if (userId || username) {
    //       this.lists = docs.filter((d: any) => {
    //         const ownerField = d.owner ?? d.listOwner ?? d.ownerId ?? d.userId;
    //         return ownerField === username || ownerField === userId;
    //       });
    //     } else {
    //       // no auth info -> show nothing (prevent leaking other users' lists)
    //       this.lists = [];
    //     }

    //     // optional enrichment hook
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
        // capture created list id if returned by the API
        const res = await newList({ listName: name, listOwner: owner });
        // refresh the local lists view for the owner
        await this.fetchAll(owner);
        // return created id (API returns { list: string } by convention)
        return res?.list ?? null;
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
        // backend may return a success HTTP status but include an error descriptor
        // inside the returned payload (e.g. { listItem: { error: "..." } }).
        // Normalize that into a thrown Error so callers can handle/display it.
        if (res && (res as any).listItem && (res as any).listItem.error) {
          throw new Error((res as any).listItem.error);
        }
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

    // async assignOrder(listId: string, task: string, newOrder: number, assigner?: string) {
    //   this.loading = true;
    //   this.error = '';
    //   const auth = useAuthStore();
    //   try {
    //     const actor = assigner ?? auth.username;
    //     if (!actor) throw new Error('Assigner required (login or provide assigner).');
    //     await assignOrderInList({ list: listId, task, newOrder, assigner: actor } as any);
    //     await this.fetchAll(auth.username);
    // } catch (e: any) {
    //     this.error = e?.message ?? String(e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // },

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
    // ...existing code...

    async fetchAll(owner?: string) {
      this.loading = true;
      this.error = '';
      try {
        const auth = useAuthStore();
        const username = auth?.username;

        // If caller provided an explicit owner argument, prefer it (caller may supply id or username)
        if (owner && String(owner).trim()) {
          const payload: any = { owner: String(owner).trim() };
          const res: any = await apiGetListsByOwner(payload);
          if (res && Array.isArray(res.lists)) this.lists = res.lists; else this.lists = [];
        } else if (username) {
          // Prefer owner-scoped backend call (backend accepts username or owner id)
          const ownerId = (auth as any)?._id ?? (auth as any)?.id ?? (auth as any)?.userId;
          const payload: any = ownerId ? { ownerId } : { owner: username };
          const res: any = await apiGetListsByOwner(payload);
          if (res && Array.isArray(res.lists)) this.lists = res.lists; else this.lists = [];
        } else {
          // fallback to global fetch (should not happen for logged-in flows)
          const raw = await getLists();
          this.lists = Array.isArray(raw) ? raw : [];
        }

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

    async deleteList(listId: string, deleter?: string) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      const prev = [...this.lists]; // snapshot so we can restore on failure
      try {
        const payloadUsername = auth.username ?? deleter;
        if (!payloadUsername) throw new Error('Deleter required (login or provide deleter).');

        // optimistic local removal
        this.lists = this.lists.filter(l => ((l as any)._id ?? (l as any).list) !== listId);

        // call API — client normalizes payload if needed
        await apiDeleteList({ list: listId, deleter: payloadUsername });

        return {};
      } catch (e: any) {
        this.lists = prev;
        this.error = e?.message ?? String(e);
        console.error('[lists] deleteList error', e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

// ...existing code...
    async assignOrder(listId: string, task: string, newOrder: number, assigner?: string) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      const taskBank = useTaskBankStore();
      try {
        const actor = assigner ?? auth.username;
        if (!actor) throw new Error('Assigner required (login or provide assigner).');

        const target = this.lists.find(l => ((l as any)._id ?? (l as any).list) === listId);
        if (!target) throw new Error('List not found locally.');

        // normalize listItems so it's never undefined
        const listItems = Array.isArray((target as any).listItems) ? (target as any).listItems : [];

        // build tasksById map from taskBank.tasks
        const tasksById = new Map<string, any>();
        (taskBank.tasks || []).forEach((t: any) => tasksById.set(t._id, t));

        // validate using local dependency info (pass normalized listItems)
        const check = validateOrderConstraints(listItems, task, newOrder, tasksById);
        if (!check.valid) {
          alert(check.message ?? 'Invalid ordering due to dependencies.');
          throw new Error(check.message);
        }

        // call API for authoritative change
        await apiAssignOrder({ list: listId, task, newOrder, assigner: actor });

        const ownerId = (auth as any)?._id ?? (auth as any)?.id ?? auth.username;
        await this.fetchAll(ownerId || undefined);

        return {};
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },
// ...existing code...

// ...existing code...
    // async deleteList(listId: string, deleter?: string) {
    //   this.loading = true;
    //   this.error = '';
    //   const auth = useAuthStore();
    //   const prev = [...this.lists]; // snapshot so we can restore on failure
    //   try {
    //     // prefer sending username (backend resolves it to an id), fall back to explicit deleter param
    //     const payloadUsername = auth.username ?? deleter;
    //     if (!payloadUsername) throw new Error('Deleter required (login or provide deleter).');

    //     // optimistic local removal so UI updates immediately
    //     this.lists = this.lists.filter(l => ((l as any)._id ?? (l as any).list) !== listId);

    //     // call API with the expected keys: { listId, username }
    //     await apiDeleteList({ list: listId, deleter: payloadUsername });

    //     // success: keep optimistic removal (no full refetch here)
    //     return {};
    //   } catch (e: any) {
    //     // restore previous state on error
    //     this.lists = prev;
    //     this.error = e?.message ?? String(e);
    //     console.error('[lists] deleteList error', e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // }, 
    // async assignOrder(listId: string, task: string, newOrder: number, assigner?: string) {
    //   this.loading = true;
    //   this.error = '';
    //   const auth = useAuthStore();
    //   const taskBank = useTaskBankStore();
    //   try {
    //     const actor = assigner ?? auth.username;
    //     if (!actor) throw new Error('Assigner required (login or provide assigner).');

    //     // find the list locally
    //     const target = this.lists.find(l => ((l as any)._id ?? (l as any).list) === listId);
    //     if (!target) throw new Error('List not found locally.');

    //     // build tasksById map for tasks present in the list
    //     const tasksById = new Map<string, any>();
    //     (taskBank.tasks || []).forEach((t: any) => tasksById.set(t._id, t));

    //     // validate using local dependency info
    //     const check = validateOrderConstraints(target.listItems || target.listItems, task, newOrder, tasksById);
    //     if (!check.valid) {
    //       // show friendly message and abort
    //       alert(check.message ?? 'Invalid ordering due to dependencies.');
    //       throw new Error(check.message);
    //     }

    //     // call API to perform authoritative change
    //     await apiAssignOrder({ list: listId, task, newOrder, assigner: actor });

    //     // refresh owner-scoped lists to pick up authoritative change
    //     const ownerId = (auth as any)?._id ?? (auth as any)?.id ?? auth.username;
    //     await this.fetchAll(ownerId || undefined);

    //     return {};
    //   } catch (e: any) {
    //     this.error = e?.message ?? String(e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // }
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