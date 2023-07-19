import Orders from './../orders/Orders.vue';
import OrdersAll from './../orders/OrdersAll.vue';
import OrdersNew from './../orders/OrdersNew.vue';

export default {
  path: '/orders',
  component: Orders,
  redirect: '/orders/all',
  name: 'Pedidos',
  meta: {
    requiresAuth: true,
    requiresCorporation: true,
    displayOnHeader: true
  },
  children: [
    {
      path: 'all',
      component: OrdersAll,
      name: 'Todos los pedidos',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
    {
      path: 'new',
      component: OrdersNew,
      name: 'Nuevo pedido',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
  ]
};
