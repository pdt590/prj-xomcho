import firebase from '~/plugins/plugin-firebase'
const db = firebase.database()
const shopsRef = db.ref('shops')
const itemsRef = db.ref('items')

export default {
    state: {
        queryLoading: false,
        loadedPersonalShops: [],
        loadedPersonalItems: [],
        loadedPreviewShops: [],
        loadedPreviewItems: [],
        loadedCategoryShops: [],
        loadedCategoryItems: [],
        loadedSearchShops: [],
        loadedSearchItems: [],
    },
    mutations: {
        setQueryLoading(state, payload) {
            state.queryLoading = payload
        },

        // Personal
        setPersonalShops (state, payload) {
            state.loadedPersonalShops = payload
        },
        setPersonalItems(state, payload) {
            state.loadedPersonalItems = payload
        },
    },
    actions: {
        // Personal
        async loadPersonalShops (vuexContext) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const userId = vuexContext.getters.user.id
                const shopsData = await shopsRef.orderByChild('_creator/id').equalTo(userId).once('value')     
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push(shopObj)
                })
                loadedShops.reverse()
                vuexContext.commit('setPersonalShops', loadedShops)
                vuexContext.commit('setQueryLoading', false)
                return loadedShops
            } catch(error) {
                console.log('[ERROR-loadPersonalShops]', error)
                vuexContext.commit('setQueryLoading', false)
            }
        },
        async loadPersonalItems (vuexContext) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const userId = vuexContext.getters.user.id
                const itemsData = await itemsRef.orderByChild('_creator/id').equalTo(userId).once('value')
                const loadedItems = []
                itemsData.forEach(itemData => {
                    const itemObj = itemData.val()
                    loadedItems.push(itemObj)
                })
                loadedItems.reverse()
                vuexContext.commit('setPersonalItems', loadedItems)
                vuexContext.commit('setQueryLoading', false)
                return loadedItems
            } catch(error) {
                console.log('[ERROR-loadPersonalItems]', error)
                vuexContext.commit('setQueryLoading', false)
            }
        },

        // Preview
        async loadPreviewShops (vuexContext) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const shopsData = await shopsRef.orderByChild('updatedDate').limitToLast(12).once('value')         
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push(shopObj)
                })
                loadedShops.reverse()
                vuexContext.commit('setQueryLoading', false)
                return loadedShops
            } catch(error) {
                console.log('[ERROR-loadPreviewShops]', error)
                vuexContext.commit('setQueryLoading', false)
            }
        },
        async loadPreviewItems (vuexContext) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('updatedDate').limitToLast(12).once('value')
                const loadedItems = []
                itemsData.forEach(itemData => {
                    const itemObj = itemData.val()
                    loadedItems.push(itemObj)
                })
                loadedItems.reverse()
                vuexContext.commit('setQueryLoading', false)
                return loadedItems
            } catch(error) {
                console.log('[ERROR-loadPreviewItems]', error)
                vuexContext.commit('setQueryLoading', false)
            }
        },

        // All
        async loadAllShops (vuexContext, payload) {
            vuexContext.commit('setQueryLoading', true)
            try {
                let shopsData = null
                if(payload.endAtKey !== undefined) {
                    shopsData = await shopsRef.orderByChild('updatedDate').endAt(payload.endAtKey).limitToLast(payload.limit).once('value')  
                }else {
                    shopsData = await shopsRef.orderByChild('updatedDate').limitToLast(payload.limit).once('value') 
                }    
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push(shopObj)
                })
                loadedShops.reverse()
                vuexContext.commit('setQueryLoading', false)
                return loadedShops
            } catch(error) {
                console.log('[ERROR-loadAllShops]', error)
                vuexContext.commit('setQueryLoading', false)
            }
        },
        async loadAllItems (vuexContext, payload) {
            vuexContext.commit('setQueryLoading', true)
            try {
                let itemsData = null
                if(payload.endAtKey !== undefined) {
                    itemsData = await itemsRef.orderByChild('updatedDate').endAt(payload.endAtKey).limitToLast(payload.limit).once('value')  
                }else {
                    itemsData = await itemsRef.orderByChild('updatedDate').limitToLast(payload.limit).once('value') 
                }
                const loadedItems = []
                itemsData.forEach(itemData => {
                    const itemObj = itemData.val()
                    loadedItems.push(itemObj)
                })
                loadedItems.reverse()
                vuexContext.commit('setQueryLoading', false)
                return loadedItems
            } catch(error) {
                console.log('[ERROR-loadAllItems]', error)
                vuexContext.commit('setQueryLoading', false)
            }
        },

        // Category 
        async loadCategoryShops (vuexContext, category) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const shopsData = await shopsRef.orderByChild('category').equalTo(category).limitToFirst(500).once('value')
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push({
                        id: shopData.key,
                        ...shopObj
                    })
                })
                vuexContext.commit('setQueryLoading', false)
                return loadedShops.reverse()
            } catch(error) {
                console.log('[ERROR-loadCategoryShops]', error)
                vuexContext.commit('setQueryLoading', false)
            }
        },
        async loadCategoryItems (vuexContext, category) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('category').equalTo(category).limitToFirst(500).once('value')
                const loadedItems = []
                itemsData.forEach(itemData => {
                    const itemObj = itemData.val()
                    loadedItems.push({
                        id: itemData.key,
                        ...itemObj
                    })
                })
                vuexContext.commit('setQueryLoading', false)
                return loadedItems.reverse()
            } catch(error) {
                console.log('[ERROR-loadCategoryItems]', error)
                vuexContext.commit('setQueryLoading', false)
            }
        },

        // Search 
        async loadSearchShops (vuexContext, searchKey) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const shopsData = await shopsRef.orderByChild('title').startAt(searchKey).endAt(searchKey+"\uf8ff").limitToFirst(500).once('value')
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push({
                        id: shopData.key,
                        ...shopObj
                    })
                })
                vuexContext.commit('setQueryLoading', false)
                return loadedShops.reverse()
            } catch(error) {
                console.log('[ERROR-loadSearchShops]', error)
                vuexContext.commit('setQueryLoading', false)
            }
        },
        async loadSearchItems (vuexContext, searchKey) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('title').startAt(searchKey).endAt(searchKey+"\uf8ff").limitToFirst(500).once('value')
                const loadedItems = []
                itemsData.forEach(itemData => {
                    const itemObj = itemData.val()
                    loadedItems.push({
                        id: itemData.key,
                        ...itemObj
                    })
                })
                vuexContext.commit('setQueryLoading', false)
                return loadedItems.reverse()
            } catch(error) {
                console.log('[ERROR-loadSearchItems]', error)
                vuexContext.commit('setQueryLoading', false)
            }
        },
    },
    getters: {
        queryLoading(state) {
            return state.queryLoading
        },
        // Shops
        loadedPersonalShops(state) {
            return state.loadedPersonalShops
        },
        // Items
        loadedPersonalItems(state) {
            return state.loadedPersonalItems
        }
    }
}