<template>
  <div style="width: 100%;height: 100%;overflow: hidden;">
    <el-container style='height: 100%;width: 100%;'>
      <el-main style="height: 100%!important;">
        <div v-for="(value,key) in chatContent" class="clearfix" :key="key">
          <div :class="value.role === 'robot' ? 'leftIcon' : 'rightIcon'"></div>
          <div :class="value.role === 'robot' ? 'left' : 'right'">
            {{value.content}}
          </div>
        </div>
      </el-main>
      <el-footer>
        <el-input placeholder="请输入内容" v-model="chatInput">
          <el-button slot="append">发送</el-button>
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
          content: 'kj;asdjkkjaskdl;gjakl'
        },
        {
          role: 'user',
          content: 'kj;as;ff'
        }
      ],
      chatInput: ''
    }
  },
  mounted () {

  },
  methods: {

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
