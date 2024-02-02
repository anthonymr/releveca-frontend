import {useSession} from '/src/store/session'

export default function (router) {
  const store = useSession()
 
  router.beforeEach((to, _from, next) => {
      if(localStorage.getItem('token') && !store.token) store.token = localStorage.getItem('token');
      if(localStorage.getItem('corporation') && !store.corporation) store.corporation = JSON.parse(localStorage.getItem('corporation'));

      const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
      const requiresCorporation = to.matched.some(record => record.meta.requiresCorporation);

      if(requiresAuth && !store.token) next('/login');
      else if(requiresCorporation && !store.corporation) next('/corporation');
      else next();
  })
}
