<template>
  <div class="box">
    <header class="header" id="home-header">
      <!-- <van-nav-bar
        title="首页"
        @click-right="onClickRight"
      /> -->
      <van-search v-model="value" disabled  placeholder="请输入搜索关键词" />
    </header>
    <div class="content" ref="content" id="content" v-focus>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item of bannerlist" :key="item.bannerid">
            <img :src="item.img" alt="">
          </van-swipe-item>
        </van-swipe>
        <!-- 轮播图结束 -->
        <van-grid :column-num="3">
          <van-grid-item icon="discount" to="/pro-list?index=0" text="限时特惠" clickable="true">
          </van-grid-item >
          <van-grid-item icon="point-gift-o" to="/pro-list?index=6" text="送长辈">
          </van-grid-item>
          <van-grid-item icon="like-o" to="/pro-list?index=5" text="送爱人">
          </van-grid-item>
          <van-grid-item icon="goods-collect-o" to="/pro-list?index=1" text="新品专区">
          </van-grid-item >
          <van-grid-item icon="bill-o" to="/coupons" text="优惠券">
          </van-grid-item>
          <van-grid-item icon="diamond-o" to="/vipcard" text="会员卡">
          </van-grid-item>
        </van-grid>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="homeList" >
            <!-- 优惠banner -->
            <div class="listTitle">
              <div class="imgbox animated bounce" >
                <img src="../../lib/youhui.png" alt="">
              </div>
              <!-- <van-count-down millisecond :time="time" format="HH:mm:ss:SS" class="animated bounce"/> -->
            </div>
            <!-- 优惠banner结束 -->
            <div class="listContent">
              <div class="flowerbox">
                <Prolistone :prolistone="prolistone"/>
              </div>
            </div>
          </div>
          <div class="homeList" >
            <div class="listTitle">
              <div class="titTop">
                <div>
                  <img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5b725daedef81.png">
                </div>
                <div class="text">
                节日专区
                </div>
                <div>
                  <img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5c665c9a15504.png">
                </div>
              </div>
              <div class="titButton">FESTIVALS</div>
            </div>
            <div class="listContent">
              <div class="flowerbox">
                <Prolisttwo :prolisttwo="prolisttwo"/>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
      <van-icon @click="onbacktop" v-show="topflag" class="backtop" name="arrow-up" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Prolisttwo from '@/components/Prolisttwo.vue'
import Prolistone from '@/components/Prolistone.vue'
import { mapState } from 'vuex'
import { NavBar, Toast, Swipe, SwipeItem, PullRefresh, Grid, GridItem, Card, Icon, List, Button, Search, CountDown } from 'vant'
Vue.use(NavBar).use(Swipe).use(SwipeItem).use(Toast).use(PullRefresh).use(Grid).use(GridItem).use(Card).use(Icon).use(List).use(Button).use(Search).use(CountDown)
export default {
  components: {
    Prolisttwo,
    Prolistone
  },
  data () {
    return {
      count: 0,
      isLoading: false,
      loading: false,
      finished: false,
      homeList: [],
      topflag: false,
      value: '', // 搜索框
      time: 30 * 60 * 60 * 1000 // 倒计时
    }
  },
  computed: {
    ...mapState({
      prolistone: ({ home }) => home.prolistone,
      bannerlist: (state) => state.home.bannerlist,
      prolisttwo: ({ home }) => home.prolisttwo
    })
  },
  created () {
    this.$store.dispatch('getBannerlist')
    this.$store.dispatch('getProlistone')
    this.$store.dispatch('getProlisttwo')
  },
  directives: {
    'focus': {
      inserted: (el) => {
        el.focus()
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      Toast('点我干嘛？')
    },
    onLoad () {
      setTimeout(() => {
        for (let i = 0; i < 1; i++) {
          console.log(this.homeList.length)
          this.homeList.push(this.homeList.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.homeList.length >= 2) {
          this.finished = true
        }
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.finished = true
      }, 500)
    },
    onbacktop () {
      let scroll = document.getElementById('content').scrollTop
      let timer = setInterval(() => {
        scroll = Math.floor(scroll / 6)
        document.getElementById('content').scrollTop = scroll
        console.log(scroll)
        if (scroll === 0) {
          clearInterval(timer)
          console.log('scroll')
        }
      }, 30)
    },
    handleScroll (event) {
      if (event.target.scrollTop > 600) {
        this.topflag = true
      } else {
        this.topflag = false
      }
    }
  },
  mounted () {
    this.$refs.content.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
.box {
  #home-header{
    @include rect(100%,auto);
    // margin-bottom: .2rem;
    // position: relative;
    .van-search {
      // @include rect(80%,.35rem);
      // margin: 0 auto;
      // position: absolute;
      // top: .82rem;
      // left: 50%;
      // transform: translateX(-50%);
      // border-radius: .1rem;
      .van-cell--borderless{
        border-radius: .1rem;
      }
    }
  }
}
.van-swipe {
  @include margin(0 .05rem);
  height: 180px;
  img {
    width: 100%;
    // height: 180px;
  }
}
.van-grid {
  box-shadow: 1px 1px 2px #d6c1c12d;
  border-radius: .05rem;
  @include margin(.1rem .05rem);
}
.homeList {
  .listTitle {
    @include flexbox();
    @include rect(auto,1rem);
    @include flex-direction(column);
    @include justify-content();
    @include align-items();
    background-color: #fff;
    padding: 0 .05rem;
      position: relative;
    .imgbox {
      img {
          @include rect(100%, auto);
          display: block;
          margin: 0 auto;
        }
    }
    .van-count-down {
      position: absolute;
      z-index: 999999;
      top: 70%;
      right: 15%;
      color: #fff;
    }
  }
  .listContent {
    .van-grid-item {
        // @include rect(100%,0.8rem);
      img {
        @include rect(100%,100%);
      }
    }
  }
  .flowerbox {
    padding: 0 .05rem;
  }
  .listFooter {
    @include rect(100%,.44rem);
    @include flexbox();
    @include flex-direction(column);
    @include justify-content();
    @include align-items();
  }
}
.backtop {
  position: fixed;
  bottom: 96px;
  right: 10px;
  font-size: 30px;
}
</style>
