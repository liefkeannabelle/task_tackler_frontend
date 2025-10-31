// ...existing code...
import { defineStore } from 'pinia';
import type { SessionDocument, SessionListItem } from '../api/client';
import {
  changeSession as apiChangeSession,
  setSessionOrdering,
  setSessionFormat,
  randomizeSessionOrder,
  activateSession as apiActivateSession,
  startSessionTask,
  completeSessionTask,
  endSession,
  deleteSession,
  addListItemToSession,
  removeListItemFromSession,
  getSession,
  getTaskStatus,
  getSessionListItems,
  getSessionForOwner,
  getActiveSessionForOwner,
  getSessionByOwner as apiGetSessionByOwner
} from '../api/client';
import { useAuthStore } from './auth';

function normalizeSessionObj(raw: any) {
  if (!raw) return null;
      // backend returns a session doc directly; ensure _id and owner exist
    return {
      _id: raw._id ?? raw.session ?? raw.id,
      owner: raw.owner,
      listId: raw.listId ?? raw.list,
      title: raw.title ?? '',
      itemCount: raw.itemCount ?? raw.items ?? 0,        active: !!raw.active,
      ordering: raw.ordering ?? raw.order,
      format: raw.format ?? 'List',
      // keep original raw for anything else
       __raw: raw
    };
  }

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessions: [] as SessionDocument[],
    activeSession: null as SessionDocument | null,
    listItems: [] as SessionListItem[],
    taskStatuses: {} as Record<string, string>,
    loading: false as boolean,
    error: '' as string
  }),
  actions: {
    // ...existing actions...

    async randomizeOrder(payload: { session: string; randomizer?: string }) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = payload.randomizer ?? auth.username;
        if (!actor) throw new Error('Randomizer ID required (login or provide id).');
        await randomizeSessionOrder({ session: payload.session, randomizer: actor });
        await this.loadSessionListItems(payload.session);
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // async activateSession(payload: { session: string; activator?: string }) {
    //   this.loading = true;
    //   this.error = '';
    //   const auth = useAuthStore();
    //   try {
    //     const actor = payload.activator ?? auth.username;
    //     if (!actor) throw new Error('Activator required (login or provide activator).');
    //     await activateSession({ session: payload.session, activator: actor });
    //     await this.fetchActiveForOwner();
    //   } catch (e: any) {
    //     this.error = e?.message ?? String(e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    // ...existing code...
// ...existing code...
  // ...existing actions...

  // async activateSession(payload: { sessionId: string; sessionOwner: string }) {
  //   this.loading = true;
  //   try {
  //     const res = await apiActivateSession(payload);
  //     if (res && typeof res === 'object' && 'error' in res && res.error) {
  //       throw new Error(String(res.error));
  //     }

  //     // refresh sessions and active session from server
  //     await this.fetchSessions();
  //     await this.fetchActiveForOwner(payload.sessionOwner);

  //     // set activeSession if it's present in sessions
  //     const created = this.sessions.find(s => (s._id ?? s.session) === payload.sessionId);
  //     if (created) this.activeSession = created as SessionDocument;

  //     return res;
  //   } catch (e: any) {
  //     this.error = e?.message ?? String(e);
  //     throw e;
  //   } finally {
  //     this.loading = false;
  //   }
  // },
  async activateSession(payload: { sessionId: string; sessionOwner: string }) {
    this.loading = true;
    try {
      const res = await apiActivateSession({ session: payload.sessionId, activator: payload.sessionOwner });
      if (res && (res.error)) throw new Error(res.error);
      // refresh
      await this.fetchSessions();
      await this.fetchActiveForOwner(payload.sessionOwner);
      return res;
    } catch (e:any) {
      this.error = e?.message ?? String(e);
      throw e;
    } finally {
      this.loading = false;
    }
  },

    async setOrdering(payload: { session: string; newType: string; setter?: string }) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = payload.setter ?? auth.username;
        if (!actor) throw new Error('Setter required (login or provide setter).');
        await setSessionOrdering({ session: payload.session, newType: payload.newType, setter: actor });
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async setFormat(payload: { session: string; newFormat: string; setter?: string }) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = payload.setter ?? auth.username;
        if (!actor) throw new Error('Setter required (login or provide setter).');
        await setSessionFormat({ session: payload.session, newFormat: payload.newFormat, setter: actor });
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async addListItem(payload: { session: string; task: string; defaultOrder?: number; adder?: string }) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = payload.adder ?? auth.username;
        if (!actor) throw new Error('Adder required (login or provide adder).');
        await addListItemToSession({ session: payload.session, task: payload.task, defaultOrder: payload.defaultOrder } as any);
        await this.loadSessionListItems(payload.session);
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async activateSessionByOwner(owner?: string) {
      // helper: use auth username if owner not provided
      const auth = useAuthStore();
      await this.fetchActiveForOwner(owner ?? auth.username);
    },

    // async fetchSessions() {
    //     this.loading = true;
    //     this.error = '';
    //     try {
    //         const docs = await getSession({ session: '' } as any).catch(() => []);
    //         this.sessions = Array.isArray(docs) ? docs : [];
    //     } catch (e: any) {
    //         this.error = e?.message ?? String(e);
    //     } finally {
    //         this.loading = false;
    //     }
    //   },
    // async fetchSessions() {
    //   this.loading = true;
    //   try {
    //     // if you have an endpoint to list all sessions, call it here; otherwise rely on other queries
    //     const res = await apiGetAllSessions?.() ?? [];
    //     console.debug('[session.store] fetchSessions raw:', res);
    //     this.sessions = Array.isArray(res) ? res.map(normalizeSessionObj) : [];
    //   } catch (e) {
    //     console.error('[session.store] fetchSessions failed', e);
    //     this.sessions = [];
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async fetchSessions() {
      this.loading = true;
      try {
        // prefer fetching sessions for the current user if possible
        const auth = useAuthStore();
        const owner = auth.username ?? (auth as any)?._id;
        let res: any = [];
        if (owner) {
          res = await getSessionForOwner(owner).catch(() => []);
        }
        // normalize into array of session objects
        if (Array.isArray(res)) {
          this.sessions = res.map(normalizeSessionObj).filter(Boolean) as SessionDocument[];
        } else if (res) {
          const one = normalizeSessionObj(res);
          this.sessions = one ? [one] : [];
        } else {
          this.sessions = [];
        }
        console.debug('[session.store] fetchSessions -> sessions', this.sessions);
      } catch (e) {
        console.error('[session.store] fetchSessions failed', e);
        this.sessions = [];
      } finally {
        this.loading = false;
      }
    },

    // async fetchByOwner(owner: string) {
    //   this.loading = true;
    //   this.error = '';
    //   try {
    //     const docs = await getSessionForOwner({ owner });
    //     this.sessions = Array.isArray(docs) ? docs : [];
    //     return this.sessions;
    //   } catch (e: any) {
    //     this.error = e?.message ?? String(e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async fetchByOwner(owner: string) {
      this.loading = true;
      this.error = '';
      try {
        // getSessionForOwner expects owner string (not an object)
        const docs = await getSessionForOwner(owner);
        if (Array.isArray(docs)) {
          this.sessions = docs.map(normalizeSessionObj).filter(Boolean) as SessionDocument[];
        } else if (docs) {
          const one = normalizeSessionObj(docs);
          this.sessions = one ? [one] : [];
        } else {
          this.sessions = [];
        }
        return this.sessions;
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // async fetchActiveForOwner(owner?: string) {
    //   this.loading = true;
    //   this.error = '';
    //   try {
    //     const docs = await getActiveSessionForOwner({ owner: owner ?? '' });
    //     if (Array.isArray(docs) && docs.length > 0) {
    //       this.activeSession = docs[0] ?? null;
    //     } else {
    //       this.activeSession = null;
    //     }
    //     return this.activeSession;
    //   } catch (e: any) {
    //     this.error = e?.message ?? String(e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    // ...existing code...

  // async fetchActiveForOwner(ownerId?: string) {
  //   this.loading = true;
  //   try {
  //     const owner = ownerId ?? (/* auth lookup if you have it here */ undefined);
  //     if (!owner) {
  //       this.activeSession = null;
  //       return null;
  //     }

  //     const res = await apiGetSessionByOwner(owner);
  //     console.debug('[session.store] fetchActiveForOwner raw result:', res);

  //     // normalize: backend may return { session: {...} } or the session object directly
  //     let sessionObj: any = null;
  //     if (!res) {
  //       sessionObj = null;
  //     } else if (typeof res === 'object' && 'session' in res) {
  //       sessionObj = res.session;
  //     } else if (Array.isArray(res) && res.length) {
  //       // if backend returns an array, pick first or the active one
  //       sessionObj = res.find((s: any) => s.active) ?? res[0];
  //     } else if (typeof res === 'object') {
  //       sessionObj = res;
  //     } else {
  //       sessionObj = null;
  //     }

  //     this.activeSession = sessionObj ?? null;
  //     return this.activeSession;
  //   } catch (e: any) {
  //     console.error('[session.store] fetchActiveForOwner failed', e);
  //     this.activeSession = null;
  //     return null;
  //   } finally {
  //     this.loading = false;
  //   }
  // },
    // async fetchActiveForOwner(ownerId?: string) {
    //   this.loading = true;
    //   try {
    //     const owner = ownerId ?? /* fallback to auth username if available */ undefined;
    //     if (!owner) { this.activeSession = null; return null; }
    //     // prefer the explicit active query
    //     const raw = await getActiveSessionForOwner(owner);
    //     if (!raw) {
    //       // fall back to any session for owner
    //       const alt = await getSessionForOwner(owner);
    //       this.activeSession = normalizeSessionObj(alt);
    //     } else {
    //       this.activeSession = normalizeSessionObj(raw);
    //     }
    //     return this.activeSession;
    //   } catch (e) {
    //     console.error('[session.store] fetchActiveForOwner failed', e);
    //     this.activeSession = null;
    //     return null;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async fetchActiveForOwner(ownerId?: string) {
      this.loading = true;
      try {
        const owner = ownerId ?? (useAuthStore().username ?? (useAuthStore() as any)?._id);
        if (!owner) { this.activeSession = null; return null; }

        // try explicit active endpoint first
        const rawActive = await getActiveSessionForOwner(owner).catch(() => null);
        if (rawActive) {
          // endpoint may return an object or an array
          let sessionObj = Array.isArray(rawActive) ? rawActive.find((s: any) => s.active) ?? rawActive[0] : rawActive;
          this.activeSession = normalizeSessionObj(sessionObj);
          return this.activeSession;
        }
                const alt = await getSessionForOwner(owner).catch(() => null);
        if (!alt) { this.activeSession = null; return null; }
        let picked = Array.isArray(alt) ? alt.find((s: any) => s.active) ?? alt[0] : alt;
        this.activeSession = normalizeSessionObj(picked);
        return this.activeSession;
      } catch (e) {
        console.error('[session.store] fetchActiveForOwner failed', e);
        this.activeSession = null;
        return null;
      } finally {
        this.loading = false;
      }
    },

    setActiveSession(sessionId: string | null) {
      if (!sessionId) {
        this.activeSession = null;
        this.listItems = [];
        this.taskStatuses = {};
        return;
      }
      const found = this.sessions.find(s => (s._id || (s as any).session) === sessionId);
      this.activeSession = (found ?? { _id: sessionId }) as SessionDocument;
      // only load items if we have a valid id
      const idToLoad = this.activeSession?._id ?? (this.activeSession as any)?.session;
      if (idToLoad) {
        // don't await here to keep UI responsive; callers can call loadSessionListItems explicitly
        void this.loadSessionListItems(idToLoad);
      }
    },

    // async changeSession(payload: { list: string; sessionOwner: string }) {
    //   this.loading = true;
    //   this.error = '';
    //   try {
    //     await changeSession({ list: payload.list, sessionOwner: payload.sessionOwner });
    //     await this.fetchSessions();
    //   } catch (e: any) {
    //     this.error = e?.message ?? String(e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    async startTask(payload: { session: string; task: string }) {
      this.loading = true;
      this.error = '';
      try {
        if (!payload.session || !payload.task) return;
        await startSessionTask(payload);
        await this.refreshTaskStatus(payload.session, payload.task);
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async completeTask(payload: { session: string; task: string }) {
      this.loading = true;
      this.error = '';
      try {
        if (!payload.session || !payload.task) return;
        await completeSessionTask(payload);
        await this.refreshTaskStatus(payload.session, payload.task);
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async endSession(payload: { session: string }) {
      this.loading = true;
      this.error = '';
      try {
        if (!payload.session) return;
        await endSession(payload);
        const activeId = this.activeSession?._id ?? (this.activeSession as any)?.session;
        if (activeId && activeId === payload.session) {
          this.activeSession = null;
          this.listItems = [];
          this.taskStatuses = {};
        }
        await this.fetchSessions();
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async deleteSession(payload: { session: string }) {
      this.loading = true;
      this.error = '';
      try {
        if (!payload.session) return;
        await deleteSession(payload);
        const activeId = this.activeSession?._id ?? (this.activeSession as any)?.session;
        if (activeId && activeId === payload.session) {
          this.activeSession = null;
          this.listItems = [];
          this.taskStatuses = {};
        }
        await this.fetchSessions();
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async removeListItem(payload: { session: string; task: string }) {
      this.loading = true;
      this.error = '';
      try {
        if (!payload.session || !payload.task) return;
        await removeListItemFromSession({ session: payload.session, task: payload.task });
        await this.loadSessionListItems(payload.session);
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // async loadSessionListItems(sessionId: string) {
    //   this.loading = true;
    //   this.error = '';
    //   try {
    //     if (!sessionId) {
    //       this.listItems = [];
    //       return this.listItems;
    //     }
    //     const items = await getSessionListItems({ session: sessionId }).catch(() => []);
    //     this.listItems = Array.isArray(items) ? items : [];
    //     // load statuses for each task (concurrently but guarded)
    //     const tasksToCheck = this.listItems
    //       .map(it => {
    //         // const taskId = it && (it.task ?? it.taskId ?? it._id);
    //         // return typeof taskId === 'string' && taskId ? taskId : undefined;
    //         const maybeTask = (it as any).task ?? it.taskId ?? it._id;
    //         return typeof maybeTask === 'string' && maybeTask ? maybeTask : undefined;
    //       })
    //       .filter((t): t is string => !!t);

    //     // fetch statuses in parallel but limit errors from failing the whole batch
    //     const statusPromises = tasksToCheck.map(taskId =>
    //       getTaskStatus({ session: sessionId, task: taskId })
    //         .then(res => ({ taskId, res }))
    //         .catch(() => ({ taskId, res: [] as any[] }))
    //     );

    //     const results = await Promise.all(statusPromises);
    //     for (const { taskId, res } of results) {
    //       if (Array.isArray(res) && res.length > 0 && res[0] && typeof (res[0] as any).status === 'string') {
    //         this.taskStatuses[taskId] = (res[0] as any).status;
    //       } else {
    //         // fallback to existing item status if available
    //         // const item = this.listItems.find(it => (it.task ?? it.taskId ?? it._id) === taskId);
    //         // const fallback = item && (item.itemStatus ?? (item as any).taskStatus);
    //         const item = this.listItems.find(it => ((it as any).task ?? it.taskId ?? it._id) === taskId);
    //         const fallback = item && (item.itemStatus ?? (item as any).taskStatus ?? (item as any).task);
    //         if (typeof fallback === 'string') this.taskStatuses[taskId] = fallback;
    //       }
    //     }

    //     return this.listItems;
    //   } catch (e: any) {
    //     this.error = e?.message ?? String(e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async loadSessionListItems(sessionId: string) {
      try {
        const items = await getSessionListItems(sessionId);
        this.listItems = Array.isArray(items) ? items : [];
      } catch (e) {
        console.error('[session.store] loadSessionListItems failed', e);
        this.listItems = [];
      }
    },

    async refreshTaskStatus(sessionId: string, taskId: string) {
      try {
        if (!sessionId || !taskId) return;
        const statuses = await getTaskStatus({ session: sessionId, task: taskId }).catch(() => []);
        if (Array.isArray(statuses) && statuses.length > 0 && statuses[0] && typeof (statuses[0] as any).status === 'string') {
          this.taskStatuses[taskId] = (statuses[0] as any).status;
        }
      } catch {
        // ignore individual status refresh errors
      }
    },

    // async changeSession(payload: { list: string; sessionOwner: string; name?: string }) {
    //   this.loading = true;
    //   try {
    //     await apiCreateSession(payload);
    //     // refresh local sessions
    //     await this.fetchSessions();
    //     return true;
    //   } catch (e: any) {
    //     this.error = e?.message ?? String(e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // }
    // async changeSession(payload: { list: string; sessionOwner: string; name?: string }) {
    //   this.loading = true;
    //   try {
    //     await apiChangeSession(payload);
    //     await this.fetchSessions();
    //     return true;
    //   } catch (e: any) {
    //     this.error = e?.message ?? String(e);
    //     throw e;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
      // async changeSession(payload: { list: string; sessionOwner: string; ordering?: string; format?: string; name?: string }) {
      //   this.loading = true;
      //   try {
      //     const res = await apiChangeSession(payload);
      //     // if (res?.error) throw new Error(res.error);
      //     if (res && 'error' in res && res.error) throw new Error(res.error);
      //     // refresh sessions and active session for owner
      //     await this.fetchSessions();
      //     await this.fetchActiveForOwner(payload.sessionOwner);
      //     return res;
      //   } catch (e: any) {
      //     this.error = e?.message ?? String(e);
      //     throw e;
      //   } finally {
      //     this.loading = false;
      //   }
      // }
    async changeSession(payload: { list: string; sessionOwner: string; ordering?: string; format?: string; name?: string }) {
      this.loading = true;
      try {
        const res = await apiChangeSession(payload);
        // safe narrowing before reading properties
        if (res && typeof res === 'object' && 'error' in res && res.error) {
          throw new Error(String((res as any).error));
        }

        if (res && typeof res === 'object' && 'session' in res && (res as any).session) {
          // created; refresh active/session state
          await this.fetchSessions();
          await this.fetchActiveForOwner(payload.sessionOwner);
          return res;
        }

        // fallback: refresh lists to pick up changes
        await this.fetchSessions();
        await this.fetchActiveForOwner(payload.sessionOwner);
        return res;
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },
  }
});