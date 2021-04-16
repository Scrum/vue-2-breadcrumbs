export default {
  buildModules: ['@nuxt/typescript-build'],
  plugins: [{ssr: false, src: '~/plugins/vue-breadcrumbs.ts'}]
}