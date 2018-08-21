export default {
    state: {
        sideBar: false
    },
    mutations: {
        setSideBar (state, payload) {
            state.sideBar = payload
        }
    },
    actions: {
        // nuxtServerInit should be only used for authentication
        async nuxtServerInit (vuexContext, { req, error }) {
            try {
                let uid
                let username
                let fullname
                let email
                let phone
                let photoUrl
                let expirationDate
                if (req) {
                    if (!req.headers.cookie) {
                        await vuexContext.dispatch("logOut") // * Logout because `user` is still available in store at server side
                        return
                    }
                    let reqCookie = req.headers.cookie.split(";")
                    
                    let isUid =   reqCookie.find(c => c.trim().startsWith("uid="));
                    if(!isUid) { 
                        await vuexContext.dispatch("logOut")
                        return 
                    }
                    uid            = reqCookie.find(c => c.trim().startsWith("uid=")).split("=")[1]
                    username       = reqCookie.find(c => c.trim().startsWith("username=")).split("=")[1]
                    fullname       = reqCookie.find(c => c.trim().startsWith("fullname=")).split("=")[1]
                    email          = reqCookie.find(c => c.trim().startsWith("email=")).split("=")[1]
                    phone          = reqCookie.find(c => c.trim().startsWith("phone=")).split("=")[1]
                    photoUrl       = reqCookie.find(c => c.trim().startsWith("photoUrl=")).split("=")[1]
                    expirationDate = reqCookie.find(c => c.trim().startsWith("expirationDate=")).split("=")[1]
                }
                if (new Date().getTime() > +expirationDate || !uid) {
                    console.log("Invalid uid")
                    await vuexContext.dispatch("logOut")
                    return
                }
                const userProfile = {
                    id: uid,
                    username: username,
                    fullname: fullname,
                    email: email,
                    phone: phone,
                    photoUrl: photoUrl
                }
                vuexContext.commit('setUser', userProfile)
            }catch (e) {
                vuexContext.commit('setAuthLoading', false)
                vuexContext.commit('setAuthError', e)
                console.log('[ERROR] ' + e)
                error({ statusCode: 500, message: '...Lỗi' })
            } 
        },
        openSideBar (vuexContext, payload) {
            vuexContext.commit('setSideBar', payload)
        }
    },
    getters: {
        sideBar(state) {
            return state.sideBar
        }
    }
}