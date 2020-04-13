<template>
  <div class="box">
    <header>
      <van-nav-bar
        title="订单列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="ordercontent">
      <div class="orderheader">
        <!-- <div class="paynow">
          <p>当面付 <i class="iconfont icon-icon"></i></p>
        </div>
        <div class="search">
          <i class="iconfont icon-sousu"></i><input type="text" placeholder="搜索订单">
        </div> -->
        <!-- <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search> -->
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <!-- === 订单列表 === -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-tabs v-model="active" swipeable sticky>
<!-- ===========  全部订单 ============ -->
        <van-tab title="全部订单">
          <div class="orderbox" v-if='flag'>
            <ul>
              <li v-for="(item,index) of allprolist" :key="index" @click="orderclick(item.orderid)" :orderid="item.orderid">
                <div class="ordertitle">
                  <p><span v-if="item.status">已支付</span><span v-else>待支付</span></p>
                  <p class="time">{{ item.time[0].year + '-' + item.time[0].month + '-' + item.time[0].day + '-' + item.time[0].hour + '-' + item.time[0].minutes }}</p>
                </div>
                <div class="orderinfo" v-for="(ite,index) of item.list" :key="index">
                  <div class="infoimg">
                    <img :src="ite.proimg" alt="">
                  </div>
                  <div class="infocont">
                    <p class="infotitle">{{ ite.proname }}</p>
                    <p class="material">{{ '材料:' + ite.material }}</p>
                    <p class="infomoney"><span class="pricetip">￥</span>{{ ite.price }} <span class="xtip">x{{ ite.num }}</span></p>
                  </div>
                </div>
                <div class="ordertotle">
                  <p><span @click="delect(item.orderid)" @click.stop>删除</span>共{{ item.list.length }}种商品</p>
                </div>
              </li>
            </ul>
          </div>
          <div v-if="!flag" class="nofind">
            <p class="tips"><i class="iconfont icon-zhaobudaojieguo"></i></p>
            <p class="tipsinfo">找不到结果</p>
          </div>
        </van-tab>
<!-- ===========  待付款 ============ -->
        <van-tab title="待付款">
          <div class="orderbox">
            <ul>
              <li v-for="item of waitpay" :key="item.orderid" @click="payclick(item.orderid)" :orderid="item.orderid">
                <div class="ordertitle">
                  <p><span v-if="item.status">已支付</span><span v-else>待支付</span></p>
                  <p class="time">{{ item.time[0].year + '-' + item.time[0].month + '-' + item.time[0].day + '-' + item.time[0].hour + '-' + item.time[0].minutes }}</p>
                </div>
                <div class="orderinfo" v-for="(ite,index) of item.list" :key="index">
                  <div class="infoimg">
                    <img :src="ite.proimg" alt="">
                  </div>
                  <div class="infocont">
                    <p class="infotitle">{{ ite.proname }}</p>
                    <p class="material">{{ '材料:' + ite.material }}</p>
                    <p class="infomoney"><span class="pricetip">￥</span>{{ ite.price }} <span class="xtip">x{{ ite.num }}</span></p>
                  </div>
                </div>
                <div class="ordertotle">
                  <p><span @click="delect(item.orderid)" @click.stop>删除</span>共{{ item.list.length }}种商品</p>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
<!-- ===========  待收货 ============ -->
        <van-tab title="待收货">
          <div class="orderbox">
            <ul>
              <li v-for="item of paid" :key="item.orderid" @click="orderclick(item.orderid)" :orderid="item.orderid">
                <div class="ordertitle">
                  <p><span v-if="item.status">已支付</span><span v-else>待支付</span></p>
                  <p class="time">{{ item.time[0].year + '-' + item.time[0].month + '-' + item.time[0].day + '-' + item.time[0].hour + '-' + item.time[0].minutes }}</p>
                </div>
                <div class="orderinfo" v-for="(ite,index) of item.list" :key="index">
                  <div class="infoimg">
                    <img :src="ite.proimg" alt="">
                  </div>
                  <div class="infocont">
                    <p class="infotitle">{{ ite.proname }}</p>
                    <p class="material">{{ '材料:' + ite.material }}</p>
                    <p class="infomoney"><span class="pricetip">￥</span>{{ ite.price }} <span class="xtip">x{{ ite.num }}</span></p>
                  </div>
                </div>
                <div class="ordertotle">
                  <p><span @click="delect(item.orderid)" @click.stop>删除</span>共{{ item.list.length }}种商品</p>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
<!-- ===========  待评价 ============ -->
        <van-tab title="待评价">
          <div class="orderbox">
            <ul>
              <li v-for="item of comment" :key="item.orderid"  :orderid="item.orderid">
                <div class="ordertitle">
                  <p><span>待评价</span></p>
                  <p class="time">{{ item.time[0].year + '-' + item.time[0].month + '-' + item.time[0].day + '-' + item.time[0].hour + '-' + item.time[0].minutes }}</p>
                </div>
                <div class="orderinfo" v-for="(ite,index) of item.list" :key="index" @click="proclick(ite.proid)" :proid="ite.proid">
                  <div class="infoimg">
                    <img :src="ite.proimg" alt="">
                  </div>
                  <div class="infocont">
                    <p class="infotitle">{{ ite.proname }}</p>
                    <p class="material">{{ '材料:' + ite.material }}</p>
                    <p class="infomoney"><span class="pricetip">￥</span>{{ ite.price }} <span class="xtip">x{{ ite.num }}</span></p>
                  </div>
                </div>
                <div class="ordertotle">
                  <p><span @click="delect(item.orderid)" @click.stop>删除</span>共{{ item.list.length }}种商品</p>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import axios from '@/utils/request'
import Vue from 'vue'
import { NavBar, Tab, Tabs, Search, PullRefresh } from 'vant'

Vue.use(NavBar).use(Tab).use(Tabs).use(Search).use(PullRefresh)
export default {
  data () {
    return {
      index: 1,
      orderlistindex: 0,
      active: 0,
      value: '',
      allprolist: [],
      waitpay: [],
      paid: [],
      comment: [],
      flag: true, // yad 是否搜索到商品
      isLoading: false
    }
  },
  created () {
    let index = localStorage.getItem('index')
    let temp = []
    this.active = index * 1 // 读取index渲染选择的选项
    // console.log(index, this.active)
    let userid = localStorage.getItem('userid')
    axios.get('/order?userid=' + userid).then(res => {
      console.log(res.data.data)
      // 查询该用户所有订单
      this.allprolist = res.data.data
      temp = res.data.data
      // 遍历订单,根据状态分类--已支付或者未支付
      temp.map(item => {
        if (item.status === 0) {
          this.waitpay.push(item)
        } else {
          this.comment.push(item)
          this.paid.push(item)
          // console.log(this.comment)
          // let commentarr = this.comment
          // commentarr.map(item => {
          //   // console.log(item.list)
          //   item.list.map(ite => {
          //     // console.log(ite)
          //     axios.get('/comment?proid=' + ite).then(res => {
          //       console.log(1)
          //       if (!res) {
          //         this.comment.push(item)
          //       }
          //     })
          //   })
          // })
        }
      })
    })
  },
  methods: {
    // 删除订单
    delect (orderid) {
      // console.log(orderid)
      axios.get('/order/delete?orderid=' + orderid).then(res => {
        // console.log(res.data)
        this.$router.go(0)
      })
    },
    // 点击跳转订单详情
    orderclick (orderid) {
      // console.log(orderid)
      this.$router.push('/orderdetail?orderid=' + orderid)
    },
    // 点击跳转评价页面
    proclick (proid) {
      // console.log(proid)
      this.$router.push('/comments?proid=' + proid)
    },
    // 点击跳转支付页面
    payclick (orderid) {
      // console.log(orderid)
      this.$router.push('/pay?orderid=' + orderid)
    },
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
      this.$router.go(0)
    },
    onClickLeft () {
      this.$router.back()
    },
    getlist (index) {
      this.orderlistindex = index
      // console.log(this.orderlistindex)
    },
    onSearch () {
      let a = localStorage.getItem('userid')
      let arr = []
      // let arr2 = []
      // console.log(this.value)
      if (this.value === '') {
        this.flag = false
      } else {
        this.flag = true
        axios.get('/order?userid=' + a).then(res => {
          // 查询所有订单
          // 遍历如果有关键词的就push进数组
          console.log(res.data.data)
          res.data.data.map((item, index) => {
            // 将商品的名字与材料分别存入变量
            let proname = item.list[0].proname
            let material = item.list[0].material
            // 使用split方法实现模糊搜索
            // 如果proname中不存在value,则返回原数组,长度为1
            if (proname.split(this.value).length > 1) {
              // console.log(res.data.data[index])
              arr.push(res.data.data[index])
            }
            if (material.split(this.value).length > 1) {
              arr.push(res.data.data[index])
            }
            // ========= 利用对象属性不重复高效去重
            // let arr3 = arr.concat(arr2)
            // let result = []
            // let obj = {}
            // for (let i of arr3) {
            //   if (!obj[i]) {
            //     result.push(i)
            //     obj[i] = 1
            //   }
            // }
            if (arr.length === 0) {
              this.flag = false
            }
            this.allprolist = arr
          })
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
.van-search--show-action{
  width: 95%;
}
.ordercontent {
  @include rect(100%,100%);
  @include overflow();
  background-color: #f0f0f0;
  .orderheader {
    @include rect(100%,auto);
    @include flexbox();
    @include align-items();
    @include padding(0 5px);
    @include margin(5px 0 0 0);
    background-color: rgb(255, 255, 255);
  }
  .orderbox{
    @include rect(100%,auto);
    @include overflow();
    ul{
      // padding: 0 10px;
      li{
        @include margin(10px 0 0 0);
        @include rect(100%,auto);
        background-color: rgb(255, 255, 255);
        .ordertitle{
          @include flexbox();
          @include justify-content(space-between);
          @include rect(100%,20%);
          text-align: left;
          font-size: 12px;
          padding: 10px;
          .time {
            text-align: right;
          }
          p{
            color: #ccc;
            @include rect(100%,100%);
            span{
              float: left;
              margin-left: 10px;
              text-align: right;
              color: rgb(255, 184, 102)
            }
          }
        }
        .orderinfo{
          @include rect(100%,auto);
          @include flexbox();
          @include align-items();
          background-color: rgba(248, 248, 248, 0.616);
          padding:0 20px;
          .infoimg{
            @include rect(30%,.7rem);
            line-height: .7rem;
            img{
              height:80%;
            }
          }
          .infocont{
            @include rect(100%,auto);
            .material {
              margin-top: 5px;
              font-size: 12px;
              color: rgb(163, 163, 163);
            }
            .infotitle{
              margin-top: 5px;
              color: #333;
              font-size: 14px;
            }
            .infomoney{
              margin-top: 5px;
              @include rect(100%,auto);
              color: #f00;
              font-size: 16px;
              .pricetip{
                font-size: 12px;
              }
              .xtip{
                color: #333;
                font-size: 12px;
                float: right;
              }
            }
          }
        }
        .ordertotle{
          padding: 5px 10px;
          @include rect(100%,20%);
          color: rgb(0, 0, 0);
          text-align: right;
          font-size: 12px;
          @include rect(100%,100%);
          span {
            display: block;
            width: .35rem;
            float: left;
            // background-color: #f00;
            // color: #fff;
            color: #ffb866;
            border-radius: 10px;
            text-align: center;
            margin: 0 0 0 .1rem;
          }
        }
      }
    }
  }
  .nofind {
    width: 100%;
    height: 50rem;
    text-align: center;
    .tips {
      margin-top: 80px;
      .iconfont{
        font-size: 60px;
        color: #ccc;
      }
    }
    .tipsinfo {
      font-size: 16px;
      color: #ccc;
    }
  }
}
</style>
