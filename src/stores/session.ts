// ...existing code...
import { defineStore } from 'pinia';
import type { SessionDocument, SessionListItem } from '../api/client';
import {
  changeSession,
  setSessionOrdering,
  setSessionFormat,
  randomizeSessionOrder,
  activateSession,
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
  getActiveSessionForOwner
} from '../api/client';
import { useAuthStore } from './auth';

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

    async activateSession(payload: { session: string; activator?: string }) {
      this.loading = true;
      this.error = '';
      const auth = useAuthStore();
      try {
        const actor = payload.activator ?? auth.username;
        if (!actor) throw new Error('Activator required (login or provide activator).');
        await activateSession({ session: payload.session, activator: actor });
        await this.fetchActiveForOwner();
      } catch (e: any) {
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

    async fetchSessions() {
        this.loading = true;
        this.error = '';
        try {
            const docs = await getSession({ session: '' } as any).catch(() => []);
            this.sessions = Array.isArray(docs) ? docs : [];
        } catch (e: any) {
            this.error = e?.message ?? String(e);
        } finally {
            this.loading = false;
        }
        },

    async fetchByOwner(owner: string) {
      this.loading = true;
      this.error = '';
      try {
        const docs = await getSessionForOwner({ owner });
        this.sessions = Array.isArray(docs) ? docs : [];
        return this.sessions;
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async fetchActiveForOwner(owner?: string) {
      this.loading = true;
      this.error = '';
      try {
        const docs = await getActiveSessionForOwner({ owner: owner ?? '' });
        if (Array.isArray(docs) && docs.length > 0) {
          this.activeSession = docs[0] ?? null;
        } else {
          this.activeSession = null;
        }
        return this.activeSession;
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
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

    async changeSession(payload: { list: string; sessionOwner: string }) {
      this.loading = true;
      this.error = '';
      try {
        await changeSession({ list: payload.list, sessionOwner: payload.sessionOwner });
        await this.fetchSessions();
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

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

    async loadSessionListItems(sessionId: string) {
      this.loading = true;
      this.error = '';
      try {
        if (!sessionId) {
          this.listItems = [];
          return this.listItems;
        }
        const items = await getSessionListItems({ session: sessionId }).catch(() => []);
        this.listItems = Array.isArray(items) ? items : [];
        // load statuses for each task (concurrently but guarded)
        const tasksToCheck = this.listItems
          .map(it => {
            // const taskId = it && (it.task ?? it.taskId ?? it._id);
            // return typeof taskId === 'string' && taskId ? taskId : undefined;
            const maybeTask = (it as any).task ?? it.taskId ?? it._id;
            return typeof maybeTask === 'string' && maybeTask ? maybeTask : undefined;
          })
          .filter((t): t is string => !!t);

        // fetch statuses in parallel but limit errors from failing the whole batch
        const statusPromises = tasksToCheck.map(taskId =>
          getTaskStatus({ session: sessionId, task: taskId })
            .then(res => ({ taskId, res }))
            .catch(() => ({ taskId, res: [] as any[] }))
        );

        const results = await Promise.all(statusPromises);
        for (const { taskId, res } of results) {
          if (Array.isArray(res) && res.length > 0 && res[0] && typeof (res[0] as any).status === 'string') {
            this.taskStatuses[taskId] = (res[0] as any).status;
          } else {
            // fallback to existing item status if available
            // const item = this.listItems.find(it => (it.task ?? it.taskId ?? it._id) === taskId);
            // const fallback = item && (item.itemStatus ?? (item as any).taskStatus);
            const item = this.listItems.find(it => ((it as any).task ?? it.taskId ?? it._id) === taskId);
            const fallback = item && (item.itemStatus ?? (item as any).taskStatus ?? (item as any).task);
            if (typeof fallback === 'string') this.taskStatuses[taskId] = fallback;
          }
        }

        return this.listItems;
      } catch (e: any) {
        this.error = e?.message ?? String(e);
        throw e;
      } finally {
        this.loading = false;
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
    }
  }
});