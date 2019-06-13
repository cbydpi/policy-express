<template>
  <div class="main">
    <el-container style='height: 100%;width: 100%;'>
      <el-main style="height: 100%!important;">
        <router-view></router-view>
      </el-main>
      <el-footer v-if="qq">
        <slide-bar></slide-bar>
      </el-footer>
    </el-container>
  </div>

</template>

<script>
import SlideBar from './slide-bar'
import NavBar from './nav-bar'
export default {
  components: {
    SlideBar,
    NavBar
  },
  data () {
    return {
      qq: true
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
    getPath () {
      if (this.$route.name !== 'qa' && this.$route.name !== 'policy' && this.$route.name !== 'info') {
        this.qq = false
      } else {
        this.qq = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  position: absolute;
  top: 0px;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
}
.el-header{
  padding: 0 !important;
}
.el-main{
  padding: 0;
  }
</style>
