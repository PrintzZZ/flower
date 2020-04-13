<template>
  <div class="box">
    <header>
      <van-nav-bar
        title="添加地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import areaList from '@/lib/area.js' // 引入地址数据
import axios from '@/utils/request'
import Vue from 'vue'
import {
  NavBar,
  AddressEdit,
  Area,
  Toast
} from 'vant'

Vue
  .use(NavBar)
  .use(AddressEdit)
  .use(Area)
export default {
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onSave (content) {
      // console.log(content) 保存时,如果选择了默认,遍历已存在的地址,清空默认
      let a = localStorage.getItem('userid')
      let address = content.province + content.city + content.county
      if (content.isDefault) {
        axios.post('/address/getaddress', { userid: a }).then(res => {
          // console.log(res.data)
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].flag = 0
            axios.post('/address/upadd', {
              name: res.data.data[i].name,
              tel: res.data.data[i].tel,
              userid: res.data.data[i].userid,
              flag: res.data.data[i].flag,
              id: res.data.data[i].addressid,
              address: res.data.data[i].address,
              addressid: res.data.data[i].addressid
            }).then((res) => {
              // res.send(res)
            })
          }
        })
      }
      axios.post('/address/add', {
        userid: a,
        name: content.name,
        tel: content.tel,
        flag: content.isDefault,
        address: address
      }).then(res => {
        if (res.data.code === 10010) {
          Toast('保存成功')
          this.$router.back()
        }
      })
    },
    onDelete () {
      // Toast('delete')
    }
  }
}
</script>
