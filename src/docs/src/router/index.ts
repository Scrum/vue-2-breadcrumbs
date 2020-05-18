import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteConfig, Dictionary } from 'vue-router/types/router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      breadcrumb: 'Home'
    },
    children: [
      {
        path: 'settings',
        name: 'settings',
        components: {
          content: { template: `<router-view/>` },
          sidebar: { template: `<div><h4>Settings:</h4><router-link :to="{name:'entities', params: {entityName:'entity1'}}">entities 1</router-link> </br><router-link :to="{name:'entities', params: {entityName:'entity2'}}">entities 2</router-link> </br><router-link :to="{name:'entities', params: {entityName:'entity3'}}">entities 3</router-link></div>` }
        },
        meta: {
          breadcrumb: 'Settings'
        },
        children: [{
            path: 'entities/:entityName',
            name: 'entities',
            component: { template: `<router-view/>` },
            redirect: {
              name: 'entityView'
            },
            meta: {
              breadcrumb: (routeParams: Dictionary<any>) => `${routeParams.entityName}`
            },
            children: [{
                path: 'view',
                name: 'entityView',
                component: { template: '<div><h3>View</h3><pre>{{ $route.params }}</pre></div>' },
                props: true,
                meta: {
                  breadcrumb: 'View'
                },
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    component: { template: '<router-view/>' },
    meta: {
      breadcrumb: 'About'
    },
    children: [
      {
          path: '',
          name: 'About',
          component: { template: '<h2>About</h2>' }
      },
      {
          path: 'foo',
          component: { template: '<h2>Foo</h2>' },
          meta: {
              breadcrumb: () => `foo ${1 + 1}`
          }
      },
      {
          path: 'bar',
          component: { template: '<h2>Bar</h2>' },
          meta: {
              breadcrumb: 'bar'
          }
      },
      {
          name: 'baz',
          path: 'baz',
          component: { template: '<h2>Baz</h2>' },
          meta: {
            breadcrumb() {
                const { name } = this.$route;
                return `name "${name}" of context route`;
            }
          }
      },
      {
          path: ':id',
          component: { template: '<router-view/>' },
          meta: {
            breadcrumb: (params: Dictionary<any>) => `Other Feed ${params.id}`
          },
          redirect: {
            name: 'view'
          },
          children: [
            {
              path: 'view',
              name: 'view',
              component: { template: '<div><h2>View</h2><pre>{{ $route.params }}</pre></div>' },
              meta: {
                breadcrumb: 'View'
              }
            }
          ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
