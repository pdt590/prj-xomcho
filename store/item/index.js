import firebase from '~/plugins/firebase'
import { uuid, uiid } from '~/plugins/funcs'
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
        updateItemContent(state, payload) {
            const itemIndex = state.loadedItems.findIndex(item => {
                return item.itemId === payload.itemId
            })
            state.loadedItems[itemIndex] = payload
            state.loadedItems.sort((a, b) => Date.parse(b.updatedDate) - Date.parse(a.updatedDate))
        },
        updateItemTitle(state, payload) {
            const itemIndex = state.loadedItems.findIndex(item => {
                return item.itemId === payload.oldItemId
            })
            state.loadedItems[itemIndex] = payload.updatedItem
        },
        removeItem(state, payload) {
            state.loadedItems.splice(state.loadedItems.findIndex(item => item.itemId === payload), 1)
        }
    },
    actions: {
        async addItem (vuexContext, item) {
            vuexContext.commit('setItemLoading', true)
            try {
                let images = []
                const itemId = uuid(item.title, 5)
                if(item.images.length) {
                    await Promise.all( item.images.map( async (image) => {
                        const ext = image.name.slice(image.name.lastIndexOf('.'))
                        const newImgName = uiid(15) + ext
                        const metaData = { 
                            name: newImgName, 
                            size: image.size, 
                            creatorId: vuexContext.getters.user.id, 
                            itemId: itemId
                        }
                        await firebase.storage().ref('shops/' + newImgName).put(image)
                        const imgDownloadUrl = await firebase.storage().ref('shops/' + newImgName).getDownloadURL()
                        images.push({url: imgDownloadUrl, metadata: metaData})
                    }))
                }
                const newItem = {
                    ...item,
                    images: images,
                    shopId: vuexContext.getters.loadedShop.shopId,
                    creatorId: vuexContext.getters.user.id,
                    updatedDate: new Date().toISOString()
                }
                
                await itemsRef.child(itemId).set(newItem)
                vuexContext.commit('addItem', {
                    itemId: itemId,
                    ...newItem
                })
                vuexContext.commit('setItemLoading', false)
                return itemId
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        async updateItems(vuexContext, shopInfo) {
            vuexContext.commit('setItemLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('shopId').equalTo(shopInfo.oldShopId).once('value')
                let updates = {}
                let loadedItems = []
                itemsData.forEach(itemData => {
                    const itemObj = itemData.val()
                    updates[itemData.key] = {
                        ...itemObj,
                        shopId: shopInfo.newShopId
                    }
                    loadedItems.push({
                        itemId: itemData.key,
                        ...updates[itemData.key]
                    })
                })
                await itemsRef.update(updates)
                vuexContext.commit('setItems', loadedItems)
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        async updateItemContent (vuexContext, editedItem) {
            vuexContext.commit('setItemLoading', true)
            try {
                const updatedItem = {
                    ...editedItem,
                    updatedDate: new Date().toISOString()
                }
                await itemsRef.child(editedItem.itemId).update(updatedItem)

                vuexContext.commit('updateItemContent', updatedItem)
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        async updateItemImg (vuexContext, editedItem) {
            vuexContext.commit('setItemLoading', true)
            try {
                const itemId = editedItem.itemId
                const oldUploadedImages = vuexContext.getters.loadedItem(editedItem.itemId).images.slice()
                const newUploadedImages = []
                const newUnUploadedImages = []
                if(editedItem.images.length) {
                    editedItem.images.forEach(image => {
                        if(image.url !== undefined) {
                            newUploadedImages.push(image)
                            const index = oldUploadedImages.findIndex(oldImage => {
                                return image.url === oldImage.url
                            })
                            oldUploadedImages.splice(index, 1)
                        }else {
                            newUnUploadedImages.push(image)
                        }
                    })         
                    if(oldUploadedImages.length !=0) {
                        await Promise.all(oldUploadedImages.map( async (image) => {
                            await firebase.storage().ref('shops/' + image.metadata.name).delete()
                        }))
                    }
                    if(newUnUploadedImages.length != 0) {
                        await Promise.all( newUnUploadedImages.map( async (image) => {
                            const ext = image.name.slice(image.name.lastIndexOf('.'))
                            const newImgName = uiid(15) + ext
                            const metaData = { 
                                name: newImgName, 
                                size: image.size, 
                                creatorId: vuexContext.getters.user.id, 
                                itemId: itemId
                            }
                            await firebase.storage().ref('shops/' + newImgName).put(image)
                            const imgDownloadUrl = await firebase.storage().ref('shops/' + newImgName).getDownloadURL()
                            newUploadedImages.push({url: imgDownloadUrl, metadata: metaData})
                        }))
                    }
                }
                // ? Console.log run async, it is located at various location an it just prints the final value of a var 
                // ? when it is called in a function
                // ? console.log(oldUploadedImages, newUploadedImages, newUnUploadedImages)
                const update = {
                    images: newUploadedImages
                }
                await itemsRef.child(itemId).update(update)
                const updatedItem = {
                    ...editedItem,
                    ...update,
                    updatedDate: new Date().toISOString()
                }
                vuexContext.commit('updateItemContent', updatedItem)
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        async updateItemTitle (vuexContext, editedItem) {
            vuexContext.commit('setItemLoading', true)
            try {
                const update = {}
                const oldItemId = editedItem.itemId
                //delete newContent.itemId // ? Or set itemId: null beforing updating on fb
                const newItemId = uuid(editedItem.title, 5)
                const updatedItem = {
                    ...editedItem,
                    itemId: null,
                    title: editedItem.title
                }
                update[oldItemId] = null
                update[newItemId] = updatedItem
                await itemsRef.update(update)

                updatedItem.itemId = newItemId
                vuexContext.commit('updateItemTitle',
                    {
                        oldItemId: oldItemId, 
                        updatedItem: updatedItem
                    }
                )
                vuexContext.commit('setItemLoading', false)
                return newItemId
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        async loadItems (vuexContext, shopId) {
            vuexContext.commit('setItemLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('shopId').equalTo(shopId).once('value')
                const itemsObj = itemsData.val()
                let loadedItems = []
                for (let key in itemsObj) {
                    loadedItems.push({
                        itemId: key,
                        ...itemsObj[key]
                    })
                }
                vuexContext.commit('setItems', loadedItems)
                vuexContext.commit('setItemLoading', false)
                return loadedItems
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        async deleteItem (vuexContext, itemId) {
            vuexContext.commit('setItemLoading', true)
            try {
                await itemsRef.child(itemId).remove()
                vuexContext.commit('removeItem', itemId)
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        async removeItems (vuexContext, shopId) {
            vuexContext.commit('setItemLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('shopId').equalTo(shopId).once('value')
                let updates = {}
                itemsData.forEach(itemData => updates[itemData.key] = null)
                await itemsRef.update(updates)
                vuexContext.commit('setItems', [])
                vuexContext.commit('setItemLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setItemLoading', false)
            }
        },
        async loadPreviewItems (vuexContext) {
            vuexContext.commit('setItemLoading', true)
            try {
                const itemsData = await itemsRef.orderByChild('updatedDate').limitToLast(45).once('value')
                const loadedItems = []
                itemsData.forEach(itemData => {
                    const itemObj = itemData.val()
                    loadedItems.push({
                        itemId: itemData.key,
                        ...itemObj
                    })
                })
                loadedItems.reverse()
                vuexContext.commit('setItemLoading', false)
                return loadedItems
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setItemLoading', false)
            }
        }
    },
    getters: {
        itemLoading(state) {
            return state.itemLoading
        },
        loadedItems(state) {
            return state.loadedItems
        },
        loadedItem(state) {
            return (itemId) => {
                return state.loadedItems.find(item => {
                    return item.itemId === itemId
                })
            }
        }
    }
}