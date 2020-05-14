import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Plugin from '../../index'

Vue.config.productionTip = false

Vue.use(Plugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
