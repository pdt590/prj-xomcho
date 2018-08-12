
export const state = () => ({
    loading: false,
    error: null, // error state is just for auth
    sideBar: false
})

export const mutations = {
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
}

export const actions = {
    clearError (vuexContext) {
        vuexContext.commit('clearError')
    },
    openSideBar (vuexContext, payload) {
        vuexContext.commit('setSideBar', payload)
    }
}

export const getters = {
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
