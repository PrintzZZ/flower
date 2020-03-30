<template>
  <div class="container">
    <router-view>
    </router-view>
    <footer class="footer">
      <ul>
        <router-link to="/home" tag="li">
          <span></span>
          <p>首页</p>
        </router-link>
        <router-link to="/kind" tag="li">
          <span></span>
          <p>分类</p>
        </router-link>
        <router-link to="/cart" tag="li">
          <span></span>
          <p>购物车</p>
        </router-link>
        <router-link to="/user" tag="li">
          <span></span>
          <p>个人中心</p>
        </router-link>
      </ul>
    </footer>
  </div>
</template>

<style lang="scss">
@import '@/lib/reset.scss'; // 引入重置样式, @表示src目录
html, body, .container {
  @include rect(100%, 100%)
}
.container {
  // 使用弹性盒布局
  @include flexbox();
  @include flex-direction(column);
  .box {
    @include flex(); // flex为1
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
      @include overflow(); // 超出滑动
    }
  }
  .footer {
    @include rect(100%, 0.5rem);
    @include background-color(#efefef);
    ul {
      @include rect(100%, 100%);
      @include flexbox();
      li {
        @include flex();
        @include rect(auto, 100%);
        @include flexbox();
        @include flex-direction(column);
        @include justify-content();
        @include align-items();

        &.router-link-active {
          @include color(#f66)
        }
        span {
        }
        p {
        }
      }
    }
  }
}
</style>
