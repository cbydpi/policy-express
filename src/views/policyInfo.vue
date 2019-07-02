<template>
  <div style="width: 100%;height: 100%;">
    <el-container style='height: 100%;width: 100%;'>
      <el-header style="height: auto;">
        <h3 style="text-align: center;margin: 0;" v-if="policyData">{{policyData.smallName}}</h3>
      </el-header>
      <el-main style="height: 100%!important;padding: 5px;" v-if="policyData">
        <div class="info" v-for="(value,index) in policyData.contentList" v-if="value.name === '受理单位' || value.name === '联系方式'">
          {{value.name}}：{{value.content}}
        </div>
        <div class="money" v-for="(value,index) in policyData.contentList" v-if="value.name === '政策支持'">
          <div style="display: table-cell;vertical-align: middle;">
            {{value.content}}
          </div>
        </div>
        <div class="listStyle" v-for="(value,index) in policyData.contentList" v-bind:key="index" v-if="value.name !== '政策支持' && value.name !== policyData.name">
          <div></div>
          <h4>{{value.name}}</h4>
          <p v-if="value.name !== '通知链接'">{{value.content}}</p>
          <p v-if="value.name === '通知链接'"><a :href="value.content">{{value.content}}</a></p>
        </div>
      </el-main>
      <el-footer style="height: 60px;padding: 10px 0;">
        <el-row>
          <el-col :span="5" @click.native="routeChat('policy')" style="text-align: center;">
            <i style="font-size: 2rem;" class="cbiconfont cbicon-policy"></i>
            <p style="margin: 0;font-size: 1.4rem;">政策</p>
          </el-col>
          <el-col :span="5" style="text-align: center;" @click.native="link">
            <i style="font-size: 2rem;" class="cbiconfont cbicon-link"></i>
            <p style="margin: 0;font-size: 1.4rem;">原文</p>
          </el-col>
          <el-col :span="5" @click.native="routeChat('qa')" style="text-align: center;">
            <i style="font-size: 2rem;" class="cbiconfont cbicon-qa"></i>
            <p style="margin: 0;font-size: 1.4rem;">咨询专家</p>
          </el-col>
          <el-col :span="9">
            <el-button type="primary" style="width: 100%;margin: 0;" @click.native="declare">立即申报</el-button>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      policyInfo: null,
      policyData: null,
      policyLink: '#'
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
          for (let i = 0; i < this.policyData.contentList.length; i++) {
            if (this.policyData.contentList[i].name === '通知链接') {
              this.policyLink = this.policyData.contentList[i].content
            }
          }
        } else {
        }
      })
    },
    link () {
      window.location.href = this.policyLink
    },
    routeChat (r) {
      this.$router.push({ name: r })
    },
    declare () {
      sessionStorage.setItem('policyName', this.policyData.name)
      this.$router.push({ name: 'declare' })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.info{
  padding: .5rem;
}
.money{
  display: table;
  width: 80%;
  margin: 0 auto;
  min-height: 6rem;
  line-height: 3rem;
  color: #fff;
  font-size: 2rem;
  padding: 1rem;
  text-align: center;
  background-image: url('~@/assets/images/moneybg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
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
