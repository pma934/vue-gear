import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios'
import VueResource from 'vue-resource'
import Mock from 'mockjs'

Vue.use(VueResource)
Vue.prototype.$axios = axios
Vue.prototype.$Mock = Mock //require('mockjs')
Mock.mock(/^http\:\/\/jsonplaceholder\.[\d\w\.\/]*$/, Mock.Random.dataImage('200x100', 'Hello Mock.js!'));
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
