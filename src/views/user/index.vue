<template>
  <div class="box">
    <header class="header">
      <!-- <div class="title"> -->
        <van-nav-bar
          title="个人中心"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      <!-- </div> -->
    </header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="content">
        <div class="userInfoBox userInfoBoxactive" id="vipcarbtm">
          <!-- 用户信息卡片 -->
          <div class="userInfo" @click='userinfo' v-if="flag">
            <div class="userImg">
              <img :src=src alt="">
            </div>
            <div class="userContent">
              <div>
                <p class="tel">{{ usernametitle }}</p>
              </div>
              <div>
                <p class="vipinfo">恭喜您,您已成为我们的普通会员</p>
              </div>
            </div>
          </div>
          <!-- 用户信息卡片未登录 -->
          <div class="userInfo" v-if="!flag" @click="unlogin">
            <div class="userImg">
              <img src='http://img.zhichiwangluo.com/zc_app_default_photo.png' alt="">
            </div>
            <div class="userContent">
              <div>
                <p class="tel">用户名</p>
              </div>
              <div>
                <p class="vipinfo">登录获取更多信息</p>
              </div>
            </div>
          </div>
          <!-- 会员卡卡片 -->
          <div class="vipCar">
            <div class="vipCarTop">
              <div class="viplogo">
                <img src="http://cdn.jisuapp.cn/zhichi_frontend/static/webapp/images/user-center/vip_level.png" alt="">
                <span>倾城花艺会员卡</span>
              </div>
              <span class="upTip" @click="upTip" v-if="flag">展开</span>
            </div>
            <div class="vipCarBottom" id="vipCarBottom">
              <span>No.000001</span>
              <div>
                <span>永久有效<i class="iconfont icon-erweima"></i></span>
              </div>
            </div>
          </div>
        </div>
        <!-- 会员卡片遮挡空白卡片 -->
        <div class="blank"></div>
        <!-- 微分商城卡片 -->
        <div class="smallshop" @click="smallshop">
          <div >
            <span><i class="iconfont icon-dunpai"></i>微分商城</span>
            <span class="smallshoptip">海量商家优惠券等你去领!</span>
          </div>
          <span class="iconfont"><i class="iconfont icon-arrow-sl"></i></span>
        </div>
        <!-- 选项卡 -->
        <div class="userContent" v-if="flag">
          <van-cell-group>
            <van-cell @click="onclick" id="0" title="全部订单" is-link to="/orderlist" icon="send-gift-o"></van-cell>
            <van-cell @click="onclick" id="1" title="待付款" is-link to="/orderlist" icon="shop-o"></van-cell>
            <van-cell @click="onclick" id="2" title="待收货" is-link to="/orderlist" icon="point-gift-o"></van-cell>
            <van-cell @click="onclick" id="3" title="待评价" is-link to="/orderlist" icon="comment-o"></van-cell>
            <van-cell @click="onclick" title="收货地址" is-link to="/myaddress" icon="location-o"></van-cell>
            <van-cell @click="onclick" title="会员卡" is-link to="/vipcard" icon="vip-card-o"></van-cell>
            <van-cell @click="onclick" title="关于我们" is-link to="/about" icon="vip-card-o"></van-cell>
          </van-cell-group>
        </div>
        <!-- === 未登录 === -->
        <div class="unlogin" v-else>
          <div class="unloginimg">
            <i class="iconfont icon-kaifazheshequicon-"></i>
            <p>登录查看更多信息</p>
          </div>
          <button class="loginbtn" @click="login">登录</button>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import axios from '@/utils/request'
import Vue from 'vue'
import { NavBar, Toast, Cell, CellGroup, PullRefresh } from 'vant'

Vue.use(NavBar).use(Toast).use(Cell).use(CellGroup).use(PullRefresh)

export default {
  data () {
    return {
      flag: false, // 是否登录
      usernametitle: '',
      src: '',
      isLoading: false
    }
  },
  created () {
    // 页面初始化刷新
    let login = localStorage.getItem('login')
    console.log(login)
    if (login === 'islogin') {
      localStorage.setItem('login', 'logining')
      this.$router.go(0)
      return 1
    } else if (login === 'nologin') {
      localStorage.setItem('login', 'islogin')
      this.$router.go(0)
    }
    let a = localStorage.getItem('tel')
    axios.post('/users/findinfo', { tel: a }).then(res => {
      if (res.data.code === 10119) {
        this.flag = false
      } else {
        this.flag = true
        this.usernametitle = res.data.info[0].username
      }
    })
    // 初始化刷新结束
    let userid = localStorage.getItem('userid')
    axios.post('/headimg/getimg', { userid: userid }).then(res => {
      console.log(res.data)
      if (res.data.code !== 10119) {
        if (res.data.data.length) {
          this.src = res.data.data[0].file
        } else {
          this.src = 'http://img.zhichiwangluo.com/zc_app_default_photo.png' // 默认头像
        }
      }
    })
  },
  methods: {
    login () {
      this.$router.push('login')
    },
    register () {
      this.$router.push('register')
    },
    onClickLeft () {
      // Toast('返回');
      this.$router.back()
    },
    upTip () {
      let a = document.getElementById('vipcarbtm')
      let b = document.getElementById('vipCarBottom')
      if (a.className === 'userInfoBox') {
        a.className = 'userInfoBoxactive userInfoBox'
        b.style.height = 0
      } else {
        a.className = 'userInfoBox'
        b.style.height = '.6rem'
      }
    },
    userinfo () {
      this.$router.push('/userinfo')
    },
    smallshop () {
      Toast.setDefaultOptions({ duration: 800 })
      Toast('暂无功能')
    },
    onclick (e) {
      // console.log(e.currentTarget.id) //获取列表index
      localStorage.setItem('index', e.currentTarget.id)
    },
    unlogin () {
      this.$router.push('/login')
    },
    onRefresh () {
      setTimeout(() => {
        this.$router.go(0)
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
body{
  background-color: #f5f5f9;
}
.van-pull-refresh{
  overflow: visible;
}
.content {
  @include overflow();
}
.userInfoBoxactive{
  border-bottom-right-radius: 4.5rem .4rem;
  border-bottom-left-radius: 4.5rem .4rem
}
.hidden{
  display: none;
}
.userInfoBox{
  @include rect(100%,auto);
  @include padding(0 5%);
  background: linear-gradient(0deg,#d6d6d6,hsla(0,0%,100%,.49));
  transition: all .25s linear;
  overflow: hidden;
  .userInfo{
    @include flexbox();
    @include align-items();
    @include padding(0 .18rem);
    min-height: .88rem;
    .userImg{
      img{
        border-radius: 50%;
        overflow: hidden;
        @include rect(.4rem,.4rem);
        }
    }
      .van-cell{
        @include rect(100%,.5rem);
      }
    .userContent{
      text-align: left;
      margin-left: 0.2rem;
      .tel{
        color: rgb(68, 68, 68);
        font-size: 14px;
      }
      .vipinfo{
        color: rgb(51, 51, 51);
        font-size: 12px;
      }
    }
  }
  .vipCar{
    background: url('http://cdn.jisuapp.cn/zhichi_frontend/static/webapp/images/user-center/user_vip_2.png') no-repeat;
    background-size: 150%;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    @include rect(90%,auto);
    @include padding(0 0 2% 0);
    @include margin(0 5%);
    .vipCarTop{
      @include rect(95%,0.44rem);
      @include flexbox();
      @include align-items();
      @include padding(0 0 0 5%);
      .viplogo{
        @include flex();
        @include rect(auto,.15rem);
        img{
          @include margin(0 .05rem 0 0);
          @include rect(0.15rem,auto);
        }
        span{
          font-size: 16px;
          color: rgb(218, 175, 135);
        }
      }
      .upTip{
        display: inline-block;
        width: 0.4rem;
        color: rgb(218, 175, 135);
      }
    }
    .vipCarBottom{
      @include rect(90%,0);
      @include padding(0 0 0 5%);
      @include flexbox();
      @include justify-content(space-between);
      @include align-items(flex-end);
      transition: all .25s linear;
      color: #daaf87;
      font-size: 12px;
      overflow: hidden;
      i{
        margin-left: 5px;
        font-size: 12px;
        color: #daaf87
      }
    }
  }
}
.blank{
  @include rect(100%,0.4rem);
  @include margin(0 0 2% 0);
  background-image: linear-gradient(#f5f5f9, #ffffff);
}
.smallshop{
  @include margin(0 0 2% 0);
  @include flexbox();
  @include rect(100%,0.5rem);
  @include padding(0 4%);
  @include justify-content(space-between);
  @include align-items();
  background-color: #fff;
  .icon-dunpai{
    font-size: 12px;
    color: #daaf87;
    margin-right: 5px;
  }
  .smallshoptip{
    margin-left: 10px;
  }
  :nth-child(1){
    color: #333;
    // margin: 0 10px;
  }
  :nth-child(2){
    font-size: 12px;
    color: #999;
  }
}
.userContent{
  @include rect(100%,auto);
  ul{
    @include rect(100%,auto);
    li{
      @include padding(0 6%);
      @include rect(100%,.5rem);
      line-height: .5rem;
      border-bottom:1px solid #f3f3f3;
      background-color: #fff;
      color:#333;
      i{
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
}
.unlogin{
  width: 100%;
  // height: 43%;
  // min-height: 150px;
  margin-top: .2rem;
  .unloginimg{
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 16px;
    // line-height: 100px;
    color: #ccc;
    .icon-kaifazheshequicon-{
      font-size: 50px;
      color: #ccc;
    }
  }
}
.loginbtn {
    @include rect(20%,.3rem);
    border-radius: 25px;
    display: block;
    border: 0;
    margin: .2rem auto;
    color: #fff;
    background-image: linear-gradient(to top, #6379f5 0%, #1748fa 100%);
    box-shadow: 0px 2px 4px 0px #4f4f4f8c;
    }
</style>
