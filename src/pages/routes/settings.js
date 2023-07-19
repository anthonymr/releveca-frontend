import HomePage from './../home/Home.vue';

export default [
  {
    path: '/settings',
    component: HomePage,
    name: 'Configuraciones',
    meta: {
      requiresAuth: true,
      requiresCorporation: true,
      displayOnHeader: true
    },
  }
]