import HomePage from './../home/Home.vue';

export default [
  {
    path: '/corporations',
    component: HomePage,
    name: 'Corporaciones',
    meta: {
      requiresAuth: true,
      requiresCorporation: true,
      displayOnHeader: true
    },
    children: [
      {
        path: '/corporations/current',
        component: HomePage,
        name: 'Corporación actual',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
      {
        path: '/corporations',
        component: HomePage,
        name: 'Ver todas las corporaciones',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
      {
        path: '/corporations/select',
        component: HomePage,
        name: 'Seleccionar corproración',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
    ]
  }
]