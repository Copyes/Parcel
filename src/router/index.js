import Vue from 'vue'
import Router from 'vue-router'
// 此种方式引入即可实现路由懒加载
const Test = () => import('../pages/test/test.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test
    }
  ]
})
