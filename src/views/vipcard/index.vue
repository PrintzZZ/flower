<template>
  <div class="box">
    <header>
      <van-nav-bar
        title="会员卡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="vipbanner">
      <img src="http://cdn.jisuapp.cn/static/webapp/images/franchisee/vip-banner.jpg" mode="aspectFill">
    </div>
    <div class="cardbox">
      <ul>
        <li>
          <div class="top">
            <div class="left">
              <img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5c99d7023acad.png" alt="">
            </div>
            <div class="right">
              <p>行业模板-鲜花 倾城花艺会员卡</p>
              <p>可享 8.50折</p>
            </div>
          </div>
          <div class="bottom">有效日期: 永久有效</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar } from 'vant'

Vue.use(NavBar)
export default {
  methods: {
    onClickLeft () {
      // Toast('返回');
      this.$router.back()
    }
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
 .vipbanner{
   @include rect(100%,auto);
   img{
     @include rect(100%,100%);
   }
 }
 .cardbox{
   @include rect(100%,auto);
   @include margin(.15rem 0 0 0);
   ul{
     @include rect(100%,100%);
     @include padding(0 2%);
     li{
       @include rect(100%,.8rem);
       border-radius: 5px;
       box-shadow:0 2px 4px rgba(0, 0, 0, .3);
       background-color: #f35353;
       .top{
         padding: 0 10px;
         @include rect(100%,80%);
         @include flexbox();
         @include align-items();
         .left{
           @include rect(.3rem,.3rem);
           border-radius: 50%;
           overflow: hidden;
           margin: 0 10px 0 0;
           img{
             @include rect(100%,100%)
           }
         }
         .right{
           p{
             color: #fff;
             font-size: 12px;
             line-height: 16px;
           }
         }
       }
       .bottom{
          @include rect(100%,20%);
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
          background-color: #b30000;
          text-align: right;
          color: #fff;
          padding: 0 5px;
          font-size: 12px;
       }
     }
   }
 }
</style>
