# 1、回顾
* 全局注册组件，局部注册组件
* 组件模板、定义组件、注册组件、使用组件
* 组件间传值
* 动态组件、keep-alive
* cnpm i @vue/cli@3 -g
* vue create myapp

# 2、熟悉vue项目目录结构
```
-node-modules 依赖文件
-public 基本文件，包含页面，图片，小图标
-src 项目主场
-tests 测试
.editorconfig 编辑器配置文件
.gitignore git忽略文件
babel.config.js babel配置文件
cypress.json 插件
package.json 描述文件

```

# 3、src 目录结构
```
-assets 静态资源文件
-components 自定义的组件
-router 路由文件
-store 状态管理器
-views 页面㢟
App.vue 入口页面结构
main.js 入口文件


```

# 4、运行项目
> cnpm run serve

**.vue 文件 --- vue的单文件组件，内含组件的结构、组件的逻辑、组件的样式**
## 4.1 修改App.vue的页面结构
```
<template>
  <div class="container">
    <div class="box">
      <header class="header">头部</header>
      <div class="content">内容</div>
    </div>
    <footer class="footer">底部</footer>
  </div>
</template>
```

## 4.2 添加页面的基本样式 App.vue  

* 复制lib文件至自己的项目的src  --- 来源于 去哪网网的项目

```
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
  }
}
</style>
```

## 4.3 编写底部选项卡以及样式
```
<footer class="footer">
  <ul>
    <li>
      <span></span>
      <p>首页</p>
    </li>
    <li>
      <span></span>
      <p>分类</p>
    </li>
    <li>
      <span></span>
      <p>购物车</p>
    </li>
    <li>
      <span></span>
      <p>我的</p>
    </li>
  </ul>
</footer>

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
    }
  }
}
```