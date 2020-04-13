<template>
  <div class="box">
    <header>
      <van-nav-bar
        title="优惠券"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="content">
      <van-popup v-model="showList">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { CouponCell, CouponList, NavBar } from 'vant'
Vue.use(CouponCell).use(CouponList).use(NavBar)
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠22元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
}
export default {
  data () {
    return {
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false
    }
  },
  methods: {
    onChange (index) {
      this.showList = false
      this.chosenCoupon = index
      this.totalsum -= this.coupons[index].value
    },
    onExchange (code) {
      this.coupons.push(coupon)
    },
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
