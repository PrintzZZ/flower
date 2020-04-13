<template>
  <div class="container">
    <router-view></router-view>
    <router-view name='footer'></router-view>
  </div>
</template>

<style lang="scss">
@import "@/lib/reset.scss"; // 引入重置样式，@表示的就是src目录
html,
body,
.container {
  @include rect(100%, 100%);
  background-color: #f5f5f9; //yad 改为#f5f5f9
}

.container {
  // 建议使用弹性盒布局
  @include flexbox();
  @include flex-direction(column);
  .box {
    @include overflow();
    @include flex();
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
      @include overflow();
    }
  }
}
</style>
