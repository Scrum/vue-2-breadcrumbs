declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

import { RouteRecord } from "vue-router";

declare module 'vue/types/vue' {
  interface Vue {
    $breadcrumbs: RouteRecord[]
  }
}
