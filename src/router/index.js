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
        { path: '/info', component: _import('info'), name: 'info', desc: '我的', meta: {auth: true} },
        { path: '/declare', component: _import('declare'), name: 'declare', desc: '政策申报', meta: {auth: true} },
        { path: '/userInfo', component: _import('userInfo'), name: 'userInfo', desc: '用户信息', meta: {auth: true} }
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
      // 不是在微信中打开
      next('/error')
    } else {
      // 微信中打开
      if (str.indexOf('code=') === -1) {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx57c02bfc15411a90&redirect_uri=http%3A%2F%2Fresource.ofaai.com%2Ftest%2F%23%2F'+to.path.substr(1)+'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
      } else {
        if (router.app.$cookie.get('openid') !== null) {
          next()
        } else{
          router.app.$http({
              url: router.app.URL + 'getOpenid?code=' + str.slice(str.indexOf('code=')+5, str.indexOf('&state')),
              method: 'get'
          }).then(({data}) => {
              if (data && data.code === 0) {
                router.app.$cookie.set('openid', data.openid)
                next()
              }
          })
        }
      }
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
