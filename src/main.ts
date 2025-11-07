// import './style.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router'; // ensure your router export is named 'router' or update import
import initSse from './lib/sse-client';
import { useSessionStore } from './stores/session';
import './styles/global.css';

const app = createApp(App);

// Install Pinia
const pinia = createPinia();
app.use(pinia);

// Register router BEFORE mounting so <router-view/> is resolved
app.use(router);

// Mount the app
app.mount('#app');

// After Pinia is installed (and router registered), start SSE
// Keep the EventSource alive by storing it globally
const store = useSessionStore();
const es = initSse(store);
;(window as any).__es = es;