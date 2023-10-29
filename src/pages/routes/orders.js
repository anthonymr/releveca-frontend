import Orders from './../orders/Orders.vue';
import OrdersAll from './../orders/OrdersAll.vue';
import  OrdersPending from './../orders/OrdersPending.vue';
import  OrdersDebt from './../orders/OrdersDebt.vue';
import OrderShow from './../orders/OrderShow.vue';

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
      name: 'Pedidos',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
    {
      path: 'waiting',
      component: OrdersPending,
      name: 'Pedidos por aprobar',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
    {
      path: 'debt',
      component: OrdersDebt,
      name: 'Pedidos con deuda',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
    {
      path: ':id',
      component: OrderShow,
      name: 'Pedido',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: false
      },
    }
  ],

};
