// import Vue from 'vue'
// import router from '@/router'

/**
 * 获取当前页
 */
export function routeName (path) {
  switch (path) {
    case 'policy':
      return '政策'
    case 'qa':
      return '咨询'
    case 'info':
      return '我的'
    case 'policyInfo':
      return '政策详情'
    case 'declare':
      return '政策申报'
  }
}
