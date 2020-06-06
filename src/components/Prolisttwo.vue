<template>
  <ul class="prolisttwo">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <router-link class="twoli" tag="li" :to="'/detail?proid=' + item.proid" v-for="item of prolist" :key="item.proid">
        <div class="flowerinfo">
          <div class="infoimg">
            <img :src="item.proimg" alt="">
          </div>
          <div class="infocont">
            <p class="infoname"><van-tag type="danger">{{ item.breed }}</van-tag>{{ item.proname }}</p>
            <p class="infomat">{{ item.material }}</p>
            <p class="infomoney">
              <span class="tips"><i>￥</i> {{ item.price }}.00</span>
              <span @click="addCart(item.proid)" class="iconfont icon-gouwuche" @click.stop></span>
            </p>
          </div>
        </div>
      </router-link>
    </van-list>
  </ul>
</template>

<script>
import Vue from 'vue'
import axios from '@/utils/request'
import {
  Toast, List, Tag
} from 'vant'

Vue.use(Toast).use(List).use(Tag)
export default {
  // props: ['prolisttwo'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      pageCode: 1,
      prolist: []
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      this.loading = true
      setTimeout(() => {
        axios.get('/pro?limitNum=10&pageCode=' + this.pageCode).then(res => {
          console.log('当前刷新数据数量' + res.data.length + '--/components/Prolisttwo.vue')
          this.loading = false // 表示加载结束
          this.pageCode++ // 加载结束 页码加1
          if (res.data.data.length === 0) {
            this.finished = true // 表示数据已经加载完毕
          } else {
            this.prolist = [...this.prolist, ...res.data.data]
          }
        })
      }, 1000)
    },
    // 加入购物车
    addCart (proid) {
      let userid = localStorage.getItem('userid')
      let num = 1
      let url = '/cart/add?userid=' + userid + '&proid=' + proid + '&num=' + num
      axios.get(url).then(res => {
        // 如果未登录，跳转到登陆
        if (res.data.code === '10119') {
          this.$router.push('/login')
        } else {
          Toast('加入购物车成功')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/lib/reset.scss";

.van-list {
  // @include flexbox();
  // @include align-items();
  @include rect(100%,90%);
  // flex-wrap:wrap;
  // justify-content:flex-start;
  column-count: 2;
  column-gap: .03rem;
  .twoli {
    // 解决多列结构第一行的问题
    break-inside: avoid;
    box-shadow: 1px 1px 2px #d6c1c12d;
    margin-bottom: .03rem;
    @include flexbox();
    background-color: rgb(255, 255, 255);
    .flowerinfo {
      @include rect(100%,auto);
      @include flexbox();
      flex-direction: column;
      @include align-items();
      background-color: rgb(255, 255, 255);
      overflow: hidden;
      .infoimg{
        @include rect(100%,auto);
        line-height: 1.5rem;
        text-align: center;
        overflow: hidden;
        img{
          border-radius: 3px;
          @include rect(90%,auto);
        }
      }
      .infocont{
        @include flexbox();
        flex-direction: column;
        @include rect(90%,auto);
        justify-content:space-between;
        padding: 10px;
        p {
          margin-top: 5px;
          .van-tag--danger {
            margin-right: .1rem;
            background-color: #ee5c0a;
          }
        }
        .infoname {
          color: rgb(0, 0, 0);
          font-size: 16px;
        }
        .infomat {
          color: #333;
          font-size: 0.12rem;
          color: #ccc;
          @include overflow();
        }
        .infomoney{
          font-size: 20px;
          color: rgb(255, 0, 0);
          @include rect(100%,auto);
          @include flexbox();
          @include justify-content(space-between);
          .tips {
            i{
            font-size: 12px;
            }
          }
          .icon-gouwuche{
            font-size: 23px;
          }
        }
      }
    }
  }
}
.van-list__error-text, .van-list__finished-text, .van-list__loading {
  width: 100%;
}
.prolisttwo:after {
  content: "";
  flex: auto;
}
</style>
