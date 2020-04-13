<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="评价"
        left-text="返回"
        right-text="发布"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </header>
    <div class="content">
      <div class="imgboxinfo">
        <img :src="proimg" alt="">
        <div class="starbox">
          <p>商品评分</p>
          <van-rate v-model="value" />
        </div>
      </div>
      <!-- <van-divider /> -->
      <div class="info">
        <textarea rows="10" cols="30" name="" placeholder="宝贝满足你的期待吗？说说它的有点和美中不足吧" v-model="info"></textarea>
      </div>
      <p class="tuijian">- 商品推荐 -</p>
      <div class="tuijianbox">
        <Prolisttwo :prolisttwo="prolisttwo"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, rate, Toast, Divider } from 'vant'
import axios from '@/utils/request'
import Prolisttwo from '@/components/Prolisttwo.vue'

Vue.use(NavBar).use(rate).use(Toast).use(Divider)
export default {
  components: {
    Prolisttwo
  },
  data () {
    return {
      prolisttwo: [],
      value: 0,
      proimg: '',
      info: '',
      proid: this.$route.query.proid,
      userid: localStorage.getItem('userid')
    }
  },
  created () {
    const url = '/pro/detail?proid=' + this.proid
    axios.get(url).then(res => {
      this.proimg = res.data.data.proimg
    })
    axios.get('/pro').then(res => {
      // console.log(res.data.data)
      // this.uselist = res.data.data
      // if (getIndex >= 5) {
      //   this.listindex = getIndex - 5
      //   this.getUse(this.uselist[this.listindex], this.listindex)
      // }
      this.prolisttwo = res.data.data
    })
  },
  methods: {
    onClickLeft () {
      // console.log(123)
      Toast({
        message: '您还没有评论哦',
        duration: 800
      })
      this.$router.back()
    },
    onClickRight () {
      console.log(1)
      var note = this.info
      var rating = this.value
      axios.post('/comment/add', { userid: this.userid, proid: this.proid, note, rating }).then(res => {
        Toast('评论成功')
        this.$router.back()
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
.content {
  .tuijianbox {
    background-color: #fff;
  }
  .tuijian{
    margin: 0 0 5px 0;
    font-size: 12px;
    color: #ccc;
    text-align: center;
  }
  // @include padding(0.1rem);
  @include rect(100%,100%);
  .imgboxinfo {
    @include rect(100%,auto);
    @include flexbox();
    background-color: #fff;
    padding: 15px 0;
    img {
      @include rect(0.8rem,0.8rem);
      @include margin(0 0.1rem 0 0);
    }
    .starbox {
      padding: 0 0 0 10px;
      @include rect(100%,auto);
      p{
        font-size: 16px;
        margin: 10px 0;
      }
    }
}
  .info {
    margin-top: 10px;
    min-height: 1rem;
    textarea {
      // background-color: #f8f8f8;
      padding: .1rem;
      border: 0;
      list-style: none;
      @include rect(100%,auto);
    }
  }
}
</style>
