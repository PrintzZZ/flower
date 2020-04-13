<template>
  <div class="box">
    <!-- 头部 -->
    <div>
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <!-- 付款banner -->
      <div class="shipped">
        <div>
          <van-icon tag="span" name="balance-list-o" />
          <span class="text" v-if="status">订单已付款</span>
          <span class="text" v-else>订单未付款</span>
        </div>
      </div>
      <!-- 地址 -->
      <div class="locInfo">
        <van-icon class="loctag" name="location-o" />
        <ul class="locininnfo">
          <li><van-tag color="#f2826a">快递</van-tag>{{ address }}</li>
          <li>联系方式: {{ tel }}</li>
          <li></li>
        </ul>
      </div>
      <div v-for="item of orderlist" :key="item.proid" class="orderbox">
        <van-card
          :num="item.num"
          :price="item.price"
          :title="item.proname"
          :desc="item.material"
          :thumb='item.proimg'
          centered
        />
        </div>
        <div class="van-cell-groupbox">
        <van-cell-group>
          <van-cell title="商品金额" :value="'￥' + totalPrice" />
          <van-cell title="优惠方式" value="￥0"  />
          <van-cell title="运费" value="￥0"  />
          <van-cell title="订单总价" class="totailprice" :value="'￥' + totalPrice"  />
        </van-cell-group>
        <van-cell class="orderPro" title="订单进度" is-link url="/orderProgress" />
        <van-cell>
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <span class="custom-title">订单编号</span>
            <span class="custom-value">{{ orderid }}</span>
            <van-button @click="onCopy()" round size="mini">复制</van-button>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <span class="custom-title">下单时间</span>
            <span class="custom-value">{{ this.time.year }}/{{ this.time.month*1 + 1 }}/{{ this.time.day }}&nbsp;{{ this.time.hour }}:{{ this.time.minutes }}</span>
          </template>
        </van-cell>
        <van-cell class="refund">
          <template slot="title" v-if="isPay">
            <span class="custom-title" @click="showDialog">查看订单</span>
            <van-button hairline round size="mini" type="warning" @click="payOver">去查看</van-button>
          </template>
          <template slot="title" v-else >
            <span class="custom-title" @click="removeOrder">删除订单</span>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from '@/utils/request'
import { NavBar, Toast, Icon, Tag, Card, Cell, CellGroup, Button, Dialog } from 'vant'

Vue.use(NavBar).use(Toast).use(Icon).use(Tag).use(Card).use(Cell).use(CellGroup).use(Button).use(Dialog)
export default {
  data () {
    return {
      username: '',
      address: '',
      orderid: '',
      tel: '',
      num: 0,
      price: 0,
      totalPrice: 0,
      list: [],
      orderlist: [],
      isPay: true,
      show: false,
      // time: [],
      status: 0,
      time: {}
    }
  },
  created () {
    let userid = localStorage.getItem('userid')
    axios.get('/order?userid=' + userid + '&orderid=' + this.$router.currentRoute.query.orderid).then(res => {
      this.orderid = this.$router.currentRoute.query.orderid
      // console.log(res.data)
      // console.log(res.data.data)
      this.list = res.data.data
      console.log(this.list)
      // let index = 0
      this.list.map((item) => {
        // console.log(item)
        // console.log(item.status)
        this.tel = item.tel
        // console.log(item.list)
        this.address = item.address
        if (item.orderid === this.orderid) {
          console.log(item)
          this.orderlist = item.list
          // this.status = item.status
          // this.time = item.time
          // console.log(item)
          this.time = item.time[0]
          // console.log('==========================')
          // console.log(this.time)
          for (var i in item.list) {
            this.totalPrice += item.list[i].num * item.list[i].price
          }
        }
      })
      // console.log(this.totalpri)
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onCopy () {
      Toast('复制成功')
    },
    removeOrder () {
      Dialog.confirm({
        title: '提示',
        message: '是否要取消订单'
      }).then(() => {
        Toast('删除成功')
        this.$router.push('/orderlist')
        axios.get('/order/delete?orderid=' + this.orderid).then(res => {
          // console.log('cancelok')
        })
      }).catch(() => {
        this.isPay = true
      })
    },
    showDialog () {
      Dialog.confirm({
        title: '提示',
        message: '是否要取消订单'
      }).then(() => {
        this.isPay = false
      }).catch(() => {
        // console.log(2)
      })
    },
    payOver () {
      // Dialog.confirm({
      //   title: '提示',
      //   message: '是否支付'
      // }).then(() => {
      //   this.$router.push('/orderlist')
      //   this.isPay = false
      // }).catch(() => {
      //   // on
      // })
      this.$router.push('/user') // yad 上个页面已经支付,直接查看订单,
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
// 头部格式
.content {
  padding-bottom: .5rem;
  background-color: #efefef;
  @include rect(100%,100%);
  @include overflow();
}
.shipped {
  height: 1rem;
  color: #fff;
  line-height: 1rem;
  font-size: .10rem;
  background: linear-gradient(90deg,#ffae00,#ff7100);
  padding: 0;
  div {
    @include rect(100%,100%);
    width: 100%;
    background-image: url(http://cdn.jisuapp.cn/zhichi_frontend/static/webapp/images/xcx-goods/goods-order-bg.png);
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: 100% 100%;
    padding-left: .3rem;
    span {
      // font-size: .40rem;
      font-size: .3rem;
      margin-right: .15rem;
      display: inline-block;
      vertical-align: middle;
    }
    .text {
      height: .3rem;
      line-height: .3rem;
      font-size: .20rem;
    }
  }
}

// 地址栏格式
.locInfo {
  @include flexbox();
  background-color: #fff;
  padding: .1rem;
  margin-bottom: .07rem;
  @include align-items();
  @include font-size(.13rem);
  .loctag {
    @include font-size(.20rem);
  }
  .locininnfo {
    margin-left: .1rem;
    li {
      margin-top: .05rem;
      .van-tag {
        margin-right: .1rem;
      }
    }
  }
}

// 总价
.totailprice {
  .van-cell__value {
    color: #ff0000;
    font-size: .16rem;
  }
}
.orderPro {
  margin: .07rem 0;
}
.custom-value {
  color:#969799;
  margin-left: .2rem;
}
.refund {
  position: fixed;
  bottom: 0;
}
.van-button {
  float: right;
  padding:0 .05rem;
}
.orderbox {
  margin-bottom: 7px;
  .van-card {
    background-color: #fff;
    box-shadow: 1px 1px 2px #d6c1c12d;
  }
}
</style>
