<template>
  <div class="box">
    <header>
      <van-nav-bar
        title="地址管理"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <van-address-list
      v-model="chosenAddressId"
      switchable
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>
<script>
import axios from '@/utils/request'
import Vue from 'vue'
import {
  AddressList,
  NavBar,
  Toast
} from 'vant'

Vue
  .use(AddressList)
  .use(NavBar)
  .use(Toast)
export default {
  data () {
    return {
      chosenAddressId: '1', // 默认id为1
      list: []
    }
  },
  created () {
    let a = localStorage.getItem('userid')
    axios.post('/address/getaddress', {
      userid: a
    }).then((res) => {
      // console.log(res)
      if (res.data.data) {
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].flag === 1) {
            res.data.data[i].id = '1' // 给默认地址设置id
          } else {
            res.data.data[i].id = i
          }
        }
        this.list = res.data.data
      } else {
        Toast({
          message: '暂无地址',
          duration: 1000
        })
      }
    })
  },
  methods: {
    onAdd () {
      this.$router.push('/addaddress')
    },
    onEdit (item, index) {
      this.$router.push('/upadd')
      localStorage.setItem('addressid', item.addressid)
    },
    onClickLeft () {
      this.$router.back()
    },
    onSelect (item, index) {
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].flag = 0
      }
      item.flag = 1
      for (var j = 0; j < this.list.length; j++) {
        axios.post('/address/upadd', {
          name: this.list[j].name,
          tel: this.list[j].tel,
          userid: this.list[j].userid,
          flag: this.list[j].flag,
          id: this.list[j].addressid,
          address: this.list[j].address,
          addressid: this.list[j].addressid
        }).then((res) => {
          Toast({
            message: '默认地址修改成功',
            duration: 800
          })
        })
      }
    }
  }
}
</script>
