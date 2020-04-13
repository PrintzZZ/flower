<template>
  <div class="box">
    <header class="header">
       <van-nav-bar
          title="购物车"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
    </header>
    <div class="content">
      <div class="shopping-cart" v-if="flag">
        <div class="shopping-goods"  v-for="(item,index) of cartlist" :key="index">
         <div class="select">
           <!-- <div> -->
            <input :id="'checkoutbtnsum' + index" type="checkbox" class="select- checkoutbtnsum" v-model="item.flag" @change="changeFlag(item)">
            <label :for="'checkoutbtnsum'  + index"></label>
           <!-- </div> -->
         </div>
         <div class="img-box">
           <img :src="item.proimg" alt="">
         </div>
         <div class="goodsinfo">
           <div class="goodsname">
             <span>
               {{ item.proname }}
             </span>
             <!-- <span class="delete" @click="deleteitem(item)">删除</span> -->
           </div>
           <div class="goodsnumber">
             <span class="prices">￥{{ item.price }}</span>
             <span class="reduce" @click="reduce(item)">-</span>
             <span class="price-num">{{ item.num }}</span>
             <span class="plus" @click="add(item)">+</span>
             <span class="delete" @click="deleteitem(item)">删除</span>
           </div>
           <!-- <div class="deletebox"> -->
             <!-- <span class="delete" @click="deleteitem(item)">删除</span> -->
           <!-- </div> -->
         </div>
        </div>
      </div>

      <div v-else   class="shoopingcart-img">
        <img src="http://cdn.jisuapp.cn/static/webapp/images/xcx-goods/shopping-cart-null.png" alt="">
        <p>购物车空空如也</p><router-link class="toshopping" to="/kind">去购物</router-link>
      </div>
    </div>
    <div class="submitOrder">
        <ul>
           <li>
            <input id="checkoutbtnsum" type="checkbox" v-model="all" class="select- checkoutbtnsum" @change="selectAll">
            <label for="checkoutbtnsum"></label>
            <span>全选</span>
          </li>
          <li>
            <p>
              总数：<span>{{ totalNum }}</span>
            </p>
          </li>
          <li>
            <p>
              合计：<span>{{ totalPrice }}</span>
            </p>
          </li>
          <li @click="creatorder">
            提交订单
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Toast } from 'vant'
import axios from '@/utils/request'
Vue.use(NavBar).use(Toast)
export default {
  data () {
    return {
      cartlist: [],
      flag: false,
      all: false,
      arr: [],
      time: []
    }
  },
  computed: {
    // 计算数量
    totalNum () {
      let num = 0
      this.cartlist.map((item) => {
        item.flag ? num += item.num : num += 0
      })
      return num
    },
    // 计算总价
    totalPrice () {
      let totalPrice = 0
      this.cartlist.map((item) => {
        item.flag ? totalPrice += item.num * item.price : totalPrice += 0
      })
      return totalPrice.toFixed(2)
    }
  },
  created () {
    let userid = localStorage.getItem('userid')
    let url = '/cart?userid=' + userid
    axios.get(url).then(res => {
      console.log(res.data.code)
      if (res.data.code === 10119) {
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '您还没有登录,正在跳转..'
        })
        let second = 2
        const timer = setInterval(() => {
          second--
          if (second) {
            toast.message = `您还没有登录,正在跳转.`
          } else {
            clearInterval(timer)
            // 手动清除 Toast
            Toast.clear()
            this.$router.push('/login')
          }
        }, 1000)
      } else if (res.data.code === '11000') {
        console.log(1)
        this.flag = false
      } else {
        this.flag = true
        let arr = res.data.data
        arr.map(item => {
          item.flag = false
        })
        this.cartlist = arr
        console.log(arr) // yad 判断商品是否存在 material 11-8
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    reduce (item) {
      let num = item.num > 1 ? --item.num : 1
      axios.get('/cart/update?cartid=' + item.cartid + '&num=' + num).then(res => {
        if (res.data.code === 10119) {
          this.$router.push('/login')
        } else {
          item.num = num
        }
      })
    },
    add (item) {
      let num = ++item.num
      axios.get('/cart/update?cartid=' + item.cartid + '&num=' + num).then(res => {
        if (res.data.code === 10119) {
          this.$router.push('/login')
        } else {
          item.num = num
        }
      })
    },
    deleteitem (item, index) {
      axios.get('/cart/delete?userid=' + item.userid + '&proid=' + item.proid).then(res => {
        if (res.data.code === 10119) {
          this.$router.push('/login')
        } else {
          this.cartlist.splice(index, 1)
        }
      })
    },
    creatorder () {
      var t = new Date()
      this.time = [{
        year: t.getFullYear(),
        month: t.getMonth(),
        day: t.getDate(),
        hour: t.getHours(),
        minutes: t.getMinutes(),
        ordernum: t.getTime()
      }]
      this.arr = []
      this.cartlist.map(item => {
        if (item.flag) {
          this.arr.push(item)
        }
      })
      // console.log(this.arr)
      if (this.arr.length === 0) {
        Toast({
          message: '请先选择商品',
          duration: 800
        })
      } else {
        let userid = localStorage.getItem('userid')
        let time = this.time
        console.log(time)
        // let url = '/order/add?str=' + JSON.stringify(this.arr) + '&userid=' + userid + '&time=' + this.time
        // yad 11-8 生成订单
        axios.post('/order/add', {
          list: this.arr,
          userid: userid,
          time: time
        }).then(res => {
          console.log(res)
          this.$router.push('/pay?orderid=' + res.data.data.orderid)
        })
      }
    },
    changeFlag (item) {
      if (item.flag) {
        let b = this.cartlist.every(item => {
          return item.flag === true
        })
        if (b) {
          this.all = true
        } else {
          this.all = false
        }
      } else {
        this.all = false
      }
    },
    selectAll () {
      if (this.all) {
        this.cartlist.map(item => {
          item.flag = true
        })
      } else {
        this.cartlist.map(item => {
          item.flag = false
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
.content{
  //  @include background-color(#fefefe); // yad 注释
  .shopping-cart{
    width: 100%
    //  @include rect(100%, 100%);
  }
  .shopping-goods{
    @include flexbox();
    @include rect(100%,1.1rem);
    @include border(0 0 1px 0, #efefef,solid);
    @include background-color(#fff);
    margin-bottom: 5px;
    box-shadow: 1px 1px 2px #d6c1c12d;
  }
  .select{
    // position: relative;
    width: 45px;
    height: 110px;
    // line-height: 110px;
    text-align:center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .select-{
      width:20px;
      height:20px;
    }
  .img-box{
    width: 100px;
    height: 110px;
    img{
      @include rect(0.9rem,0.9rem);
      @include border(1px,#946363,solid);
      @include display(block);
      margin-top:0.1rem;
    }
  }
  .goodsinfo{
     @include rect(auto,0.9rem);
     flex:1;
     margin-top:0.15rem;
     padding: 0 .15rem;
     .goodsname {
       display: flex;
       justify-content: space-between;
       .delete{
        width: 0.45rem;
        height: 0.26rem;
        border-radius: 20px;
        border: 1px solid #ccc;
        color: #fff;
        font-size: 10px;
        background-color: rgb(255, 0, 0);
        display: inline-block;
        text-align: center;
        line-height: 26px;
        margin-left: 0.15rem;
       }
     }
     .goodsnumber{
       @include flexbox();
       margin-top: 20px;
      .prices{
        color: #f66;
        font-size:18px;
      }
      .delete{
        width: 0.45rem;
        height: 0.23rem;
        border-radius: 20px;
        // border: 1px solid #ccc;
        color: #fff;
        font-size: 10px;
        background-color: rgb(255, 0, 0);
        display: inline-block;
        text-align: center;
        line-height: 23px;
        margin-left: 0.15rem;
        box-shadow: 1px 1px 1px 0px #4f4f4f73;
       }
      .reduce{
        width: 0.25rem;
        height: 0.26rem;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-left: 0.2rem;
        display: inline-block;
        text-align: center;
        line-height: 26px;
      }
      .price-num{
        width: 45px;
        height: 26px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        text-align: center;
        line-height: 26px;
        display:inline-block;
        //  border-left:none;
      }
      .plus{
        width: 0.25rem;
        height: 0.26rem;
        border: 1px solid #ccc;
        background-color: #fff;
        text-align: center;
        display:inline-block;
        line-height: 26px;
      }
    }
    .deletebox {
      padding: 0 .2rem;
      display: flex;
      margin-top: 10px;
      justify-content: flex-end;
      .delete{
        width: 0.55rem;
        height: 0.26rem;
        border-radius: 20px;
        border: 1px solid #ccc;
        color: #fff;
        font-size: 10px;
        background-color: rgb(255, 0, 0);
        display: inline-block;
        text-align: center;
        line-height: 26px;
        margin-left: 0.15rem;
      }
    }
  }
}
.shoopingcart-img{
  // @include rect(4.2rem,auto);
  @include rect(auto,auto);
  margin-top: 1rem;
  text-align: center;
  img{
    width: 1.5rem;
  }
  p{
    margin-top: 0.08rem;
    font-size: 0.16rem;
    color: rgb(180, 180, 180);
  }
  .toshopping{
    display: block;
    margin: 10px auto;
    color: rgb(255, 255, 255);
    // font-weight: bold;
    font-size: 14px;
    width: 1rem;
    height: 0.3rem;
    line-height: .3rem;
    background-color: #f00;
    border-radius: 15px;
    box-shadow: 1px 1px 2px #ff00004a;
  }
}
.submitOrder{
  // position: absolute;
  top: 0;
  @include rect(100%, 0.5rem);
  @include border(1px 0 0 0, rgb(209, 209, 209), solid);
  // @include fixed();
  @include bottom(0.65rem);
  @include background-color(#fff);
  ul{
    @include rect(100%, 0.5rem);
    @include flexbox();
    li{
      @include flexbox();
      @include justify-content();
      @include align-items();
      span {
           margin-left: 7px;
         }
       &:nth-child(1){
        @include flex(2);
        .select-{
          // display: block;
          width:20px;
          height:20px;
          margin-right: 0.09rem;
        }
      }
      &:nth-child(2){
        @include flex(2);
      }
      &:nth-child(3){
        @include flex(4);
      }
      &:nth-child(4){
        @include flex(2);
        @include background-color(rgb(255, 0, 0));
        @include color(#fff);
      }
      p{
        span{
          @include color(#f66);
          @include font-size(16px);
          @include font-weight();
        }
      }
    }
  }
}
.checkoutbtnsum +label{
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  // position: absolute;
  // top: 2px;
  // left: 15px;
  background: rgb(255, 255, 255);
  border: 1px solid #ccc;
  // position: absolute;
}
.checkoutbtnsum:checked +label::before{
  display: block;
  content: '\2714';
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 14px;
  position: relative;
  top: -2px;
}
input[type=checkbox]{
  display: none;
}
</style>
