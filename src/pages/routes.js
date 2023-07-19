import {createRouter} from 'vue-router'
import HomePage from './home/Home.vue';
import LoginPage from './session/Login.vue';
import RegisterPage from './session/Register.vue';
import CorporationPage from './session/Corporation.vue'; 

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'Home',
    meta: {
      requiresAuth: true,
      requiresCorporation: true,
    },
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'Login'
  },
  {
    path: '/register',
    component: RegisterPage,
    name: 'Register'
  },
  {
    path: '/corporation',
    component: CorporationPage,
    name: 'Corporation',
    meta: {
      requiresAuth: true,
      requiresCorporation: false,
    },
  }
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}