import firebase from '~/plugins/firebase'
import uuid from '../shared/uuid'

export default {
    state: {
        shopLoading: false,
        loadedShop: {}
    },
    mutations: {
        setShopLoading (state, payload) {
            state.shopLoading = payload
        },
        editShop (state, payload) {
            const editedShopIndex = state.loadedShops.findIndex(
                shop => shop.id === payload.id
            )
            state.loadedShops[editedShopIndex] = payload
        },
        setShop (state, payload) {
            state.loadedShop = payload
        }
    },
    actions: { 
        async addShop (vuexContext, payload) {
            vuexContext.commit('setShopLoading', true)
            try {
                const newShop = {
                    ...payload,
                    creatorId: vuexContext.getters.user.id,
                    updatedDate: new Date().toISOString()
                }
                const shopId = payload.title.replace(/\s+/g, '-').toLowerCase() + '-' + uuid(5)
                await firebase.database().ref('shops').child(shopId).set(newShop)
                vuexContext.commit('setShopLoading', false)
                vuexContext.commit('setShop', {
                    shopId: shopId,
                    ...newShop
                })
                return shopId
            } catch (error) {
                vuexContext.commit('setShopLoading', false)
                console.log('[ERROR]' + error)
            }
        },
        async updateShop (vuexContext, payload) {
            vuexContext.commit('setShopLoading', true)
            try {
                const updatedShop = {
                    ...payload,
                    updatedDate: new Date().toISOString()
                }
                await firebase.database().ref('shops').child(payload.shopId).update(updatedShop)
                vuexContext.commit('setShopLoading', false)
                vuexContext.commit('setShop', updatedShop)
            } catch(error) {
                vuexContext.commit('setShopLoading', false)
                console.log('[ERROR] ' + error)
            }
        },
        async loadShop (vuexContext, payload) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopData = await firebase.database().ref('shops').child(payload).once('value')
                const shopObj = shopData.val()
                const loadedShop = {
                    shopId: payload,
                    ...shopObj
                }
                vuexContext.commit('setShopLoading', false)
                vuexContext.commit('setShop', loadedShop)
                return loadedShop
            } catch(error) {
                vuexContext.commit('setShopLoading', false)
                console.log('[ERROR] ' + error)
            }
        },
        async deleteShop (vuexContext, payload) {
            vuexContext.commit('setShopLoading', true)
            try {
                await firebase.database().ref('shops').child(payload).remove()
                await vuexContext.dispatch('removeItems', payload)
                vuexContext.commit('setShopLoading', false)
                vuexContext.commit('setShop', null)
            } catch(error) {
                vuexContext.commit('setShopLoading', false)
                console.log('[ERROR] ' + error)
            }
        },
        async loadPreviewShops (vuexContext) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopsData = await firebase.database().ref('shops').orderByChild('updatedDate').limitToLast(45).once('value')         
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push({
                        shopId: shopData.key,
                        ...shopObj
                    })
                })
                loadedShops.reverse()
                vuexContext.commit('setShopLoading', false)
                return loadedShops
            } catch(error) {
                vuexContext.commit('setShopLoading', false)
                console.log('[ERROR] ' + error)
            }
        }
    },
    getters: {
        shopLoading(state) {
            return state.shopLoading
        },
        loadedShop(state) {
            return state.loadedShop
        }
    }
}