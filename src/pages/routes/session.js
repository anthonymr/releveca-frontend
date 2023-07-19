import LoginPage from './../session/Login.vue';
import RegisterPage from './../session/Register.vue';
import CorporationPage from './../session/Corporation.vue';

export default [
  {
    path: '/login',
    component: LoginPage,
    name: 'Inicio de sesión',
    meta: {
      displayOnHeader: false
    }
  },
  {
    path: '/register',
    component: RegisterPage,
    name: 'Registro de nuevo usuario',
    meta: {
      displayOnHeader: false
    }
  },
  {
    path: '/corporation',
    component: CorporationPage,
    name: 'Seleccionar corporación',
    meta: {
      requiresAuth: true,
      requiresCorporation: false,
      displayOnHeader: false
    },
  },
]