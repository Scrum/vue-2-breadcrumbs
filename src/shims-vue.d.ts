import { RouteRecord } from "vue-router";

declare module 'vue/types/vue' {
  interface Vue {
    $breadcrumbs: RouteRecord[]
  }
}
