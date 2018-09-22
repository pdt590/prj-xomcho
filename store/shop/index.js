import firebase from '~/plugins/firebase'
import { uuid, uiid } from '~/plugins/funcs'
const db = firebase.database()
const shopsRef = db.ref('shops')

export default {
    state: {
        shopLoading: false,
        loadedShop: null
    },
    mutations: {
        setShopLoading (state, payload) {
            state.shopLoading = payload
        },
        setShop (state, payload) {
            state.loadedShop = payload
        }
    },
    actions: { 
        async addShop (vuexContext, shop) {
            vuexContext.commit('setShopLoading', true)
            try {
                const images = []
                const newUnUploadedImages = shop.images
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }
                const shopId = uuid(shop.title, 5)
                if(newUnUploadedImages.length) {
                    for (const image of newUnUploadedImages) {
                        const ext = image.name.slice(image.name.lastIndexOf('.'))
                        const newImgName = uiid(15) + ext
                        const metaData = { 
                            name: newImgName, 
                            size: image.size, 
                            creatorId: vuexContext.getters.user.id, 
                            shopId: shopId
                        }
                        await firebase.storage().ref('shops/' + newImgName).put(image, storageMetadata)
                        const imgDownloadUrl = await firebase.storage().ref('shops/' + newImgName).getDownloadURL()
                        images.push({url: imgDownloadUrl, metadata: metaData})
                    }
                }
                const newShop = {
                    ...shop,
                    images: images,
                    creatorId: vuexContext.getters.user.id,
                    updatedDate: new Date().toISOString()
                }
                await shopsRef.child(shopId).set(newShop)
                vuexContext.commit('setShop', {
                    shopId: shopId,
                    ...newShop
                })
                vuexContext.commit('setShopLoading', false)
                return shopId
            } catch (error) {
                console.log('[ERROR]' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async updateShopContent (vuexContext, editedShop) {
            vuexContext.commit('setShopLoading', true)
            try {
                const updatedShop = {
                    ...editedShop,
                    updatedDate: new Date().toISOString()
                }
                await shopsRef.child(editedShop.shopId).update(updatedShop)
                vuexContext.commit('setShop', updatedShop)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async updateShopTitle (vuexContext, editedShop) {
            vuexContext.commit('setShopLoading', true)
            try {
                const update = {}
                const oldShopId = editedShop.shopId
                const newShopId = uuid(editedShop.title, 5)
                const updatedShop = {
                    ...editedShop,
                    shopId: null, // ? remove shopId prop in the object when uploading to firebase
                    title: editedShop.title
                }
                update[oldShopId] = null
                update[newShopId] = updatedShop
                await shopsRef.update(update)
                await vuexContext.dispatch('updateItems', {oldShopId: oldShopId, newShopId: newShopId})

                updatedShop.shopId = newShopId
                vuexContext.commit('setShop', updatedShop)
                vuexContext.commit('setShopLoading', false)
                return newShopId
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async updateShopImg (vuexContext, editedShop) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopId = editedShop.shopId
                const oldUploadedImages = []
                const newUploadedImages = []
                const newUnUploadedImages = []
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }
                if(vuexContext.getters.loadedShop.images !== undefined) {
                    vuexContext.getters.loadedShop.images.forEach (
                        image => oldUploadedImages.push(image)
                    )
                }
                if(editedShop.images.length) {
                    editedShop.images.forEach(image => {
                        if(image.url !== undefined) {
                            newUploadedImages.push(image)
                            const index = oldUploadedImages.findIndex(oldImage => {
                                return image.url === oldImage.url
                            })
                            if(index >= 0) oldUploadedImages.splice(index, 1)
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
                        for (const image of newUnUploadedImages) {
                            const ext = image.name.slice(image.name.lastIndexOf('.'))
                            const newImgName = uiid(15) + ext
                            const metaData = { 
                                name: newImgName, 
                                size: image.size, 
                                creatorId: vuexContext.getters.user.id, 
                                shopId: shopId
                            }
                            await firebase.storage().ref('shops/' + newImgName).put(image, storageMetadata)
                            const imgDownloadUrl = await firebase.storage().ref('shops/' + newImgName).getDownloadURL()
                            newUploadedImages.push({url: imgDownloadUrl, metadata: metaData})
                        }
                    }
                }
                // ? Console.log run async, it is located at various location an it just prints the final value of a var 
                // ? when it is called in a function
                // ? console.log(oldUploadedImages, newUploadedImages, newUnUploadedImages)
                const update = {
                    images: newUploadedImages
                }
                await shopsRef.child(shopId).update(update)
                const updatedShop = {
                    ...editedShop,
                    ...update,
                    updatedDate: new Date().toISOString()
                }
                vuexContext.commit('setShop', updatedShop)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async loadShop (vuexContext, shopId) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopData = await shopsRef.child(shopId).once('value')
                const shopObj = shopData.val()
                const loadedShop = {
                    shopId: shopId,
                    ...shopObj
                }
                vuexContext.commit('setShop', loadedShop)
                vuexContext.commit('setShopLoading', false)
                return loadedShop
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async deleteShop (vuexContext, deletedShop) {
            vuexContext.commit('setShopLoading', true)
            try {
                await vuexContext.dispatch('removeItems', deletedShop.shopId)
                await Promise.all(deletedShop.images.map( async (image) => {
                    await firebase.storage().ref('shops/' + image.metadata.name).delete()
                }))
                await shopsRef.child(deletedShop.shopId).remove()
                vuexContext.commit('setShop', null)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async loadPreviewShops (vuexContext) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopsData = await shopsRef.orderByChild('updatedDate').limitToLast(45).once('value')         
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push({
                        shopId: shopData.key,
                        ...shopObj
                    })
                })
                loadedShops.reverse()
                vuexContext.commit('setShopLoading', false)
                return loadedShops
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async loadOwnShops (vuexContext) {
            vuexContext.commit('setShopLoading', true)
            try {
                const creatorId = vuexContext.getters.user.id
                const shopsData = await shopsRef.orderByChild('creatorId').equalTo(creatorId).once('value')     
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push({
                        shopId: shopData.key,
                        ...shopObj
                    })
                })
                loadedShops.reverse()
                vuexContext.commit('setShopLoading', false)
                return loadedShops
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        }
    },
    getters: {
        shopLoading(state) {
            return state.shopLoading
        },
        loadedShop(state) {
            return state.loadedShop
        }
    }
}