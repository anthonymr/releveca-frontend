import { createApp, markRaw } from 'vue';
import { createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import createRouter from './pages/routes.js';
import App from './App.vue';
import checkAuthentication from './lib/checkAuthentication';

// Primevue
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeflex/primeflex.css';
import PrimeVue from 'primevue/config';
import Paginator from 'primevue/paginator';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menubar from 'primevue/menubar';
import Breadcrumb from 'primevue/breadcrumb';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import ScrollPanel from 'primevue/scrollpanel';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Sidebar from 'primevue/sidebar';

// Font awesome
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas)

// Global styles
import './assets/styles/main.css';
// import './assets/styles/forms.css';
// import './assets/styles/buttons.css';
// import './assets/styles/headers.css';
// import './assets/styles/alerts.css';
// import './assets/styles/transitions.css';
// import './assets/styles/cards.css';

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
app.component('Column', Column);
app.component('Menubar', Menubar);
app.component('Breadcrumb', Breadcrumb);
app.component('Tag', Tag);
app.component('InputText', InputText);
app.component('Avatar', Avatar);
app.component('ScrollPanel', ScrollPanel);
app.component('DataView', DataView);
app.component('Button', Button);
app.component('InputNumber', InputNumber);
app.component('Dropdown', Dropdown);
app.component('Sidebar', Sidebar);

// Global components
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(pinia);
app.mount('#app');

checkAuthentication(router);
