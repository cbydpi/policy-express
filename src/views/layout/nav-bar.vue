<template>
  <div class="nav_bar">
    <i class="el-icon-arrow-left" style="font-size: 2rem;position: absolute;top: 1.5rem;left: 1rem;" @click="goBack"></i>
    <p style="font-size: 2rem;margin: 0;text-align: center;">{{path}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      path: ''
    }
  },
  mounted () {
    this.getPath()
  },
  watch: {
  // 监听路由参数发生变化，重新加载页面
    '$route': 'getPath'
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getPath () {
      this.path = this.routeName(this.$route.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_bar{
  padding: 1rem 1rem;
}
</style>
