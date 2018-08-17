import firebase from '~/plugins/firebase'
import Cookie from 'js-cookie'

export default {
    state: {
        authLoading: false,
        authError: null,
        user: null
    },
    mutations: {
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
    },
    actions: {
        clearAuthError (vuexContext) {
            vuexContext.commit('clearAuthError')
        },
        async signUserUp (vuexContext, payload) {
            vuexContext.commit('setAuthLoading', true)
            vuexContext.commit('clearAuthError')
            try {
                const { user } = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                const userProfile = {
                    id: user.uid,
                    username: payload.username,
                    fullname: '',
                    email: payload.email,
                    phone:'',
                    photoUrl: 'https://imgplaceholder.com/600x600/cccccc/757575/glyphicon-user'
                }
                Cookie.set("jwt", userProfile)
                Cookie.set(
                    "expirationDate",
                    new Date().getTime() + (1 * 3600 * 1000) // 1h expired time
                )
                firebase.database().ref('/users/' + user.uid).set({profile: {...userProfile}}) //TODO: reload Signin modal when return a promise
                vuexContext.commit('setAuthLoading', false)
                vuexContext.commit('setUser', userProfile)
            } catch(error) {
                vuexContext.commit('setAuthLoading', false)
                vuexContext.commit('setAuthError', error)
                console.log('[ERROR] ' + error)
            }
        },
        async signUserIn (vuexContext, payload) {
            vuexContext.commit('setAuthLoading', true)
            vuexContext.commit('clearAuthError')
            try {
                const { user } = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                const data = await firebase.database().ref('/users/' + user.uid + '/profile').once('value')
                const obj = data.val()
                const userProfile = {
                    id: user.uid,
                    username: obj.username,
                    fullname: obj.fullname,
                    email: obj.email,
                    phone: obj.phone,
                    photoUrl: obj.photoUrl
                }
                Cookie.set("jwt", userProfile)
                Cookie.set(
                    "expirationDate",
                    new Date().getTime() + (1 * 3600 * 1000) // 1h expired time
                )
                vuexContext.commit('setAuthLoading', false)
                vuexContext.commit('setUser', userProfile)
            } catch(error) {
                vuexContext.commit('setAuthLoading', false)
                vuexContext.commit('setAuthError', error)
                console.log('[ERROR] ' + error)
            }
        },
        async autoSignIn (vuexContext, payload) {
            vuexContext.commit('setAuthLoading', true)
            let expirationDate = Cookie.get("expirationDate")
            if (new Date().getTime() > +expirationDate) {
                console.log("Signin time is expired");
                vuexContext.commit('setAuthLoading', false)
                vuexContext.dispatch("logOut");
                return
            }
            // re-new expirationDate
            Cookie.set(
                "expirationDate",
                new Date().getTime() + (1 * 3600 * 1000) // 1h expired time
            )
            try{
                const data = await firebase.database().ref('/users/' + payload.uid + '/profile').once('value')
                const obj = data.val()
                const userProfile = {
                    id: payload.uid,
                    username: obj.username,
                    fullname: obj.fullname,
                    email: obj.email,
                    phone: obj.phone,
                    photoUrl: obj.photoUrl
                }
                vuexContext.commit('setAuthLoading', false)
                vuexContext.commit('setUser', userProfile)
            } catch(error) {
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR] ' + error)
            }
        },
        async logOut (vuexContext) {
            await firebase.auth().signOut()
            Cookie.remove("jwt");
            Cookie.remove("expirationDate");
            vuexContext.commit('setUser', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        authError(state) {
            return state.authError
        },
        authLoading(state) {
            return state.authLoading
        }
    }
}