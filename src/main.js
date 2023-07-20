import { createApp } from 'vue';
import { createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import createRouter from './pages/routes.js';
import App from './App.vue';
import checkAuthentication from './lib/checkAuthentication';

// Font awesome
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas)

// Global styles
import './assets/styles/main.css';
import './assets/styles/forms.css';
import './assets/styles/buttons.css';
import './assets/styles/headers.css';
import './assets/styles/alerts.css';
import './assets/styles/transitions.css';
import './assets/styles/cards.css';
import './assets/styles/tables.css';

// Global components
import BaseAlert from './components/base/BaseAlert.vue';
import BaseTable from './components/base/BaseTable.vue';

const store = createPinia();
const router = createRouter(createWebHistory());
const app = createApp(App);

app.component('BaseAlert', BaseAlert);
app.component('BaseTable', BaseTable);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router).use(store).mount('#app');

checkAuthentication(router);
