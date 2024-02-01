import { createApp, markRaw } from 'vue';
import { createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import createRouter from './pages/routes.js';
import App from './App.vue';
import checkAuthentication from './lib/checkAuthentication';

import JsonExcel from "vue-json-excel3";

// Primevue
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeflex/primeflex.css';
import PrimeVue from 'primevue/config';
import Paginator from 'primevue/paginator';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import ColumnGroup from 'primevue/columngroup';
import Menubar from 'primevue/menubar';
import Breadcrumb from 'primevue/breadcrumb';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Avatar from 'primevue/avatar';
import ScrollPanel from 'primevue/scrollpanel';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Sidebar from 'primevue/sidebar';
import Divider from 'primevue/divider';
import Message from 'primevue/message';
import InlineMessage from 'primevue/inlinemessage';
import Checkbox from 'primevue/checkbox';
import Menu from 'primevue/menu';
import SelectButton from 'primevue/selectbutton';
import Card from 'primevue/card';
import Timeline from 'primevue/timeline';
import Dialog from 'primevue/dialog';
import MultiSelect from 'primevue/multiselect';
import Calendar from 'primevue/calendar';

// Font awesome
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas)

// Global styles
import './assets/styles/main.css';

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
app.component('Row', Row);
app.component('ColumnGroup', ColumnGroup);
app.component('Menubar', Menubar);
app.component('Breadcrumb', Breadcrumb);
app.component('Tag', Tag);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Textarea', Textarea);
app.component('Avatar', Avatar);
app.component('ScrollPanel', ScrollPanel);
app.component('DataView', DataView);
app.component('Button', Button);
app.component('Dropdown', Dropdown);
app.component('Sidebar', Sidebar);
app.component('Divider', Divider);
app.component('Message', Message);
app.component('InlineMessage', InlineMessage);
app.component('Checkbox', Checkbox);
app.component('Menu', Menu);
app.component('SelectButton', SelectButton);
app.component('Card', Card);
app.component('Timeline', Timeline);
app.component('Dialog', Dialog);
app.component('MultiSelect', MultiSelect);
app.component('Calendar', Calendar);

// Global components
app.component('font-awesome-icon', FontAwesomeIcon);
app.component("downloadExcel", JsonExcel);

app.use(router);
app.use(pinia);
app.mount('#app');

checkAuthentication(router);
