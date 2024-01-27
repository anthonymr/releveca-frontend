import HomePage from './../home/Home.vue';

export default {
  path: '/',
  component: HomePage,
  redirect: '/items/all',
  name: 'Inicio',
  meta: {
    requiresAuth: true,
    requiresCorporation: true,
    displayOnHeader: true
  },
};