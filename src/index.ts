import { ComponentOptions, PluginObject, VueConstructor, VNode } from 'vue'

import { RouteRecord } from 'vue-router';

type Dictionary<T> = { [key: string]: T }
type CallbackFunction = (params: Dictionary<string>) => string;

type Breadcrumbs = {
  label: string
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
          function findParents(this: Vue, routeName: string, matches: RouteRecord[] = []): RouteRecord[] {
            const [routeParent]: RouteRecord[] = this.$router.resolve({ name: routeName }).route.matched;
            matches.unshift(routeParent);
            const parentName: string = routeParent.meta?.breadcrumb?.parent;

            if (parentName) {
              return findParents.call(this, routeParent.meta.breadcrumb.parent, matches);
            }

            return matches;
          }

          return this.$route.matched
            .flatMap((route: RouteRecord) => {
              let routeRecord: RouteRecord[] = [route];
              let breadcrumb = route.meta?.breadcrumb;

              if (typeof breadcrumb === 'function') {
                breadcrumb = breadcrumb.call(this, this.$route.params);
              }

              if (breadcrumb?.parent) {
                const matched = findParents.call(this, breadcrumb.parent, []);
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

          if (typeof name === 'function') {
            name = name.call(this, this.$route.params);
          }

          if (typeof name === 'object') {
            name = name.label
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
                const label = this.getBreadcrumb(crumb.meta.breadcrumb);
                if (label?.length > 0) {
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
