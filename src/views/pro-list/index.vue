<template>
  <div class="box">
    <header>
      <van-nav-bar
        title="总有你想要"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="ordercontent">
      <div class="orderheader">
        <form action="/">
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            shape="round"
            @search="onSearch"
          />
        </form>
      </div>
      <div class="orderlist">
        <ul>
          <li :class="listindex === index ? 'active' : ''" v-for="(item, index) of typelist"  @click="getType(item, index)" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div class="orderlist">
        <ul>
          <li :class="listindex === index + 4 ? 'active' : ''" v-for="(item, index) of uselist"  @click="getUse(item, index)" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div class="orderbox">
        <Prolisttwo :prolisttwo="prolisttwo"/>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from '@/utils/request'
import { NavBar, Search } from 'vant'
import Prolisttwo from '@/components/Prolisttwo.vue'
Vue.use(NavBar).use(Search)
export default {
  components: {
    Prolisttwo
  },
  data () {
    return {
      index: 1,
      typelist: [],
      prolisttwo: [],
      uselist: [],
      listindex: 0,
      value: ''
    }
  },
  created () {
    let getIndex = parseInt(this.$router.currentRoute.query.index)
    let url = '/pro/type?type=type'
    axios.get(url).then(res => {
      // console.log(res.data.data)
      this.typelist = res.data.data
      if (getIndex < 5) {
        this.listindex = getIndex
        this.getType(this.typelist[this.listindex], this.listindex)
      }
    })
    axios.get('/pro/type?type=use').then(res => {
      // console.log(res.data.data)
      this.uselist = res.data.data
      if (getIndex >= 5) {
        this.listindex = getIndex - 5
        this.getUse(this.uselist[this.listindex], this.listindex)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    localStorage.setItem('value', this.value)
    next()
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    getType (item, index) {
      this.listindex = index
      console.log(this.listindex)
      let url = '/pro/brandcategory?type=' + item
      axios.get(url).then((res) => {
        // console.log(res.data.data)
        this.prolisttwo = res.data.data
      })
    },
    getUse (item, index) {
      this.listindex = index + 4
      console.log(this.listindex)
      let url = '/pro/use?use=' + item
      axios.get(url).then((res) => {
        this.prolisttwo = res.data.data
      })
    },
    onSearch () {
      axios.get('/pro/search?text=' + this.value).then(res => {
        console.log(res.data)
        console.log(this.value)
        this.prolisttwo = res.data.data
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
.ordercontent {
  @include rect(100%,100%);
  @include overflow();
  background-color: #f0f0f0;
  .orderheader {
    @include rect(100%,.55rem);
    @include flexbox();
    // @include align-items();
    @include padding(0 5px);
    @include margin(5px 0 0 0);
    background-color: rgb(255, 255, 255);
    form {
      @include rect(100%,.55rem);
    }
  }
  .orderlist{
    @include rect(100%,.35rem);
    @include overflow();
    background-color: rgb(255, 255, 255);
    ul{
      @include rect(200%,100%);
      @include padding(0 5px);
      @include flexbox();
      @include align-items();
      @include overflow();
      li{
        @include rect(.9rem,100%);
        text-align: center;
        line-height: .35rem;
        font-size: 12px;
      }
      li.active{
        color: #f66;
      }
    }
  }
  .orderbox{
    @include rect(100%,auto);
    @include overflow();
  }
}
</style>
