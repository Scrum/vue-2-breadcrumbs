import {ComponentOptions, PluginObject, VueConstructor, VNode} from 'vue'
import { Route } from 'vue-router';

type CallbackFunction = (params: any) => string;

class VueBreadcrumbs implements PluginObject<ComponentOptions<Vue>> {
  install(Vue: VueConstructor<Vue>, options = {}) {

    Object.defineProperties(Vue.prototype, {
      $breadcrumbs: {
        get(): Route[] {
          return this.$route.matched.map((route: Route) => ({
            ...route,
            path: route.path.length > 0 ? route.path : '/'
          }));
        }
      }
    });

    Vue.component('Breadcrumbs', Vue.extend({
      methods: {
        getBreadcrumb(bc: string | CallbackFunction): string {
          return typeof bc === 'function' ? bc.call(this, this.$route.params) : bc;
        },
        getPath(crumb: Route): string {
          let {path} = crumb;

          for (const [key, value] of Object.entries(this.$route.params)) {
            path = path.replace(`:${key}`, value);
          }

          return path;
        }
      },
      render(createElement): VNode {
        if (this.$breadcrumbs.length) {
          return createElement(
            'ol',
            {
              class: {
                'breadcrumb': true
              }
            },
            this.$breadcrumbs.map((crumb: Route, index: number) => {
              if (crumb && crumb.meta && crumb.meta.breadcrumb) {
                return createElement(
                  'li',
                  {
                    class: {
                      'breadcrumb-item': true
                    },
                    props: {
                      key: index
                    }
                  },
                  [
                    createElement(
                      'router-link',
                      {
                        attrs: {
                          'active-class': 'active'
                        },
                        props: {
                          to: { path: this.getPath(crumb) },
                          tag: index !== this.$breadcrumbs.length - 1 ? 'a' : 'span'
                        }
                      },
                      ` ${this.getBreadcrumb(crumb.meta.breadcrumb)}`
                    )
                  ]
                )
              }

              return createElement();
            })
          )
        }

        return createElement();
      },
      ...options
    }))
  }
}

export default new VueBreadcrumbs();

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(new VueBreadcrumbs())
}
