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
      },
      addShop(state, shop) {
        state.loadedShops.push(shop)
      },
      editShop(state, editedShop) {
        const shopIndex = state.loadedShops.findIndex(
          shop => shop.id === editedShop.id
        );
        state.loadedShops[shopIndex] = editedShop;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-blog-12734.firebaseio.com/shops.json')
          .then( res => {
            const shopsArray = []
            for (const key in res.data) {
              shopsArray.push({...res.data[key], id: key})
              console.log(key)
            }
            vuexContext.commit('setShops', shopsArray)
          })
          .catch(e => context.error(e));
      },
      setShops(vuexContext, shops) {
        vuexContext.commit('setShops', shops)
      },
      addShop(vuexContext, shop) {
        const createdShop = {
          ...shop,
          updatedDate: new Date()
        }
        return axios
          .post('https://nuxt-blog-12734.firebaseio.com/shops.json', createdShop)
          .then( res => {
            vuexContext.commit('addShop', {...createdShop, id: res.data.name} )
          })
          .catch(e => console.log(e))
      },
      editShop(vuexContext, editedShop){
        return axios
          .put('https://nuxt-blog-12734.firebaseio.com/shops/' + editedShop.id + '.json', editedShop)
          .then(res => {
            vuexContext.commit('editShop', editedShop)
          })
          .catch(e => console.log(e))
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
