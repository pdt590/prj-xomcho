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