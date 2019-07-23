import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/elementtable',
      name: 'elementtable',
      component: () => import( /* webpackChunkName: "about" */ './views/ElementTable.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/sass',
      name: 'sass',
      component: () => import('./views/SassTest.vue')
    },
    {
      path: '/poke',
      name: 'poke',
      component: () => import('./views/PokeApiDemo.vue')
    },
    {
      path: '/antv',
      name: 'antv',
      component: () => import('./views/AntvG6.vue')
    },
    {
      path: '/tree',
      name: 'tree',
      component: () => import('./views/AntvG6Tree.vue')
    },
    {
      path: '/readExcel',
      name: 'readExcel',
      component: () => import('./views/ReadExcel.vue')
    },
    {
      path: '/codePen',
      name: 'codePen',
      component: () => import('./views/CodePen.vue')
    },
    {
      path: '/RotateCardTest',
      name: '旋转卡片测试',
      component: () => import('./views/RotateCardTest.vue')
    }
  ]
})
