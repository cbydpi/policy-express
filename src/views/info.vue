<template>
  <div style="width: 100%;height: 100%;">
    <el-container style='height: 100%;width: 100%;' v-if="!showInfo">
      <el-header style="height: 100px;padding: 0;overflow: hidden;">
        <img style="width: 100%;position: absolute;height: 100px;" src="@/assets/images/userinbg.png"/>
        <div style="position: absolute;text-align: left;width: 100%;padding-top: 25px;color: #fff;overflow: hidden;">
          <i style="font-size: 2.5rem;color: #ffffff;margin-left: 2rem;" class="cbiconfont cbicon-user"></i>
          {{userData.nickname}}
          <i style="font-size: 2.5rem;color: #ffffff;position: absolute;right: 2rem;" class="cbiconfont cbicon-edit" @click="getInfo"></i>
        </div>
      </el-header>
      <el-main style="height: 100%!important;padding: 0px;">
        <el-tabs :stretch="true">
          <el-tab-pane label="我的记录">
            <el-card v-if="userData.logs && userData" v-for="value in userData.logs" :key="value.policySign">
              <p>政策标题：{{value.policySign}}</p>
              <p>匹配度：{{value.matchScore}}%</p>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <div v-if="showInfo">
      <el-form>
        <el-form-item label="企业资质">
          <el-input disabled @click.native="showDialog1" v-model="bizType"></el-input>
        </el-form-item>
        <el-form-item label="所属领域">
          <el-input disabled @click.native="showDialog2" v-model="bizDomain"></el-input>
        </el-form-item>
        <el-form-item label="成立年限">
          <el-input disabled @click.native="showDialog3" v-model="bizYear"></el-input>
        </el-form-item>
        <el-form-item label="注册地址">
          <el-input disabled @click.native="showDialog4" v-model="bizArea"></el-input>
        </el-form-item>
        <el-form-item label="创业人群">
          <el-input disabled @click.native="showDialog5" v-model="bizPeople"></el-input>
        </el-form-item>
        <el-form-item label="研发投入占比">
          <el-input disabled @click.native="showDialog6" v-model="bizSupport"></el-input>
        </el-form-item>
        <el-form-item label="企业营收">
          <el-input disabled @click.native="showDialog7" v-model="bizIncome"></el-input>
        </el-form-item>
        <el-form-item label="融资额度">
          <el-input disabled @click.native="showDialog8" v-model="bizLimit"></el-input>
        </el-form-item>
        <el-form-item label="自主知识产权">
          <el-input disabled @click.native="showDialog9" v-model="bizKnowledge"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="showInfo=false">确定</el-button>
          <el-button @click="showInfo=false">返回</el-button>
        </el-form-item>
      </el-form>
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
      <div style="margin-top: 5rem;text-align: center;" v-if="visibleDialog1">
        <el-radio v-model="bizType" label="国家高新技术企业" border class="dialogBody_radio1">国家高新技术企业</el-radio>
        <el-radio v-model="bizType" label="中关村高新技术企业" border  class="dialogBody_radio2">中关村高新技术企业</el-radio>
        <el-radio v-model="bizType" label="无" border  class="dialogBody_radio2">无</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog1">
        <el-button type="primary" @click="change(1)">确定</el-button>
      </span>

      <!--弹窗2-->
      <span slot="title" v-if="visibleDialog2">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">所属领域</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;" v-if="visibleDialog2">
        <el-radio v-model="bizDomain" label="新一代信息技术" border class="dialogBody_radio1">新一代信息技术</el-radio>
        <el-radio v-model="bizDomain" label="集成电路" border class="dialogBody_radio2">集成电路</el-radio>
        <el-radio v-model="bizDomain" label="医药健康" border class="dialogBody_radio2">医药健康</el-radio>
        <el-radio v-model="bizDomain" label="智能装备产业" border class="dialogBody_radio2">智能装备产业</el-radio>
        <el-radio v-model="bizDomain" label="节能环保" border class="dialogBody_radio2">节能环保</el-radio>
        <el-radio v-model="bizDomain" label="新能源智能汽车" border class="dialogBody_radio2">新能源智能汽车</el-radio>
        <el-radio v-model="bizDomain" label="新材料" border class="dialogBody_radio2">新材料</el-radio>
        <el-radio v-model="bizDomain" label="人工智能" border class="dialogBody_radio2">人工智能</el-radio>
        <el-radio v-model="bizDomain" label="软件和信息服务" border class="dialogBody_radio2">软件和信息服务</el-radio>
        <el-radio v-model="bizDomain" label="科技服务业" border class="dialogBody_radio2">科技服务业</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog2">
        <el-button type="primary" @click="change(2)">确定</el-button>
      </span>

      <!--弹窗3-->
      <span slot="title" v-if="visibleDialog3">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">成立年限</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;" v-if="visibleDialog3">
        <el-radio v-model="bizYear" label="1年以内" border class="dialogBody_radio1">1年以内</el-radio>
        <el-radio v-model="bizYear" label="1-3年" border class="dialogBody_radio2">1-3年</el-radio>
        <el-radio v-model="bizYear" label="4-6年" border class="dialogBody_radio2">4-6年</el-radio>
        <el-radio v-model="bizYear" label="7年以上" border class="dialogBody_radio2">7年以上</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog3">
        <el-button type="primary" @click="change(3)">确定</el-button>
      </span>

      <!--弹窗4-->
      <span slot="title" v-if="visibleDialog4">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">注册地址</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;" v-if="visibleDialog4">
        <el-radio v-model="bizArea" label="海淀区" border class="dialogBody_radio1">海淀区</el-radio>
        <el-radio v-model="bizArea" label="中关村示范区" border class="dialogBody_radio2">中关村示范区</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog4">
        <el-button type="primary" @click="change(4)">确定</el-button>
      </span>

      <!--弹窗5-->
      <span slot="title" v-if="visibleDialog5">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">创业人群</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;" v-if="visibleDialog5">
        <el-radio v-model="bizPeople" label="留学人员" border class="dialogBody_radio1">留学人员</el-radio>
        <el-radio v-model="bizPeople" label="非留学人员" border class="dialogBody_radio2">非留学人员</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog5">
        <el-button type="primary" @click="change(5)">确定</el-button>
      </span>

      <!--弹窗6-->
      <span slot="title" v-if="visibleDialog6">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">研发投入占比<br><p style="font-size: 1.2rem;color: #ccc;">(占全年总投入金额的比例)</p></h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;" v-if="visibleDialog6">
        <el-radio v-model="bizSupport" label="10%-20%" border class="dialogBody_radio1">10%-20%</el-radio>
        <el-radio v-model="bizSupport" label="30%-40%" border class="dialogBody_radio2">30%-40%</el-radio>
        <el-radio v-model="bizSupport" label="50%以上" border class="dialogBody_radio2">50%以上</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog6">
        <el-button type="primary" @click="change(6)">确定</el-button>
      </span>

      <!--弹窗7-->
      <span slot="title" v-if="visibleDialog7">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">企业营收<br><p style="font-size: 1.2rem;color: #ccc;">(上一年的企业营收总额)</p></h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;" v-if="visibleDialog7">
        <el-radio v-model="bizIncome" label="0-50万" border class="dialogBody_radio1">0-50万</el-radio>
        <el-radio v-model="bizIncome" label="50-100万" border class="dialogBody_radio2">50-100万</el-radio>
        <el-radio v-model="bizIncome" label="100-500万" border class="dialogBody_radio2">100-500万</el-radio>
        <el-radio v-model="bizIncome" label="500-1000万" border class="dialogBody_radio2">500-1000万</el-radio>
        <el-radio v-model="bizIncome" label="1000-5000万" border class="dialogBody_radio2">1000-5000万</el-radio>
        <el-radio v-model="bizIncome" label="5000万-1亿" border class="dialogBody_radio2">5000万-1亿</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog7">
        <el-button type="primary" @click="change(7)">确定</el-button>
      </span>

      <!--弹窗8-->
      <span slot="title" v-if="visibleDialog8">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">融资额度</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;" v-if="visibleDialog8">
        <el-radio v-model="bizLimit" label="0-50万" border class="dialogBody_radio1">0-50万</el-radio>
        <el-radio v-model="bizLimit" label="50-100万" border class="dialogBody_radio2">50-100万</el-radio>
        <el-radio v-model="bizLimit" label="100-500万" border class="dialogBody_radio2">100-500万</el-radio>
        <el-radio v-model="bizLimit" label="500-1000万" border class="dialogBody_radio2">500-1000万</el-radio>
        <el-radio v-model="bizLimit" label="1000-5000万" border class="dialogBody_radio2">1000-5000万</el-radio>
        <el-radio v-model="bizLimit" label="5000万-1亿" border class="dialogBody_radio2">5000万-1亿</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog8">
        <el-button type="primary" @click="change(8)">确定</el-button>
      </span>

      <!--弹窗9-->
      <span slot="title" v-if="visibleDialog9">
        <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
        <h3 class="dialogHeader_h">自主知识产权</h3>
      </span>
      <div style="margin-top: 5rem;text-align: center;" v-if="visibleDialog9">
        <el-radio v-model="bizKnowledge" label="有" border class="dialogBody_radio1">有</el-radio>
        <el-radio v-model="bizKnowledge" label="无" border class="dialogBody_radio2">无</el-radio>
      </div>
      <span slot="footer" v-if="visibleDialog9">
        <el-button type="primary" @click="change(8)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      userData: null,
      showInfo: false,
      bizType: '',
      bizDomain: '',
      bizYear: '',
      bizArea: '',
      bizPeople: '',
      bizSupport: '',
      bizIncome: '',
      bizLimit: '',
      bizKnowledge: ''
    }
  },
  mounted () {
    this.getUserData()
  },
  methods: {
    getUserData () {
      this.$http({
        url: this.URL + 'policyUserInfo',
        method: 'post',
        data: this.$http.adornData({
          'openid': '1234567'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.userData = data.wechatUser
        } else {
        }
      })
    },
    getInfo () {
      this.showInfo = true
      this.$http({
        url: this.URL + 'wechatUserEditInfo',
        method: 'post',
        data: this.$http.adornData({
          'openid': '1234567'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.bizType = data.wechatUser.bizType
          this.bizDomain = data.wechatUser.bizDomain
          this.bizYear = data.wechatUser.bizYear
          this.bizArea = data.wechatUser.bizArea
          this.bizPeople = data.wechatUser.bizPeople
          this.bizSupport = data.wechatUser.bizSupport
          this.bizIncome = data.wechatUser.bizIncome
          this.bizLimit = data.wechatUser.bizLimit
          this.bizKnowledge = data.wechatUser.bizKnowledge
        } else {
        }
      })
    },
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
    },
    showDialog2 () {
      this.visibleDialog = true
      this.visibleDialog1 = false
      this.visibleDialog2 = true
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
    },
    showDialog3 () {
      this.visibleDialog = true
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = true
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
    },
    showDialog4 () {
      this.visibleDialog = true
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = true
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
    },
    showDialog5 () {
      this.visibleDialog = true
      this.visibleDialog = true
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = true
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
    },
    showDialog6 () {
      this.visibleDialog = true
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = true
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = false
    },
    showDialog7 () {
      this.visibleDialog = true
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = true
      this.visibleDialog8 = false
      this.visibleDialog9 = false
    },
    showDialog8 () {
      this.visibleDialog = true
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = true
      this.visibleDialog9 = false
    },
    showDialog9 () {
      this.visibleDialog = true
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
      this.visibleDialog7 = false
      this.visibleDialog8 = false
      this.visibleDialog9 = true
    },
    change (num) {
      this.visibleDialog = false
      let bdata
      switch (num) {
        case 1:
          bdata = {'openid': '1234567', 'updateType': 'base', 'bizType': this.bizType}
          break
        case 2:
          bdata = {'openid': '1234567', 'updateType': 'base', 'bizDomain': this.bizDomain}
          break
        case 3:
          bdata = {'openid': '1234567', 'updateType': 'base', 'bizYear': this.bizYear}
          break
        case 4:
          bdata = {'openid': '1234567', 'updateType': 'base', 'bizArea': this.bizArea}
          break
        case 5:
          bdata = {'openid': '1234567', 'updateType': 'base', 'bizPeople': this.bizPeople}
          break
        case 6:
          bdata = {'openid': '1234567', 'updateType': 'base', 'bizSupport': this.bizSupport}
          break
        case 7:
          bdata = {'openid': '1234567', 'updateType': 'base', 'bizIncome': this.bizIncome}
          break
        case 8:
          bdata = {'openid': '1234567', 'updateType': 'base', 'bizLimit': this.bizLimit}
          break
        case 9:
          bdata = {'openid': '1234567', 'updateType': 'base', 'bizKnowledge': this.bizKnowledge}
          break
      }

      this.$http({
        url: this.URL + 'policyTest',
        method: 'post',
        data: bdata
      }).then(({data}) => {
        if (data && data.code === 0) {
          if (data.result === 'success') {
          } else {
          }
        } else {
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
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
</style>
