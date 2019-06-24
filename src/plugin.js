import breadcrumbs from './components/breadcrumbs.vue';

export default (Vue, options) => {
  Object.defineProperties(Vue.prototype, {
    $breadcrumbs: {
      get() {
        return this.$route.matched.map(route => ({
          ...route,
          path: route.path.length > 0 ? route.path : '/'
        }));
      }
    }
  });

  Vue.component(breadcrumbs.name, {
    ...breadcrumbs,
    ...options
  });
};
