import Vuex from 'vuex'
import firebase from '~/plugins/firebase'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            user: null,
            loading: false,
            error: null, // error state is just for auth
            loadedShops: [],
            loadedShop: {},
            sideBar: false
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
            loadShop (state, payload) {
                state.loadedShop = payload
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
            },
            setSideBar (state, payload) {
                state.sideBar = payload
            }
        },
        actions: {
            // nuxtServerInit should be only used for authentication 
            nuxtServerInit (vuexContext,{req}) {
                let user
                let expirationDate
                if (req) {
                    if (!req.headers.cookie) return
                    const jwtCookie = req.headers.cookie
                        .split(";")
                        .find(c => c.trim().startsWith("jwt="));
                    if (!jwtCookie) return
                    user = jwtCookie.split('=')[1]
                    expirationDate = req.headers.cookie
                        .split(";")
                        .find(c => c.trim().startsWith("expirationDate="))
                        .split("=")[1]
                }
                if (new Date().getTime() > +expirationDate || !user) {
                    console.log("No uid or invalid uid")
                    vuexContext.dispatch("logOut")
                    return
                }
                vuexContext.commit('setUser', user)
            },
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
                            vuexContext.commit('setLoading', false)
                            return data.key
                        }
                    )
                    .catch(
                        error => {
                            vuexContext.commit('setLoading', false)
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
                            vuexContext.commit('setLoading', false)
                            vuexContext.commit('editShop', payload)
                        }    
                    )
                    .catch(
                        error => {
                            vuexContext.commit('setLoading', false)
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
            signUserUp (vuexContext, payload) {
                vuexContext.commit('setLoading', true)
                vuexContext.commit('clearError')
                // return the promise of firebase.auth().createUserWithEmailAndPassword.then()
                return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                    .then(
                        data => {
                            //const user = firebase.auth().currentUser or
                            //user.updateProfile({
                            //})
                            const {user} = data
                            console.log(user)
                            const userProfile = {
                                username: payload.username,
                                fullname: '',
                                email: payload.email,
                                phone:'',
                                photoUrl: 'https://imgplaceholder.com/600x600/cccccc/757575/glyphicon-user'
                            }
                            Cookie.set("jwt", {id: user.uid, ...userProfile})
                            Cookie.set(
                                "expirationDate",
                                new Date().getTime() + (1 * 3600 * 1000) // 1h expired time
                            )
                            firebase.database().ref('/users/' + user.uid).set({profile: {...userProfile}}) //TODO: fix issue reload Signin modal when put return here
                                .then(
                                    () => {
                                        vuexContext.commit('setLoading', false)
                                        vuexContext.commit('setUser', {
                                            id: user.uid, 
                                            ...userProfile
                                        })
                                    }
                                )
                        }
                    )
                    .catch(
                        error => {
                            vuexContext.commit('setLoading', false)
                            vuexContext.commit('setError', error)
                            console.log('[ERROR] ' + error)
                        }
                    )
            },
            signUserIn (vuexContext, payload) {
                vuexContext.commit('setLoading', true)
                vuexContext.commit('clearError')
                return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                    .then(
                        data => {
                            //const user = firebase.auth().currentUser
                            const {user} = data
                            return firebase.database().ref('/users/' + user.uid + '/profile').once('value')
                                .then(
                                    data => {
                                        const obj = data.val()
                                        const userProfile = {
                                            username: obj.username,
                                            fullname: obj.fullname,
                                            email: obj.email,
                                            phone: obj.phone,
                                            photoUrl: obj.photoUrl,
                                            favorShops: obj.favorShops,
                                            favorItems: obj.favorItems
                                        }
                                        return userProfile
                                    }
                                )
                                .then(
                                    userProfile => {
                                        Cookie.set("jwt", {id: user.uid, ...userProfile})
                                        Cookie.set(
                                            "expirationDate",
                                            new Date().getTime() + (1 * 3600 * 1000) // 1h expired time
                                        )
                                        vuexContext.commit('setLoading', false)
                                        vuexContext.commit('setUser', {
                                            id: user.uid,
                                            ...userProfile
                                        })
                                    }
                                )
                        }
                    )
                    .catch(
                        error => {
                            vuexContext.commit('setLoading', false)
                            vuexContext.commit('setError', error)
                            console.log('[ERROR] ' + error)
                        }
                    )
            },
            autoSignIn (vuexContext, payload) {
                vuexContext.commit('setLoading', true)
                let expirationDate = Cookie.get("expirationDate")
                if (new Date().getTime() > +expirationDate) {
                    console.log("Signin time is expired");
                    vuexContext.dispatch("logOut");
                    return
                }
                // re-new expirationDate
                Cookie.set(
                    "expirationDate",
                    new Date().getTime() + (1 * 3600 * 1000) // 1h expired time
                )
                return firebase.database().ref('/users/' + payload.uid + '/profile').once('value')
                    .then(
                        data => {
                            const obj = data.val()
                            const userProfile = {
                                username: obj.username,
                                fullname: obj.fullname,
                                email: obj.email,
                                phone: obj.phone,
                                photoUrl: obj.photoUrl,
                                favorShops: obj.favorShops,
                                favorItems: obj.favorItems
                            }
                            return userProfile
                        }
                    )
                    .then(
                        userProfile => {
                            vuexContext.commit('setLoading', false)
                            vuexContext.commit('setUser', {
                                id: payload.uid,
                                ...userProfile
                            })
                        }
                    )
                    .catch(
                        error => {
                            vuexContext.commit('setLoading', false)
                            console.log('[ERROR] ' + error)
                        }
                    )
            },
            logOut (vuexContext) {
                return firebase.auth().signOut()
                    .then(
                        () => {
                            Cookie.remove("jwt");
                            Cookie.remove("expirationDate");
                            vuexContext.commit('setUser', null)
                        }
                    )
            },
            clearError (vuexContext) {
                vuexContext.commit('clearError')
            },
            openSideBar (vuexContext, payload) {
                vuexContext.commit('setSideBar', payload)
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
            },
            sideBar (state) {
                return state.sideBar
            }
        } 
    })
}

export default createStore
