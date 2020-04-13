<template>
  <div class="box">
     <header class="header">
       <van-nav-bar
          title="关于我们"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
    </header>
    <div class="content">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="陶长俊" name="1">
          主要负责分类页面和详情页面<br>
          1:分类页面和详情页面的渲染<br>
          2:商品的评论<br>
          3:相应部分接口的编写<br>
          4:每天负责合并代码<br>
        </van-collapse-item>
        <van-collapse-item title="袁傲迪" name="2">
          主要负责个人中心页面<br>
          1:注册、登录<br>
          2:个人信息修改（昵称 性别 生日<br>
          3:头像上传,更换头像<br>
          4:收货地址 增删查改及默认地址<br>
          5:订单分类、生成订单（优惠券)<br>
          6:相应部分接口的编写<br>
        </van-collapse-item>
        <van-collapse-item title="施嘉伟" name="3">
          主要负责首页<br>
          1:首页面的渲染<br>
          2:页面商品的搜索功能<br>
          3:相应部分接口的编写<br>
          4:确认订单<br>
        </van-collapse-item>
        <van-collapse-item title="郭泓良" name="4">
          主要负责购物车页面<br>
          1:购物车页面的数据的渲染<br>
          2:购物车页面数量的加减、全选等功能<br>
          3:数据的收集<br>
        </van-collapse-item>
      </van-collapse>

    </div>
    <div>
      <div id="world"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Collapse, CollapseItem } from 'vant'
Vue.use(NavBar)
Vue.use(Collapse).use(CollapseItem)
export default {
  data () {
    return {
      activeName: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
.content {
  .van-cell {
    font-size: 14px; // yad 18改为14
    }
  .van-collapse-item__content {
    font-size: 15px;
 }
}
</style>
