import firebase from '~/plugins/firebase'

export const state = () => ({
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
})

export const mutations = {
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
}

export const actions = { 
    async addShop (vuexContext, payload) {
        vuexContext.commit('setShopLoading', true)
        try {
            const newShop = {
                ...payload,
                creatorId: vuexContext.rootState.users.user.id,
                updatedDate: new Date().toISOString() // ? new Date() cannot be used in Firebase
            }
            // return the promise
            const data = await firebase.database().ref('shops').push(newShop)
            vuexContext.commit('setShopLoading', false)
            vuexContext.commit('setShop', {
                shopId: data.key,
                ...newShop
            })
            return data.key
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
                creatorId: vuexContext.rootState.users.user.id,
                loadedItems: vuexContext.state.loadedShop.loadedItems, // ? Should update loadedItems or not
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
    async loadPreviewShops (vuexContext, payload) {
        vuexContext.commit('setShopLoading', true)
        try {
            const shopsData = await firebase.database().ref('shops').orderByChild('updatedDate').limitToFirst(50).once('value')
            const shopsObj = shopsData.val()
            const loadedShops = []
            for (let key in shopsObj) {
                loadedShops.push({
                    shopId: key,
                    ...shopsObj[key]
                })
            }
            vuexContext.commit('setShopLoading', false)
            return loadedShops
        } catch(error) {
            vuexContext.commit('setShopLoading', false)
            console.log('[ERROR] ' + error)
        }
    }
}