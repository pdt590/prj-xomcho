import firebase from '~/plugins/firebase'

export const state = () => ({
    itemLoading: false,
    loadedItems: null
})

export const mutations = {
    setItemLoading(state, payload) {
        state.itemLoading = payload
    },
    setItems(state, payload) {
        state.loadedItems = payload
    },
    addItem(state, payload) {
        state.loadedItems.push(payload)
    }
}

export const actions = {
    async addItem (vuexContext, payload) {
        vuexContext.commit('setItemLoading', true)
        try {
            const newItem = {
                ...payload,
                shopId: vuexContext.rootState.shops.loadedShop.shopId,
                creatorId: vuexContext.rootState.users.user.id,
                updatedDate: new Date().toISOString()
            }
            const data = await firebase.database().ref('items').push(newItem)
            vuexContext.commit('setItemLoading', false)
            vuexContext.commit('addItem', {
                id: data.key,
                ...newItem
            })
            return data.key
        } catch(error) {
            vuexContext.commit('setItemLoading', false)
            console.log('[ERROR] ' + error)
        }
    },
    async loadItems (vuexContext, payload) {
        vuexContext.commit('setItemLoading', true)
        try {
            const itemsData = await firebase.database().ref('items').orderByChild('shopId').equalTo(payload).once('value')
            const itemsObj = itemsData.val()
            const loadedItems = []
            for (let key in itemsObj) {
                loadedItems.push({
                    itemId: key,
                    ...itemsObj[key]
                })
            }
            vuexContext.commit('setItemLoading', false)
            vuexContext.commit('setItems', loadedItems)
            return loadedItems
        } catch(error) {
            vuexContext.commit('setItemLoading', false)
            console.log('[ERROR] ' + error)
        }
    },
    async loadItem (vuexContext, payload) {
        const loadedItems = await vuexContext.dispatch('loadItems', payload.shopId)
        const loadedItem  = loadedItems.find( item => {
            return item.id === payload.itemId
        })
        return loadedItem
    },
    async loadPreviewItems (vuexContext, payload) {
        vuexContext.commit('setItemLoading', true)
        try {
            const itemsData = await firebase.database().ref('items').orderByChild('updatedDate').limitToFirst(50).once('value')
            const itemsObj = itemsData.val()
            const loadedItems = []
            for (let key in itemsObj) {
                loadedItems.push({
                    itemId: key,
                    ...itemsObj[key]
                })
            }
            vuexContext.commit('setItemLoading', false)
            return loadedItems
        } catch(error) {
            vuexContext.commit('setItemLoading', false)
            console.log('[ERROR] ' + error)
        }
    },
}