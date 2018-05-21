import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedShops: []
    },
    mutations: {
      setShops(state, shops) {
        state.loadedShops = shops;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-blog-12734.firebaseio.com/shops.json')
          .then( res => {
            const shopsArray = []
            for (const key in res.data) {
              shopsArray.push({...res.data[key], id: key})
            }
            vuexContext.commit('setShops', shopsArray)
          })
          .catch(e => context.error(e));
      },
      setShops(vuexContext, shops) {
        vuexContext.commit('setShops', shops)
      }
    },
    getters: {
      loadedShops(state) {
        return state.loadedShops;
      }
    } 
  })
}

export default createStore;