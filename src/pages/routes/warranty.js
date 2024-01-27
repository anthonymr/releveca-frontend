import Warranty from './../warranty/Warranty.vue';
import WarrantyNew from './../warranty/WarrantyNew.vue';
import WarrantyAll from './../warranty/WarrantyAll.vue';
import WarrantyEdit from './../warranty/WarrantyEdit.vue';
import WarrantyReports from './../warranty/WarrantyReports.vue';

export default {
  path: '/warranty',
  component: Warranty,
  redirect: '/warranty/all',
  name: 'Garantía',
  meta: {
    requiresAuth: true,
    requiresCorporation: true,
    displayOnHeader: true
  },
  children: [
    {
        path: 'all',
        component: WarrantyAll,
        name: 'Garantías',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
    },
    {
        path: 'new',
        component: WarrantyNew,
        name: 'Nueva garantía',
        meta: {
          requiresAuth: true,
          requiresCorporation: true,
          displayOnHeader: true
        },
    },
    {
      path: 'reports',
      component: WarrantyReports,
      name: 'Reportes de garantías',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
    {
      path: ':id',
      component: WarrantyEdit,
      name: 'Ver garantía',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: false
      },
    }
  ]
};
