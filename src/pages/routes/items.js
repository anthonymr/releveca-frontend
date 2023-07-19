import Items from './../items/Items.vue';
import ItemsAll from './../items/ItemsAll.vue';
import ItemsNew from './../items/ItemsNew.vue';

export default {
  path: '/items',
  component: Items,
  redirect: '/items/all',
  name: 'Artículos',
  meta: {
    requiresAuth: true,
    requiresCorporation: true,
    displayOnHeader: true
  },
  children: [
    {
      path: 'all',
      component: ItemsAll,
      name: 'Todos los artículos',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
    {
      path: 'new',
      component: ItemsNew,
      name: 'Nuevo artículo',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
  ]
};
