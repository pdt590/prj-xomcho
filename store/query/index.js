import firebase from '~/plugins/plugin-firebase'
import { genId } from '~/plugins/util-helpers'

const db = firebase.database()
const shopsRef = db.ref('shops')
const itemsRef = db.ref('items')

export default {
    state: {
        queryLoading: false,
        loadedPersonalShops: [],
        loadedPersonalItems: [],
        bmShops: [],
        bmItems: [],
        fullBmShops: [],
        fullBmItems: [],
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

        // Bookmark
        setBmShops (state, payload) {
            state.bmShops = payload
        },
        setBmItems (state, payload) {
            state.bmItems = payload
        },
        setFullBmShops (state, payload) {
            state.fullBmShops = payload
        },
        setFullBmItems (state, payload) {
            state.fullBmItems = payload
        },
        addBmShop (state, payload) {
            state.bmShops.splice(0, 0, payload)
        },
        addBmItem (state, payload) {
            state.bmItems.splice(0, 0, payload)
        },
        removeBmShop (state, payload) {
            state.bmShops.splice(state.bmShops.findIndex(bmShop => bmShop.id === payload), 1)
        },
        removeBmItem (state, payload) {
            state.bmItems.splice(state.bmItems.findIndex(bmItem => bmItem.id === payload), 1)
        }
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
            } catch(e) {
                console.log('[ERROR-loadPersonalShops]', e)
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
            } catch(e) {
                console.log('[ERROR-loadPersonalItems]', e)
                vuexContext.commit('setQueryLoading', false)
            }
        },

        // Preview
        async loadPreviewShops (vuexContext) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const shopsData = await shopsRef.orderByChild('updatedDate').limitToLast(18).once('value')         
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push(shopObj)
                })
                loadedShops.reverse()
                vuexContext.commit('setQueryLoading', false)
                return loadedShops
            } catch(e) {
                console.log('[ERROR-loadPreviewShops]', e)
                vuexContext.commit('setQueryLoading', false)
            }
        },

        async loadPreviewItems (vuexContext) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('updatedDate').limitToLast(18).once('value')
                const loadedItems = []
                itemsData.forEach(itemData => {
                    const itemObj = itemData.val()
                    loadedItems.push(itemObj)
                })
                loadedItems.reverse()
                vuexContext.commit('setQueryLoading', false)
                return loadedItems
            } catch(e) {
                console.log('[ERROR-loadPreviewItems]', e)
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
            } catch(e) {
                console.log('[ERROR-loadAllShops]', e)
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
            } catch(e) {
                console.log('[ERROR-loadAllItems]', e)
                vuexContext.commit('setQueryLoading', false)
            }
        },

        // Category 
        async loadCategoryShops (vuexContext, category) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const shopsData = await shopsRef.orderByChild('category').equalTo(category).limitToLast(300).once('value')
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
            } catch(e) {
                console.log('[ERROR-loadCategoryShops]', e)
                vuexContext.commit('setQueryLoading', false)
            }
        },

        async loadCategoryItems (vuexContext, category) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('category').equalTo(category).limitToLast(300).once('value')
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
            } catch(e) {
                console.log('[ERROR-loadCategoryItems]', e)
                vuexContext.commit('setQueryLoading', false)
            }
        },

        // Search 
        async loadSearchShops (vuexContext, searchKey) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const shopsData = await shopsRef.orderByChild('title').startAt(searchKey).endAt(searchKey+"\uf8ff").limitToLast(300).once('value')
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
            } catch(e) {
                console.log('[ERROR-loadSearchShops]', e)
                vuexContext.commit('setQueryLoading', false)
            }
        },
        async loadSearchItems (vuexContext, searchKey) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('title').startAt(searchKey).endAt(searchKey+"\uf8ff").limitToLast(300).once('value')
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
            } catch(e) {
                console.log('[ERROR-loadSearchItems]', e)
                vuexContext.commit('setQueryLoading', false)
            }
        },

        // Bookmark
        async loadBmShops (vuexContext) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const loadedUser = vuexContext.getters.user
                const userId = loadedUser.id
                const bmShopsData = await db.ref(`bookmarks/${userId}/shops`).orderByKey().once('value')
                const bmShopsObj = bmShopsData.val()
                let loadedBmShops = []
                for (let key in bmShopsObj) {
                    loadedBmShops.push({
                        id: key,
                        ...bmShopsObj[key]
                    })
                }
                vuexContext.commit('setBmShops', loadedBmShops)
                vuexContext.commit('setQueryLoading', false)
            } catch(e) {
                vuexContext.commit('setQueryLoading', false)
                console.log('[ERROR-loadbmShops]', e)
            }
        },

        async loadBmItems (vuexContext) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const loadedUser = vuexContext.getters.user
                const userId = loadedUser.id
                const bmItemsData = await db.ref(`bookmarks/${userId}/items`).orderByKey().once('value')
                const bmItemsObj = bmItemsData.val()
                let loadedBmItems = []
                for (let key in bmItemsObj) {
                    loadedBmItems.push({
                        id: key,
                        ...bmItemsObj[key]
                    })
                }
                vuexContext.commit('setBmItems', loadedBmItems)
                vuexContext.commit('setQueryLoading', false)
            } catch(e) {
                vuexContext.commit('setQueryLoading', false)
                console.log('[ERROR-loadBmItems]', e)
            }
        },

        async loadFullBmShops (vuexContext) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const bmShops = vuexContext.getters.bmShops
                let loadedBmShops = []
                for (let bmShop of bmShops) {
                    const loadedShop = await vuexContext.dispatch('loadShop', bmShop.url)
                    loadedBmShops.push(loadedShop)
                }
                vuexContext.commit('setFullBmShops', loadedBmShops)
                vuexContext.commit('setQueryLoading', false)
            } catch(e) {
                vuexContext.commit('setQueryLoading', false)
                console.log('[ERROR-loadFullbmShops]', e)
            }
        },

        async loadFullBmItems (vuexContext) {
            vuexContext.commit('setQueryLoading', true)
            try {
                const bmItems = vuexContext.getters.bmItems
                let loadedBmItems = []
                for (let bmItem of bmItems) {
                    const loadedItem = await vuexContext.dispatch('loadItem', bmItem.url)
                    loadedBmItems.push(loadedItem)
                }
                vuexContext.commit('setFullBmItems', loadedBmItems)
                vuexContext.commit('setQueryLoading', false)
            } catch(e) {
                vuexContext.commit('setQueryLoading', false)
                console.log('[ERROR-loadFullBmItems]', e)
            }
        },

        async addBmShop (vuexContext, shopUrl) {
            vuexContext.commit('setQueryLoading', true)
            try{
                const key = genId(5)
                const loadedUser = vuexContext.getters.user
                const userId = loadedUser.id
                await db.ref(`bookmarks/${userId}/shops`).child(key).set({url: shopUrl})
                vuexContext.commit('addBmShop', {
                    id: key,
                    url: shopUrl
                })
                vuexContext.commit('setQueryLoading', false)
            } catch(e) {
                vuexContext.commit('setQueryLoading', false)
                console.log('[ERROR-addBmShop]', e)
            }
        },

        async addBmItem (vuexContext, itemUrl) {
            vuexContext.commit('setQueryLoading', true)
            try{
                const key = genId(5)      
                const loadedUser = vuexContext.getters.user
                const userId = loadedUser.id
                await db.ref(`bookmarks/${userId}/items`).child(key).set({url: itemUrl})
                vuexContext.commit('addBmItem', {
                    id: key,
                    url: itemUrl
                })
                vuexContext.commit('setQueryLoading', false)
            } catch(e) {
                vuexContext.commit('setQueryLoading', false)
                console.log('[ERROR-addBmItem]', e)
            }
        },

        async removeBmShop (vuexContext, bmId) {
            vuexContext.commit('setQueryLoading', true)
            try{
                const loadedUser = vuexContext.getters.user
                const userId = loadedUser.id
                await db.ref(`bookmarks/${userId}/shops`).child(bmId).remove()
                vuexContext.commit('removeBmShop', bmId)
                vuexContext.commit('setQueryLoading', false)
            } catch(e) {
                vuexContext.commit('setQueryLoading', false)
                console.log('[ERROR-removeBmShop]', e)
            }
        },

        async removeBmItem (vuexContext, bmId) {
            vuexContext.commit('setQueryLoading', true)
            try{         
                const loadedUser = vuexContext.getters.user
                const userId = loadedUser.id
                await db.ref(`bookmarks/${userId}/items`).child(bmId).remove()
                vuexContext.commit('removeBmItem', bmId)
                vuexContext.commit('setQueryLoading', false)
            } catch(e) {
                vuexContext.commit('setQueryLoading', false)
                console.log('[ERROR-removeBmItem]', e)
            }
        },
    },
    getters: {
        queryLoading(state) {
            return state.queryLoading
        },

        // Personal
        loadedPersonalShops(state) {
            return state.loadedPersonalShops
        },
        loadedPersonalItems(state) {
            return state.loadedPersonalItems
        },

        // Boolmark
        bmShops(state) {
            return state.bmShops
        },
        bmItems(state) {
            return state.bmItems
        },
        fullBmShops(state) {
            return state.fullBmShops
        },
        fullBmItems(state) {
            return state.fullBmItems
        }
    }
}