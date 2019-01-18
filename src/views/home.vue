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
        企业资质
      </span>
      <span slot="footer">
        <el-button type="primary">下一步</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visibleDialog1: false
    }
  },
  methods: {
    showDialog1 () {
      this.visibleDialog1 = true
    }
  }
}
</script>

<style lang="scss" scoped>
.fullWidth {
  width: 100%;
}
</style>
