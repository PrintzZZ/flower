<template>
  <div class="container">
    <!-- <div class="box">
      <header class="header">头部</header>
      <div class="content">内容</div>
    </div> -->
    <router-view></router-view>
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
        <router-link to="/user" tag="li">
          <span class="iconfont icon-gerenzhongxin"></span>
          <p>我的</p>
        </router-link>
      </ul>
    </footer>
  </div>
</template>

<style lang="scss">
@import '@/lib/reset.scss'; // 引入重置样式，@表示的就是src目录
html, body, .container {
  @include rect(100%, 100%); // width: 100%;height: 100%;
}

.container {
  // 建议使用弹性盒布局
  @include flexbox(); // display: -webkit-box;display: -ms-flexbox;display: flex;
  @include flex-direction(column); // -webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;
  .box {
    @include flex(); // -webkit-box-flex: 1;-ms-flex: 1;flex: 1;width: .1px;
    @include rect(100%, auto);
    @include flexbox();
    @include flex-direction(column);
    .header {
      @include rect(100%, 0.44rem);
      @include background-color(#f66);
    }
    .content {
      @include flex();
      @include rect(100%, auto);
      @include overflow(); // overflow: auto;-webkit-overflow-scrolling: touch;
    }
  }
  .footer {
    @include rect(100%, 0.5rem);
    @include background-color(#efefef);
    ul {
      @include rect(100%, 100%);
      @include flexbox();
      li{
        @include flex();
        @include rect(auto, 100%);
        @include flexbox(); // 一下几句实现的是元素的水平垂直居中
        @include flex-direction(column);
        @include justify-content(); // -webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;
        @include align-items(); // -webkit-box-align: center; -ms-flex-align: center; align-items: center;

        &.router-link-active {
          @include color(#f66);
        }

        span {
          @include font-size(0.24rem);
        }
        p {
          @include font-size(0.12rem);
          @include margin(-5px 0 0);
        }
      }
    }
  }
}
</style>
