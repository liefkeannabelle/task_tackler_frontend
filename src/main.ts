// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import initSse from './lib/sse-client';
import './styles/global.css'

const app = createApp(App);
app.use(createPinia());
app.use(router);
initSse();
app.mount('#app');