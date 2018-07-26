export default {
  install(Vue, options) {
    Object.defineProperties(Vue.prototype, {
      $breadcrumbs: {
        get() {
          const breadcrumbs = this.$route.matched.map(routeRecord => {
            let path = routeRecord.path.length ? routeRecord.path : '/';
            let route = routeRecord;

            Object.keys(this.$route.params).forEach(param => {
              path = route.path.replace(':' + param, this.$route.params[param]);
            }, this);

            route.path = path;

            return route;
          }, this);

          return breadcrumbs;
        }
      }
    });

    const defaults = {
      methods: {
        getBreadcrumb: function (bc) {
          return typeof bc === 'function' ? bc(this.$route.params) : bc;
        }
      },
      template: `
        <ol class="breadcrumb" v-if="$breadcrumbs.length">
          <li class="breadcrumb-item" v-if="crumb.meta.breadcrumb" v-for="(crumb, i) in $breadcrumbs">
            <router-link active-class="active" :to="{ path: crumb.path }" :tag="i != $breadcrumbs.length - 1 ? 'a' : 'span'">{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>
          </li>
        </ol>
      `
    };

    Vue.component('breadcrumbs', Object.assign(defaults, options));
  }
};
