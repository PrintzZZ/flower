<template>
<div class="orderprogress">
  <header>
    <van-nav-bar
      title="订单列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </header>
  <div>
    <van-steps
      :active="active"
      active-icon="success"
      active-color="#38f"
    >
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
  </div>
  <van-steps direction="vertical" :active="0">
    <van-step>
      <h3>【城市】物流状态1</h3>
      <p>2016-07-12 12:40</p>
    </van-step>
    <van-step>
      <h3>【城市】物流状态2</h3>
      <p>2016-07-11 10:00</p>
    </van-step>
    <van-step>
      <h3>快件已发货</h3>
      <p>2016-07-10 09:30</p>
    </van-step>
  </van-steps>
</div>
</template>

<script>
import Vue from 'vue'
import { Step, Steps, NavBar } from 'vant'

Vue.use(Step).use(Steps).use(NavBar)
export default {
  data () {
    return {
      active: 1
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
