<template>
  <div class="detail">
    <header class="header">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="detailinfo">
      <div class="detail-top">
        <!-- ==== 图片 ==== -->
        <div class="dimgbox">
          <img :src="proimg" alt="">
          <div class="proinfobox">
            <p class="huayu">花语:</p>
            <p class="huayuinfo">{{ note }}</p>
          </div>
        </div>
        <ul>
          <li class="dprice"><span>￥</span>{{ price }}</li>
          <li class="name"><span>{{ breed }}</span>{{ proname }}</li>
          <li class="meterial"><span>材料</span>{{ meterial }}</li>
          <!-- <li>{{ meterial }}</li> -->
          <!-- <li class="note">花语：{{ note }}</li> -->
          <li class="dpost">
            <p>
              <span>取货方式</span>
              <span>快递</span>
            </p>
            <span>配送费·包邮</span>
          </li>
        </ul>
        <!-- ==== 弹出层 === -->
        <van-cell is-link @click="showPopup"><span>保障: </span> 假一赔四 上门退取 急速退款</van-cell>
        <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '50%' }"
        >
          <div class="popupinfo">
            <van-cell title="保障服务" icon="gem-o" />
            <van-cell title="假一赔四" icon="label-o" />
            <p>正品保障,假一赔四</p>
            <van-cell title="上门退取" icon="label-o" />
            <p>预约上门取件,最快一小时上门,取件急速退款到账</p>
            <van-cell title="急速退款" icon="label-o" />
            <p>诚信用户在退货寄出后,享受急速款</p>
            <van-button color="linear-gradient(to right, #ff0000, #ff1717)" @click="btnclick">确定</van-button>
          </div>
        </van-popup>
        <div class="commmentbox">
          <van-tabs v-model="active">
            <van-tab title="商品详情">
              <div class="detailbox">
                <p>- 花朵详情 -</p>
                <img :src="proimg" alt="">
                <p>- 参数 -</p>
                <div class="infobox">
                  <div class="infoimg">
                    <img :src="proimg" alt="">
                  </div>
                  <div class="infotab">
                    <p><span>名称:</span>{{ proname }}</p>
                    <p><span>材料:</span>{{ meterial }}</p>
                    <p><span>花语:</span>{{ note }}</p>
                  </div>
                </div>
                <p>- 细节展示 -</p>
                <div class="samlldetailebox">
                  <div class="samlldetaileboximg1">
                    <img :src="proimg" alt="">
                  </div>
                  <div class="samlldetaileboximg2">
                    <img :src="proimg" alt="">
                  </div>
                  <div class="samlldetaileboximg3">
                    <img :src="proimg" alt="">
                  </div>
                  <div class="samlldetaileboximg4">
                    <img :src="proimg" alt="">
                  </div>
                </div>
                <p>- 价格说明 -</p>
                <div class="priceinfo">
                  <ul>
                    <li>·划线价格<br/>商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾 经展示过的销售价等，并非原价，仅供参考。</li>
                    <li>·未划线价格<br/>商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾 经展示过的销售价等，并非原价，仅供参考。</li>
                    <li>·商家详情页（含主图）以图片或文字形式标注的一口价、促销 价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和 时段等情形下的价格，具体请以结算页面的标价、优惠条件或活 动规则为准。</li>
                    <li>·此说明仅当出现价格比较时有效，具体请参见《淘宝价格发布规范》。若商家单独对划线价格进行说明的，以商家的表述为准。</li>
                  </ul>
                </div>
                <p>- 数据太少,详情没了 -</p>
              </div>
            </van-tab>
            <van-tab title="用户评论">
              <div class="commment">
                <p class="usercommenttitle">- 用户评论 -</p>
                <ul v-if='taozi'>
                  <li v-for='(item) of commentlist' :key= 'item.proid' >
                    <div class="combox">
                      <div class="imgbox">
                        <img :src="headimg" alt="">
                        <p class="username">{{ item.username }} <span>的评论：</span></p>
                      </div>
                      <p>
                        <van-rate v-model="item.rating" readonly />
                      </p>
                    </div>
                    <p class="commentinfo">{{ item.note }}</p>
                  </li>
                </ul>
                <p v-else class="nocommment">- 暂无评论 -</p>
                <p class="usercommenttitle">- 没有更多评论了 -</p>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
        @click="service"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="toCart"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="buynow"
      />
    </van-goods-action>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from '@/utils/request'
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Toast,
  NavBar,
  Rate,
  Popup,
  cell,
  Button,
  Tab,
  Tabs
} from 'vant'

Vue
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
Vue.use(Toast).use(NavBar)
Vue.use(Rate)
Vue.use(Popup)
Vue.use(cell)
Vue.use(Button)
Vue.use(Tab).use(Tabs)
export default {
  data () {
    return {
      message: '',
      flag: false,
      proid: '',
      breed: '',
      proname: '',
      meterial: '',
      price: '',
      proimg: '',
      note: '',
      // value: 0,
      commentlist: [],
      headimg: '', // 头像
      taozi: false,
      show: false, // 是否展示弹出层
      active: 0 // 默认是商品详情
    }
  },
  created () {
    let proid = this.$route.query.proid
    axios.get('/pro/detail?proid=' + proid).then(res => {
      this.proid = res.data.data.proid
      this.breed = res.data.data.breed
      this.meterial = res.data.data.material
      this.price = res.data.data.price
      this.proimg = res.data.data.proimg
      this.note = res.data.data.note
      this.proname = res.data.data.proname
    })
    console.log(this.proid)
    axios.get('/comment?proid=' + proid).then(res => {
      this.commentlist = res.data.data
      const length = this.commentlist.length
      if (length === 0) {
        this.taozi = false
      } else {
        this.taozi = true
      }
    })
    // 头像
    let userid = localStorage.getItem('userid')
    axios.post('/headimg/getimg', { userid: userid }).then(res => {
      console.log(res.data)
      if (res.data.code !== 10119) {
        if (res.data.data.length) {
          this.headimg = res.data.data[0].file
        } else {
          this.headimg = 'http://img.zhichiwangluo.com/zc_app_default_photo.png' // 默认头像
        }
      }
    })
  },
  methods: {
    buynow () {
      console.log(1230)
      // 订单时间
      var t = new Date()
      let time = [{
        year: t.getFullYear(),
        month: t.getMonth(),
        day: t.getDate(),
        hour: t.getHours(),
        minutes: t.getMinutes(),
        ordernum: t.getTime()
      }]
      // 订单userid
      let userid = localStorage.getItem('userid')
      // 订单商品
      let arr = []
      let obj = {
        proid: this.proid,
        breed: this.breed,
        material: this.meterial,
        proimg: this.proimg,
        note: this.note,
        proname: this.proname,
        price: this.price,
        num: 1
      }
      arr.push(obj)
      // 生成订单
      axios.post('/order/add', {
        list: arr,
        userid: userid,
        time: time
      }).then(res => {
        console.log(res)
        this.$router.push('/pay?orderid=' + res.data.data.orderid)
      })
    },
    getmassage () {
      console.log(this.message)
    },
    onClickLeft () {
      this.$router.back()
    },
    addCart () {
      let userid = localStorage.getItem('userid')
      let proid = this.proid
      let num = 1
      let url = '/cart/add?userid=' + userid + '&proid=' + proid + '&num=' + num
      axios.get(url).then(res => {
        // 如果未登录，跳转到登陆
        if (res.data.code === 10119) {
          const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: '您还没有登录,正在跳转..'
          })
          let second = 2
          const timer = setInterval(() => {
            second--
            if (second) {
              toast.message = `您还没有登录,正在跳转.`
            } else {
              clearInterval(timer)
              // 手动清除 Toast
              Toast.clear()
              this.$router.push('/login')
            }
          }, 1000)
        } else {
          Toast('加入购物车成功')
        }
      })
    },
    toCart () {
      this.$router.push('/cart')
    },
    service () {
      Toast({
        message: '暂无该功能',
        duration: 800
      })
    },
    showPopup () {
      this.show = true
    },
    btnclick () {
      this.show = false
    }
  }
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
.van-goods-action {
  position: relative;
  @include rect(100%, 0.5rem);
}
.detail {
  @include flexbox();
  @include flex-direction(column);
  @include rect(100%, 100%);
  .detailinfo {
    @include flex();
    @include rect(100%, auto);
    @include overflow();
    .detail-top {
      @include flex();
      @include rect(100%, auto);
      @include overflow(hidden);
      .buttombox {
        @include rect(100%, 0.5rem);
      }
      .dimgbox {
        @include rect(100%, auto);
        text-align: center;
        position: relative;
        img {
          // @include rect(2.5rem, 2.5rem);
          width: 100%;
        }
        .proinfobox {
          width: 100%;
          // height: 25%;
          position: absolute;
          bottom: 0;
          // opacity: .3;
          // background-color: #f00;
          background-image: linear-gradient(to top, rgba(247, 112, 98, 0.5) 0%, rgba(254, 81, 150, 0.5) 100%);
          .huayu {
            text-align: left;
            margin-top: 10px;
            padding: 0 10px;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
          }
          .huayuinfo {
            font-size: 0.14rem;
            text-align: left;
            padding: 10px 60px;
            color: #fff;
          }
        }
      }
      .usercomment {
        @include font-size(0.18rem);
        @include font-weight(900);
        @include rect(100%, 0.2rem);
        text-align: center;
      }
      ul {
        padding: 0 0.1rem;
        background-color: #fff;
        font-size: 15px;
        li {
          margin: 0.05rem 0;
          &.name {
            font-size: 16px;
            span {
              display: inline-block;
              text-align: center;
              width: 40px;
              border-radius: 10px;
              color: #fff;
              font-size: 12px;
              margin-right: 10px;
              background-color: red;
            }
          }
          &.meterial {
            font-size: 14px;
            color: #ccc;
            span {
              display: inline-block;
              text-align: center;
              width: 40px;
              border-radius: 10px;
              color: #fff;
              font-size: 12px;
              margin-right: 10px;
              background-color: red;
            }
          }
          &.dprice {
            span {
              font-size: 16px;
            }
            color: #ea3c30;
            font-size: 22px;
            font-weight: 900;
          }
          &.dpost {
            font-size: 14px;
            padding: 10px;
            @include rect(100%, 0.5rem);
            @include flexbox();
            justify-content: space-between;
          }
        }
      }
      .fabu {
        @include flexbox();
        @include flex-direction(column);
        span {
          @include font-size(0.16rem);
          @include font-weight(900);
        }
        input {
          @include rect(90%, auto);
          @include margin(0 5%);
        }
        button {
          @include rect(0.8rem, 0.26rem);
          @include margin(0.06rem 0.1rem 0 2.6rem);
        }
      }
      .commment {
        ul {
          padding: 0 .1rem;
          li {
            padding: .1rem;
            border-top: 1px solid #cccccc50;
            .combox {
              @include rect(100%,auto);
              @include flexbox();
              @include justify-content(space-between);
              @include align-items();
              .imgbox {
                @include flexbox();
                @include justify-content(space-between);
                @include align-items();
                img {
                  border: 1px solid #ccc;
                  border-radius: 50%;
                  width: .4rem;
                }
              }
              .username{
                font-weight: bold;
                span {
                  color: #ccc;
                  font-size: 12px;
                  font-weight: 500;
                }
              }
              p {
                @include margin(0 0 0 0.1rem);
              }
            }
            .commentinfo {
              margin-top: .1rem;
              padding-left: .5rem;
              @include rect(100%,auto);
              padding-bottom: .1rem;
              word-wrap:break-word;
              word-break:break-all;
            }
          }
        }
      }
    }
  }
}
.popupinfo {
  p{
    padding: 0 .38rem;
    color: #ccc;
  }
  .van-button{
    position: absolute;
    bottom: 0;
    width: 90%;
    left:50%;
    transform: translateX(-50%);
    border-radius: .5rem;
  }
}
.commmentbox {
  margin-top: 5px;
  .detailbox{
    p{
      margin-top: 5px;
      text-align: center;
      font-size: 12px;
      color: #ccc;
    }
    img{
      margin-top: 5px;
      width: 100%;
    }
    .infobox {
      width: 100%;
      height: 2rem;
      background-color: #fff;
      @include flexbox();
      @include justify-content(space-around);
      @include align-items();
      padding: 0 .2rem;
      .infoimg {
        overflow: hidden;
        width: 1rem;
        height: 1rem;
        img {
          width: 1.5rem;
          position: relative;
          left: -.5rem;
        }
      }
      .infotab {
        flex: 1;
        p{
          padding: 0 .2rem;
        }
      }
    }
    .samlldetailebox {
      background-color: #fff;
      width: 100%;
      height: auto;
      padding: 10px;
      div {
        width: 3rem;
        height: 3rem;
        margin: 10px auto;
        overflow: hidden;
      }
      .samlldetaileboximg1{
        img {
          position: relative;
          top: 0;
          left: 0;
          width: 220%;
        }
      }
      .samlldetaileboximg2{
        img {
          position: relative;
          top: -3rem;
          left: 0;
          width: 220%;
        }
      }
      .samlldetaileboximg3{
        img {
          position: relative;
          top: 0;
          left: -3rem;
          width: 220%;
        }
      }
      .samlldetaileboximg4{
        img {
          position: relative;
          top: -3rem;
          left: -3rem;
          width: 220%;
        }
      }
    }
    .priceinfo {
      .priceinfotitle{
        padding: 15px;
        text-align: left;
        font-size: 14px;
      }
      ul{
        padding: 10px;
        font-size: 14px;
        color: #ccc;
      }
      background-color: #fff;
    }
  }
  .commment {
    .usercommenttitle{
      margin: 5px 0;
      text-align: center;
      font-size: 12px;
      color: #ccc;
    }
    .nocommment{
      margin-top: 5px;
      text-align: center;
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
