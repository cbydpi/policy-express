// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { routeName } from '@/utils'
import '@/element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/index.css'
import VueCookie from 'vue-cookie'
import httpRequest from '@/utils/httpRequest'
import '@/assets/icon/iconfont.css'
import VueAweSomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAweSomeSwiper)

const URL = 'http://39.105.41.93:8080/nature/wx/'
const wsURL = 'ws://39.105.41.93:8282/renren-fast/'
Vue.prototype.URL = URL
Vue.prototype.wsURL = wsURL

Vue.prototype.routeName = routeName
Vue.use(VueCookie)
Vue.prototype.$http = httpRequest

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
