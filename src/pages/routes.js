import {createRouter} from 'vue-router'
import HomePage from './home/Home.vue';
import LoginPage from './session/Login.vue';
import RegisterPage from './session/Register.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'Home',
    meta: {
      requiresAuth: true
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
  }
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}