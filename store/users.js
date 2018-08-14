import firebase from '~/plugins/firebase'
import Cookie from 'js-cookie'

export const state = () => ({
    authLoading: false,
    authError: null,
    user: null
})

export const mutations = {
    setAuthLoading (state, payload) {
        state.authLoading = payload
    },
    setAuthError (state, payload) {
        state.authError = payload
    },
    clearAuthError (state) {
        state.authError = null
    },
    setUser (state, payload) {
        state.user = payload
    }
}

export const actions = {
    clearAuthError (vuexContext) {
        vuexContext.commit('clearAuthError')
    },
    signUserUp (vuexContext, payload) {
        vuexContext.commit('setAuthLoading', true)
        vuexContext.commit('clearAuthError')
        return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                data => {
                    const {user} = data
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
                    //TODO: fix issue reload Signin modal when put return here
                    firebase.database().ref('/users/' + user.uid).set({profile: {...userProfile}}) 
                        .then(
                            () => {
                                vuexContext.commit('setAuthLoading', false)
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
                    vuexContext.commit('setAuthLoading', false)
                    vuexContext.commit('setAuthError', error)
                    console.log('[ERROR] ' + error)
                }
            )
    },
    signUserIn (vuexContext, payload) {
        vuexContext.commit('setAuthLoading', true)
        vuexContext.commit('clearAuthError')
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
                                vuexContext.commit('setAuthLoading', false)
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
                    vuexContext.commit('setAuthLoading', false)
                    vuexContext.commit('setAuthError', error)
                    console.log('[ERROR] ' + error)
                }
            )
    },
    autoSignIn (vuexContext, payload) {
        vuexContext.commit('setAuthLoading', true)
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
                    vuexContext.commit('setAuthLoading', false)
                    vuexContext.commit('setUser', {
                        id: payload.uid,
                        ...userProfile
                    })
                }
            )
            .catch(
                error => {
                    vuexContext.commit('setAuthLoading', false)
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
    }
}