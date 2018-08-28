import firebase from '~/plugins/firebase'
import { uuid } from '~/plugins/funcs'
const db = firebase.database()
const shopsRef = db.ref('shops')

export default {
    state: {
        shopLoading: false,
        loadedShop: null
    },
    mutations: {
        setShopLoading (state, payload) {
            state.shopLoading = payload
        },
        setShop (state, payload) {
            state.loadedShop = payload
        }
    },
    actions: { 
        async addShop (vuexContext, shop) {
            vuexContext.commit('setShopLoading', true)
            try {
                const newShop = {
                    ...shop,
                    creatorId: vuexContext.getters.user.id,
                    updatedDate: new Date().toISOString()
                }
                const shopId = uuid(shop.title, 5)
                await shopsRef.child(shopId).set(newShop)
                vuexContext.commit('setShop', {
                    shopId: shopId,
                    ...newShop
                })
                vuexContext.commit('setShopLoading', false)
                return shopId
            } catch (error) {
                console.log('[ERROR]' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async updateShop (vuexContext, editedShop) {
            vuexContext.commit('setShopLoading', true)
            try {
                const updatedShop = {
                    ...editedShop,
                    updatedDate: new Date().toISOString()
                }
                await shopsRef.child(editedShop.shopId).update(updatedShop)
                vuexContext.commit('setShop', updatedShop)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async loadShop (vuexContext, shopId) {
            vuexContext.commit('setShopLoading', true)
            try {
                let panelUrls = []
                const shopData = await shopsRef.child(shopId).once('value')
                const shopObj = shopData.val()
                if(Array.isArray(shopObj.panelUrls) && !shopObj.panelUrls.length) {
                    panelUrls = shopObj.panelUrls
                }
                const loadedShop = {
                    shopId: shopId,
                    ...shopObj,
                    panelUrls: panelUrls
                }
                vuexContext.commit('setShop', loadedShop)
                vuexContext.commit('setShopLoading', false)
                return loadedShop
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async editShopTitle (vuexContext, shop) { // TODO:
            vuexContext.commit('setShopLoading', true)
            try {
                let update = {}
                const shopData = await shopsRef.child(shop.shopId).once('value')
                const shopObj = shopData.val()
                const newShopId = uuid(shop.newShopTitle, 5)
                shopObj.title = shop.newShopTitle
                update[shop.shopId] = null
                update[newShopId] = shopObj
                await shopsRef.update(update)
                await vuexContext.dispatch('updateItems', {oldShopId: shop.shopId, newShopId: newShopId})
                const editedShop = {
                    shopId: newShopId,
                    ...shopObj
                }
                vuexContext.commit('setShop', editedShop)
                vuexContext.commit('setShopLoading', false)
                return newShopId
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async deleteShop (vuexContext, payload) {
            vuexContext.commit('setShopLoading', true)
            try {
                await shopsRef.child(payload).remove()
                await vuexContext.dispatch('removeItems', payload)
                vuexContext.commit('setShop', {})
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async loadPreviewShops (vuexContext) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopsData = await shopsRef.orderByChild('updatedDate').limitToLast(45).once('value')         
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
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
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