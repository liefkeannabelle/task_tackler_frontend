// Generate a function that POSTs to /api/session/start
// ...existing code...
// export const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL ?? '';
export const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export interface StartSessionRequest {
  // add fields your backend expects
  userId?: string;
  device?: string;
  [key: string]: any;
}

export interface StartSessionResponse {
  sessionId: string;
  expiresAt?: string;
  [key: string]: any;
}

/**
 * POST /session/start
 */
export async function startSession(body: StartSessionRequest = {}): Promise<StartSessionResponse> {
  return apiPost<StartSessionRequest, StartSessionResponse>('/session/start', body);
}
// ...existing code...

// --- shared helper used by the generated endpoint functions ---
async function apiPost<TReq = any, TRes = any>(path: string, body: TReq = {} as TReq): Promise<TRes> {
  const base = API_BASE.replace(/\/$/, '');
  const url = base ? `${base}${path.startsWith('/') ? path : '/' + path}` : path;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include'
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${url} failed: ${res.status} ${res.statusText} ${text}`);
  }

  return await res.json() as TRes;
}

// --- ListCreation concept types & functions ---

export interface ListItem {
  task: string;
  orderNumber: number;
  taskStatus: string;
  [key: string]: any;
}

export interface ListDocument {
  _id: string;
  owner: string;
  title: string;
  listItems: ListItem[];
  itemCount: number;
  [key: string]: any;
}

/* POST /ListCreation/newList */
export interface NewListRequest { listName: string; listOwner: string }
export interface NewListResponse { list: string }
export async function newList(body: NewListRequest): Promise<NewListResponse> {
  return apiPost<NewListRequest, NewListResponse>('/ListCreation/newList', body);
}

/* POST /ListCreation/deleteList */
export interface ListDeleteRequest { list?: string; listId?: string; deleter?: string }
export async function deleteList(body: ListDeleteRequest): Promise<{}> {
  const payload: any = {
    // backend expects listId; map from either field if provided
    listId: body.listId ?? body.list
  };
  if (body.deleter) payload.deleter = body.deleter;
  return apiPost<typeof payload, {}>('/ListCreation/deleteList', payload);
}

/* POST /ListCreation/addTask */
export interface ListAddTaskRequest { list: string; task: string; adder: string }
export interface ListAddTaskResponse { listItem: ListItem }
export async function addTaskToList(body: ListAddTaskRequest): Promise<ListAddTaskResponse> {
  return apiPost<ListAddTaskRequest, ListAddTaskResponse>('/ListCreation/addTask', body);
}

/* POST /ListCreation/deleteTask */
export interface ListDeleteTaskRequest { list: string; task: string; deleter: string }
export async function deleteTaskFromList(body: ListDeleteTaskRequest): Promise<{}> {
  return apiPost<ListDeleteTaskRequest, {}>('/ListCreation/deleteTask', body);
}

/* POST /ListCreation/assignOrder */
export interface ListAssignOrderRequest { list: string; task: string; newOrder: number; assigner: string }
export async function assignOrderInList(body: ListAssignOrderRequest): Promise<{}> {
  return apiPost<ListAssignOrderRequest, {}>('/ListCreation/assignOrder', body);
}

/* POST /ListCreation/_getLists */
export async function getLists(): Promise<ListDocument[]> {
  return apiPost<{}, ListDocument[]>('/ListCreation/_getLists', {});
}

/* POST /ListCreation/_getListById */
export interface GetListByIdRequest { listId: string }
export async function getListById(body: GetListByIdRequest): Promise<ListDocument[]> {
  return apiPost<GetListByIdRequest, ListDocument[]>('/ListCreation/_getListById', body);
}

// /* POST /ListCreation/_getListsByOwner */
// export interface GetListsByOwnerRequest { ownerId: string }
// export async function getListsByOwner(body: GetListsByOwnerRequest): Promise<ListDocument[]> {
//   return apiPost<GetListsByOwnerRequest, ListDocument[]>('/ListCreation/_getListsByOwner', body);
// }

/* POST /ListCreation/_getTasksInList */
export interface GetTasksInListRequest { listId: string }
export async function getTasksInList(body: GetTasksInListRequest): Promise<ListItem[]> {
  return apiPost<GetTasksInListRequest, ListItem[]>('/ListCreation/_getTasksInList', body);
}

// /* POST /ListCreation/getListsByOwner */
// export interface ListCreationGetListsByOwnerRequest { owner: string }
// export interface ListCreationGetListsByOwnerResponse { lists: any[] }
// export async function getListsByOwner(body: ListCreationGetListsByOwnerRequest): Promise<ListCreationGetListsByOwnerResponse> {
//   return apiPost<ListCreationGetListsByOwnerRequest, ListCreationGetListsByOwnerResponse>('/ListCreation/getListsByOwner', body);
// }
// ...existing code...
/* POST /ListCreation/getListsByOwner */
export interface ListCreationGetListsByOwnerRequest { owner: string }
export interface ListCreationGetListsByOwnerResponse { lists: ListDocument[] }

export async function getListsByOwner(body: ListCreationGetListsByOwnerRequest): Promise<ListCreationGetListsByOwnerResponse> {
  // backend exposes _getListsByOwner under /api
  return apiPost<ListCreationGetListsByOwnerRequest, ListCreationGetListsByOwnerResponse>('/ListCreation/getListsByOwner', body);
}
// ...existing code...

// --- TaskBank concept types & functions ---

export interface TaskDocument {
  _id: string;
  taskName: string;
  description?: string;
  [key: string]: any;
}

export interface Dependency {
  depTask: string;
  depRelation: string;
}

/* POST /TaskBank/addTask */
export interface TaskBankAddTaskRequest { adder: string; name: string; description?: string }
export interface TaskBankAddTaskResponse { task: string }
export async function addTaskToBank(body: TaskBankAddTaskRequest): Promise<TaskBankAddTaskResponse> {
  return apiPost<TaskBankAddTaskRequest, TaskBankAddTaskResponse>('/TaskBank/addTask', body);
}

/* POST /TaskBank/deleteTask */
export interface TaskBankDeleteTaskRequest { deleter: string; task: string }
export async function deleteTaskFromBank(body: TaskBankDeleteTaskRequest): Promise<{}> {
  return apiPost<TaskBankDeleteTaskRequest, {}>('/TaskBank/deleteTask', body);
}

// /* POST /TaskBank/addDependency */
// export interface TaskBankAddDependencyRequest { adder: string; task1: string; task2: string; dependency: string }
// export interface TaskBankAddDependencyResponse { dependency: Dependency }
// export async function addDependency(body: TaskBankAddDependencyRequest): Promise<TaskBankAddDependencyResponse> {
//   return apiPost<TaskBankAddDependencyRequest, TaskBankAddDependencyResponse>('/TaskBank/addDependency', body);
// }

// /* POST /TaskBank/deleteDependency */
// export interface TaskBankDeleteDependencyRequest { deleter: string; sourceTask: string; targetTask: string; relation: string }
// export async function deleteDependency(body: TaskBankDeleteDependencyRequest): Promise<{}> {
//   return apiPost<TaskBankDeleteDependencyRequest, {}>('/TaskBank/deleteDependency', body);
// }

// Add TaskBank dependency endpoints
export interface AddDependencyRequest { adder: string; task1: string; task2: string; dependency: string }
export interface DeleteDependencyRequest { deleter: string; sourceTask: string; targetTask: string; relation: string }

export async function addDependency(body: AddDependencyRequest): Promise<any> {
  return apiPost<AddDependencyRequest, any>('/TaskBank/addDependency', body);
}

export async function deleteDependency(body: DeleteDependencyRequest): Promise<any> {
  return apiPost<DeleteDependencyRequest, any>('/TaskBank/deleteDependency', body);
}

/* POST /TaskBank/_getDependencies */
export interface TaskBankGetDependenciesRequest { getter: string; task: string }
export async function getDependencies(body: TaskBankGetDependenciesRequest): Promise<Dependency[]> {
  return apiPost<TaskBankGetDependenciesRequest, Dependency[]>('/TaskBank/_getDependencies', body);
}

/* POST /TaskBank/_evaluateOrder */
export interface TaskBankEvaluateOrderRequest { owner: string; task1: string; task2: string }
export interface TaskBankEvaluateOrderResponse { orderValid: boolean }
export async function evaluateTaskOrder(body: TaskBankEvaluateOrderRequest): Promise<TaskBankEvaluateOrderResponse[]> {
  return apiPost<TaskBankEvaluateOrderRequest, TaskBankEvaluateOrderResponse[]>('/TaskBank/_evaluateOrder', body);
}

/* POST /TaskBank/_getTasks */
export interface TaskBankGetTasksRequest { owner?: string }
export async function getTasks(body: TaskBankGetTasksRequest = {}): Promise<TaskDocument[]> {
  return apiPost<TaskBankGetTasksRequest, TaskDocument[]>('/TaskBank/_getTasks', body);
}

/* POST /TaskBank/listTasks */
export interface TaskBankListTasksRequest { owner?: string }
export interface TaskBankListTasksResponse { tasks: TaskDocument[] } 
export async function listTasks(body: TaskBankListTasksRequest): Promise<TaskBankListTasksResponse> {
  return apiPost<TaskBankListTasksRequest, TaskBankListTasksResponse>('/TaskBank/listTasks', body);
}

// --- Session concept types & functions ---

export interface SessionDocument {
  _id: string;
  owner: string;
  listId?: string;
  title?: string;
  itemCount?: number;
  active?: boolean;
  ordering?: string;
  format?: string;
  [key: string]: any;
}

export interface SessionListItem {
  _id?: string;
  sessionId?: string;
  taskId: string;
  defaultOrder?: number;
  randomOrder?: number;
  itemStatus?: string;
}

// /* POST /Session/changeSession */
// export interface SessionChangeRequest { list: string; sessionOwner: string }
// export async function changeSession(body: SessionChangeRequest): Promise<{}> {
//   return apiPost<SessionChangeRequest, {}>('/Session/changeSession', body);
// }
// export interface ChangeSessionRequest { list: string; sessionOwner: string; name?: string }
// export async function changeSession(body: ChangeSessionRequest): Promise<any> {
//   return apiPost<ChangeSessionRequest, any>('/Session/changeSession', body);
// }
export interface ChangeSessionRequest { list: string; sessionOwner: string; ordering?: string; format?: string; name?: string }
// export async function changeSession(body: ChangeSessionRequest): Promise<{ session?: string } | { error?: string }> {
//   // return apiPost<ChangeSessionRequest, any>('/Session/changeSession', body);
//     console.debug('[api.changeSession] sending', body);
//     const url = API_BASE + '/api/Session/changeSession';
//     const resp = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body),
//     });

//     const text = await resp.text();
//     console.debug('[api.changeSession] status', resp.status, 'rawText:', text);

//     let parsed: any = null;
//     try { parsed = text ? JSON.parse(text) : null; }
//     catch (err) { console.warn('[api.changeSession] JSON parse failed', err); parsed = text; }

//     console.debug('[api.changeSession] parsedResponse', parsed);
//     return parsed;
// }
// ...existing code...

// export async function changeSession(body: ChangeSessionRequest): Promise<{ session?: string } | { error?: string }> {
//   console.debug('[api.changeSession] sending', body);
//   const url = API_BASE + '/api/Session/changeSession';
//   const resp = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });

//   const text = await resp.text();
//   console.debug('[api.changeSession] status', resp.status, 'rawText:', text);

//   let parsed: any = null;
//   try { parsed = text ? JSON.parse(text) : null; } catch (err) { console.warn('[api.changeSession] JSON parse failed', err); parsed = text; }

//   // Normalize error responses into an object with .error
//   if (!resp.ok) {
//     const errMsg = (parsed && typeof parsed === 'object' && 'error' in parsed) ? parsed.error : (typeof parsed === 'string' ? parsed : resp.statusText);
//     return { error: String(errMsg) };
//   }

//   // For OK responses, prefer parsed object, otherwise return a normalized object
//   if (parsed && typeof parsed === 'object') return parsed;
//   if (typeof parsed === 'string' && parsed.length) {
//     // attempt fallback: server returned a raw string, wrap it
//     return { error: parsed };
//   }
//   return { error: 'Empty response from server' };
// }
// ...existing code...
// export async function changeSession(body: ChangeSessionRequest): Promise<{ session?: string } | { error?: string }> {
//   console.debug('[api.changeSession] sending', body);
//   const base = (API_BASE && API_BASE.length) ? API_BASE.replace(/\/$/, '') : 'http://localhost:8000';
//   const url = base.replace(/\/$/, '') + '/api/Session/changeSession';

//   const resp = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//     credentials: 'include'
//   });

//   // Log status + headers (so we can see Content-Type)
//   console.debug('[api.changeSession] status', resp.status, 'statusText', resp.statusText);
//   resp.headers.forEach((v, k) => console.debug('[api.changeSession] resp header', k, v));

//   const raw = await resp.text();
//   console.debug('[api.changeSession] raw response text:', raw);

//   // try parse safely
//   let parsed: any = null;
//   try { parsed = raw ? JSON.parse(raw) : null; }
//   catch (err) { console.warn('[api.changeSession] JSON parse failed', err); parsed = raw; }

//   console.debug('[api.changeSession] parsedResponse', parsed);

//   if (!resp.ok) {
//     const errMsg = (parsed && typeof parsed === 'object' && 'error' in parsed) ? parsed.error : (typeof parsed === 'string' ? parsed : resp.statusText);
//     return { error: String(errMsg) };
//   }

//   if (parsed && typeof parsed === 'object') return parsed;
//   if (typeof parsed === 'string' && parsed.length) return { error: parsed };
//   return { error: 'Empty response from server' };
// }

export async function changeSession(body: ChangeSessionRequest): Promise<{ session?: string } | { error?: string }> {
  console.debug('[api.changeSession] sending', body);

  // Use API_BASE as the API root (set VITE_API_BASE_URL to e.g. "http://localhost:8000/api")
  // Fallback to a sensible default that already includes /api to avoid duplicating it.
  const base = (API_BASE && API_BASE.length)
    ? API_BASE.replace(/\/$/, '') // remove trailing slash if present
    : 'http://localhost:8000/api';

  // Append the concept path (no extra /api prefix)
  const url = base + '/Session/changeSession';

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include'
  });

  // Log status + headers
  console.debug('[api.changeSession] status', resp.status, 'statusText', resp.statusText);
  resp.headers.forEach((v, k) => console.debug('[api.changeSession] resp header', k, v));

  const raw = await resp.text();
  console.debug('[api.changeSession] raw response text:', raw);

  let parsed: any = null;
  try { parsed = raw ? JSON.parse(raw) : null; } catch (err) { console.warn('[api.changeSession] JSON parse failed', err); parsed = raw; }
  console.debug('[api.changeSession] parsedResponse', parsed);

  if (!resp.ok) {
    const errMsg = (parsed && typeof parsed === 'object' && 'error' in parsed) ? parsed.error : (typeof parsed === 'string' ? parsed : resp.statusText);
    return { error: String(errMsg) };
  }

  if (parsed && typeof parsed === 'object') return parsed;
  if (typeof parsed === 'string' && parsed.length) return { error: parsed };
  return { error: 'Empty response from server' };
}

/* POST /Session/setOrdering */
export interface SessionSetOrderingRequest { session: string; newType: string; setter: string }
export async function setSessionOrdering(body: SessionSetOrderingRequest): Promise<{}> {
  return apiPost<SessionSetOrderingRequest, {}>('/Session/setOrdering', body);
}

/* POST /Session/setFormat */
export interface SessionSetFormatRequest { session: string; newFormat: string; setter: string }
export async function setSessionFormat(body: SessionSetFormatRequest): Promise<{}> {
  return apiPost<SessionSetFormatRequest, {}>('/Session/setFormat', body);
}

/* POST /Session/randomizeOrder */
export interface SessionRandomizeRequest { session: string; randomizer: string }
export async function randomizeSessionOrder(body: SessionRandomizeRequest): Promise<{}> {
  return apiPost<SessionRandomizeRequest, {}>('/Session/randomizeOrder', body);
}

/* POST /Session/activateSession */
// export interface SessionActivateRequest { session: string; activator: string }
// export async function activateSession(body: SessionActivateRequest): Promise<{}> {
//   return apiPost<SessionActivateRequest, {}>('/Session/activateSession', body);
// }
export interface ActivateSessionRequest { sessionId: string; sessionOwner: string }

// export async function activateSession(body: ActivateSessionRequest): Promise<{ ok?: boolean } | { error?: string }> {
//   const base = (API_BASE && API_BASE.length) ? API_BASE.replace(/\/$/, '') : 'http://localhost:8000/api';
//   const url = base + '/Session/activateSession';
//   console.debug('[api.activateSession] POST', url, body);
//   const resp = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//     credentials: 'include'
//   });

//   const raw = await resp.text();
//   let parsed: any = null;
//   try { parsed = raw ? JSON.parse(raw) : null; } catch { parsed = raw; }
//   if (!resp.ok) {
//     const msg = (parsed && typeof parsed === 'object' && 'error' in parsed) ? parsed.error : String(parsed ?? resp.statusText);
//     return { error: msg };
//   }
//   return (parsed && typeof parsed === 'object') ? parsed : { ok: true };
// }

export async function deactivateSession(body: { sessionId: string; sessionOwner: string }): Promise<{ ok?: boolean } | { error?: string }> {
  const base = (API_BASE && API_BASE.length) ? API_BASE.replace(/\/$/, '') : 'http://localhost:8000/api';
  const url = base + '/Session/endSession';
  console.debug('[api.deactivateSession] POST', url, body);
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: body.sessionId, owner: body.sessionOwner }),
    credentials: 'include'
  });
  const raw = await resp.text();
  let parsed: any = null;
  try { parsed = raw ? JSON.parse(raw) : null; } catch { parsed = raw; }
  if (!resp.ok) {
    const msg = (parsed && typeof parsed === 'object' && 'error' in parsed) ? parsed.error : (typeof parsed === 'string' ? parsed : resp.statusText);
    return { error: String(msg) };
  }
  return parsed && typeof parsed === 'object' ? parsed : { ok: true };
}

/* POST /Session/startTask */
export interface SessionStartTaskRequest { session: string; task: string }
export async function startSessionTask(body: SessionStartTaskRequest): Promise<{}> {
  return apiPost<SessionStartTaskRequest, {}>('/Session/startTask', body);
}

/* POST /Session/completeTask */
export interface SessionCompleteTaskRequest { session: string; task: string }
export async function completeSessionTask(body: SessionCompleteTaskRequest): Promise<{}> {
  return apiPost<SessionCompleteTaskRequest, {}>('/Session/completeTask', body);
}

/* POST /Session/endSession */
export interface SessionEndRequest { session: string }
export async function endSession(body: SessionEndRequest): Promise<{}> {
  return apiPost<SessionEndRequest, {}>('/Session/endSession', body);
}

/* POST /Session/deleteSession */
export interface SessionDeleteRequest { session: string }
export async function deleteSession(body: SessionDeleteRequest): Promise<{}> {
  return apiPost<SessionDeleteRequest, {}>('/Session/deleteSession', body);
}

/* POST /Session/addListItem */
export interface SessionAddListItemRequest { session: string; task: string; defaultOrder?: number }
export async function addListItemToSession(body: SessionAddListItemRequest): Promise<{}> {
  return apiPost<SessionAddListItemRequest, {}>('/Session/addListItem', body);
}

/* POST /Session/removeListItem */
export interface SessionRemoveListItemRequest { session: string; task: string }
export async function removeListItemFromSession(body: SessionRemoveListItemRequest): Promise<{}> {
  return apiPost<SessionRemoveListItemRequest, {}>('/Session/removeListItem', body);
}

/* POST /Session/_getSession */
export interface SessionGetRequest { session: string }
export async function getSession(body: SessionGetRequest): Promise<SessionDocument[]> {
  return apiPost<SessionGetRequest, SessionDocument[]>('/Session/_getSession', body);
}

/* POST /Session/_getTaskStatus */
export interface SessionGetTaskStatusRequest { session: string; task: string }
export interface SessionGetTaskStatusResponse { status: string }
export async function getTaskStatus(body: SessionGetTaskStatusRequest): Promise<SessionGetTaskStatusResponse[]> {
  return apiPost<SessionGetTaskStatusRequest, SessionGetTaskStatusResponse[]>('/Session/_getTaskStatus', body);
}

// /* POST /Session/_getSessionListItems */
// export interface SessionGetListItemsRequest { session: string }
// export async function getSessionListItems(body: SessionGetListItemsRequest): Promise<SessionListItem[]> {
//   return apiPost<SessionGetListItemsRequest, SessionListItem[]>('/Session/_getSessionListItems', body);
// }

// /* POST /Session/_getSessionForOwner */
// export interface SessionGetForOwnerRequest { owner: string }
// export async function getSessionForOwner(body: SessionGetForOwnerRequest): Promise<SessionDocument[]> {
//   return apiPost<SessionGetForOwnerRequest, SessionDocument[]>('/Session/_getSessionForOwner', body);
// }

export async function getSessionByOwner(ownerId: string): Promise<any> {
  const base = (API_BASE && API_BASE.length) ? API_BASE.replace(/\/$/, '') : 'http://localhost:8000/api';
  const url = base + '/Session/getSessionByOwner';
  console.debug('[api.getSessionByOwner] POST', url, { ownerId });

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ owner: ownerId }),
    credentials: 'include'
  });

  console.debug('[api.getSessionByOwner] status', resp.status, resp.statusText);
  resp.headers.forEach((v, k) => console.debug('[api.getSessionByOwner] resp header', k, v));

  const raw = await resp.text();
  console.debug('[api.getSessionByOwner] raw response text:', raw);

  let parsed: any = null;
  try { parsed = raw ? JSON.parse(raw) : null; } catch (err) { console.warn('[api.getSessionByOwner] JSON parse failed', err); parsed = raw; }
  console.debug('[api.getSessionByOwner] parsedResponse', parsed);

  if (!resp.ok) {
    const errMsg = (parsed && typeof parsed === 'object' && 'error' in parsed) ? parsed.error : (typeof parsed === 'string' ? parsed : resp.statusText);
    return { error: String(errMsg) };
  }

  return parsed && typeof parsed === 'object' ? parsed : { session: parsed };
}

/* POST /Session/_getActiveSessionForOwner */
// export interface SessionGetActiveForOwnerRequest { owner: string }
// export async function getActiveSessionForOwner(body: SessionGetActiveForOwnerRequest): Promise<SessionDocument[]> {
//   return apiPost<SessionGetActiveForOwnerRequest, SessionDocument[]>('/Session/_getActiveSessionForOwner', body);
// }
// ...existing code...
export async function getActiveSessionForOwner(ownerId: string): Promise<any> {
  const base = (API_BASE && API_BASE.length) ? API_BASE.replace(/\/$/, '') : 'http://localhost:8000/api';
  const url = base + '/Session/_getActiveSessionForOwner';
  console.debug('[api.getActiveSessionForOwner] POST', url, { owner: ownerId });
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ owner: ownerId }),
    credentials: 'include'
  });
  const raw = await resp.text();
  try { return raw ? JSON.parse(raw) : null; } catch { return raw; }
}

export async function getSessionForOwner(ownerId: string): Promise<any> {
  const base = (API_BASE && API_BASE.length) ? API_BASE.replace(/\/$/, '') : 'http://localhost:8000/api';
  const url = base + '/Session/_getSessionForOwner';
  console.debug('[api.getSessionForOwner] POST', url, { owner: ownerId });
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ owner: ownerId }),
    credentials: 'include'
  });
  const raw = await resp.text();
  try { return raw ? JSON.parse(raw) : null; } catch { return raw; }
}

export async function getSessionListItems(sessionId: string): Promise<any> {
  const base = (API_BASE && API_BASE.length) ? API_BASE.replace(/\/$/, '') : 'http://localhost:8000/api';
  const url = base + '/Session/_getSessionListItems';
  console.debug('[api.getSessionListItems] POST', url, { session: sessionId });
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: sessionId }),
    credentials: 'include'
  });
  const raw = await resp.text();
  try { return raw ? JSON.parse(raw) : null; } catch { return raw; }
}

export async function activateSession(body: { session: string; activator: string }): Promise<any> {
  const base = (API_BASE && API_BASE.length) ? API_BASE.replace(/\/$/, '') : 'http://localhost:8000/api';
  const url = base + '/Session/activateSession';
  console.debug('[api.activateSession] POST', url, body);
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include'
  });
  const raw = await resp.text();
  try { return raw ? JSON.parse(raw) : null; } catch { return raw; }
}
// ...existing code...

// ...existing code...
export interface CreateSessionRequest { list: string; sessionOwner: string; name?: string }
export async function createSession(body: CreateSessionRequest): Promise<any> {
  return apiPost<CreateSessionRequest, any>('/Session/changeSession', body);
}