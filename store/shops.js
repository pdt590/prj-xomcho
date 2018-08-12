import firebase from '~/plugins/firebase'
import Cookie from 'js-cookie'

export const state = () => ({
    loadedShop: {},
})

export const mutations = {
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
        vuexContext.commit('setLoading', true)
        let now = new Date()
        const newShop = {
            ...payload,
            updatedDate: now.toISOString(), //TODO: new Date() cannot be used here
            creatorId: vuexContext.getters.user.id
        }
        // return the promise
        return firebase.database().ref('shops').push(newShop)
            .then( 
                data => {
                    vuexContext.commit('setLoading', false, {root: true})
                    return data.key
                }
            )
            .catch(
                error => {
                    vuexContext.commit('setLoading', false, {root: true})
                    console.log('[ERROR]' + error)
                }
            )
    },
    editShop (vuexContext, payload) {
        vuexContext.commit('setLoading', true)
        // return the promise
        return firebase.database().ref('shops').child(payload.id).update(payload)
            .then( 
                () => {
                    vuexContext.commit('setLoading', false, {root: true})
                    vuexContext.commit('editShop', payload)
                }    
            )
            .catch(
                error => {
                    vuexContext.commit('setLoading', false, {root: true})
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
    loadedShop (state) {
        return state.loadedShop
    }
}