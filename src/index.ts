import {ComponentOptions, PluginObject, VueConstructor} from 'vue'
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
      template: `
      <ol
          class="breadcrumb"
          v-if="$breadcrumbs.length"
      >
          <li
              class="breadcrumb-item"
              v-if="crumb.meta.breadcrumb"
              v-for="(crumb, i) in $breadcrumbs"
              :key="i"
          >
              <router-link
                  active-class="active"
                  :to="{ path: getPath(crumb) }"
                  :tag="i != $breadcrumbs.length - 1 ? 'a' : 'span'"
              >
                  {{ getBreadcrumb(crumb.meta.breadcrumb) }}
              </router-link>
          </li>
      </ol>`,
      ...options
    }))
  }
}

export default new VueBreadcrumbs();
