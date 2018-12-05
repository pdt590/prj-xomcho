import firebase from '~/plugins/plugin-firebase'
import Cookie from 'js-cookie'
const db = firebase.database()
const usersRef = db.ref('users')

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
                    email: payload.email,
                    updatedDate: new Date().toISOString()
                }
                await usersRef.child(user.uid).set(userProfile)
                // * persistent storage using cookie (or localstorage or firebase.auth().onAuthStateChanged())
                Cookie.set("uid", user.uid)
                Cookie.set(
                    "expirationDate",
                    new Date().getTime() + (2 * 3600 * 1000) // 2h expired time
                )
                const newUser = {
                    id: user.uid, 
                    ...userProfile
                }
                vuexContext.commit('setUser', newUser)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
                return true
            } catch(error) {
                vuexContext.commit('setAuthError', error)
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR-signUserUp]', error)
                return false
            }
        },
        async signUserIn (vuexContext, payload) {
            vuexContext.commit('setAuthLoading', true)
            vuexContext.commit('clearAuthError')
            try {
                const { user } = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                const userData = await usersRef.child(user.uid).once('value') 
                const userObj = userData.val()
                const userProfile = {
                    id: user.uid,
                    ...userObj
                }
                // * persistent storage using cookie (or localstorage or firebase.auth().onAuthStateChanged())
                Cookie.set("uid", user.uid)
                Cookie.set(
                    "expirationDate",
                    new Date().getTime() + (2 * 3600 * 1000) // 2h expired time
                )
                vuexContext.commit('setUser', userProfile)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
                return true
            } catch(error) {
                vuexContext.commit('setAuthError', error)
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR-signUserIn]', error)
                return false
            }
        },
        initAuth (vuexContext) {
            let uid = Cookie.get("uid")
            let expirationDate = Cookie.get("expirationDate")
            if (new Date().getTime() > +expirationDate || !uid) {
                console.log("No token or invalid token")
                vuexContext.dispatch("logOut")
                return
            }
            // re-new expirationDate
            Cookie.set(
                "expirationDate",
                new Date().getTime() + (2 * 3600 * 1000) // 1h expired time
            )
        },
        async logOut (vuexContext) {
            await firebase.auth().signOut()
            Cookie.remove("uid")
            Cookie.remove("expirationDate")
            vuexContext.commit('setUser', null)
            if(process.client) {
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            }
        },
        //? DONE
        async updateUserContent (vuexContext, newUserContent) {
            vuexContext.commit('setAuthLoading', true)
            try{
                const user = firebase.auth().currentUser
                const loadedUser = vuexContext.getters.user
                const userId = loadedUser.id

                await usersRef.child(userId).update(newUserContent)

                await user.updateProfile({
                    displayName: newUserContent.fullname
                })
                if(newUserContent.username !== loadedUser.username) {
                    await vuexContext.commit('updateItemsByUser', {
                        newUsername: newUserContent.username,
                        newAvatar: loadedUser.avatar
                    })
                    await vuexContext.commit('updateItemsByUser', {
                        newUsername: newUserContent.username,
                        newAvatar: loadedUser.avatar
                    })
                }
                vuexContext.commit('setUser', {
                    ...loadedUser,
                    ...newUserContent
                })
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            } catch(error){
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR-updateUserContent]', error)
            }
        },
        // https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
        // https://stackoverflow.com/questions/37811684/how-to-create-credential-object-needed-by-firebase-web-user-reauthenticate-m
        // his operation is sensitive and requires recent au…ation. Log in again before retrying this request.
        // https://medium.com/@ericmorgan1/change-user-email-password-in-firebase-and-react-native-d0abc8d21618
        async updateUserEmail (vuexContext, payload) {
            vuexContext.commit('setAuthLoading', true)
            try{
                let user = firebase.auth().currentUser
                const loadedUser = vuexContext.getters.user
                const userId = loadedUser.id
                const confirmPassword = payload.confirmPassword
                const newEmail = payload.newEmail
                const credential = await firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    confirmPassword
                )
                await user.reauthenticateAndRetrieveDataWithCredential(credential)
                user = firebase.auth().currentUser // RetrieveData
                await user.updateEmail(newEmail)
                await usersRef.child(userId).update({
                    email: newEmail
                })
                vuexContext.commit('setUser', {
                    ...loadedUser,
                    email: newEmail
                })
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
                return true
            } catch(error){
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR-updateUserEmail]', error)
                return false
            }
        },
        //? DONE
        async updateUserPassword (vuexContext, payload) {
            vuexContext.commit('setAuthLoading', true)
            try{
                let user = firebase.auth().currentUser
                const confirmPassword = payload.confirmPassword
                const newPassword = payload.newPassword
                const credential = await firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    confirmPassword
                )
                await user.reauthenticateAndRetrieveDataWithCredential(credential)
                user = firebase.auth().currentUser // RetrieveData
                await user.updatePassword(newPassword)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
                return true
            } catch(error){
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR-updateUserPassword]', error)
                return false
            }
        },
        //? DONE
        async updateUserAvatar (vuexContext, newAvatar) {
            vuexContext.commit('setAuthLoading', true)
            try {
                const user = firebase.auth().currentUser
                const loadedUser = vuexContext.getters.user
                const userId = loadedUser.id
                const oldAvatar = loadedUser.avatar
                if(oldAvatar) {
                    await firebase.storage().ref('users/' + oldAvatar.metadata.name).delete()
                }
                if(!newAvatar) {
                    await usersRef.child(userId).update({
                        avatar: null
                    })
                    await vuexContext.dispatch('updateShopsByUser', {
                        newUsername: loadedUser.username,
                        newAvatar: null
                    })
                    await vuexContext.dispatch('updateItemsByUser', {
                        newUsername: loadedUser.username,
                        newAvatar: null
                    })
                    delete loadedUser.avatar
                    vuexContext.commit('setAuthLoading', false)
                    return
                }

                let avatarObject = null
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }
                const ext = newAvatar.name.slice(newAvatar.name.lastIndexOf('.'))
                const newAvatarName = userId + ext
                const metaData = { 
                    name: newAvatarName, 
                    size: newAvatar.size, 
                    _creator: userId
                }
                await firebase.storage().ref('users/' + newAvatarName).put(newAvatar, storageMetadata)
                const avatarDownloadUrl = await firebase.storage().ref('users/' + newAvatarName).getDownloadURL()
                avatarObject = {
                    metadata: metaData,
                    url: avatarDownloadUrl
                }
                
                await user.updateProfile({
                    photoURL: avatarObject.url
                })
                await usersRef.child(userId).update({
                    avatar: avatarObject
                })
                await vuexContext.dispatch('updateShopsByUser', {
                    newUsername: loadedUser.username,
                    newAvatar: avatarObject
                })
                await vuexContext.dispatch('updateItemsByUser', {
                    newUsername: loadedUser.username,
                    newAvatar: avatarObject
                })
                const updatedUser = {
                    ...loadedUser,
                    avatar: avatarObject
                }
                vuexContext.commit('setUser', updatedUser)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            } catch(error) {
                console.log('[ERROR-updateAvatar]', error)
                vuexContext.commit('setAuthLoading', false)
            }
        },
        // TODO: cannot delete images
        async deleteUser (vuexContext, confirmPassword) {
            vuexContext.commit('setAuthLoading', true)
            try{
                let user = firebase.auth().currentUser
                const loadedUser = vuexContext.getters.user
                const userId = loadedUser.id
                const credential = await firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    confirmPassword
                )
                await user.reauthenticateAndRetrieveDataWithCredential(credential)
                user = firebase.auth().currentUser // RetrieveData
                await user.delete()
                await usersRef.child(userId).remove()
                await vuexContext.dispatch('deleteItemsByUser', userId)
                await vuexContext.dispatch('deleteShopsByUser', userId)
                Cookie.remove("uid")
                Cookie.remove("expirationDate")
                vuexContext.commit('setUser', null)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
                return true
            } catch(error){
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR-deleteUser]', error)
                return false
            }  
        },
        async isCorrectPassword (vuexContext, confirmPassword) {
            try{
                const user = firebase.auth().currentUser
                const loadedUser = vuexContext.getters.user
                const credential = await firebase.auth.EmailAuthProvider.credential(
                    loadedUser.email,
                    confirmPassword
                )
                await user.reauthenticateAndRetrieveDataWithCredential(credential)
                return true
            } catch(error) {
                console.log('[ERROR-isCorrectPassword]', error)
                return false
            }
        },
        async isUnique (vuexContext, payload) {
            try{
                const item = await usersRef.orderByChild('email').equalTo(payload).once('value')
                if(item.val()) return false
                return true
            } catch(error) {
                console.log('[ERROR-isUnique]', error)
                return false
            }
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