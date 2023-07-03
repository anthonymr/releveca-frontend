import {createRouter} from 'vue-router'
import HomePage from './home/Home.vue';
import LoginPage from './session/Login.vue';
import RegisterPage from './session/Register.vue';

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  }
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}