import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./import-' + process.env.NODE_ENV)
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/error', component: _import('error'), name: 'error', desc: '报错页' },
    { path: '/', component: _import('home'), name: 'homePage', desc: '首页', meta: {auth: true}, query: {id: '123'} },
    { path: '/home', component: _import('home'), name: 'home', desc: '首页', meta: {auth: true}, query: {id: '123'} },
    {
      path: '/',
      component: _import('layout/index'),
      name: 'layout',
      redirect: {name: 'policy'},
      desc: '上左右整体布局',
      children: [
        { path: '/policy', component: _import('policy'), name: 'policy', desc: '列表', meta: {auth: true} },
        { path: '/qa', component: _import('qa'), name: 'qa', desc: '咨询', meta: {auth: true} },
        { path: '/policyInfo', component: _import('policyInfo'), name: 'policyInfo', desc: '政策详情', meta: {auth: true} },
        { path: '/info', component: _import('info'), name: 'info', desc: '我的', meta: {auth: true} }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  /* eslint-disable */
  var str = window.location.href
  var browser = {
    versions: function () {
      var u = navigator.userAgent
      return { // 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') == -1 // 是否web应该程序，没有头部与底部
      }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  /* eslint-enable */
  if (browser.versions.mobile) { // 判断是否是移动设备打开。browser代码在下面
    var ua = navigator.userAgent.toLowerCase() // 获取判断用的对象
    if (ua.indexOf('micromessenger') === -1 && to.path !== '/error') {
      // 在微信中打开
      next()
      console.log('this.wsURL')
      // this.$cookie.set('token', data.token, { expires: `${data.expire || 0}s` })
    } else {
      console.log(from.fullPath)
      if (str.indexOf('code=') === -1) {
//      next()
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx57c02bfc15411a90&redirect_uri=http%3A%2F%2Fwx.ofaai.com%2Fpolicy%2F%23%2Fhome&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
      } else {
        next()
      }
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx606d5147a434e84b&redirect_uri=' + encodeURIComponent('http://192.168.31.141:8080') + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      next()
    }
  } else {
    // 否则就是PC浏览器打开
    if (to.path === '/error') {
      next()
    } else {
      next('/error')
    }
  }
})

export default router
