import Settings from './../settings/Settings.vue';

export default 
  {
    path: '/settings',
    component: Settings,
    name: 'Configuraciones',
    meta: {
      requiresAuth: true,
      requiresCorporation: true,
      displayOnHeader: true
    },
  }
