<template>
  <div class="container">
    <div class="box">
      <header class="header">头部</header>
      <div class="content">
      </div>
    </div>
    <footer class="footer">底部</footer>
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
    @include background-color(#efefef)
  }
}
</style>
