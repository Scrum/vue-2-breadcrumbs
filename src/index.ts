import { ComponentOptions, PluginObject, VueConstructor, VNode } from 'vue'

import { RouteRecord } from 'vue-router';

type Dictionary<T> = { [key: string]: T }
type CallbackFunction = (params: Dictionary<string>) => string;

type Breadcrumbs = {
  label: string
  parent: string
}

function pathSeparate(path: string): string[] {
  const ROOT = '/';
  const SEPARATOR = '/';
  return path.slice(ROOT.length).split(SEPARATOR).reverse();
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
            const routeParents: RouteRecord[] = this.$router.resolve({ name: routeName }).route.matched;
            const routeParentLast: RouteRecord | undefined = routeParents.pop();

            if (routeParentLast) {
              matches.unshift(routeParentLast);

              let breadcrumb = routeParentLast.meta?.breadcrumb;

              if (breadcrumb === undefined) {
                if (routeParentLast.name) {
                  breadcrumb = routeParentLast.name;
                }
              }

              if (typeof breadcrumb === 'function') {
                breadcrumb = breadcrumb.call(this, this.$route.params);
              }

              if (breadcrumb?.parent) {
                return findParents.call(this, breadcrumb.parent, matches);
              }
            }
            return routeParents.concat(matches);
          }

          function resolveByPath(route: RouteRecord, params: Record<string, any>): void {
            const [label] = pathSeparate(route.path);
            const isRoot: boolean = route.parent === undefined;
            const isRootChildren = label.length === 0;
            const isDynamicPath = label.startsWith(':');

            if (isRoot && isRootChildren) {
              // TODO: add options home name
              // const label = 'Home';
              route.meta.breadcrumb = 'Home';
              return;
            }

            if (isRoot) {
              route.meta.breadcrumb = label;
              return;
            }

            if (isRootChildren && route.meta?.breadcrumb) {
              delete route.meta.breadcrumb;
              return;
            }

            if (isDynamicPath) {
              const key = label.slice(1);
              if (Reflect.has(params, key)) {
                route.meta.breadcrumb = params[key];
                return;
              }
            }

            route.meta.breadcrumb = label
            return;
          }

          return this.$route.matched
            .flatMap((route: RouteRecord) => {
              let routeRecord: RouteRecord[] = [route];
              let breadcrumb = route.meta?.breadcrumb;

              if (breadcrumb === undefined) {
                resolveByPath(route, this.$route.params);
              }

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
