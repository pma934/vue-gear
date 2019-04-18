import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router)
Vue.use(ElementUI);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/elementtable',
      name: 'elementtable',
      component: () => import(/* webpackChunkName: "about" */ './views/ElementTable.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/sass',
      name: 'sass',
      component: () => import('./views/SassTest.vue')
    }
  ]
})
