<template>
  <div style="width: 100%;height: 100%;">
    <el-container style='height: 100%;width: 100%;'>
      <el-header style="height: 30px;">
        <h3 style="text-align: center;margin: 0;" v-if="policyData">{{policyData.name}}</h3>
      </el-header>
      <el-main style="height: 100%!important;padding: 5px;" v-if="policyData">
        <div class="listStyle" v-for="(value,index) in policyData.contentList" v-bind:key="index">
          <div></div>
          <h4>{{value.paramSign}}</h4>
          <p>{{value.content}}</p>
        </div>
      </el-main>
      <el-footer style="height: 40px;padding: 0;">
        <el-button type="primary" style="width: 100%;margin: 0;" @click.native="routeChat">专家申报入口</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      policyInfo: null,
      policyData: null
    }
  },
  mounted () {
    this.getPolicyData()
  },
  methods: {
    getPolicyData () {
      this.$http({
        url: this.URL + 'policyInfo',
        method: 'post',
        data: sessionStorage.getItem('policyInfo')
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.policyData = data.policy
        } else {
        }
      })
    },
    routeChat () {
      this.$router.push({ name: 'qa' })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.listStyle{
  padding: 1rem;
  border-left: solid 1px #ccc;
  margin: 0 0.5rem;
  position: relative;
  >div{
    position: absolute;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    border: solid 1px #0178FF;
    top: 0;
    left: -0.6rem;
    background: #fff;
    border-width: .2rem;
  }
  >h4{
    color: #0178ff;
    margin: 0.5rem 0;
    font-size: 1.6rem;
  }
  >p{
    word-wrap: break-word;
    margin: 0;
    border-bottom: #CCCCCC solid 1px;
    padding-bottom: 1rem;
  }
}
</style>
