import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Back from './utils/back'

Vue.config.productionTip = true

new Vue({
  router,
  store,
  Back,
  render: h => h(App)
}).$mount('#app')
