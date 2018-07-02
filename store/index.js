import Vuex from 'vuex'
import firebase from '~/plugins/firebase'

const createStore = () => {
    return new Vuex.Store({
        state: {
            user: null,
            loading: false,
            error: null,
            loadedShops: []
        },
        mutations: {
            setLoadedShops (state, payload) {
                state.loadedShops = payload
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
            setUser (state, payload) {
                state.user = payload
            },
            setLoading (state, payload) {
                state.loading = payload
            },
            setError (state, payload) {
                state.error = payload
            },
            clearError (state) {
                state.error = null
            }
        },
        actions: {
            nuxtServerInit (vuexContext, context) {
                vuexContext.commit('setLoading', true)
                return firebase.database().ref('shops').once('value')
                    .then(
                        data => {
                            const shops = []
                            const obj = data.val()
                            for (let key in obj) {
                                shops.push({
                                    id: key,
                                    title: obj[key].title,
                                    desc: obj[key].desc,
                                    creatorId: obj[key].creatorId
                                })
                            }
                            vuexContext.commit('setLoadedShops', shops)
                            vuexContext.commit('setLoading', false)
                        }
                    )
                    .catch(
                        error => {
                            console.log('[ERROR]' + error)
                        }
                    )
            },
            addShop (vuexContext, payload) {
                const newShop = {
                    ...payload,
                    creatorId: vuexContext.getters.user.id
                }
                let key
                return firebase.database().ref('shops').push(newShop)
                    .then( 
                        data => {
                            key = data.key
                            return key 
                        }
                    )
                    .then(
                        key => {
                            vuexContext.commit('addShop', {
                                ...newShop,
                                id: key
                            })
                        }
                    )
                    .catch(
                        error => {
                            console.log('[ERROR]' + error)
                        }
                    )
            },
            editShop (vuexContext, payload) {
                vuexContext.commit('setLoading', true)
                return firebase.database().ref('shops').child(payload.id).update(payload)
                    .then( 
                        () => {
                            vuexContext.commit('setLoading', false)
                            vuexContext.commit('editShop', payload)
                        }    
                    )
                    .catch(
                        error => {
                            vuexContext.commit('setLoading', false)
                            console.log('[ERROR]' + error)
                        }
                    )
            },
            signUserUp (vuexContext, payload) {
                vuexContext.commit('setLoading', true)
                vuexContext.commit('clearError')
                // return the promise of firebase.auth().createUserWithEmailAndPassword.then()
                return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                    .then(
                        user => {
                            vuexContext.commit('setLoading', false)
                            const newUser = {
                                id: user.uid
                            }
                            vuexContext.commit('setUser', newUser)
                        }
                    )
                    .catch(
                        error => {
                            vuexContext.commit('setLoading', false)
                            vuexContext.commit('setError', error)
                            console.log('[ERROR]' + error)
                        }
                    )
            },
            signUserIn (vuexContext, payload) {
                vuexContext.commit('setLoading', true)
                vuexContext.commit('clearError')
                return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                    .then(
                        user => {
                            vuexContext.commit('setLoading', false)
                            const newUser = {
                                id: user.uid
                            }
                            vuexContext.commit('setUser', newUser)
                        }
                    )
                    .catch(
                        error => {
                            vuexContext.commit('setLoading', false)
                            vuexContext.commit('setError', error)
                            console.log('[ERROR]' + error)
                        }
                    )
            },
            autoSignIn (vuexContext, payload) {
                vuexContext.commit('setUser', {
                    id: payload.uid
                })
            },
            logOut (vuexContext) {
                firebase.auth().signOut()
                vuexContext.commit('setUser', null)
            },
            clearError (vuexContext) {
                vuexContext.commit('clearError')
            }
        }, 
        getters: {
            loadedShops (state) {
                return state.loadedShops
            },
            loadedShop (state) {
                return shopId => {
                    return state.loadedShops.find(
                        shop => {
                            return shop.id === shopId
                        }
                    )
                }
            },
            user (state) {
                return state.user;
            },
            loading (state) {
                return state.loading
            },
            error (state) {
                return state.error
            }
        } 
    })
}

export default createStore
