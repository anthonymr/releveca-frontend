import {createRouter} from 'vue-router'
import HomePage from './home/Home.vue';
import LoginPage from './session/Login.vue';

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/login',
    component: LoginPage
  }
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}