import HomePage from './../home/Home.vue';

export default {
  path: '/',
  component: HomePage,
  name: 'Inicio',
  meta: {
    requiresAuth: true,
    requiresCorporation: true,
    displayOnHeader: true
  },
};