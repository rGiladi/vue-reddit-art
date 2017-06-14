import Vue from 'vue'
import App from './App'
import router from './router'
import { toast } from '../static/functions.js'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  toast,
  template: '<App/>',
  components: { App }
})

Vue.prototype.$toast = toast
