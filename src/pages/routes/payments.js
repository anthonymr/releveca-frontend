import Payments from './../payments/Payments.vue';
import PaymentsAll from './../payments/PaymentsAll.vue';
import PaymentsNew from './../payments/PaymentsNew.vue';

export default {
  path: '/payments',
  component: Payments,
  redirect: '/payments/all',
  name: 'Pagos',
  meta: {
    requiresAuth: true,
    requiresCorporation: true,
    displayOnHeader: true
  },
  children: [
    {
      path: 'all',
      component: PaymentsAll,
      name: 'Todos los pagos',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
    {
      path: 'new',
      component: PaymentsNew,
      name: 'Nuevo pago',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
  ]
};
