<template>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
    mounted () {
      var str = window.location.href

      let data = {
        'openid': this.$cookie.get('openid'),
        'policyId': str.slice(str.indexOf('state=')+6, str.indexOf('#')),
        'reqType': 'list'
      }
      sessionStorage.setItem('policyInfo', JSON.stringify(data))
      this.$router.push({
        name: 'policyInfo'
      })
    }
  }
</script>

<style>
</style>