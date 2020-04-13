<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="分类页面"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="content">
      <div class="kind">
        <div class="left">
          <ul>
            <li
              :class="kindIndex === index ? 'active' : ''"
              v-for="(item,index) of breedlist"
              :key="index"
              @click="getitem(item, index)"
            >{{ item }}</li>
          </ul>
        </div>
        <div class="right">
          <ul>
            <li
              v-for="(item,index) of prolist"
              :key="index"
              @click="toDetail(item.proid)"
            >
              <div class="imgbox">
                <img
                  :src="item.proimg"
                  alt=""
                >
              </div>
              <div class="right-list">
                <span>{{item.proname}}</span>
                <p>
                  <span class="tprice"><span>￥</span>{{item.price}}</span>
                  <span class="tshop">去购买</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar } from 'vant'
import { mapState } from 'vuex'

Vue.use(NavBar)
export default {
  data () {
    return {
      kindIndex: 0
    }
  },
  computed: {
    ...mapState({
      breedlist: ({ kind }) => kind.breedlist,
      prolist: ({ kind }) => kind.prolist
    })
  },
  created () {
    this.$store.dispatch('getBreedlist').then(data => {
      console.log(data)
      if (data === 0) {
        this.$router.push('/user')
      } else {
        this.getitem(this.breedlist[0], 0)
      }
    })
  },
  methods: {
    toDetail (proid) {
      console.log(proid)
      this.$router.push('/detail?proid=' + proid)
    },
    onClickLeft () {
      this.$router.back()
    },
    getitem (item, index) {
      this.kindIndex = index
      this.$store.dispatch('getProlist', { item }).then(data => {
        if (data === 0) {
          this.$router.push('/user')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/lib/reset.scss";
.content {
  .kind {
    @include rect(100%, 100%);
    @include flexbox();
    .left {
      @include rect(1rem, 100%);
      @include border(0 0.01rem 0 0, #efefef, solid);
      ul {
        @include rect(100%, 100%);
        li {
          @include rect(100%, 0.36rem);
          @include border(0 0 0.01rem, #efefef, solid);
          @include line-height(0.36rem);
          @include text-align();
          &.active {
            @include color(#f66);
            border-left: 0.02rem solid #f66;
          }
        }
      }
    }
    .right {
      @include flex();
      @include rect(auto, 100%);
      @include background-color(rgb(255, 255, 255));
      @include overflow();
      ul {
        @include rect(100%, auto);
        li {
          @include flexbox();
          @include rect(100%, 1.1rem);
          margin: 0.05rem 0;
          margin-bottom: 10px;
          box-shadow: rgba(254, 226, 226, 0.12) 0px 5px 5px;
          .imgbox {
            min-width: 1.1rem;
            @include rect(1.1rem, 1.1rem);
            img {
              width: 100%;
              height: 100%;
            }
          }
          .right-list {
            @include flexbox();
            @include flex-direction(column);
            width: 100%;
            justify-content: space-around;
            // margin-left: 0.1rem;
            padding: 0 10px;
            p {
              @include flexbox();
              // @include rect(1.8rem, 0.3rem);
              justify-content: space-between;
              .tprice {
                color: #ea3c30;
                font-size: 0.18rem;
                font-weight: 900;
                span{
                  font-weight: 500;
                  font-size: 14px;
                }
              }
              .tshop {
                display: block;
                width: 0.68rem;
                height: 0.25rem;
                background-color: #fa5753;
                color: #efefef;
                border-radius: 0.25rem;
                text-align: center;
                line-height: 0.25rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
