<template>
  <ul class="prolistone">
    <router-link tag="li" :to="'/detail?proid=' + item.proid" v-for="item of prolistone" :key="item.proid" >
      <div class="flowerinfo">
        <div class="infoimg">
          <img :src="item.proimg" alt="">
        </div>
        <div class="infocont">
          <p class="infoname">{{ item.proname }}</p>
          <p class="infomat">{{ "材料:" + item.material }}</p>
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
  Toast
} from 'vant'

Vue.use(Toast)
export default {
  props: ['prolistone'],
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
.prolistone {
  li{
    box-shadow: 1px 1px 2px #d6c1c12d;
    @include margin( .1rem auto);
    @include rect(100%,90%);
    background-color: rgb(255, 255, 255);
    .flowerinfo {
      @include rect(100%,auto);
      @include flexbox();
      @include align-items();
      justify-content:space-between;
      // background-color: rgba(255, 255, 255, 0.616);
      .infoimg{
        @include rect(40%,1.5rem);
        line-height: 1.5rem;
        text-align: center;
        border-radius: .05rem;
        overflow: hidden;
        img{
          height:80%;
        }
      }
      .infocont{
        @include flexbox();
        flex-direction: column;
        @include rect(50%,1.2rem);
        @include justify-content();
        margin-right: 10px;
        p {
          margin-top: .05rem;
        }
        .infoname {
          color: #333;
          font-size: 16px;
        }
        .infomat {
          color: #333;
          width: 80%;
          font-size: 0.12rem;
          // height: .32rem;
          // line-height: .16rem;
          color: #ccc;
          // @include overflow();
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
</style>
