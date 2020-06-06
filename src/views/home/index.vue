<template>
  <div class="box">
    <header class="header" id="home-header">
      <!-- <van-nav-bar
        title="首页"
        @click-right="onClickRight"
      /> -->
      <van-search v-model="value" disabled  placeholder="请输入搜索关键词" @click="searchbtn"/>
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
        <!-- 九宫格 -->
        <van-grid :column-num="3">
          <!-- <van-grid-item icon="discount" to="/pro-list?index=0" text="限时特惠" clickable="true"> -->
          <van-grid-item to="/pro-list?index=0" clickable="true">
            <img src="../../lib/gg_yh.gif" alt="">
            <p>限时特惠</p>
          </van-grid-item >
          <van-grid-item to="/pro-list?index=6">
            <img src="../../lib/gg_slr.gif" alt="">
            <p>送长辈</p>
          </van-grid-item>
          <van-grid-item icon="like-o" to="/pro-list?index=5" text="送爱人">
            <img src="../../lib/gg_sar.gif" alt="">
            <p>送爱人</p>
          </van-grid-item>
          <van-grid-item icon="goods-collect-o" to="/pro-list?index=1" text="新品专区">
            <img src="../../lib/gg_xp.gif" alt="">
            <p>新品专区</p>
          </van-grid-item >
          <van-grid-item icon="bill-o" to="/coupons" text="优惠券">
            <img src="../../lib/gg_yhq.gif" alt="">
            <p>优惠券</p>
          </van-grid-item>
          <van-grid-item icon="diamond-o" to="/vipcard" text="会员卡">
            <img src="../../lib/gg_hy.gif" alt="">
            <p>会员卡</p>
          </van-grid-item>
        </van-grid>
        <!-- 九宫格结束 -->
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        > -->
          <div class="homeList" >
            <!-- 优惠banner -->
            <div class="listTitle">
              <!-- <div class="imgbox animated bounce" > -->
                <img src="../../lib/home_yh.gif" alt="">
              <!-- </div> -->
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
                更多选择
                </div>
                <div>
                  <img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5c665c9a15504.png">
                </div>
              </div>
              <div class="titButton">More Choose</div>
            </div>
            <div class="listContent">
              <div class="flowerbox">
                <Prolisttwo :prolisttwo="prolisttwo"/>
              </div>
            </div>
          </div>
        <!-- </van-list> -->
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
      // finished: false,
      topflag: false, // 是否触顶
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
    // 搜索跳转
    searchbtn () {
      this.$router.push('/pro-list?index=0')
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
        // console.log(scroll)
        if (scroll === 0) {
          clearInterval(timer)
          // console.log('scroll')
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
  .van-grid-item__content {
    img {
      width: 45%;
    }
    p {
      color: #646566;
      font-size: 12px;
      word-wrap: break-word;
      margin-top: 8px;
    }
  }
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
    .titTop {
      @include align-items();
      @include flexbox();
      @include font-weight(bold);
      @include font-size(16px);
      @include color(rgb(102,102,102));
      img {
        width: 0.5rem;
      }
    }
    img {
        @include rect(100%, auto);
        display: block;
        margin: 0 auto;
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
  font-size: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  padding: 5px;
  border: 1px solid #999;
  color: #666;
}
</style>
