<template>
  <div class="box">
    <header>
      <van-nav-bar
        title="修改地址"
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
      :address-info = "AddressInfo"
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
      searchResult: [],
      AddressInfo: {}
    }
  },
  created () {
    let a = localStorage.getItem('addressid')
    let userid = localStorage.getItem('userid')
    axios.post('/address/getaddress', { userid: userid }).then(res => {
      for (var i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].addressid === a) {
          this.AddressInfo = res.data.data[i]
        }
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onSave (content) {
      let a = localStorage.getItem('addressid')
      let userid = localStorage.getItem('userid')
      let address = content.province + content.city + content.addressDetail
      if (content.isDefault) {
        axios.post('/address/getaddress', { userid: userid }).then(res => {
          // 如果选择了默认,遍历所有存在的地址,清空默认,将选择的地址置为默认
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
            })
            if (res.data.data[i].addressid === a) {
              axios.post('/address/upadd', {
                name: content.name,
                tel: content.tel,
                userid: userid,
                flag: true,
                address: address,
                addressid: a
              }).then((res) => {
                if (res.data.code === 10014) {
                  Toast('修改成功')
                  this.$router.back()
                } else {
                  Toast('修改失败')
                }
              })
            }
          }
        })
      } else {
        axios.post('/address/upadd', {
          name: content.name,
          tel: content.tel,
          userid: userid,
          flag: false,
          address: address,
          addressid: a
        }).then(res => {
          if (res.data.code === 10014) {
            Toast('修改成功')
            this.$router.back()
          } else {
            Toast('修改失败')
          }
        })
      }
    },
    onDelete () {
      // 删除功能
      let a = localStorage.getItem('addressid')
      let userid = localStorage.getItem('userid')
      axios.post('address/deladd', { userid: userid, addressid: a }).then(res => {
        if (res.data.code === 10015) {
          Toast('删除成功')
          this.$router.back()
        }
      })
    }
  }
}
</script>
