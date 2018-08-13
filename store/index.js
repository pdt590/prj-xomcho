
export const state = () => ({
    sideBar: false
})

export const mutations = {
    setSideBar (state, payload) {
        state.sideBar = payload
    }
}

export const actions = {
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
            vuexContext.dispatch("users/logOut")
            return
        }
        vuexContext.commit('users/setUser', user)
    },
    openSideBar (vuexContext, payload) {
        vuexContext.commit('setSideBar', payload)
    }
}

export const getters = {
    sideBar (state) {
        return state.sideBar
    }
}
