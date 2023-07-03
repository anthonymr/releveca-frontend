import {useSession} from '/src/store/session'

export default function (router) {
  const store = useSession()
 
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.token) {
        next({ name: 'Login' })
      } else {
        next()
      }
    } else {
      next()
    }
  })
}
