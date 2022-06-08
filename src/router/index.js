import { route } from 'quasar/wrappers'
import { useTokenStore } from 'src/stores/Token'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async(to,from,next)=>{
    const tokenStore = useTokenStore()
    tokenStore.setTokenLS()
    const requiresAuth = to.matched.some((record)=>record.meta.requiresAuth)
    const token = tokenStore.getToken
    if(requiresAuth){
      const data = await tokenStore.verifyToken()
      if(data.Status == -1){
        tokenStore.deleteToken()
        next('/login')
      } else {
        next()
      }
    } else {
      next()
    }
  })
  return Router
})
