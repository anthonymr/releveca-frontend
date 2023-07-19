import {useSession} from '/src/store/session'

export default function (router) {
  const store = useSession()
 
  router.beforeEach((to, from, next) => {
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
      const requiresCorporation = to.matched.some(record => record.meta.requiresCorporation);

      if(requiresAuth && ! store.token) next('/login');
      else if(requiresCorporation && !store.corporation) next('/corporation');
      else next();
  })
}
