import firebase from '~/plugins/plugin-firebase'
import { genId, genUrl, fetchId } from '~/plugins/util-helpers'
const db = firebase.database()
const itemsRef = db.ref('items')

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
            state.loadedItems.sort((a, b) => Date.parse(b.updatedDate) - Date.parse(a.updatedDate))
        },
        addItem(state, payload) {
            state.loadedItems.splice(0, 0, payload) // Push to top
            //state.loadedItems.push(payload) // Push to bottom
        },
        updateItem(state, payload) {
            const itemIndex = state.loadedItems.findIndex(item => {
                return fetchId(item.url) === fetchId(payload.url)
            })
            state.loadedItems[itemIndex] = payload
        },
        removeItem(state, payload) {
            state.loadedItems.splice(state.loadedItems.findIndex(item => fetchId(item.url) === payload), 1)
        }
    },
    actions: {
        //? DONE
        async addItem (vuexContext, newItem) {
            vuexContext.commit('setItemLoading', true)
            try {
                const itemId  = genId(5)
                const itemUrl = genUrl(newItem.title, itemId)
                const _creator = {
                    id: vuexContext.getters.user.id,
                    username: vuexContext.getters.user.username,
                    avatar: vuexContext.getters.user.avatar ? vuexContext.getters.user.avatar : null
                }
                const _shop = {
                    id: fetchId(vuexContext.getters.loadedShop.url),
                    title:  vuexContext.getters.loadedShop.title,
                    logoImage:  vuexContext.getters.loadedShop.logoImage ? vuexContext.getters.loadedShop.logoImage : null
                }

                const newImages = newItem.images
                const newImageObjects = []
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }

                if(newImages.length) {
                    for (const image of newImages) {
                        const ext = image.name.slice(image.name.lastIndexOf('.'))
                        const newImageName = genId(15) + ext
                        const metaData = { 
                            name: newImageName, 
                            size: image.size, 
                            _creator: vuexContext.getters.user.id
                        }
                        await firebase.storage().ref('items/' + newImageName).put(image, storageMetadata)
                        const imgDownloadUrl = await firebase.storage().ref('items/' + newImageName).getDownloadURL()
                        newImageObjects.push({
                            url: imgDownloadUrl, 
                            metadata: metaData
                        })
                    }
                }

                const item = {
                    ...newItem,
                    url: itemUrl,
                    images: newImageObjects,
                    _creator: _creator,
                    _shop: _shop,
                    updatedDate: new Date().toISOString()
                }
                await itemsRef.child(itemId).set(item)
                vuexContext.commit('addItem', item)
                vuexContext.commit('setItemLoading', false)
                return itemUrl
            } catch(error) {
                console.log('[ERROR-addItem]', error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        async updateItemContent (vuexContext, newItemContent) {
            vuexContext.commit('setItemLoading', true)
            try {
                const loadedItem = vuexContext.getters.loadedItem(newItemContent.url)
                const itemId = fetchId(loadedItem.url)
                await itemsRef.child(itemId).update(newItemContent)
                vuexContext.commit('updateItem', {
                    ...loadedItem,
                    ...newItemContent
                })
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR-updateItemContent] ' + error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        //? DONE
        async updateItemTitle (vuexContext, payload) {
            vuexContext.commit('setItemLoading', true)
            try {
                const loadedItem = vuexContext.getters.loadedItem(payload.url)
                const itemId = fetchId(loadedItem.url)
                const newItemUrl = genUrl(payload.newItemTitle, itemId)
                const update = {
                    title: payload.newItemTitle,
                    url: newItemUrl
                }
                await itemsRef.child(itemId).update(update)
                vuexContext.commit('updateItem', {
                    ...loadedItem,
                    ...update
                })
                vuexContext.commit('setItemLoading', false)
                return newItemUrl
            } catch(error) {
                console.log('[ERROR-updateItemTitle]', error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        //? DONE
        async updateItemImages (vuexContext, payload) {
            vuexContext.commit('setItemLoading', true)
            try {
                const loadedItem = vuexContext.getters.loadedItem(payload.url)
                const itemId = fetchId(loadedItem.url)
                const newImages = payload.newImages
                const oldImageObjects = payload.oldImages
                const newImageObjects = []
                const removedOldImageObjects = loadedItem.images.filter(image => !oldImageObjects.some(el => el.url === image.url))
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }
                if(removedOldImageObjects.length) {
                    await Promise.all(removedOldImageObjects.map( async (image) => {
                        await firebase.storage().ref('items/' + image.metadata.name).delete()
                    }))
                }
                if(newImages.length) {
                    for (const image of newImages) {
                        const ext = image.name.slice(image.name.lastIndexOf('.'))
                        const newImageName = genId(15) + ext
                        const metaData = { 
                            name: newImageName, 
                            size: image.size, 
                            _creator: vuexContext.getters.user.id,
                        }
                        await firebase.storage().ref('items/' + newImageName).put(image, storageMetadata)
                        const imgDownloadUrl = await firebase.storage().ref('items/' + newImageName).getDownloadURL()
                        newImageObjects.push({
                            url: imgDownloadUrl, 
                            metadata: metaData
                        })
                    }
                }
                const update = {
                    images: [
                        ...oldImageObjects,
                        ...newImageObjects
                    ]
                }
                await itemsRef.child(itemId).update(update)
                if(!update.images.length) delete update.images
                vuexContext.commit('updateItem', {
                    ...loadedItem,
                    ...update
                })
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR-updateItemImages]', error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        //? DONE
        async deleteItem (vuexContext, itemUrl) {
            vuexContext.commit('setItemLoading', true)
            try {
                const loadedItem = vuexContext.getters.loadedItem(itemUrl)
                const itemId = fetchId(loadedItem.url)
                if(loadedItem.images) {
                    await Promise.all(loadedItem.images.map( async (image) => {
                        await firebase.storage().ref('items/' + image.metadata.name).delete()
                    }))
                }
                await itemsRef.child(itemId).remove()
                vuexContext.commit('removeItem', itemId)
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR-deleteItem]', error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        //? DONE
        async loadItems (vuexContext, shopUrl) {
            vuexContext.commit('setItemLoading', true)
            try {
                const shopId = fetchId(shopUrl)
                const itemsData = await itemsRef.orderByChild('_shop/id').equalTo(shopId).once('value')
                const itemsObj = itemsData.val()
                let loadedItems = []
                for (let key in itemsObj) {
                    loadedItems.push(itemsObj[key])
                }
                vuexContext.commit('setItems', loadedItems)
                vuexContext.commit('setItemLoading', false)
                return loadedItems
            } catch(error) {
                console.log('[ERROR-loadItems]', error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        /**
         * Actions called by Shop
         */
        async updateItemsByShop(vuexContext, payload) {
            vuexContext.commit('setItemLoading', true)
            try {
                const loadedShop = vuexContext.getters.loadedShop
                const shopId = fetchId(loadedShop.url)
                const itemsData = await itemsRef.orderByChild('_shop/id').equalTo(shopId).once('value')
                let updates = {}
                let loadedItems = []
                itemsData.forEach(itemData => {
                    const itemObj = itemData.val()
                    if(payload.title !== undefined) { // Update title
                        updates[itemData.key] = {
                            ...itemObj,
                            _shop: {
                                id: shopId,
                                title: payload.title,
                                logoImage: loadedShop.logoImage ? loadedShop.logoImage : null
                            }
                        }
                    }
                    if(payload.logoImage !== undefined) { // Update logoImage
                        updates[itemData.key] = {
                            ...itemObj,
                            _shop: {
                                id: shopId,
                                title: loadedShop.title,
                                logoImage: payload.logoImage
                            }
                        }
                    }
                    if(payload.category !== undefined) { // Update category
                        updates[itemData.key] = {
                            ...itemObj,
                            category: payload.category
                        }
                    }
                    loadedItems.push({
                        id: itemData.key,
                        ...updates[itemData.key]
                    })
                })
                await itemsRef.update(updates)
                vuexContext.commit('setItems', loadedItems)
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR-updateItemsByShop]', error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        //? DONE
        async deleteItemsByShop (vuexContext, shopId) {
            vuexContext.commit('setItemLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('_shop/id').equalTo(shopId).once('value')
                const updates = {}
                const itemsObj = itemsData.val()
                if(!itemsObj) {
                    vuexContext.commit('setItemLoading', false)
                    return
                }
                Object.keys(itemsObj).forEach( async (key) =>  {
                    updates[key] = null
                    if(itemsObj[key].images) {
                        await Promise.all(itemsObj[key].images.map( async (image) => {
                            await firebase.storage().ref('items/' + image.metadata.name).delete()
                        }))
                    }
                })
                await itemsRef.update(updates)
                vuexContext.commit('setItems', [])
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR-deleteItemsByShop]', error)
                vuexContext.commit('setItemLoading', false)
            }
        },

        /**
         * Actions called by User
         */
        async updateItemsByUser(vuexContext, payload) {
            vuexContext.commit('setItemLoading', true)
            try {
                const user = vuexContext.getters.user
                const userId = user.id
                const itemsData = await itemsRef.orderByChild('_creator/id').equalTo(userId).once('value')
                let updates = {}
                itemsData.forEach(itemData => {
                    payload.username !== undefined ? updates[`${itemData.key}/_creator/username`] = payload.username : ``
                    payload.avatar !== undefined ? updates[`${itemData.key}/_creator/avatar`] = payload.avatar : ``
                    // const itemObj = itemData.val()
                    // if(payload.username !== undefined) {
                    //     updates[itemData.key] = {
                    //         ...itemObj,
                    //         _creator: {
                    //             id: userId,
                    //             username: payload.username,
                    //             avatar: user.avatar ? user.avatar: null
                    //         }
                    //     }
                    // }
                    // if(payload.avatar !== undefined) {
                    //     updates[itemData.key] = {
                    //         ...itemObj,
                    //         _creator: {
                    //             id: userId,
                    //             username: user.username,
                    //             avatar: payload.avatar
                    //         }
                    //     }
                    // }
                })
                await itemsRef.update(updates)
                vuexContext.commit('setItems', ) // TODO: how to update current loadedItems
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR-updateItemsByUser]', error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        async deleteItemsByUser (vuexContext, userId) {
            vuexContext.commit('setItemLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('_creator/id').equalTo(userId).once('value')
                const updates = {}
                const itemsObj = itemsData.val()
                if(!itemsObj) {
                    vuexContext.commit('setItemLoading', false)
                    return
                }
                Object.keys(itemsObj).forEach( async (key) =>  {
                    updates[key] = null
                    if(itemsObj[key].images) {
                        await Promise.all(itemsObj[key].images.map( async (image) => {
                            await firebase.storage().ref('items/' + image.metadata.name).delete()
                        }))
                    }
                })
                await itemsRef.update(updates)
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR-deleteItemsByUser]', error)
                vuexContext.commit('setItemLoading', false)
            }
        },
    },
    getters: {
        itemLoading(state) {
            return state.itemLoading
        },
        loadedItems(state) {
            return state.loadedItems
        },
        loadedItem(state) {
            return (itemUrl) => state.loadedItems.find(item => item.url === itemUrl)
        }
    }
}