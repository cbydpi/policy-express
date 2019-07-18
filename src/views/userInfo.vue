<template>
  <div style="width: 100%;height: 100%;">
    <div style="padding: 0 5px;">
      <el-container>
        <el-main>
          <el-form label-width="100px" label-position="left">
            <el-form-item label="用户头像" style="border-bottom: solid 1px #ccc;">
              <i class="el-icon-user-solid" style="width: 35px;position: absolute;right: 15px;" v-if="headImg === null"></i>
              <img v-if="headImg !== null" :src="headImg" style="width: 35px;position: absolute;right: 15px;"/>
            </el-form-item>
            <el-form-item label="名称" style="border-bottom: solid 1px #ccc;">
              <el-input v-model="name" class="inputStyle" suffix-icon="el-icon-arrow-right" disabled></el-input>
            </el-form-item>
            <el-form-item label="企业名称" style="border-bottom: solid 1px #ccc;">
              <el-input v-model="bizName" class="inputStyle" suffix-icon="el-icon-arrow-right" @click.native="showDialog2('bizName')" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系方式" style="border-bottom: solid 1px #ccc;">
              <el-input v-model="phone" class="inputStyle" suffix-icon="el-icon-arrow-right" @click.native="showDialog2('phone')" disabled></el-input>
            </el-form-item>
            <el-form-item :label="value.tagName" style="border-bottom: solid 1px #ccc;" v-for="(value,index) in tagList" :key="index">
              <el-input v-model="value.tagValues.toString()" class="inputStyle" suffix-icon="el-icon-arrow-right" @click.native="showDialog(value)" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-main>
        <el-footer>
          <el-button type="primary" style="width: 100%;" @click.native="save">保存</el-button>
        </el-footer>
      </el-container>
        
    </div>


    <!--弹窗1-->
    <el-dialog
      title=""
      :visible.sync="visibleDialog"
      :modal="true"
      :close-on-click-modal="false"
      :center="true"
      width="90%">
      <i class="el-icon-close" style="color: #fff;position: absolute;font-size: 30px;top: 10px;right: 10px;z-index: 999;" @click="closeDialog"></i>
      <div v-if="dialogInfo">
        <span slot="title" class="clearfix">
          <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
          <h3 class="dialogHeader_h">
            {{dialogInfo.mainTitle}}
            <span style="font-size: 1.2rem;color: #ccc;">{{dialogInfo.type === 2 ? '多选' : '单选'}}</span>
            <br>
            <p style="font-size: 1.2rem;color: #ccc;">{{dialogInfo.subtitle}}</p>
          </h3>
        </span>
        
        <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;">
          <el-radio 
            v-model="labelValue"
            v-if="dialogInfo.type === 1"
            :label="tag"
            border
            :key="index2"
            :class="index2===0 ? 'dialogBody_radio1' : 'dialogBody_radio2'"
            v-for="(tag, index2) in dialogInfo.tagValues">
            {{tag}}
          </el-radio>
          <el-checkbox-group v-model="labelValueArr"v-if="dialogInfo.type === 2">
            <el-checkbox
              v-for="(tag, index2) in dialogInfo.tagValues"
              border
              :key="index2"
              :class="index2===0 ? 'dialogBody_radio1' : 'dialogBody_radio2'"
              :label="tag">
            </el-checkbox>
          </el-checkbox-group>
        </div>
        
        <span slot="footer" style="display: block;text-align: center;margin-top: 10px;">
          <el-button type="primary" @click="saveDialog()">保存</el-button>
        </span>
      </div>
    </el-dialog>
    
    <el-dialog
      title=""
      :visible.sync="visibleDialog2"
      :modal="true"
      :close-on-click-modal="false"
      :center="true"
      width="90%">
      <i class="el-icon-close" style="color: #fff;position: absolute;font-size: 30px;top: 10px;right: 10px;z-index: 999;" @click="closeDialog2"></i>
      <div>
        <span slot="title" class="clearfix">
          <img src="@/assets/images/dialog_titlebg.png" class="dialogHeader_image"/>
          <h3 class="dialogHeader_h">修改</h3>
        </span>

        <div style="margin-top: 5rem;text-align: center;height: 18rem;overflow: auto;">
          <el-input v-model="bizName" v-if="inputValue==='bizName'"></el-input>
          <el-input v-model="phone" v-if="inputValue==='phone'"></el-input>
          <el-input v-model="name" v-if="inputValue==='name'"></el-input>
        </div>

        <span slot="footer" style="display: block;text-align: center;margin-top: 10px;">
          <el-button type="primary" @click="saveDialog2">完成</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headImg: null,
      bizName: '',
      phone: '',
      name: '',
      tagList: [],
      visibleDialog: false,
      dialogInfo: null,
      labelValue: '',
      labelValueArr: [],
      visibleDialog2: false,
      inputValue: ''
    }
  },
  mounted () {
    this.getInfo()
  },
  beforeDestroy () {

  },
  methods: {
    getInfo () {
      this.$http({
        url: this.URL + 'wechatUser/' + this.$cookie.get('openid'),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.headImg = data.info.headImg
          this.name = data.info.name
          this.bizName = data.info.bizName
          this.phone = data.info.phone
          this.tagList = data.info.tags
        } else {
        }
      })
    },
    showDialog (value) {
      this.$http({
        url: this.URL + 'tags/info?tagName=' + value.tagName,
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dialogInfo = data.info
          if (data.info.type == 1) {
            this.labelValue = value.tagValue
          } else{
            this.labelValueArr = value.tagValues
          }
          this.visibleDialog = true
        } else {
        }
      })
    },
    showDialog2 (value) {
      this.inputValue = value
      this.visibleDialog2 = true
    },
    saveDialog () {
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].tagName === this.dialogInfo.tagName) {
          this.tagList[i].tagValues = this.dialogInfo.type === 1 ? this.labelValue.split(',') : this.labelValueArr
        }
      }
      this.visibleDialog = false
    },
    saveDialog2 () {
      this.visibleDialog2 = false
    },
    closeDialog () {
      this.visibleDialog = false
    },
    closeDialog2 () {
      this.visibleDialog2 = false
    },
    save () {
      this.$http({
        url: this.URL + 'wechatUser',
        method: 'post',
        data: this.$http.adornData({
          'openid': this.$cookie.get('openid'),
          'tags': this.tagList,
          'bizName': this.bizName,
          'phone': this.phone
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message.success('保存成功')
          this.$router.push({ name: 'info' })
        } else {
        }
      })
    }
  }
}
</script>

<style lang="scss">
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
  margin: 0!important;
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
.line{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: .5rem;
}
.orange{
  color: #ff3c11;
  font-size: 1.6rem;
}
.bold{
  font-weight: bold;
}
.font-color{
  color: #999;
}
.swiper-content{
  width: 100%;
  text-align: center;
  height: 4rem;

  line-height: 4rem;
}
.swiper-slide-active{
  background: rgba(217,217,217,.3);
}
.swiper{
  position: absolute;
  height: 30rem;
  width:100%;
  bottom: 60px;
  background: #fff;
  overflow: hidden;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}
.inputStyle input{
  border: none!important;
  background: none!important;
  color: #333333!important;
  text-align: right!important;
}
</style>
