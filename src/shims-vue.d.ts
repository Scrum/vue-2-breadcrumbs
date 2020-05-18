import { Route } from "vue-router";

declare module 'vue/types/vue' {
  interface Vue {
    $breadcrumbs: Route[]
  }
}
