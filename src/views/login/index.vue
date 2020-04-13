<template>
  <div class="loginBox">
    <div class="title" >
      <i class="web-font">欢 迎 登 录</i>
    </div>
    <div class="loginbox">
      <van-cell-group>
        <van-field
          v-model="tel"
          clearable
          label="手机号"
          placeholder="请输入手机号"
          right-icon="question-o"
          @click-right-icon="$toast('11位手机号')"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          right-icon="question-o"
          @click-right-icon="$toast('长度大于6位')"
        />
      </van-cell-group>
      <div class="btnbox">
        <button class="login btn" @click="login">登录</button>
        <!-- <button class="register btn" @click="register">注册</button> -->
      </div>
    </div>
    <div class="register">
      <span class="left" @click="forget">忘记密码</span>
      |
      <span class="right" @click="register">立即注册</span>
    </div>
    <div class="qqbox">
      <div @click="qqonclick" class="qq"><i class="iconfont icon-QQ"></i></div>
      <div @click="qqonclick" class="weixin"><i class="iconfont icon-weixin"></i></div>
      <div @click="qqonclick" class="weibo"><i class="iconfont icon-weibo"></i></div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from '@/utils/request'
import { Field, Button, CellGroup, Toast } from 'vant'

Vue.use(Field).use(Button).use(CellGroup).use(Toast)
export default {
  data () {
    return {
      tel: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    login () {
      Toast.setDefaultOptions({ duration: 800 })
      if (this.tel === '') {
        Toast('账号不能为空')
      } else
      if (this.tel.length !== 11) {
        Toast('手机号不合法')
      } else
      if (this.password === '') {
        Toast('密码不能为空')
      } else
      if (this.password.length < 6) {
        Toast('密码不合法')
      } else {
        axios.post('/users/login', {
          tel: this.tel,
          password: this.password
        }).then(res => {
          console.log(res.data)
          // |10003|用户不存在|
          // |10004|登录成功|
          // |10005|密码错误|
          if (res.data.code === 10003) {
            Toast('找不到该账号,请先注册')
          }
          if (res.data.code === 10005) {
            Toast('密码错误')
          }
          if (res.data.code === 10004) {
            // Toast('登陆成功')
            let token = res.data.token
            let userid = res.data.data[0].userid
            localStorage.setItem('token', token)
            localStorage.setItem('userid', userid)
            localStorage.setItem('tel', this.tel)
            // this.$router.push('/user')
            const toast = Toast.loading({
              duration: 0, // 持续展示 toast
              forbidClick: true,
              message: '登陆成功,正在跳转...'
            })

            let second = 1
            const timer = setInterval(() => {
              second--
              if (second) {
                toast.message = `登陆成功,正在跳转..`
              } else {
                clearInterval(timer)
                // 手动清除 Toast
                Toast.clear()
                // this.$router.back()
                localStorage.setItem('login', 'islogin')
                this.$router.push('/user')
              }
            }, 1000)
          }
        })
      }
    },
    forget () {
      Toast({
        message: '暂无该功能',
        duration: 800
      })
    },
    qqonclick () {
      Toast({
        message: '暂无该功能',
        duration: 800
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
.loginBox{
  @include rect(100%,100%);
  background:url("../.././lib/loginbg.png") no-repeat;
  background-size: 100%;
  .title{
    margin-top: .8rem;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    text-shadow: 1px 1px 8px #2229;
  }
  .loginbox{
    @include rect(80%,auto);
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 1px 1px 20px 0px #0b00f626;
    margin:.5rem auto;
    padding: 10px;
    padding-top: 20px;
    position: relative;
  }
  .btnbox{
    @include margin(22px 0);
    @include flexbox();
    @include justify-content();
    color: #fff;
    .btn {
      @include rect(85%,.44rem);
      border-radius: 25px;
      display: block;
      border: 0;
      // margin: 0 15px;
      position: absolute;
      top: 138px;
      box-shadow: 0px 2px 4px 0px #4f4f4f8c;
    }
    .login{
      background-image: linear-gradient(to top, #6379f5 0%, #1748fa 100%);
    }
    .register{
      background-color: rgb(255, 84, 17);
    }
  }
}
.register{
  @include flexbox();
  @include justify-content();
  span {
    color: #1748fa;
  }
  .right{
    margin-left: 5px;
  }
  .left{
    margin-right: 5px;
  }
}
.qqbox{
  margin-top: 50px;
  @include flexbox();
  @include justify-content();
  div{
    @include rect(.4rem,.4rem);
    text-align: center;
    line-height: .4rem;
    margin: 0 20px;
    border-radius: 50%;
    background-color: rgb(46, 21, 21);
    i{
      font-size: 20px;
      color: #fff;
    }
  }
  .qq{
    background-color: #2399f2;
  }
  .weixin{
    background-color: #3bb92b;
  }
  .weibo{
    background-color: #ed496a;
  }
}
</style>
