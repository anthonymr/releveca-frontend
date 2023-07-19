import HomePage from './../home/Home.vue';

export default [
  {
    path: '/items',
    component: HomePage,
    name: 'Artículos',
    meta: {
      requiresAuth: true,
      requiresCorporation: true,
      displayOnHeader: true
    },
    children: [
      {
        path: '/items',
        component: HomePage,
        name: 'Ver todos',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
      {
        path: '/items/new',
        component: HomePage,
        name: 'Nuevo artículo',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
      },
    ]
  }
]