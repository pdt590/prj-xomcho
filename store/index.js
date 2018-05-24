import Vuex from 'vuex'

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
        return context.app.$axios
          .$get('/shops.json')
          .then( data => {
            const shopsArray = []
            for (const key in data) {
              shopsArray.push({...data[key], id: key})
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
        return this.$axios
          .$post(process.env.baseUrl + '/shops.json', createdShop)
          .then( data => {
            vuexContext.commit('addShop', {...createdShop, id: data.name} )
          })
          .catch(e => console.log(e))
      },
      editShop(vuexContext, editedShop){
        return this.$axios
          .$put(process.env.baseUrl + '/shops/' + editedShop.id + '.json', editedShop)
          .then( data => {
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
