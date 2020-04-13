<template>
  <div class="box">
    <header class="header">
      <!-- 个人信息头部 -->
      <van-nav-bar
        title="个人信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="content">
      <div class="userinfofrom">
        <div class="infoitem">
          <div class="name">昵称</div>
          <div class="infoitemright">
            <!-- ====用户名 ==== -->
            <input v-model="username" type="text" class="input" name="username" placeholder="请填写昵称">
            <!-- === 头像上传 === -->
            <van-uploader :after-read="afterRead">
              <van-button type="default" ><i class="iconfont icon-touxiang"></i></van-button>
            </van-uploader>
          </div>
        </div>
        <div class="infoitem">
          <!-- ==== 手机号 ==== -->
          <div class="name">手机号</div>
            <van-field v-model="tel" disabled />
          </div>
        <div class="infoitem">
          <div class="name">性别</div>
          <!-- === 性别 === -->
          <div class="infoitemright">
            <van-radio-group v-model="radio">
              <van-radio name="1" checked-color="#ff7100">男</van-radio>
              <van-radio name="2" checked-color="#ff7100">女</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="infoitem">
          <!-- === 生日 === -->
          <div class="name">生日</div>
          <div class="infoitemright">
            <van-cell is-link @click="showPopup">{{ birth }}</van-cell>
            <van-popup v-model="show" position="bottom">
              <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm='saveTime'
                @change='change'
              />
            </van-popup>
          </div>
        </div>
      </div>
      <p class="tip">请完善个人信息，以便我们为你提供更好的会员服务</p>
    </div>
    <div class="userinfofooter">
      <div class="footerbox">
        <button class="save footerbtn" @click="saveinfo">保存</button>
        <button class="loginout footerbtn" @click="loginout">退出登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from '@/utils/request'
import {
  NavBar,
  Field,
  Uploader,
  RadioGroup,
  Radio,
  DatetimePicker,
  Popup,
  Button,
  CellGroup,
  Cell,
  Toast
} from 'vant'

Vue
  .use(NavBar)
  .use(Field)
  .use(Uploader)
  .use(RadioGroup)
  .use(Radio)
  .use(DatetimePicker)
  .use(Popup)
  .use(Button)
  .use(CellGroup)
  .use(Cell)
  .use(Toast)
export default {
  data () {
    return {
      currentDate: new Date(),
      show: false,
      minDate: new Date(1960, 10, 1),
      maxDate: new Date(),
      birth: '选择生日',
      tel: '',
      username: '',
      radio: ''
    }
  },
  created () { // 页面加载请求数据并渲染
    this.tel = localStorage.getItem('tel')
    axios.post('/users/findinfo', {
      tel: this.tel
    }).then(res => {
      console.log(res.data)
      this.username = res.data.info[0].username
      this.radio = res.data.info[0].sex
      this.birth = res.data.info[0].birth
    })
  },
  methods: {
    onClickLeft () { // 返回上一页
      this.$router.back()
    },
    showPopup () {
      this.show = true
    },
    loginout () {
      localStorage.removeItem('token')
      localStorage.setItem('login', 'nologin')
      this.$router.push('/login')
    },
    saveTime () { // 隐藏事件选择器
      this.show = false
    },
    change (e) { // 改变生日日期
      let a = e.getValues()
      this.birth = `${a[0]}-${a[1]}-${a[2]}`
    },
    saveinfo () { // 点击保存,修改数据库,并重新渲染数据
      // console.log({
      //   newname: this.username,
      //   tel: this.tel,
      //   sex: this.sex,
      //   birth: this.birth
      // })
      // 用户名newname, 手机号tel, 性别sex, 生日birth
      axios.post('/users/update', {
        newname: this.username,
        tel: this.tel,
        sex: this.radio,
        birth: this.birth
      }).then(res => {
        if (res.data.code === 10006) {
          Toast('修改失败')
        } else {
          axios.post('/users/findinfo', {
            tel: this.tel
          }).then(res => {
            this.username = res.data.info[0].username
            this.radio = res.data.info[0].sex
            this.birth = res.data.info[0].birth
          })
          Toast('修改成功')
        }
      })
    },
    afterRead (file) {
      let userid = localStorage.getItem('userid')
      axios.post('/headimg/upload', { file: file.content, userid: userid }).then(res => {
        console.log(res)
        Toast('上传头像成功')
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
body{
  background-color: #f5f5f9;
}
  .userinfofrom{
    background-color: #fff;
    @include rect(100%,auto);
    @include padding(0 4%);
    .infoitem{
      @include flexbox();
      @include border(0 0 1px 0, #efefef, solid);
      @include align-items();
      @include rect(100%,.5rem);
      .name{
        @include rect(20%,100%);
        text-align: left;
        line-height: .5rem;
        padding-left: 5px;
      }
      .infoitemright{
        @include flex();
        @include flexbox();
        @include align-items();
        .input{
        @include flex();
          border: 0;
          display: block;
        }
        .van-uploader{
          @include rect(.5rem,.5rem)
        }
        .icon-touxiang{
          font-size: 25px;
          color: #ccc;
        }
        .van-radio-group{
          @include flexbox();
          .van-radio{
            margin-right: 10px;
          }
        }
      }
    }
  }
  .van-field {
    padding: 12px;
  }
  .van-button--default{
    border: 0;
  }
  .tip{
    margin-top: 10px;
    font-size: 12px;
    color: #a4a4a4;
    text-align: center;
  }
  .userinfofooter{
    position:fixed;
    bottom: 0;
    @include rect(100%,.5rem);
    .footerbox{
      @include rect(100%,.5rem);
      @include flexbox();
      text-align: center;
      line-height: .5rem;
      .save{
        @include rect(50%,100%);
        background-color: #ff7100;
        color: #fff;
      }
      .loginout{
        @include rect(50%,100%);
        background-color: #fff;
        color: #ff7100
      }
      .footerbtn{
        border: 0;
        display: block;
      }
    }
  }
</style>
