import { createApp, markRaw } from 'vue';
import { createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import createRouter from './pages/routes.js';
import App from './App.vue';
import checkAuthentication from './lib/checkAuthentication';

// Primevue
import "primevue/resources/themes/lara-light-indigo/theme.css";
import PrimeVue from 'primevue/config';
import Paginator from 'primevue/paginator';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

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

const pinia = createPinia();
const router = createRouter(createWebHistory());
const app = createApp(App);

// Add PrimeVue to app
app.use(PrimeVue);
app.use(ToastService);

// Add router access to pinia
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

// PrimeVue global components
app.component('Paginator', Paginator);
app.component('Toast', Toast);
app.component('DataTable', DataTable);
app.component('Column', Column)

// Custom global components
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('v-select', VueSelect );

app.use(router);
app.use(pinia);
app.mount('#app');

checkAuthentication(router);
