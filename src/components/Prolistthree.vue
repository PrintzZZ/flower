<template>
  <ul class="prolisttwo">
    <router-link class="threeli" tag="li" :to="'/detail?proid=' + item.proid" v-for="item of prolisttwo" :key="item.proid">
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
  </ul>
</template>

<script>
import Vue from 'vue'
import axios from '@/utils/request'
import {
  Toast, Tag
} from 'vant'

Vue.use(Toast).use(Tag)
export default {
  props: ['prolisttwo'],
  methods: {
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

.prolisttwo {
  @include flexbox();
  // @include align-items();
  @include rect(100%,90%);
  flex-wrap:wrap;
  // justify-content:flex-start;
  .threeli {
    box-shadow: 1px 1px 2px #d6c1c12d;
    @include margin( .03rem);
    @include rect(48%,auto);
    @include flexbox();
    background-color: rgb(255, 255, 255);
    .flowerinfo {
      @include rect(100%,auto);
      @include flexbox();
      flex-direction: column;
      @include align-items();
      // justify-content:space-between;
      // @include justify-content();
      background-color: rgb(255, 255, 255);
      overflow: hidden;
      .infoimg{
        @include rect(100%,auto);
        line-height: 1.5rem;
        text-align: center;
        overflow: hidden;
        img{
          border-radius: 3px;
          // overflow: hidden;
          @include rect(90%,auto);
        }
      }
      .infocont{
        @include flexbox();
        flex-direction: column;
        @include rect(90%,1.3rem);
        // margin-right: 10px;
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
.prolisttwo:after {
  content: "";
  flex: auto;
}
</style>
