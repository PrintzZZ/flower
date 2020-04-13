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

# 5、路由

**地址输入栏不同，显示不同的页面**

## 5.1 先创建各个页面 src/views

* home/index.vue
* kind/index.vue
* cart/index.vue
* user/index.vue

以 home/index.vue 为例,复制App.vue文件中的 头部和内容区域的代码
```
<template>
  <div class="box">
    <header class="header">首页头部</header>
    <div class="content">首页内容</div>
  </div>
</template>

```

## 5.2 配置路由文件 router/index.js
```
const routes = [
  { // 路由跟组件时映射关系
    path: '/home',
    name: 'home',
    // 路由的懒加载
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/kind',
    name: 'kind',
    component: () => import('@/views/kind/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index.vue')
  }
]

```

## 5.3 使路由文件生效 

* App.vue部分把 原先的 头部和内容区域的代码删除，使用 <router-view></router-view>代替
```
  <!-- <div class="box">
    <header class="header">头部</header>
    <div class="content">内容</div>
  </div> -->
  <router-view></router-view> 
```
> router-view 如果路由是 /home，此处就为首页的组件
> 浏览器输入 /home /kind /cart /user 查看效果

## 5.4 路由的重定向 ---- 什么都不输入，默认显示首页

* 修改 router/index.js，添加重定向,在配置文件的开始添加
```

const routes = [
  { // 开始添加重定向
    path: '/',
    redirect: '/home'
  },
  { // 路由跟组件时映射关系
    path: '/home',
    name: 'home',
    // 路由的懒加载
    component: () => import('@/views/home/index.vue')
  },
  ....
]
```

## 5.5 点击切换路由，路由映射页面 ---- 点击切换路由，路由映射页面

* 修改App.vue， 添加点击链接 <router-link to="/home"></router-link>
* vue 独有的语法 tag=""  ---- 生成目标标签,默认生成 a 标签
```
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
      <p>我的</p>
    </router-link>
  </ul>
</footer>
```

## 5.6 设定选中的样式

* App.vue中给底部的li添加选中的样式
```
li{
  @include flex();
  @include rect(auto, 100%);
  @include flexbox(); // 一下几句实现的是元素的水平垂直居中
  @include flex-direction(column);
  @include justify-content(); // -webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;
  @include align-items(); // -webkit-box-align: center; -ms-flex-align: center; align-items: center;

  &.router-link-active { // 审查元素得知选中的样式
    @include color(#f66);
  }
}
```

## 5.7 页面底部放置小图标

> http://iconfont.cn/

* 选图标，加购物车，添加至项目 -》font-class -》复制链接
* public/index.html 引入css文件
```
<title>myapp</title>
<link rel="stylesheet" href="//at.alicdn.com/t/font_1476238_m5fuchmwska.css">
```

在 App.vue 中添加图标
```
<footer class="footer">
  <ul>
    <router-link to="/home" tag="li">
      <span class="iconfont icon-fonts-shouye"></span>
      <p>首页</p>
    </router-link>
    <router-link to="/kind" tag="li">
      <span class="iconfont icon-icon"></span>
      <p>分类</p>
    </router-link>
    <router-link to="/cart" tag="li">
      <span class="iconfont icon-gouwuche"></span>
      <p>购物车</p>
    </router-link>
    <router-link to="/user" tag="li">
      <span class="iconfont icon-wode"></span>
      <p>我的</p>
    </router-link>
  </ul>
</footer>
```
* 修改 底部的图标和字体样式
```
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
```

# 6、首页面添加 产品的列表