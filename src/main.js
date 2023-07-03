import { createApp } from 'vue';
import { createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import createRouter from './pages/routes.js';
import App from './App.vue';
import checkAuthentication from './lib/checkAuthentication';

// Global styles
import './assets/styles/main.css';
import './assets/styles/forms.css';
import './assets/styles/buttons.css';
import './assets/styles/headers.css';
import './assets/styles/alerts.css';
import './assets/styles/transitions.css';

// Global components
import BaseAlert from './components/base/BaseAlert.vue';

// Global mixins
import { clearAlerts } from './mixins/BaseAlert.js';

const store = createPinia();
const router = createRouter(createWebHistory());
const app = createApp(App);

app.component('BaseAlert', BaseAlert);
app.mixin({
  methods: {
    $clearAlerts: clearAlerts
  }
});

app.use(router).use(store).mount('#app');

checkAuthentication(router);
