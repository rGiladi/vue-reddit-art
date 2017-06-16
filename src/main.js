import Vue from 'vue'
import App from './App'
import { toast } from '../static/functions.js'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  toast,
  template: '<App/>',
  components: { App }
})

Vue.prototype.$toast = toast
