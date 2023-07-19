import {useSession} from '/src/store/session'

export default function (router) {
  const store = useSession()
 
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.token) {
        next('/login')
      } else {

        if (to.matched.some(record => record.meta.requiresCorporation)) {
          if (!store.corporation) {
            next('/corporation')
          }
        }
        
        next()
      }
    } else {
      next()
    }
  })
}
