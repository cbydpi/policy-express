<template>
  <div class="slide_bar">
    <el-row>
      <el-col :span="6" style="text-align: center;" :class="this.$route.name === 'home' ? 'slidebarblue' : ''" @click.native="routeLink('home')">
        <i style="font-size: 2.5rem;" class="cbiconfont cbicon-home"></i>
        <p style="margin: 0;font-size: 1.6rem;">测评</p>
      </el-col>
      <el-col :span="6" style="text-align: center;" :class="this.$route.name === 'policy' ? 'slidebarblue' : ''" @click.native="routeLink('policy')">
        <i style="font-size: 2.5rem;" class="cbiconfont cbicon-policy"></i>
        <p style="margin: 0;font-size: 1.6rem;">政策</p>
      </el-col>
      <el-col :span="6" style="text-align: center;" :class="this.$route.name === 'qa' ? 'slidebarblue' : ''" @click.native="routeLink('qa')">
        <i style="font-size: 2.5rem;" class="cbiconfont cbicon-qa"></i>
        <p style="margin: 0;font-size: 1.6rem;">咨询</p>
      </el-col>
      <el-col :span="6" style="text-align: center;" :class="this.$route.name === 'info' ? 'slidebarblue' : ''" @click.native="routeLink('info')">
        <i style="font-size: 2.5rem;" class="cbiconfont cbicon-user"></i>
        <p style="margin: 0;font-size: 1.6rem;">我的</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    routeLink (r) {
      this.$router.push({ name: r })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.slide_bar{
  padding-top: .8rem;
}
.slidebarblue{
  color: #0178ff;
}
</style>
