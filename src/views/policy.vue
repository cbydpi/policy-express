<template>
  <div style="width: 100%;height: 100%;">
    <el-tabs :stretch="true" @tab-click="getListData" v-model="type">
      <el-tab-pane label="热门关注" name="default">
        <el-card v-if="listData" v-for="(value, index) in listData" @click.native="policyInfo(value.policySign)" :key="index">
          <el-row>
            <el-col :span="8">
              <div class="orange line bold">{{value.money}}</div>
              <div class="line">匹配度：{{value.matchScore}}%</div>
            </el-col>
            <el-col :span="16">
              <div class="line font-color">政策标题：{{value.policySign}}</div>
              <div class="line font-color">截止时间：{{value.declareDate}}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="按资金额度" name="money">
        <el-card v-if="listData" v-for="(value, index) in listData" @click.native="policyInfo(value.policySign)" :key="index">
          <el-row>
            <el-col :span="8">
              <div class="orange line bold">{{value.money}}</div>
              <div class="line">匹配度：{{value.matchScore}}%</div>
            </el-col>
            <el-col :span="16">
              <div class="line font-color">政策标题：{{value.policySign}}</div>
              <div class="line font-color">截止时间：{{value.declareDate}}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="按截止时间" name="declareDate">
        <el-card v-if="listData" v-for="(value, index) in listData" @click.native="policyInfo(value.policySign)" :key="index">
          <el-row>
            <el-col :span="8">
              <div class="orange line bold">{{value.money}}</div>
              <div class="line">匹配度：{{value.matchScore}}%</div>
            </el-col>
            <el-col :span="16">
              <div class="line font-color">政策标题：{{value.policySign}}</div>
              <div class="line font-color">截止时间：{{value.declareDate}}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="按匹配度" name="matchScore">
        <el-card v-if="listData" v-for="(value, index) in listData" @click.native="policyInfo(value.policySign)" :key="index">
          <el-row>
            <el-col :span="8">
              <div class="orange line bold">{{value.money}}</div>
              <div class="line">匹配度：{{value.matchScore}}%</div>
            </el-col>
            <el-col :span="16">
              <div class="line font-color">政策标题：{{value.policySign}}</div>
              <div class="line font-color">截止时间：{{value.declareDate}}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listData: null,
      type: 'default'
    }
  },
  mounted () {
    this.getListData()
  },
  methods: {
    getListData () {
      this.$http({
        url: this.URL + 'policyList?openid=' + this.$cookie.get('openid') + '&' + this.type,
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.listData = data.policyList
        } else {
        }
      })
    },
    policyInfo (id) {
      let data = {
        'openid': this.$cookie.get('openid'),
        'policySign': id,
        'reqType': 'list'
      }
      sessionStorage.setItem('policyInfo', JSON.stringify(data))
      this.$router.push({ name: 'policyInfo' })
    }
  }
}
</script>

<style lang="scss">
p{
  margin: 0;
}
.line{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: .5rem;
}
.orange{
  color: #ff3c11;
  font-size: 1.6rem;
}
.bold{
  font-weight: bold;
}
.font-color{
  color: #999;
}
.el-tabs__item{
  padding: 0 5px!important;
}
</style>
