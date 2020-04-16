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
        <van-collapse-item title="1" name="1">
        </van-collapse-item>
        <van-collapse-item title="2" name="2">
        </van-collapse-item>
        <van-collapse-item title="3" name="3">
        </van-collapse-item>
        <van-collapse-item title="4" name="4">
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
.van-nav-bar__text{
  color: #323233;
}
.van-nav-bar .van-icon{
  color: #323233;
}
.content {
  .van-cell {
    font-size: 14px; // yad 18改为14
    }
  .van-collapse-item__content {
    font-size: 15px;
 }
}
</style>
