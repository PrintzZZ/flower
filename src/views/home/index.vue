<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="首页"
        @click-right="onClickRight"
      />
    </header>
    <div class="content" ref="content" id="content" v-focus>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item of bannerlist" :key="item.bannerid">
            <img :src="item.img" alt="">
          </van-swipe-item>
        </van-swipe>
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
            <div class="listTitle">
              <div class="titTop">
                <div>
                  <img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5b725daedef81.png">
                </div>
                <div class="text">
                浪漫七夕特惠
                </div>
                <div>
                  <img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5c665c9a15504.png">
                </div>
              </div>
              <div class="titButton">PREFERENTIAL</div>
            </div>
            <div class="listContent">
              <div class="flowerbox">
                <Prolistone :prolistone="prolistone"/>
              </div>
              <!-- <div class="listFooter"> // yad 注释
                <van-button plain type="info" color="rgb(233, 102, 222)" to="/pro-list" >查看更多</van-button>
              </div> -->
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
import { NavBar, Toast, Swipe, SwipeItem, PullRefresh, Grid, GridItem, Card, Icon, List, Button } from 'vant'
Vue.use(NavBar).use(Swipe).use(SwipeItem).use(Toast).use(PullRefresh).use(Grid).use(GridItem).use(Card).use(Icon).use(List).use(Button)
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
      topflag: false
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
    @include rect(auto,0.8rem);
    @include flex-direction(column);
    @include justify-content();
    @include align-items();
    // @include background-color(#f7f7f7);
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
