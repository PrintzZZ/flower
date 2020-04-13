import axios from '@/utils/request'
export default {
  state: {
    prolist: [],
    breedlist: []
  },
  actions: {
    getBreedlist (context) {
      return new Promise(resolve => {
        axios.get('/pro/type?type=breed').then(res => {
          // if (res.data.code === 10119) {
          //   resolve(0)
          // } else {
          context.commit({
            type: 'changeBreedlist',
            data: res.data.data
          })
          resolve(1)
          // }
        })
      })
    },
    getProlist (context, prams) {
      let url = '/pro/breed?breed=' + prams.item
      return new Promise(resolve => {
        axios.get(url).then((res) => {
          // console.log(res.data)
          // if (res.data.code === 10119) {
          //   resolve(0)
          // } else {
          context.commit({
            type: 'changeProlist',
            data: res.data.data
          })
          resolve(1)
          // }
        })
      })
    }
  },
  mutations: {
    changeBreedlist (state, data) {
      state.breedlist = data.data
    },
    changeProlist (state, data) {
      // console.log(data)
      state.prolist = data.data
    }
  }
}
