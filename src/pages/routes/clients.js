import HomePage from './../home/Home.vue';

export default [
  {
    path: '/clients',
    component: HomePage,
    name: 'Clientes',
    meta: {
      requiresAuth: true,
      requiresCorporation: true,
      displayOnHeader: true
    },
    children: [
      {
        path: '/clients',
        component: HomePage,
        name: 'Ver todos',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
      {
        path: '/clients/new',
        component: HomePage,
        name: 'Nuevo cliente',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
    ]
  }
]