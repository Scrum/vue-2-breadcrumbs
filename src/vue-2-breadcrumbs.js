export default {
  install (Vue) {
    Object.defineProperties(Vue.prototype, {
      $breadcrumbs: {
        get () {
          return this.$route.matched.map(r => {
            let path = ''
            let route = r

            Object.keys(this.$route.params).map(e => {
              path = route.path.replace(':' + e, this.$route.params[e])
            }, this)
            route.path = path
            return route
          }, this)
        }
      }
    })

    Vue.component('breadcrumbs', {
      methods: {
        getBreadcrumb: function (bc) {
          return typeof bc === 'function' ? bc(this.$route.params) : bc
        }
      },
      template: `
        <ol class="breadcrumb" v-if="$breadcrumbs.length">
          <li class="breadcrumb-item" v-if="crumb.meta.breadcrumb" v-for="(crumb, i) in $breadcrumbs">
            <router-link active-class="active" :to="{ path: crumb.path }" :tag="i != $breadcrumbs.length - 1 ? 'a' : 'span'">{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>
          </li>
        </ol>
        `
    })
  }
}
