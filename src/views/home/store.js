import aixos from '@/utils/request'

export default {
  state: {
    bannerlist: [],
    prolistone: [],
    prolisttwo: []
  },
  getters: { // state的计算属性

  },
  actions: {
    getBannerlist (context) {
      aixos.get('/banner').then(res => {
        console.log(res.data.data)
        context.commit({
          type: 'changeBannerlist',
          data: res.data.data
        })
      })
    },
    getProlistone (context) {
      let url = '/pro/brandcategory?type=浪漫七夕惠'
      return new Promise(resolve => {
        aixos.get(url).then(res => {
          // console.log(res.data)
          // console.log('kind', res.data)
          if (res.data.code === '10119') {
            console.log(res.data.code)
          } else {
            context.commit({
              type: 'changeProlistone',
              data: res.data.data
            })
            resolve(1)
          }
        })
      })
    },
    getProlisttwo (context) {
      let url = '/pro/brandcategory?type=节日专区'
      return new Promise(resolve => {
        aixos.get(url).then(res => {
          // console.log(res.data)
          // console.log('kind', res.data)
          context.commit({
            type: 'changeProlisttwo',
            data: res.data.data
          })
          resolve(1)
        })
      })
    }
  },
  mutations: {
    changeBannerlist (state, data) {
      // console.log(data.data)
      state.bannerlist = data.data
    },
    changeProlistone (state, data) {
      // console.log(data.data)
      state.prolistone = data.data
    },
    changeProlisttwo (state, data) {
      state.prolisttwo = data.data
      // console.log(data.data)
    }
  }
}
