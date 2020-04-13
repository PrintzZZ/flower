<template>
  <div class="paybox">
    <div class="topbox">
      <header>
        <van-nav-bar
          title="支付页面"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      </header>
      <!-- 地址 -->
      <div class="address">
        <van-row>
          <van-col span="7"><i class="iconfont icon-quhuo1"></i>取货方式</van-col>
          <van-col span="11"></van-col>
          <van-col span="6">快递</van-col>
        </van-row>
        <van-cell
          title="路由跳转"
          center
          is-link
          to="/myaddress"
          icon="location-o"
        >
          <template slot="title">
            <p><span class="tiplab">快递</span> {{ username }} <span>{{ tel }}</span></p>
            <p>{{ address }}</p>
          </template>
        </van-cell>
        <div class="addressbg">
          <img
            src="http://cdn.jisuapp.cn/static/webapp/images/xcx-goods/goods-address-bg.png"
            alt=""
          >
        </div>
      </div>
    </div>
    <!-- 支付商品列表 -->
    <div class="orderbox">
      <div
        class="orderlist"
        v-for="item of prolist"
        :key="item.proid"
      >
        <van-card
          :num="item.num"
          :price="item.price"
          :title="item.proname"
          :desc="item.material"
          :thumb="item.proimg"
          centered
        />
      </div>
      <!-- 支付信息 -->
      <div class="payinfo">
        <van-cell-group>
          <van-cell
            title="商品金额"
            :value="prototalmoney"
          />
          <van-cell
            title="运费"
            value="￥0.00"
          />
          <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
          />
        </van-cell-group>
        <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          position="bottom"
        >
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
      </div>
      <!-- 买家留言 -->
      <div class="paynote">
        <van-cell-group>
          <van-field
            v-model="message"
            rows="2"
            autosize
            label="买家留言"
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
        </van-cell-group>
      </div>
    </div>
    <!-- 支付按钮 -->
    <van-submit-bar
      :price="totalsum"
      button-text="在线支付"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
import Vue from 'vue'
import axios from '@/utils/request'
import { NavBar, Toast, Row, Col, Cell, CellGroup, Card, Field, CouponList, CouponCell, Popup, SubmitBar } from 'vant'

Vue.use(NavBar).use(Toast).use(Row).use(Col).use(Cell).use(CellGroup).use(Card).use(Field).use(CouponList).use(CouponCell).use(Popup).use(SubmitBar)

const coupon = [{
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '无门槛优惠券',
  startAt: 1559104000,
  endAt: 1579592000,
  valueDesc: '1.5',
  unitDesc: '元'
}, {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 250,
  name: '无门槛优惠券',
  startAt: 1559104000,
  endAt: 1579592000,
  valueDesc: '2.5',
  unitDesc: '元'
}]
const coupon2 = [{
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 350,
  name: '无门槛优惠券',
  startAt: 1559104000,
  endAt: 1579592000,
  valueDesc: '3.5',
  unitDesc: '元'
}]
export default {
  data () {
    return {
      message: '',
      chosenCoupon: -1,
      coupons: coupon,
      disabledCoupons: coupon2,
      showList: false,
      username: '',
      tel: '',
      address: '',
      prolist: [],
      prototalmoney: 0,
      totalsum: 0 // 总金额
    }
  },
  created () { // 加载默认地址
    // let orderid = this.$router.query
    let userid = localStorage.getItem('userid')
    axios.post('/address/getaddress', { userid }).then(res => {
      if (res.data.code !== 10011) {
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].flag) {
            console.log('地址:' + res.data.data[i])
            this.username = res.data.data[i].name
            this.tel = res.data.data[i].tel
            this.address = res.data.data[i].address
          }
        }
      }
    })
    axios.get('/order?userid=' + userid + '&orderid=' + this.$route.query.orderid).then(res => {
      // console.log('order111', res.data)
      console.log(res.data.data)
      // console.log(res.data.data[0].list)
      // console.log(res)
      let list = res.data.data
      list.map((item, index) => {
        // console.log(item.orderid)
        if (item.orderid === this.$route.query.orderid) {
          this.prolist = res.data.data[index].list
          console.log(res.data.data[index])
        }
      })
      // var last = res.data.data.length - 1
      // this.prolist = res.data.data[last].list
      this.prolist.map(item => {
        this.prototalmoney += item.price * item.num
      })
      this.totalsum = this.prototalmoney * 100 // 单位是分
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
      // 获取订单信息,修改为待支付订单
      let orderid = this.$route.query.orderid
      let name = this.username
      let tel = this.tel
      let address = this.address
      let status = 0 // 待支付订单
      let note = this.message // 留言
      console.log(name, tel, address, note)
      let url = `/order/update?name=${name}&tel=${tel}&status=${status}&address=${address}&note=${note}&orderid=${orderid}`
      axios.get(url).then(res => {
        console.log(res)
      })
    },
    onChange (index) {
      this.showList = false
      this.chosenCoupon = index
      console.log(this.coupons[index].value) // 优惠券的金额
      this.totalsum -= this.coupons[index].value
    },
    onExchange (code) {
      this.coupons.push(coupon)
    },
    onSubmit () {
      // 获取地址信息 订单信息 重新修改订单
      let orderid = this.$route.query.orderid
      let name = this.username
      let tel = this.tel
      let address = this.address
      let status = 1
      let note = this.message // 留言
      // console.log(name, tel, address, note)
      let url = `/order/update?name=${name}&tel=${tel}&status=${status}&address=${address}&note=${note}&orderid=${orderid}`
      // console.log(address)
      if (!address) {
        Toast({
          message: '您还没有添加地址',
          duration: 800
        })
      } else {
        axios.get(url).then(res => {
          // console.log(res)
          const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: '正在支付...'
          })
          let second = 2
          const timer = setInterval(() => {
            second--
            if (second) {
              toast.message = `支付成功`
              toast.icon = 'success'
              console.log(this.$router.currentRoute.query.orderid)
              this.$router.push('/orderdetail?orderid=' + this.$router.currentRoute.query.orderid)
            } else {
              clearInterval(timer)
              // 手动清除 Toast
              Toast.clear()
            }
          }, 1000)
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
.paybox {
  background-color: #efefef;
  @include flexbox();
  @include flex-direction(column);
  @include rect(100%, 100%);
  .orderbox {
    flex: 1;
    overflow: auto;
    margin-bottom: 50px;
  }
}
.address {
  width: 100%;
  .iconfont {
    color: #ff7100;
    margin-right: 5px;
  }
  .van-row {
    background-color: #fff;
    width: 100%;
    margin-bottom: 0.1rem;
    .van-col {
      height: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
    }
  }
  .van-cell__title {
    padding: 0 5px;
    .tiplab {
      padding: 0 5px;
      color: #fff;
      background: #ff7100;
      font-size: 12px;
      line-height: 16px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
      border-radius: 2px;
    }
  }
  .addressbg {
    width: 100%;
    height: auto;
    margin-bottom: 0.1rem;
    img {
      width: 100%;
      display: block;
    }
  }
}
.orderlist {
  margin-bottom: 0.1rem;
  .van-card {
    background-color: #fff;
  }
  .van-card__title {
    // height: 0.2rem;
    margin-top: 2px;
    font-size: 14px;
    line-height: 14px;
  }
  .van-card__price {
    margin-top: 2px;
    font-size: 16px;
  }
  .van-ellipsis {
    margin-top: 2px;
    color: #ccc;
  }
}
.payinfo {
  margin-bottom: 0.1rem;
}
</style>
