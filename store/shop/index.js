import firebase from '~/plugins/firebase'
import uuid from '../shared/uuid'

export default {
    state: {
        shopLoading: false,
        loadedShop: null
        /*
            *shopId: '',
            *creatorId: '',
            shopTitle: '',
            shopFb: '',
            shopLocation: '',
            shopPhone: '',
            shopEmail: '',
            shopDesc: '',
            shopLogoUrl: '',
            shopPanelUrl: [],
            *updatedDate: ''
        */
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
                    updatedDate: new Date().toISOString() // ? new Date() cannot be used in Firebase
                }
                const key = payload.shopTitle.replace(/\s+/g, '-').toLowerCase() + '-' + uuid(5)
                await firebase.database().ref('shops').child(key).set(newShop)
                vuexContext.commit('setShopLoading', false)
                vuexContext.commit('setShop', {
                    shopId: key,
                    ...newShop
                })
                return key
                //return payload.shopTitle.replace(/\s+/g, '-').toLowerCase()
            } catch (error) {
                vuexContext.commit('setShopLoading', false)
                console.log('[ERROR]' + error)
            }
        },
        async editShop (vuexContext, payload) {
            vuexContext.commit('setShopLoading', true)
            // return the promise
            try {
                await firebase.database().ref('shops').child(payload.shopId).update(payload)
                vuexContext.commit('setShopLoading', false)
                vuexContext.commit('setShop', {
                    ...payload,
                    creatorId: vuexContext.getters.user.id,
                    loadedItems: vuexContext.getters.loadedItems, // ? Should update loadedItems or not
                    updatedDate: new Date().toISOString()
                })
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
        async loadPreviewShops (vuexContext) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopsData = await firebase.database().ref('shops').orderByChild('updatedDate').limitToLast(10).once('value')
                const shopsObj = shopsData.val()
                const loadedShops = []
                for (let key in shopsObj) {
                    loadedShops.push({
                        shopId: key,
                        ...shopsObj[key]
                    })
                }
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