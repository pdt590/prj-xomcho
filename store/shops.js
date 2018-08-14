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
        *loadedItems: [],
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
    addShop (vuexContext, payload) {
        vuexContext.commit('setShopLoading', true)
        const newShop = {
            creatorId: vuexContext.rootState.users.user.id,
            ...payload,
            updatedDate: new Date().toISOString() // ? new Date() cannot be used in Firebase
        }
        // return the promise
        return firebase.database().ref('shops').push(newShop)
            .then( 
                data => {
                    vuexContext.commit('setShopLoading', false)
                    vuexContext.commit('setShop', {
                        shopId: data.key,
                        ...newShop,
                        loadedItems: []
                    })
                    return data.key
                }
            )
            .catch(
                error => {
                    vuexContext.commit('setShopLoading', false)
                    console.log('[ERROR]' + error)
                }
            )
    },
    editShop (vuexContext, payload) {
        vuexContext.commit('setShopLoading', true)
        // return the promise
        return firebase.database().ref('shops').child(payload.shopId).update(payload)
            .then( 
                () => {
                    vuexContext.commit('setShopLoading', false)
                    vuexContext.commit('setShop', {
                        ...payload,
                        creatorId: vuexContext.rootState.users.user.id,
                        loadedItems: vuexContext.state.loadedShop.loadedItems, // ? Should update loadedItems or not
                        updatedDate: new Date().toISOString()
                    })
                }    
            )
            .catch(
                error => {
                    vuexContext.commit('setShopLoading', false)
                    console.log('[ERROR] ' + error)
                }
            )
    },
    loadShop (vuexContext, payload) {
        vuexContext.commit('setShopLoading', true)
        return firebase.database().ref('shops').child(payload).once('value')
            .then(
                data => {
                    const shopObj = data.val()
                    return firebase.database().ref('items').orderByChild('shopId').equalTo(payload).once('value')
                        .then(
                            data => {
                                vuexContext.commit('setShopLoading', false)
                                const loadedItems = [] // ? ES6: const array can push new items
                                const itemObj = data.val()
                                for (let key in itemObj) {
                                    loadedItems.push({
                                        itemId: key,
                                        ...itemObj[key]
                                    })
                                }
                                let loadedShop = {
                                    shopId: payload,
                                    ...shopObj,
                                    loadedItems: loadedItems
                                }
                                vuexContext.commit('setShop', loadedShop)
                                return loadedShop
                            }
                        )
                }
            )
            .catch(
                error => {
                    vuexContext.commit('setShopLoading', false)
                    console.log('[ERROR] ' + error)
                }
            )
    }
}