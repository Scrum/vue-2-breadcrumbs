import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ab59ffa2 = () => interopDefault(import('../pages/Fun.vue' /* webpackChunkName: "pages/Fun" */))
const _2a246772 = () => interopDefault(import('../pages/Fun/index.vue' /* webpackChunkName: "pages/Fun/index" */))
const _43acc34c = () => interopDefault(import('../pages/Fun/_id.vue' /* webpackChunkName: "pages/Fun/_id" */))
const _be8f0d46 = () => interopDefault(import('../pages/Fun/_id/index.vue' /* webpackChunkName: "pages/Fun/_id/index" */))
const _43f477f5 = () => interopDefault(import('../pages/Fun/_id/_name.vue' /* webpackChunkName: "pages/Fun/_id/_name" */))
const _36a272b8 = () => interopDefault(import('../pages/Fun/_id/_name/index.vue' /* webpackChunkName: "pages/Fun/_id/_name/index" */))
const _1c9f1422 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Fun",
    component: _ab59ffa2,
    children: [{
      path: "",
      component: _2a246772,
      name: "Fun"
    }, {
      path: ":id",
      component: _43acc34c,
      children: [{
        path: "",
        component: _be8f0d46,
        name: "Fun-id"
      }, {
        path: ":name",
        component: _43f477f5,
        children: [{
          path: "",
          component: _36a272b8,
          name: "Fun-id-name"
        }]
      }]
    }]
  }, {
    path: "/",
    component: _1c9f1422,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
