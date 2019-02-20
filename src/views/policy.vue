<template>
  <div style="width: 100%;height: 100%;">
    <el-tabs :stretch="true" @tab-click="getListData" v-model="type">
      <el-tab-pane label="按资金额度" name="money">
        <el-card v-if="listData" v-for="value in listData" @click.native="policyInfo(value.policySign)" :key="value.policySign">
          <p>政策标题：{{value.policySign}}</p>
          <p>匹配度：{{value.matchScore}}%</p>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="按发布时间" name="declareDate">
        <el-card v-if="listData" v-for="value in listData" @click.native="policyInfo(value.policySign)" :key="value.policySign">
          <p>政策标题：{{value.policySign}}</p>
          <p>匹配度：{{value.matchScore}}%</p>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="按匹配度" name="matchScore">
        <el-card v-if="listData" v-for="value in listData" @click.native="policyInfo(value.policySign)" :key="value.policySign">
          <p>政策标题：{{value.policySign}}</p>
          <p>匹配度：{{value.matchScore}}%</p>
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
      type: 'money'
    }
  },
  mounted () {
    this.getListData()
  },
  methods: {
    getListData () {
      this.$http({
        url: this.URL + 'policyList?openid=1234567&' + this.type,
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
        'openid': 1234567,
        'policySign': id,
        'reqType': 'list'
      }
      sessionStorage.setItem('policyInfo', JSON.stringify(data))
      this.$router.push({ name: 'policyInfo' })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
p{
  margin: 0;
}
</style>
