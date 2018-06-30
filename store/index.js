import Vuex from 'vuex'
import firebase from '~/plugins/firebase'

const createStore = () => {
    return new Vuex.Store({
        state: {
            user: null,
            loading: false,
            error: null
        },
        mutations: {
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
