<template>
  <div class="main">
    <el-container style='height: 100%;width: 100%;'>
      <el-header>
        <nav-bar></nav-bar>
      </el-header>
      <el-main style="height: 100%!important;">
        <router-view></router-view>
      </el-main>
      <el-footer>
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

  },
  methods: {

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
