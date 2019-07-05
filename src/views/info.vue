<template>
  <div style="width: 100%;height: 100%;">
    <el-container style='height: 100%;width: 100%;' v-if="!showInfo">
      <el-header style="height: 100px;padding: 0;overflow: hidden;">
        <img style="width: 100%;position: absolute;height: 100px;" src="@/assets/images/userinbg.png"/>
        <div style="position: absolute;text-align: left;width: 100%;padding-top: 25px;color: #fff;overflow: hidden;" v-if="userData !== null">
          <i style="font-size: 2.5rem;color: #ffffff;margin-left: 2rem;" class="cbiconfont cbicon-user"></i>
          {{userData.nickname}}
          <i style="font-size: 2.5rem;color: #ffffff;position: absolute;right: 2rem;" class="cbiconfont cbicon-edit" @click="getInfo"></i>
        </div>
      </el-header>
      <el-main style="height: 100%!important;padding: 0px;">
        <el-tabs :stretch="true">
          <el-tab-pane label="我的记录">
            <el-card v-if="userData && userData.logs" v-for="value in userData.logs" :key="value.policySign"  @click.native="policyInfo(value.policySign)">
              <el-row>
                <el-col :span="8">
                  <div class="orange line bold">{{value.money}}</div>
                  <div class="line">匹配度：{{Math.round(value.matchScore*100)}}%</div>
                </el-col>
                <el-col :span="16">
                  <div class="line font-color">政策标题：{{value.policyName}}</div>
                  <div class="line font-color">申报时间：{{value.endDate}}</div>
                </el-col>
              </el-row>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 4,
        spaceBetween: 10,
        centeredSlides: true
      },
      swiperVisible: false,
      swiperContent: [],
      userData: null,
      showInfo: false,
      bizName: '',
      phone: '',
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
          'openid': this.$cookie.get('openid')
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.userData = data.wechatUser
        } else {
        }
      })
    },
    getInfo () {
      this.$router.push({ name: 'userInfo' })
    },
    change (value) {
      console.log(this.$refs.mySwiper.swiper.slides[0].innerText)
      this.swiperVisible = false
      let bdata = {}
      switch (parseFloat(value.id)) {
        case 1:
          bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'bizType': value.content}
          this.bizType = value.content
          break
        case 2:
          bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'bizDomain': value.content}
          this.bizDomain = value.content
          break
        case 3:
          bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'bizYear': value.content}
          this.bizYear = value.content
          break
        case 4:
          bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'bizArea': value.content}
          this.bizArea = value.content
          break
        case 5:
          bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'bizPeople': value.content}
          this.bizPeople = value.content
          break
        case 6:
          bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'bizSupport': value.content}
          this.bizSupport = value.content
          break
        case 7:
          bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'bizIncome': value.content}
          this.bizIncome = value.content
          break
        case 8:
          bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'bizLimit': value.content}
          this.bizLimit = value.content
          break
        case 9:
          bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'bizKnowledge': value.content}
          this.bizKnowledge = value.content
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
    },
    changebizName () {
      let bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'bizName': this.bizName}
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
    },
    changePhone () {
      let bdata = {'openid': this.$cookie.get('openid'), 'updateType': 'base', 'phone': this.phone}
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
    },
    policyInfo (id) {
      let data = {
        'openid': this.$cookie.get('openid'),
        'policySign': id,
        'reqType': 'list'
      }
      sessionStorage.setItem('policyInfo', JSON.stringify(data))
      this.$router.push({ name: 'policyInfo' })
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
