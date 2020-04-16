<template>
  <footer class="footer">
    <ul>
      <router-link to="/home" tag="li">
        <span class="iconfont icon-shouye"></span>
        <p>首页</p>
      </router-link>
      <router-link to="/kind" tag="li">
        <span class="iconfont icon-leimupinleifenleileibie"></span>
        <p>分类</p>
      </router-link>
      <router-link to="/cart" tag="li">
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </router-link>
      <router-link  to="/user" tag="li">
        <span class="iconfont icon-gerenzhongxin"></span>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>
<style lang="scss">
@import '@/lib/reset.scss';
.footer {
    @include rect(100%,0.5rem);
    @include background-color(#ffffff);
    border-top: 1px solid #e4e4e4;
    ul{
      @include rect(100%,100%);
      @include flexbox();
      li{
        @include flex();
        @include rect(auto,100%);
        @include flexbox();
        @include flex-direction(column);
        @include justify-content();
        @include align-items();
        &.router-link-active{
          color:rgb(253,91,107);
        }
        span {
          @include font-size(0.24rem);
          @include margin(-5px 0);

        }
        p {
          @include font-size(0.10rem);
        }
      }
    }
  }
</style>
