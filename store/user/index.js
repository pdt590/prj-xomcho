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
                    username: payload.username,
                    fullname: '',
                    email: payload.email,
                    phone:'',
                    photoUrl: '/icon-user.png'
                }
                // * persistent storage using cookie (or localstorage or firebase.auth().onAuthStateChanged())
                Cookie.set("uid", user.uid)
                Cookie.set("username", userProfile.username)
                Cookie.set("fullname", userProfile.fullname)
                Cookie.set("email", userProfile.email)
                Cookie.set("phone", userProfile.phone)
                Cookie.set("photoUrl", userProfile.photoUrl)
                Cookie.set(
                    "expirationDate",
                    new Date().getTime() + (2 * 3600 * 1000) // 2h expired time
                )
                await firebase.database().ref('users/' + user.uid).set(userProfile)
                vuexContext.commit('setAuthLoading', false)
                vuexContext.commit('setUser', {id: user.uid, ...userProfile})
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')

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
                const data = await firebase.database().ref('users/' + user.uid).once('value') 
                const obj = data.val()
                const userProfile = {
                    id: user.uid,
                    username: obj.username,
                    fullname: obj.fullname,
                    email: obj.email,
                    phone: obj.phone,
                    photoUrl: obj.photoUrl
                }
                // * persistent storage using cookie (or localstorage or firebase.auth().onAuthStateChanged())
                Cookie.set("uid", user.uid)
                Cookie.set("username", userProfile.username)
                Cookie.set("fullname", userProfile.fullname)
                Cookie.set("email", userProfile.email)
                Cookie.set("phone", userProfile.phone)
                Cookie.set("photoUrl", userProfile.photoUrl)
                Cookie.set(
                    "expirationDate",
                    new Date().getTime() + (2 * 3600 * 1000) // 2h expired time
                )
                vuexContext.commit('setAuthLoading', false)
                vuexContext.commit('setUser', userProfile)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            } catch(error) {
                vuexContext.commit('setAuthLoading', false)
                vuexContext.commit('setAuthError', error)
                console.log('[ERROR] ' + error)
            }
        },
        initAuth (vuexContext) {
            let uid = Cookie.get("uid")
            let username = Cookie.get("username")
            let fullname = Cookie.get("fullname")
            let email = Cookie.get("email")
            let phone = Cookie.get("phone")
            let photoUrl = Cookie.get("photoUrl")
            let expirationDate = Cookie.get("expirationDate")
            if (new Date().getTime() > +expirationDate || !uid) {
                console.log("No token or invalid token");
                vuexContext.commit('setAuthLoading', false)
                vuexContext.dispatch("logOut");
                return
            }
            // re-new expirationDate
            Cookie.set(
                "expirationDate",
                new Date().getTime() + (1 * 3600 * 1000) // 1h expired time
            )
            const userProfile = {
                id: uid,
                username: username,
                fullname: fullname,
                email: email,
                phone: phone,
                photoUrl: photoUrl
            }
            vuexContext.commit('setUser', userProfile)
        },
        async logOut (vuexContext) {
            await firebase.auth().signOut()
            Cookie.remove("uid")
            Cookie.remove("username")
            Cookie.remove("fullname")
            Cookie.remove("email")
            Cookie.remove("phone")
            Cookie.remove("photoUrl") 
            Cookie.remove("expirationDate")
            vuexContext.commit('setUser', null)
            if(process.client) {
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            }
        },
        async isUnique (vuexContext, payload) {
            const item = await firebase.database().ref('users').orderByChild('email').equalTo(payload).once('value')
            if(item.val()) return false
            return true
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