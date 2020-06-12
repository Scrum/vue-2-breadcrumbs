import { ComponentOptions, PluginObject, VueConstructor, VNode } from 'vue'

import { RouteRecord } from 'vue-router';

type Dictionary<T> = { [key: string]: T }
type CallbackFunction = (params: Dictionary<string>) => string;

type Breadcrumbs = {
  label: string | CallbackFunction
  parent: string
}

class VueBreadcrumbs implements PluginObject<ComponentOptions<Vue>> {
  public install(Vue: VueConstructor<Vue>, options: Dictionary<any> = {}) {

    if (options.template) {
      options.render = undefined;
    }

    Object.defineProperties(Vue.prototype, {
      $breadcrumbs: {
        get(): RouteRecord[] {
          return this.$route.matched
            .flatMap((route: RouteRecord) => {
              let routeRecord: RouteRecord[] = [route];

              if (route.meta?.breadcrumb?.parent) {
                const matched = this.$router.resolve({ name: route.meta.breadcrumb.parent }).route.matched

                routeRecord = [...matched, ...routeRecord];
              }

              return routeRecord
            })
            .map((route: RouteRecord) => route.path.length === 0
              ? ({ ...route, path: '/' })
              : route
            );
        }
      }
    });

    Vue.component('Breadcrumbs', Vue.extend({
      methods: {
        getBreadcrumb(bc: string | CallbackFunction | Breadcrumbs): string {
          let name = bc;

          if (typeof name === 'object') {
            name = name.label
          }

          if (typeof name === 'function') {
            return name.call(this, this.$route.params);
          }

          return name;
        },
        getPath(crumb: RouteRecord): string {
          let { path } = crumb;

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
            this.$breadcrumbs.map((crumb: RouteRecord, index: number) => {
              if (crumb?.meta?.breadcrumb) {
                let label = this.getBreadcrumb(crumb.meta.breadcrumb);
                if (label === '') {
                  console.log('Breadcrumb blank. Ignoring');
                } else {
                  console.log('Breadcrumb valid', crumb?.meta?.breadcrumb);
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
                          props: {
                            to: { path: this.getPath(crumb) },
                            tag: index !== this.$breadcrumbs.length - 1 ? 'a' : 'span'
                          }
                        },
                        ` ${label}`
                      )
                    ]
                  )
                }
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
