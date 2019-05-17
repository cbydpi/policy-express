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
                  <div class="line">匹配度：{{value.matchScore}}%</div>
                </el-col>
                <el-col :span="16">
                  <div class="line font-color">政策标题：{{value.policySign}}</div>
                  <div class="line font-color">申报时间：{{value.declareDate}}</div>
                </el-col>
              </el-row>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <div v-if="showInfo" style="padding: 0 5px;">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="企业名称" style="border-bottom: solid 1px #ccc;">
          <el-input v-model="bizName" @blur="changebizName()" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" style="border-bottom: solid 1px #ccc;">
          <el-input v-model="phone" @blur="changePhone()" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item label="企业资质" style="border-bottom: solid 1px #ccc;">
          <el-input disabled @click.native="showSwiper(1)" v-model="bizType" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item label="所属领域" style="border-bottom: solid 1px #ccc;">
          <el-input disabled @click.native="showSwiper(2)" v-model="bizDomain" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item label="成立年限" style="border-bottom: solid 1px #ccc;">
          <el-input disabled @click.native="showSwiper(3)" v-model="bizYear" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item label="注册地址" style="border-bottom: solid 1px #ccc;">
          <el-input disabled @click.native="showSwiper(4)" v-model="bizArea" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item label="创业人群" style="border-bottom: solid 1px #ccc;">
          <el-input disabled @click.native="showSwiper(5)" v-model="bizPeople" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item label="研发投入占比" style="border-bottom: solid 1px #ccc;">
          <el-input disabled @click.native="showSwiper(6)" v-model="bizSupport" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item label="企业营收" style="border-bottom: solid 1px #ccc;">
          <el-input disabled @click.native="showSwiper(7)" v-model="bizIncome" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item label="融资额度" style="border-bottom: solid 1px #ccc;">
          <el-input disabled @click.native="showSwiper(8)" v-model="bizLimit" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item label="自主知识产权" style="border-bottom: solid 1px #ccc;">
          <el-input disabled @click.native="showSwiper(9)" v-model="bizKnowledge" class="inputStyle" suffix-icon="el-icon-arrow-right"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="showInfo=false">确定</el-button>
          <el-button @click="showInfo=false">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="swiper" v-if="swiperVisible">
      <h3 style="text-align: center;padding: 10px;background: rgba(217,217,217,.3);">
        <span style="font-weight: normal;left: 20px;position: absolute;" @click="swiperVisible=false">取消</span>选择
        <!--<span style="float: right;font-weight: normal;margin-right: 20px;">确定</span>-->
      </h3>
      <swiper :options="swiperOption" ref="mySwiper" style="padding: 20px 0;height: 20rem;">
        <swiper-slide v-for="(value, index) in swiperContent" :key="index">
          <div class="swiper-content" @click="change(value)">{{value.content}}</div>
        </swiper-slide>
      </swiper>
    </div>
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
      this.showInfo = true
      this.$http({
        url: this.URL + 'wechatUserEditInfo',
        method: 'post',
        data: this.$http.adornData({
          'openid': this.$cookie.get('openid')
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.bizName = data.wechatUser.bizName
          this.phone = data.wechatUser.phone
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
    showSwiper (num) {
      this.swiperVisible = true
      switch (parseFloat(num)) {
        case 1:
          this.swiperContent = [
            {
              content: '国家高新技术企业',
              id: '1'
            },
            {
              content: '中关村高新技术企业',
              id: '1'
            },
            {
              content: '无',
              id: '1'
            }
          ]
          break
        case 2:
          this.swiperContent = [
            {
              content: '新一代信息技术',
              id: '2'
            },
            {
              content: '集成电路',
              id: '2'
            },
            {
              content: '医药健康',
              id: '2'
            },
            {
              content: '智能装备产业',
              id: '2'
            },
            {
              content: '节能环保',
              id: '2'
            },
            {
              content: '新能源智能汽车',
              id: '2'
            },
            {
              content: '新材料',
              id: '2'
            },
            {
              content: '人工智能',
              id: '2'
            },
            {
              content: '软件和信息服务',
              id: '2'
            },
            {
              content: '科技服务业',
              id: '2'
            }
          ]
          break
        case 3:
          this.swiperContent = [
            {
              content: '1年以内',
              id: '3'
            },
            {
              content: '1-3年',
              id: '3'
            },
            {
              content: '4-6年',
              id: '3'
            },
            {
              content: '7年以上',
              id: '3'
            }
          ]
          break
        case 4:
          this.swiperContent = [
            {
              content: '海淀区',
              id: '4'
            },
            {
              content: '中关村示范区',
              id: '4'
            }
          ]
          break
        case 5:
          this.swiperContent = [
            {
              content: '留学人员',
              id: '5'
            },
            {
              content: '非留学人员',
              id: '5'
            }
          ]
          break
        case 6:
          this.swiperContent = [
            {
              content: '10%-20%',
              id: '6'
            },
            {
              content: '30%-40%',
              id: '6'
            },
            {
              content: '50%以上',
              id: '6'
            }
          ]
          break
        case 7:
          this.swiperContent = [
            {
              content: '0-50万',
              id: '7'
            },
            {
              content: '50-100万',
              id: '7'
            },
            {
              content: '100-500万',
              id: '7'
            },
            {
              content: '500-1000万',
              id: '7'
            },
            {
              content: '1000-5000万',
              id: '7'
            },
            {
              content: '5000万-1亿',
              id: '7'
            }
          ]
          break
        case 8:
          this.swiperContent = [
            {
              content: '0-50万',
              id: '8'
            },
            {
              content: '50-100万',
              id: '8'
            },
            {
              content: '100-500万',
              id: '8'
            },
            {
              content: '500-1000万',
              id: '8'
            },
            {
              content: '1000-5000万',
              id: '8'
            },
            {
              content: '5000万-1亿',
              id: '8'
            }
          ]
          break
        case 9:
          this.swiperContent = [
            {
              content: '有',
              id: '9'
            },
            {
              content: '无',
              id: '9'
            }
          ]
          break
      }
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
