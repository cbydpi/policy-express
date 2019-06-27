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
      <span slot="title" class="clearfix" v-if="visibleDialog1">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">企业资质</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;" v-if="visibleDialog1">
        <el-radio v-model="homeTest.dialog1" label="国家高新技术企业" border class="dialogBody_radio1">国家高新技术企业</el-radio>
        <el-radio v-model="homeTest.dialog1" label="中关村高新技术企业" border  class="dialogBody_radio2">中关村高新技术企业</el-radio>
        <el-radio v-model="homeTest.dialog1" label="无" border  class="dialogBody_radio2">无</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog1">
        <el-button type="primary" @click="showDialog2">下一步</el-button>
        <span class="dialogFooter_mark">1/9</span>
      </span>

      <!--弹窗2-->
      <span slot="title" v-if="visibleDialog2">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">所属领域</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;;" v-if="visibleDialog2">
        <el-radio v-model="homeTest.dialog2" label="新一代信息技术" border class="dialogBody_radio1">新一代信息技术</el-radio>
        <el-radio v-model="homeTest.dialog2" label="集成电路" border class="dialogBody_radio2">集成电路</el-radio>
        <el-radio v-model="homeTest.dialog2" label="医药健康" border class="dialogBody_radio2">医药健康</el-radio>
        <el-radio v-model="homeTest.dialog2" label="智能装备产业" border class="dialogBody_radio2">智能装备产业</el-radio>
        <el-radio v-model="homeTest.dialog2" label="节能环保" border class="dialogBody_radio2">节能环保</el-radio>
        <el-radio v-model="homeTest.dialog2" label="新能源智能汽车" border class="dialogBody_radio2">新能源智能汽车</el-radio>
        <el-radio v-model="homeTest.dialog2" label="新材料" border class="dialogBody_radio2">新材料</el-radio>
        <el-radio v-model="homeTest.dialog2" label="人工智能" border class="dialogBody_radio2">人工智能</el-radio>
        <el-radio v-model="homeTest.dialog2" label="软件和信息服务" border class="dialogBody_radio2">软件和信息服务</el-radio>
        <el-radio v-model="homeTest.dialog2" label="科技服务业" border class="dialogBody_radio2">科技服务业</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog2">
        <span class="dialogFooter_mark">2/9</span>
        <el-button type="primary" @click="showDialog1">上一步</el-button>
        <el-button type="primary" @click="showDialog3">下一步</el-button>
      </span>

      <!--弹窗3-->
      <span slot="title" v-if="visibleDialog3">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">成立年限</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;;" v-if="visibleDialog3">
        <el-radio v-model="homeTest.dialog3" label="1年以内" border class="dialogBody_radio1">1年以内</el-radio>
        <el-radio v-model="homeTest.dialog3" label="1-3年" border class="dialogBody_radio2">1-3年</el-radio>
        <el-radio v-model="homeTest.dialog3" label="4-6年" border class="dialogBody_radio2">4-6年</el-radio>
        <el-radio v-model="homeTest.dialog3" label="7年以上" border class="dialogBody_radio2">7年以上</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog3">
        <span class="dialogFooter_mark">3/9</span>
        <el-button type="primary" @click="showDialog2">上一步</el-button>
        <el-button type="primary" @click="showDialog4">下一步</el-button>
      </span>

      <!--弹窗4-->
      <span slot="title" v-if="visibleDialog4">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">注册地址</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;;" v-if="visibleDialog4">
        <el-radio v-model="homeTest.dialog4" label="海淀区" border class="dialogBody_radio1">海淀区</el-radio>
        <el-radio v-model="homeTest.dialog4" label="中关村示范园" border class="dialogBody_radio2">中关村示范园</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog4">
        <span class="dialogFooter_mark">4/9</span>
        <el-button type="primary" @click="showDialog3">上一步</el-button>
        <el-button type="primary" @click="showDialog5">下一步</el-button>
      </span>

      <!--弹窗5-->
      <span slot="title" v-if="visibleDialog5">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">创业人群</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;;" v-if="visibleDialog5">
        <el-radio v-model="homeTest.dialog5" label="留学人员" border class="dialogBody_radio1">留学人员</el-radio>
        <el-radio v-model="homeTest.dialog5" label="非留学人员" border class="dialogBody_radio2">非留学人员</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog5">
        <span class="dialogFooter_mark">5/9</span>
        <el-button type="primary" @click="showDialog4">上一步</el-button>
        <el-button type="primary" @click="showDialog6">下一步</el-button>
      </span>

      <!--弹窗6-->
      <span slot="title" v-if="visibleDialog6">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">研发投入占比<br><p style="font-size: 1.2rem;color: #ccc;">(占全年总投入金额的比例)</p></h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;;" v-if="visibleDialog6">
        <el-radio v-model="homeTest.dialog6" label="10%-20%" border class="dialogBody_radio1">10%-20%</el-radio>
        <el-radio v-model="homeTest.dialog6" label="30%-40%" border class="dialogBody_radio2">30%-40%</el-radio>
        <el-radio v-model="homeTest.dialog6" label="50%以上" border class="dialogBody_radio2">50%以上</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog6">
        <span class="dialogFooter_mark">6/9</span>
        <el-button type="primary" @click="showDialog5">上一步</el-button>
        <el-button type="primary" @click="showDialog7">下一步</el-button>
      </span>

      <!--弹窗7-->
      <span slot="title" v-if="visibleDialog7">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">企业营收<br><p style="font-size: 1.2rem;color: #ccc;">(上一年的企业营收总额)</p></h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;;" v-if="visibleDialog7">
        <el-radio v-model="homeTest.dialog7" label="0-50万" border class="dialogBody_radio1">0-50万</el-radio>
        <el-radio v-model="homeTest.dialog7" label="50-100万" border class="dialogBody_radio2">50-100万</el-radio>
        <el-radio v-model="homeTest.dialog7" label="100-500万" border class="dialogBody_radio2">100-500万</el-radio>
        <el-radio v-model="homeTest.dialog7" label="500-1000万" border class="dialogBody_radio2">500-1000万</el-radio>
        <el-radio v-model="homeTest.dialog7" label="1000-5000万" border class="dialogBody_radio2">1000-5000万</el-radio>
        <el-radio v-model="homeTest.dialog7" label="5000万-1亿" border class="dialogBody_radio2">5000万-1亿</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog7">
        <span class="dialogFooter_mark">7/9</span>
        <el-button type="primary" @click="showDialog6">上一步</el-button>
        <el-button type="primary" @click="showDialog8">下一步</el-button>
      </span>

      <!--弹窗8-->
      <span slot="title" v-if="visibleDialog8">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">融资额度</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;;" v-if="visibleDialog8">
        <el-radio v-model="homeTest.dialog8" label="0-50万" border class="dialogBody_radio1">0-50万</el-radio>
        <el-radio v-model="homeTest.dialog8" label="50-100万" border class="dialogBody_radio2">50-100万</el-radio>
        <el-radio v-model="homeTest.dialog8" label="100-500万" border class="dialogBody_radio2">100-500万</el-radio>
        <el-radio v-model="homeTest.dialog8" label="500-1000万" border class="dialogBody_radio2">500-1000万</el-radio>
        <el-radio v-model="homeTest.dialog8" label="1000-5000万" border class="dialogBody_radio2">1000-5000万</el-radio>
        <el-radio v-model="homeTest.dialog8" label="5000万-1亿" border class="dialogBody_radio2">5000万-1亿</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog8">
        <span class="dialogFooter_mark">8/9</span>
        <el-button type="primary" @click="showDialog7">上一步</el-button>
        <el-button type="primary" @click="showDialog9">下一步</el-button>
      </span>

      <!--弹窗9-->
      <span slot="title" v-if="visibleDialog9">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">自主知识产权</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;;" v-if="visibleDialog9">
        <el-radio v-model="homeTest.dialog9" label="有" border class="dialogBody_radio1">有</el-radio>
        <el-radio v-model="homeTest.dialog9" label="无" border class="dialogBody_radio2">无</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog9">
        <span class="dialogFooter_mark">9/9</span>
        <el-button type="primary" @click="showDialog8">上一步</el-button>
        <el-button type="primary" @click="showDialog10">下一步</el-button>
      </span>

      <!--弹窗10-->
      <span slot="title" v-if="visibleDialog10">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">企业资质</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;;" v-if="visibleDialog10">
        <h3>贵公司19年预计可申请政策金额总计</h3>
        <h1 style="color: #FF3C11;">{{money}}</h1>
      </div>
      <span slot="footer" v-if="visibleDialog10">
        <el-button type="primary" @click="finishTest">我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      money: '',
      maxMoney: '',
      userCount: '',
      visibleDialog: false,
      visibleDialog1: false,
      visibleDialog2: false,
      visibleDialog3: false,
      visibleDialog4: false,
      visibleDialog5: false,
      visibleDialog6: false,
      visibleDialog7: false,
      visibleDialog8: false,
      visibleDialog9: false,
      visibleDialog10: false,
      homeTest: {
        dialog1: null,
        dialog2: null,
        dialog3: null,
        dialog4: null,
        dialog5: null,
        dialog6: null,
        dialog7: null,
        dialog8: null,
        dialog9: null
      }
    }
  },
  mounted () {
//  if (window.location.href.indexOf('code=') !== -1) {
//    let str = window.location.href
//    this.$http({
//      url: this.URL + 'getOpenid?code=' + str.slice(str.indexOf('code=')+5, str.indexOf('&state')),
//      method: 'get'
//    }).then(({data}) => {
//      if (data && data.code === 0) {
//        this.$cookie.set('code', this.$route.query.code)
//        this.$cookie.set('openid', data.openid)
//      } else {
//      }
//    })
//  }
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
    this.showFooter = true
    this.homeTest = {
      dialog1: null,
      dialog2: null,
      dialog3: null,
      dialog4: null,
      dialog5: null,
      dialog6: null,
      dialog7: null,
      dialog8: null,
      dialog9: null
    }
  },
  methods: {
    showDialog1 () {
      this.visibleDialog = true
      this.visibleDialog1 = true
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
      this.visibleDialog10 = false
    },
    showDialog2 () {
      if (!this.homeTest.dialog1) {
        this.$message.error('请选择')
        return
      }
      this.visibleDialog1 = false
      this.visibleDialog2 = true
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
      this.visibleDialog10 = false
    },
    showDialog3 () {
      if (!this.homeTest.dialog2) {
        this.$message.error('请选择')
        return
      }
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = true
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
      this.visibleDialog10 = false
    },
    showDialog4 () {
      if (!this.homeTest.dialog3) {
        this.$message.error('请选择')
        return
      }
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = true
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
      this.visibleDialog10 = false
    },
    showDialog5 () {
      if (!this.homeTest.dialog4) {
        this.$message.error('请选择')
        return
      }
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = true
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
      this.visibleDialog10 = false
    },
    showDialog6 () {
      if (!this.homeTest.dialog5) {
        this.$message.error('请选择')
        return
      }
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = true
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
      this.visibleDialog10 = false
    },
    showDialog7 () {
      if (!this.homeTest.dialog6) {
        this.$message.error('请选择')
        return
      }
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = true
      this.visibleDialog8 = false
      this.visibleDialog9 = false
      this.visibleDialog10 = false
    },
    showDialog8 () {
      if (!this.homeTest.dialog7) {
        this.$message.error('请选择')
        return
      }
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = true
      this.visibleDialog9 = false
      this.visibleDialog10 = false
    },
    showDialog9 () {
      if (!this.homeTest.dialog8) {
        this.$message.error('请选择')
        return
      }
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = true
      this.visibleDialog10 = false
    },
    showDialog10 () {
      var self = this
      if (!this.homeTest.dialog9) {
        this.$message.error('请选择')
        return
      }
      let data = {
        'openid': this.$cookie.get('openid'),
        'bizType': this.homeTest.dialog1,
        'bizDomain': this.homeTest.dialog2,
        'bizYear': this.homeTest.dialog3,
        'bizArea': this.homeTest.dialog4,
        'bizPeople': this.homeTest.dialog5,
        'bizSupport': this.homeTest.dialog6,
        'bizIncome': this.homeTest.dialog7,
        'bizLimit': this.homeTest.dialog8,
        'bizKnowledge': this.homeTest.dialog9,
        'updateType': 'test'
      }
      this.$http.post(this.URL + 'policyTest', JSON.stringify(data)).then(
        function (res) {
          console.log(res)
          self.money = res.data.allMoney
          if (res.data.code === 0) {
          } else {
            self.$message.error(res.data.msg)
          }
        }, function (res) {
        // 处理失败的结果
        }
      )
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
      this.visibleDialog10 = true
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
