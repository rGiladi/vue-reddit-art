import Vue from 'vue'
import Router from 'vue-router'
import Arts from '@/components/Arts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Arts',
      component: Arts
    }
  ],
  mode: 'hash'
})
