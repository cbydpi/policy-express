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
          <h3 style="color: #ff8811;margin: 0;margin-top: 2%;">500万元</h3>
          <p style="margin: 2% 0;">最高申报金额</p>
        </el-col>
        <el-col :offset="4" :span="6" style="text-align: center;">
          <img src="@/assets/images/user.png" style="width: 70%;"/>
          <h3 style="color: #ff8811;margin: 0;margin-top: 2%;">50000人</h3>
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
      :visible.sync="visibleDialog1"
      :modal="false"
      :center="true"
      width="90%">
      <span slot="title" class="clearfix">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">企业资质</h3>
      </span>
      <div style="margin-top: 70px;text-align: center;">
        <el-radio v-model="homeTest.dialog1" label="1" border style="width: 80%;text-align: left;">国家高新技术企业</el-radio>
        <el-radio v-model="homeTest.dialog1" label="2" border style="width: 80%;text-align: left;margin: 0;margin-top: 20px;">国家高新技术企业</el-radio>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="showDialog2">下一步</el-button>
        <span style="position: absolute;bottom: 15px;left: 15px;color: #ccc;">1/5</span>
      </span>
    </el-dialog>

    <!--弹窗2-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog2"
      :modal="false"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">所属领域</h3>
      </span>
      <div style="margin-top: 70px;text-align: center;">
        <el-radio v-model="homeTest.dialog2" label="1" border style="width: 80%;text-align: left;">新一代信息技术</el-radio>
        <el-radio v-model="homeTest.dialog2" label="2" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">集成电路</el-radio>
        <el-radio v-model="homeTest.dialog2" label="3" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">医药健康</el-radio>
        <el-radio v-model="homeTest.dialog2" label="4" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">智能装备产业</el-radio>
        <el-radio v-model="homeTest.dialog2" label="5" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">节能环保</el-radio>
        <el-radio v-model="homeTest.dialog2" label="6" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">新能源智能汽车</el-radio>
        <el-radio v-model="homeTest.dialog2" label="7" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">新材料</el-radio>
        <el-radio v-model="homeTest.dialog2" label="8" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">人工智能</el-radio>
        <el-radio v-model="homeTest.dialog2" label="9" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">软件和信息服务</el-radio>
        <el-radio v-model="homeTest.dialog2" label="10" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">科技服务业</el-radio>
      </div>
      <span slot="footer">
        <span style="position: absolute;bottom: 15px;left: 15px;color: #ccc;">2/5</span>
        <el-button type="primary" @click="showDialog1">上一步</el-button>
        <el-button type="primary" @click="showDialog3">下一步</el-button>
      </span>
    </el-dialog>

    <!--弹窗3-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog3"
      :modal="false"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">成立年限</h3>
      </span>
      <div style="margin-top: 70px;text-align: center;">
        <el-radio v-model="homeTest.dialog3" label="1" border style="width: 80%;text-align: left;">1年以内</el-radio>
        <el-radio v-model="homeTest.dialog3" label="2" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">1-3年</el-radio>
        <el-radio v-model="homeTest.dialog3" label="3" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">4-6年</el-radio>
        <el-radio v-model="homeTest.dialog3" label="4" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">7年以上</el-radio>
      </div>
      <span slot="footer">
        <span style="position: absolute;bottom: 15px;left: 15px;color: #ccc;">3/5</span>
        <el-button type="primary" @click="showDialog2">上一步</el-button>
        <el-button type="primary" @click="showDialog4">下一步</el-button>
      </span>
    </el-dialog>

    <!--弹窗4-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog4"
      :modal="false"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">注册地址</h3>
      </span>
      <div style="margin-top: 70px;text-align: center;">
        <el-radio v-model="homeTest.dialog4" label="1" border style="width: 80%;text-align: left;">海淀区</el-radio>
        <el-radio v-model="homeTest.dialog4" label="2" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">中关村示范区内</el-radio>
      </div>
      <span slot="footer">
        <span style="position: absolute;bottom: 15px;left: 15px;color: #ccc;">4/5</span>
        <el-button type="primary" @click="showDialog3">上一步</el-button>
        <el-button type="primary" @click="showDialog5">下一步</el-button>
      </span>
    </el-dialog>

    <!--弹窗5-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog5"
      :modal="false"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">自主知识产权</h3>
      </span>
      <div style="margin-top: 70px;text-align: center;">
        <el-radio v-model="homeTest.dialog5" label="1" border style="width: 80%;text-align: left;">有</el-radio>
        <el-radio v-model="homeTest.dialog5" label="2" border style="width: 80%;margin: 0;margin-top: 15px;text-align: left;">无</el-radio>
      </div>
      <span slot="footer">
        <span style="position: absolute;bottom: 15px;left: 15px;color: #ccc;">5/5</span>
        <el-button type="primary" @click="showDialog4">上一步</el-button>
        <el-button type="primary" @click="showDialog6">下一步</el-button>
      </span>
    </el-dialog>

    <!--弹窗6-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog6"
      :modal="false"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">企业资质</h3>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="finishTest">我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visibleDialog1: false,
      visibleDialog2: false,
      visibleDialog3: false,
      visibleDialog4: false,
      visibleDialog5: false,
      visibleDialog6: false,
      homeTest: {
        dialog1: null,
        dialog2: null,
        dialog3: null,
        dialog4: null,
        dialog5: null
      }
    }
  },
  methods: {
    showDialog1 () {
      this.visibleDialog1 = true
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
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
      console.log(this.homeTest)
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
    },
    showDialog6 () {
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = true
    },
    finishTest () {
      this.visibleDialog6 = false
    },
    linkDefault () {
      this.$router.replace({ name: 'default' })
    }
  }
}
</script>

<style lang="scss">
.fullWidth {
  width: 100%;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}

</style>
