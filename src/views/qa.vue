<template>
  <div style="width: 100%;height: 100%;overflow: hidden;">
    <el-container style='height: 100%;width: 100%;'>
      <el-main style="height: 100%!important;">
        <div id="chatBox" style="height: 100%;">
          <div v-for="(value,key) in chatContent" class="clearfix" :key="key">
            <div :class="value.role === 'robot' ? 'leftIcon' : 'rightIcon'"></div>
            <div :class="value.role === 'robot' ? 'left' : 'right'">
              {{value.content}}
            </div>
          </div>
        </div>
      </el-main>
      <el-footer style="padding: 0;">
        <el-input placeholder="请输入内容" v-model="chatInput">
          <el-button type="primary" slot="append" @click.native="chat">发送</el-button>
        </el-input>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chatContent: [
        {
          role: 'robot',
          content: '您好，我是小海政策机器人，有什么问题快来咨询我吧'
        }
      ],
      chatInput: '',
      dateTime: ''
    }
  },
  mounted () {
    this.callSign()
  },
  methods: {
    callSign () {
      let date = new Date()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      if (month < 10) {
        month = '0' + month.toString()
      }
      if (day < 10) {
        day = '0' + day.toString()
      }
      if (hour < 10) {
        hour = '0' + hour.toString()
      }
      if (minute < 10) {
        minute = '0' + minute.toString()
      }
      if (second < 10) {
        second = '0' + second.toString()
      }
      this.dateTime = date.getFullYear().toString() + month + day + hour + minute + second
    },
    chat () {
      this.chatContent.push({
        role: 'user',
        content: this.chatInput
      })

      this.$http({
        url: this.URL + 'smart',
        method: 'post',
        data: this.$http.adornData({
          'user': 'admin',
          'callSign': this.dateTime,
          'chat': this.chatInput,
          'chatResource': 'h5'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          if (data.result === 'success') {
            this.chatInput = ''
            this.chatContent.push({
              role: 'robot',
              content: data.answer
            })
          } else {
            this.chatInput = ''
            this.chatContent.push({
              role: 'robot',
              content: '小海暂时无法回答该问题'
            })
          }
        } else {
        }
      })
    }
  },
  watch: {
    chatlog () {
      this.$nextTick(function () {
        let div = this.$el.querySelector('#chatBox')
        div.scrollTop = div.scrollHeight
      })
    }
  },
  updated: function () {
    this.$nextTick(function () {
      let div = this.$el.querySelector('#chatBox')
      div.scrollTop = div.scrollHeight
      console.log(div.scrollTop, div.scrollHeight)
    })
  }
}
</script>

<style lang="scss" scoped="scoped">
.el-main{
  padding: 0 10px;
}
.right {
  display: inline-block;
  background: #0088ff;
  float: right;
  margin-right: .5rem;
  font-size: 1.4rem;
  padding: 6px 10px;
  border-radius: 4px;
  box-sizing: content-box;
  background-size: 100%;
  margin-bottom: 10px;
  max-width: 70%;
  word-wrap: break-word;
  line-height: 2rem;
  color: #fff;
}
.rightIcon{
  float: right;
  background-image: url(~@/assets/images/headShoot_right.png);
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background-size: cover;
  right: .5rem;
  margin-top: .5rem;
}

.left {
  display: inline-block;
  float: left;
  margin-left: .5rem;
  background: #fff;
  padding: 6px 10px;
  border: solid 1px #0088ff;
  border-radius: 4px;
  box-sizing: content-box;
  background-size: 100%;
  max-width: 70%;
  word-wrap: break-word;
  margin-bottom: 1rem;
  color: #444;
  line-height: 2rem;
}
.leftIcon{
  background-image: url('~@/assets/images/headShoot_left.png');
  display: inline-block;
  float: left;
  width: 2rem;
  height: 2rem;
  background-size: cover;
  left: .5rem;
  margin-top: .5rem;
}
</style>
