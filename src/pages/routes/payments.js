import HomePage from './../home/Home.vue';

export default [
  {
    path: '/payments',
    component: HomePage,
    name: 'Pagos',
    meta: {
      requiresAuth: true,
      requiresCorporation: true,
      displayOnHeader: true
    },
    children: [
      {
        path: '/payments',
        component: HomePage,
        name: 'Ver últimos pagos',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
      {
        path: '/payments/new',
        component: HomePage,
        name: 'Nuevo pago',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
    ]
  }
]