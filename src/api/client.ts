// Generate a function that POSTs to /api/session/start
// ...existing code...
export const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL ?? '';

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

/* POST /ListCreation/_getListsByOwner */
export interface GetListsByOwnerRequest { ownerId: string }
export async function getListsByOwner(body: GetListsByOwnerRequest): Promise<ListDocument[]> {
  return apiPost<GetListsByOwnerRequest, ListDocument[]>('/ListCreation/_getListsByOwner', body);
}

/* POST /ListCreation/_getTasksInList */
export interface GetTasksInListRequest { listId: string }
export async function getTasksInList(body: GetTasksInListRequest): Promise<ListItem[]> {
  return apiPost<GetTasksInListRequest, ListItem[]>('/ListCreation/_getTasksInList', body);
}

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

/* POST /TaskBank/addDependency */
export interface TaskBankAddDependencyRequest { adder: string; task1: string; task2: string; dependency: string }
export interface TaskBankAddDependencyResponse { dependency: Dependency }
export async function addDependency(body: TaskBankAddDependencyRequest): Promise<TaskBankAddDependencyResponse> {
  return apiPost<TaskBankAddDependencyRequest, TaskBankAddDependencyResponse>('/TaskBank/addDependency', body);
}

/* POST /TaskBank/deleteDependency */
export interface TaskBankDeleteDependencyRequest { deleter: string; sourceTask: string; targetTask: string; relation: string }
export async function deleteDependency(body: TaskBankDeleteDependencyRequest): Promise<{}> {
  return apiPost<TaskBankDeleteDependencyRequest, {}>('/TaskBank/deleteDependency', body);
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

/* POST /Session/changeSession */
export interface SessionChangeRequest { list: string; sessionOwner: string }
export async function changeSession(body: SessionChangeRequest): Promise<{}> {
  return apiPost<SessionChangeRequest, {}>('/Session/changeSession', body);
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
export interface SessionActivateRequest { session: string; activator: string }
export async function activateSession(body: SessionActivateRequest): Promise<{}> {
  return apiPost<SessionActivateRequest, {}>('/Session/activateSession', body);
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

/* POST /Session/_getSessionListItems */
export interface SessionGetListItemsRequest { session: string }
export async function getSessionListItems(body: SessionGetListItemsRequest): Promise<SessionListItem[]> {
  return apiPost<SessionGetListItemsRequest, SessionListItem[]>('/Session/_getSessionListItems', body);
}

/* POST /Session/_getSessionForOwner */
export interface SessionGetForOwnerRequest { owner: string }
export async function getSessionForOwner(body: SessionGetForOwnerRequest): Promise<SessionDocument[]> {
  return apiPost<SessionGetForOwnerRequest, SessionDocument[]>('/Session/_getSessionForOwner', body);
}

/* POST /Session/_getActiveSessionForOwner */
export interface SessionGetActiveForOwnerRequest { owner: string }
export async function getActiveSessionForOwner(body: SessionGetActiveForOwnerRequest): Promise<SessionDocument[]> {
  return apiPost<SessionGetActiveForOwnerRequest, SessionDocument[]>('/Session/_getActiveSessionForOwner', body);
}