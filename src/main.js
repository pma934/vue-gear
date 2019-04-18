import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.prototype.$axios = axios
Vue.prototype.$Mock = require('mockjs')
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
