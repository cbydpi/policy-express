<template>
  <div style="width: 100%;height: 100%;">
    <div style="height: 40px;line-height: 40px;position: fixed;top: 0;left: 0;width: 100%;z-index: 999;background: #fff;">
      <el-row>
        <el-col :span="6">
          <div style="text-align: center;" @click="getListData('default')" :class="type === 'default' ? 'title_active' : ''">热门关注</div>
        </el-col>
        <el-col :span="6">
          <div style="text-align: center;" @click="getListData('money')" :class="type === 'money' ? 'title_active' : ''">按资金额度</div>
        </el-col>
        <el-col :span="6">
          <div style="text-align: center;" @click="getListData('declareDate')" :class="type === 'declareDate' ? 'title_active' : ''">按截止时间</div>
        </el-col>
        <el-col :span="6">
          <div style="text-align: center;" @click="getListData('matchScore')" :class="type === 'matchScore' ? 'title_active' : ''">按匹配度</div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 40px;">
      <el-card v-if="listData" v-for="(value, index) in listData" @click.native="policyInfo(value.policyId, value.policyName)" :key="index">
        <el-row>
          <el-col :span="8">
            <div class="orange line bold">{{value.money}}</div>
            <div class="line">匹配度：{{Math.round(value.matchScore*100)}}%</div>
          </el-col>
          <el-col :span="16">
            <div class="line font-color">政策标题：{{value.policyName}}</div>
            <div class="line font-color">截止时间：{{value.endDate}}</div>
          </el-col>
        </el-row>
      </el-card>
    </div>
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
      this.getListData('default')
    },
    methods: {
      getListData (type) {
        this.type = type
        this.$http({
          url: this.URL + 'policyList?openid=' + this.$cookie.get('openid') + '&' + type,
          method: 'get'
        }).then(({
          data
        }) => {
          if(data && data.code === 0) {
            this.listData = data.policyList
          } else {}
        })
      },
      policyInfo (id, name) {
        let data = {
          'openid': this.$cookie.get('openid'),
          'policyId': id,
          'reqType': 'list'
        }
        sessionStorage.setItem('policyInfo', JSON.stringify(data))
        this.$router.push({
          name: 'policyInfo'
        })
      }
    }
  }
</script>

<style lang="scss">
  p {
    margin: 0;
  }
  
  .line {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: .5rem;
  }
  
  .orange { 
    color: #ff3c11;
    font-size: 1.6rem;
  }
  
  .bold {
    font-weight: bold;
  }
  
  .font-color {
    color: #999;
  }
  .title_active {
    color: #409eff;
  }
  .el-tabs__item {
    padding: 0 5px!important;
  }
</style>