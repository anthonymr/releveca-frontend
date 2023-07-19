import Clients from './../clients/Clients.vue';
import ClientsAll from './../clients/ClientsAll.vue';
import ClientsNew from './../clients/ClientsNew.vue';

export default {
  path: '/clients',
  component: Clients,
  redirect: '/clients/all',
  name: 'Clientes',
  meta: {
    requiresAuth: true,
    requiresCorporation: true,
    displayOnHeader: true
  },
  children: [
    {
      path: 'all',
      component: ClientsAll,
      name: 'Todos los clientes',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
    {
      path: 'new',
      component: ClientsNew,
      name: 'Nuevo cliente',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
  ]
};
