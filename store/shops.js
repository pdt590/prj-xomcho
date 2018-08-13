import firebase from '~/plugins/firebase'

export const state = () => ({
    shopLoading: false,
    loadedShop: {},
})

export const mutations = {
    setShopLoading (state, payload) {
        state.shopLoading = payload
    },
    addShop (state, payload) {
        state.loadedShops.push(payload)
    },
    editShop (state, payload) {
        const editedShopIndex = state.loadedShops.findIndex(
            shop => shop.id === payload.id
        )
        state.loadedShops[editedShopIndex] = payload
    },
    loadShop (state, payload) {
        state.loadedShop = payload
    },
}

export const actions = { 
    addShop (vuexContext, payload) {
        vuexContext.commit('setShopLoading', true)
        let now = new Date()
        console.log(vuexContext.rootState.sideBar)
        const newShop = {
            ...payload,
            updatedDate: now.toISOString(), // ? new Date() cannot be used in Firebase
            creatorId: vuexContext.rootState.users.user.id
        }
        // return the promise
        return firebase.database().ref('shops').push(newShop)
            .then( 
                data => {
                    vuexContext.commit('setShopLoading', false)
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
        return firebase.database().ref('shops').child(payload.id).update(payload)
            .then( 
                () => {
                    vuexContext.commit('setShopLoading', false)
                    vuexContext.commit('editShop', payload)
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
        return firebase.database().ref('shops').child(payload).once('value')
            .then(
                data => {
                    vuexContext.commit('loadShop', data.val())
                    return data.val()
                }
            )
            .catch(
                error => {
                    console.log('[ERROR] ' + error)
                }
            )
    },
}

export const getters = {
    shopLoading(state) {
        return state.shopLoading
    },
    loadedShop (state) {
        return state.loadedShop
    }
}