import Corporations from './../corporations/Corporations.vue';
import CorporationsAll from './../corporations/CorporationsAll.vue';
import CorporationsNew from './../corporations/CorporationsNew.vue';
import CorporationsCurrent from './../corporations/CorporationsCurrent.vue';

export default {
  path: '/corporations',
  component: Corporations,
  redirect: '/corporations/all',
  name: 'Corporaciones',
  meta: {
    requiresAuth: true,
    requiresCorporation: true,
    displayOnHeader: true
  },
  children: [
    {
      path: 'all',
      component: CorporationsAll,
      name: 'Todas las corporaciones',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
    {
      path: 'new',
      component: CorporationsNew,
      name: 'Nueva corporación',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
    {
      path: 'current',
      component: CorporationsCurrent,
      name: 'Corporación seleccionada',
      meta: {
        requiresAuth: true,
        requiresCorporation: true,
        displayOnHeader: true
      },
    },
  ]
};

// import HomePage from './../home/Home.vue';

// export default 
//   {
//     path: '/corporations',
//     component: HomePage,
//     name: 'Corporaciones',
//     meta: {
//       requiresAuth: true,
//       requiresCorporation: true,
//       displayOnHeader: true
//     },
//     children: [
//       {
//         path: '/corporations/current',
//         component: HomePage,
//         name: 'Corporación actual',
//         meta: {
//           requiresAuth: true,
//           requiresCorporation: true,
//           displayOnHeader: true
//         },
//       },
//       {
//         path: '/corporations',
//         component: HomePage,
//         name: 'Ver todas las corporaciones',
//         meta: {
//           requiresAuth: true,
//           requiresCorporation: true,
//           displayOnHeader: true
//         },
//       },
//       {
//         path: '/corporations/select',
//         component: HomePage,
//         name: 'Seleccionar corproración',
//         meta: {
//           requiresAuth: true,
//           requiresCorporation: true,
//           displayOnHeader: true
//         },
//       },
//     ]
//   }
