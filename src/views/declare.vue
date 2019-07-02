<template>
  <div>
    <el-form :rules="rules" ref="form" :model="formData">
      <el-form-item prop="bizName">
        <el-input
          placeholder="请输入企业名称"
          v-model="formData.bizName">
          <i slot="prefix" class="el-input__icon el-icon-school" style="color: #0178ff;font-weight: bold;"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="contacter">
        <el-input
          placeholder="请输入联系人姓名"
          v-model="formData.contacter">
          <i slot="prefix" class="el-input__icon el-icon-user-solid" style="color: #0178ff;font-weight: bold;"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          placeholder="请输入联系方式"
          v-model="formData.phone">
          <i slot="prefix" class="el-input__icon el-icon-mobile-phone" style="color: #0178ff;font-weight: bold;"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click.native="submit">提交</el-button>
      </el-form-item>
    </el-form>
    
    <el-dialog
      title="微信授权"
      :visible.sync="showDialog"
      width="80%"
      center>
      <div style="text-align: center;">
        <img src="@/assets/images/logo.png" style="width: 30%;"/>
        <p style="text-align: center;padding: 10px;">开通后系统将自动给您推送最新的政策和与您相匹配的政策</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$router.go(-1)">拒 绝</el-button>
        <el-button type="primary" @click="link">免费开通</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      var validateMobile = (rule, value, callback) => {
        if (!(/^((0\d{2,3}-\d{7,8})|(1[3567894]\d{9}))$/.test(value))) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return{
        showDialog: false,
        formData: {
          bizName: '',
          contacter: '',
          phone: ''
        },
        token: '',
        rules: {
          bizName: [
            { required: true, message: '请输入企业名称', trigger: 'blur'}
          ],
          contacter: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ],
          phone: [
            { required: true, message: '请输入联系方式', trigger: 'blur'},
            { validator: validateMobile, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.$http({
        url: this.URL + 'token',
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.token = data.token
        } else {
        }
      })
    },
    methods: {
      link () {
        window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg2MjExMDMzMQ==&scene=126&bizpsid=0#wechat_redirect'
      },
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.URL + 'policy',
              method: 'post',
              headers: {
                'token': this.token
              },
              data: JSON.stringify({
                'policyId': JSON.parse(sessionStorage.getItem('policyInfo')).policyId,
                'openid': this.$cookie.get('openid'),
                'bizName': this.formData.bizName,
                'contacter': this.formData.contacter,
                'phone': this.formData.phone,
                'policyName': sessionStorage.getItem('policyName')
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '提交成功！'
                })
                this.showDialog = true
                this.formData.bizName = ''
                this.formData.contacter = ''
                this.formData.phone = ''
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>

<style>
</style>