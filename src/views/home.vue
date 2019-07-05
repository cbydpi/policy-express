<template>
  <div class="fullWidth">
    <div>
      <img src="@/assets/images/home_banner.png" class="fullWidth"/>
    </div>
    <div style="padding: 2%;background: #fff;border-bottom: solid 1px #ccc;">
      <img src="@/assets/images/home_icon.png" style="display: inline-block;width: 10%;margin-right: 2%;"/>
      <p style="display: inline-block;width: 85%;">
        19年的政策现在可以申报了，快速测评您的企业能拿到多少钱
      </p>
    </div>
    <div style="background: #fff;padding: 8% 0;">
      <el-row>
        <el-col :offset="4" :span="6" style="text-align: center;">
          <img src="@/assets/images/money.png" style="width: 70%;"/>
          <h3 style="color: #ff8811;margin: 0;margin-top: 2%;">{{maxMoney}}</h3>
          <p style="margin: 2% 0;">最高申报金额</p>
        </el-col>
        <el-col :offset="4" :span="6" style="text-align: center;">
          <img src="@/assets/images/user.png" style="width: 70%;"/>
          <h3 style="color: #ff8811;margin: 0;margin-top: 2%;">{{userCount}}家</h3>
          <p style="margin: 2% 0;">企业用户总数</p>
        </el-col>
      </el-row>
    </div>
    <div style="padding: 5% 0;text-align: center;">
      <el-button style="width: 90%;color: #FFFFFF;background: #ff8811;margin-bottom: 3%;" @click="showDialog1">我要测评</el-button>
      <el-button type="primary" style="width: 90%;margin: 0;" @click="linkDefault">查看政策</el-button>
    </div>

    <!--弹窗开始-->
    <!--弹窗1-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog"
      :modal="true"
      :close-on-click-modal="false"
      :center="true"
      width="90%">
      <i class="el-icon-close" style="color: #fff;position: absolute;font-size: 30px;top: 10px;right: 10px;z-index: 999;" @click="closeDialog"></i>
      <div v-for="(value, index) in tagList" :key="index">
        <span slot="title" class="clearfix" v-if="index === thisIndex">
          <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
          <h3 class="dialogHeader_h">
            {{value.mainTitle}}
            <span style="font-size: 1.2rem;color: #ccc;">{{value.type === 2 ? '多选' : '单选'}}</span>
            <br>
            <p style="font-size: 1.2rem;color: #ccc;">{{value.subtitle}}</p>
          </h3>
        </span>
        
        <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;" v-if="index === thisIndex">
          <el-radio 
            v-model="labelValue"
            v-if="value.type === 1"
            :label="tag"
            border
            :key="index2"
            :class="index2===0 ? 'dialogBody_radio1' : 'dialogBody_radio2'"
            v-for="(tag, index2) in value.tagValues">
            {{tag}}
          </el-radio>
          <el-checkbox-group v-model="labelValueArr"v-if="value.type === 2">
            <el-checkbox
              v-for="(tag, index2) in value.tagValues"
              border
              :key="index2"
              :class="index2===0 ? 'dialogBody_radio1' : 'dialogBody_radio2'"
              :label="tag">
              </el-checkbox>
          </el-checkbox-group>
        </div>
        
        <span slot="footer" v-if="index === thisIndex" style="display: block;text-align: center;margin-top: 10px;">
          <span class="dialogFooter_mark">{{thisIndex+1}}/{{tagList.length}}</span>
          <el-button type="primary" @click="pre" v-if="thisIndex>0">上一步</el-button>
          <el-button type="primary" @click="next(value.tagName, value.type)">下一步</el-button>
        </span>
      </div>

      <!--结果-->
      <div v-if="thisIndex>totleLength-1">
        <span slot="title">
          <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
          <h3 class="dialogHeader_h">企业资质</h3>
        </span>
        <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;;" v-if="thisIndex>totleLength-1">
          <h3>贵公司19年预计可申请政策金额总计</h3>
          <h1 style="color: #FF3C11;">{{money}}</h1>
        </div>
        <span slot="footer" v-if="thisIndex>totleLength-1" style="display: block;text-align: center;">
          <el-button type="primary" @click="finishTest">我知道了</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visibleDialog: false,
      money: '',
      maxMoney: '',
      userCount: '',
      thisIndex: 0,
      tagList: [],
      labelValue: '',
      labelValueArr: [],
      totleLength: 0,
      testTag: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$http({
        url: this.URL + 'index',
        method: 'post',
        data: JSON.stringify({
          'openid': this.$cookie.get('openid')
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.maxMoney = data.maxMoney
          this.userCount= data.userCount
        } else {
        }
      })
      this.$http({
        url: this.URL + 'tags',
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.tagList = data.data
          this.totleLength = data.data.length
        } else {
        }
      })
    },
    closeDialog () {
      this.thisIndex = 0
      this.labelValue = ''
      this.labelValueArr = []
      this.visibleDialog = false
    },
    showDialog1 () {
      this.visibleDialog = true
    },
    next (tagName, type) {
      if (type === 1) {
        if (this.labelValue === '') {
          this.$message.error('请选择')
          return
        }
      } else{
        if (this.labelValueArr.length < 1) {
          this.$message.error('请选择')
          return
        }
      }
      this.testTag.push({
        'tagName': tagName,
        'tagValues': type === 1 ? this.labelValue.split(',') : this.labelValueArr
      })
      this.thisIndex++
      console.log(type, this.testTag)
      if (this.thisIndex === this.tagList.length) {
        this.$http({
          url: this.URL + 'policyTest',
          method: 'post',
          data: this.$http.adornData({
            'openid': this.$cookie.get('openid'),
            'tags': this.testTag
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.money = data.allMoney
          } else {
          }
        })
      }
      this.labelValue = ''
    },
    pre () {
      this.thisIndex--
    },
    finishTest () {
      this.visibleDialog = false
      this.$router.push({ name: 'policy' })
    },
    linkDefault () {
      this.$router.push({ name: 'policy' })
    }
  }
}
</script>

<style lang="scss">
.el-icon-close{
  font-size: 2rem;
  font-weight: bold;
}
.dialogHeader_image{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.dialogHeader_h{
  text-align: center;
  color: #fff;
  position: absolute;
  top: 0;left: 0;
  width: 100%;
}
.dialogBody_radio1{
  width: 80%;
  text-align: left;
  margin: 0;
}
.dialogBody_radio2{
  width: 80%;
  text-align: left;
  margin: 0!important;
  margin-top: 1.5rem!important;
}
.dialogFooter_mark{
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  color: #ccc;
}
.el-radio{
  margin-right: 0!important;
}
</style>
