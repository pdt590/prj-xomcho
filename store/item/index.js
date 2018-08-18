import firebase from '~/plugins/firebase'
import uuid from '../shared/uuid'

export default {
    state: {
        itemLoading: false,
        loadedItems: []
    },
    mutations:  {
        setItemLoading(state, payload) {
            state.itemLoading = payload
        },
        setItems(state, payload) {
            state.loadedItems = payload
        },
        addItem(state, payload) {
            state.loadedItems.push(payload)
        }
    },
    actions: {
        async addItem (vuexContext, payload) {
            vuexContext.commit('setItemLoading', true)
            try {
                const newItem = {
                    ...payload,
                    shopId: vuexContext.getters.loadedShop.shopId,
                    creatorId: vuexContext.getters.user.id,
                    updatedDate: new Date().toISOString()
                }
                const itemId = payload.title.replace(/\s+/g, '-').toLowerCase() + '-' + uuid(5)
                await firebase.database().ref('items').child(itemId).set(newItem)
                vuexContext.commit('setItemLoading', false)
                vuexContext.commit('addItem', {
                    itemId: itemId,
                    ...newItem
                })
                return itemId
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
        async loadPreviewItems (vuexContext) {
            vuexContext.commit('setItemLoading', true)
            try {
                const itemsData = await firebase.database().ref('items').orderByChild('updatedDate').limitToLast(10).once('value')
                const itemsObj = itemsData.val()
                const loadedItems = []
                for (let key in itemsObj) {
                    loadedItems.push({
                        itemId: key,
                        ...itemsObj[key]
                    })
                }
                loadedItems.reverse()
                vuexContext.commit('setItemLoading', false)
                return loadedItems
            } catch(error) {
                vuexContext.commit('setItemLoading', false)
                console.log('[ERROR] ' + error)
            }
        }
    },
    getters: {
        itemLoading(state) {
            return state.itemLoading
        },
        loadedItems(state) {
            return state.loadedItems
        }
    }
}