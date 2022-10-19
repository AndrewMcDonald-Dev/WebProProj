import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import App from './App.vue';
import router from './router';

import './assets/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
