<template>
  <div>
    <el-form :rules="rules" ref="form" :model="formData">
      <el-form-item prop="bizName">
        <el-input
          placeholder="请输入企业名称"
          prefix-icon="el-icon-s-home"
          v-model="formData.bizName">
        </el-input>
      </el-form-item>
      <el-form-item prop="contacter">
        <el-input
          placeholder="请输入联系人姓名"
          prefix-icon="el-icon-user-solid"
          v-model="formData.contacter">
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          placeholder="请输入联系方式"
          prefix-icon="el-icon-phone"
          v-model="formData.phone">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click.native="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      var validateMobile = (rule, value, callback) => {
        if (!(/^1[0-9]{10}$/.test(value))) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return{
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
      this.$cookie.set('openid', 'oeyAz5i8-K7N1E0NvDY40KffcFZk')
      console.log(document.cookie.split(";")[0].split("=")[1])
      console.log(JSON.parse(sessionStorage.getItem('policyInfo')).policySign)
    },
    methods: {
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
                'policySign': JSON.parse(sessionStorage.getItem('policyInfo')).policySign,
                'openid': this.$cookie.get('openid'),
                'bizName': this.formData.bizName,
                'contacter': this.formData.contacter,
                'phone': this.formData.phone
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '提交成功！'
                })
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