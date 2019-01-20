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
      <el-button type="primary" style="width: 90%;margin: 0;">查看政策</el-button>
    </div>

    <!--弹窗开始-->
    <!--弹窗1-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog1"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">企业资质</h3>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="showDialog2">下一步</el-button>
      </span>
    </el-dialog>

    <!--弹窗2-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog2"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">所属领域</h3>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="showDialog1">上一步</el-button>
        <el-button type="primary" @click="showDialog3">下一步</el-button>
      </span>
    </el-dialog>

    <!--弹窗3-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog3"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">成立年限</h3>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="showDialog2">上一步</el-button>
        <el-button type="primary" @click="showDialog4">下一步</el-button>
      </span>
    </el-dialog>

    <!--弹窗4-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog4"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">注册地址</h3>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="showDialog3">上一步</el-button>
        <el-button type="primary" @click="showDialog5">下一步</el-button>
      </span>
    </el-dialog>

    <!--弹窗5-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog5"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">自主知识产权</h3>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="showDialog4">上一步</el-button>
        <el-button type="primary" @click="showDialog6">下一步</el-button>
      </span>
    </el-dialog>

    <!--弹窗6-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog6"
      :center="true"
      width="90%">
      <span slot="title">
        <img src="@/assets/images/dialog_titlebg.png" style="width: 100%;position: absolute;top: 0;left: 0;"/>
        <h3 style="position: absolute;top: 0;left: 0;width: 100%;">企业资质</h3>
      </span>
      <span slot="footer">
        <el-button type="primary">完成</el-button>
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
      visibleDialog6: false
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
      this.visibleDialog1 = false
      this.visibleDialog2 = true
      this.visibleDialog3 = false
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
    },
    showDialog3 () {
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = true
      this.visibleDialog4 = false
      this.visibleDialog5 = false
      this.visibleDialog6 = false
    },
    showDialog4 () {
      this.visibleDialog1 = false
      this.visibleDialog2 = false
      this.visibleDialog3 = false
      this.visibleDialog4 = true
      this.visibleDialog5 = false
      this.visibleDialog6 = false
    },
    showDialog5 () {
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
