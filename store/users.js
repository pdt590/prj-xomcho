import firebase from '~/plugins/firebase'
import Cookie from 'js-cookie'

export const state = () => ({
    user: null
})

export const mutations = {
    setUser (state, payload) {
        state.user = payload
    }
}

export const actions = { 
    // nuxtServerInit should be only used for authentication
    // TODO: move this function to store/index.js 
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
            console.log(user)
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
    signUserUp (vuexContext, payload) {
        vuexContext.commit('setLoading', true, {root: true})
        vuexContext.commit('clearError', null, {root: true})
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
                                vuexContext.commit('setLoading', false, {root: true})
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
                    vuexContext.commit('setLoading', false, {root: true})
                    vuexContext.commit('setError', error, {root: true})
                    console.log('[ERROR] ' + error)
                }
            )
    },
    signUserIn (vuexContext, payload) {
        vuexContext.commit('setLoading', true, {root: true})
        vuexContext.commit('clearError', null, {root: true})
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
                                vuexContext.commit('setLoading', false, {root: true})
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
                    vuexContext.commit('setLoading', false, {root: true})
                    vuexContext.commit('setError', error, {root: true})
                    console.log('[ERROR] ' + error)
                }
            )
    },
    autoSignIn (vuexContext, payload) {
        vuexContext.commit('setLoading', true, {root: true})
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
                    vuexContext.commit('setLoading', false, {root: true})
                    vuexContext.commit('setUser', {
                        id: payload.uid,
                        ...userProfile
                    })
                }
            )
            .catch(
                error => {
                    vuexContext.commit('setLoading', false, {root: true})
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
                    vuexContext.commit('setUser', null, {root: true})
                }
            )
    }
}

export const getters = {
    user (state) {
        return state.user;
    }
}