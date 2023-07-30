import { createApp, markRaw } from 'vue';
import { createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import createRouter from './pages/routes.js';
import App from './App.vue';
import checkAuthentication from './lib/checkAuthentication';

// Primevue
import PrimeVue from 'primevue/config';
import Paginator from 'primevue/paginator';

// Vue-select
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

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
import BasePagination from './components/base/BasePagination.vue';

const pinia = createPinia();
const router = createRouter(createWebHistory());
const app = createApp(App);

// Add PrimeVue to app
app.use(PrimeVue);

// Add router access to pinia
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

// PrimeVue global components
app.component('Paginator', Paginator);

// Custom global components
app.component('BaseAlert', BaseAlert);
app.component('BaseTable', BaseTable);
app.component('BasePagination', BasePagination);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('v-select', VueSelect );

app.use(router).use(pinia).mount('#app');

checkAuthentication(router);
