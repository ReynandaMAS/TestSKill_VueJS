import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { Icon } from '@iconify/vue';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component('Icon', Icon);
app.mount('#app');
// 