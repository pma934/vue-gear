import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios'
import VueResource from 'vue-resource'
import Mock from 'mockjs'
import G6 from '@antv/g6'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(VueResource)
Vue.prototype.Global = {a:1};
Vue.prototype.$G6 = G6
Vue.prototype.$axios = axios
Vue.prototype.$Mock = Mock //require('mockjs')
Mock.mock(/^http\:\/\/jsonplaceholder\.[\d\w\.\/]*$/, Mock.Random.dataImage('200x100', 'Hello Mock.js!'));
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
