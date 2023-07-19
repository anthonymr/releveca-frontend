import HomePage from './../home/Home.vue';

export default [
  {
    path: '/orders',
    component: HomePage,
    name: 'Pedidos',
    meta: {
      requiresAuth: true,
      requiresCorporation: true,
      displayOnHeader: true
    },
    children: [
      {
        path: '/orders',
        component: HomePage,
        name: 'Ver todos',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
      {
        path: '/orders/new',
        component: HomePage,
        name: 'Nuevo pedido',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
    ]
  }
]