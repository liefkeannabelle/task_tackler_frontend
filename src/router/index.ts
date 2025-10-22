import { createRouter, createWebHistory } from 'vue-router';

const ListsView = () => import('../views/ListsView.vue');
const TaskBankView = () => import('../views/TaskBankView.vue');
const SessionView = () => import('../views/SessionView.vue');

const routes = [
  { path: '/', redirect: '/lists' },
  { path: '/lists', name: 'Lists', component: ListsView },
  { path: '/taskbank', name: 'TaskBank', component: TaskBankView },
  { path: '/sessions', name: 'Sessions', component: SessionView },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});