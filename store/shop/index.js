import firebase from '~/plugins/plugin-firebase'
import { genId, genUrl, fetchId } from '~/plugins/util-helpers'
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
        //? DONE
        async addShop (vuexContext, newShop) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopId  = genId(5)
                const shopUrl = genUrl(newShop.title, shopId)
                const _creator = {
                    id: vuexContext.getters.user.id,
                    username: vuexContext.getters.user.username,
                    avatar: vuexContext.getters.user.avatar ? vuexContext.getters.user.avatar : null
                }

                const newLogo = newShop.logoImage
                const newCover = newShop.coverImage
                let logoObject = null
                let coverObject = null
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }

                if(newLogo) {
                    const ext = newLogo.name.slice(newLogo.name.lastIndexOf('.'))
                    const newImageName = genId(15) + ext
                    const metaData = { 
                        name: newImageName, 
                        size: newLogo.size, 
                        _creator: vuexContext.getters.user.id
                    }
                    await firebase.storage().ref('shops/' + newImageName).put(newLogo, storageMetadata)
                    const logoDownloadUrl = await firebase.storage().ref('shops/' + newImageName).getDownloadURL()
                    logoObject = {
                        url: logoDownloadUrl, 
                        metadata: metaData
                    }
                }

                if(newCover) {
                    const ext = newCover.name.slice(newCover.name.lastIndexOf('.'))
                    const newImageName = genId(15) + ext
                    const metaData = { 
                        name: newImageName, 
                        size: newCover.size, 
                        _creator: vuexContext.getters.user.id
                    }
                    await firebase.storage().ref('shops/' + newImageName).put(newCover, storageMetadata)
                    const coverDownloadUrl = await firebase.storage().ref('shops/' + newImageName).getDownloadURL()
                    coverObject = {
                        url: coverDownloadUrl, 
                        metadata: metaData
                    }
                }

                const shop = {
                    ...newShop,
                    url: shopUrl,
                    logoImage: logoObject,
                    coverImage: coverObject,
                    _creator: _creator,
                    updatedDate: new Date().toISOString()
                }
                await shopsRef.child(shopId).set(shop)
                vuexContext.commit('setShop', shop)
                vuexContext.commit('setShopLoading', false)
                return shopUrl
            } catch (error) {
                console.log('[ERROR-addShop]', error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        //? DONE
        async updateShopContent (vuexContext, newShopContent) {
            vuexContext.commit('setShopLoading', true)
            try {
                const loadedShop = vuexContext.getters.loadedShop
                const shopId = fetchId(loadedShop.url)

                await shopsRef.child(shopId).update(newShopContent)
                if(newShopContent.category !== loadedShop.category) {
                    await vuexContext.dispatch('updateItemsByShop', {
                        category: newShopContent.category
                    })
                }

                vuexContext.commit('setShop', {
                    ...loadedShop,
                    ...newShopContent
                })
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR-updateShopContent]', error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        //? DONE
        async updateShopTitle (vuexContext, newShopTitle) {
            vuexContext.commit('setShopLoading', true)
            try {
                const loadedShop = vuexContext.getters.loadedShop
                const shopId = fetchId(loadedShop.url)
                const newShopUrl = genUrl(newShopTitle, shopId)
                const update = {
                    title: newShopTitle,
                    url: newShopUrl
                }
                await shopsRef.child(shopId).update(update)
                await vuexContext.dispatch('updateItemsByShop', {
                    title: newShopTitle
                })
                vuexContext.commit('setShop', {
                    ...loadedShop,
                    ...update
                })
                vuexContext.commit('setShopLoading', false)
                return newShopUrl
            } catch(error) {
                console.log('[ERROR-updateShopTitle]', error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        //? DONE
        async updateShopLogo (vuexContext, newLogo) {
            vuexContext.commit('setShopLoading', true)
            try {
                const loadedShop = vuexContext.getters.loadedShop
                const shopId = fetchId(loadedShop.url)
                const oldLogo = loadedShop.logoImage
                if(oldLogo) {
                    await firebase.storage().ref('shops/' + oldLogo.metadata.name).delete()
                }
                if(!newLogo) {
                    await shopsRef.child(shopId).update({
                        logoImage: null
                    })
                    await vuexContext.dispatch('updateItemsByShop', {
                        logoImage: null
                    })
                    delete loadedShop.logoImage // or loadedShop.logoImage = null
                    vuexContext.commit('setShopLoading', false)
                    return
                }

                let logoObject = null
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }
                const ext = newLogo.name.slice(newLogo.name.lastIndexOf('.'))
                const newImageName = genId(15) + ext
                const metaData = { 
                    name: newImageName, 
                    size: newLogo.size, 
                    _creator: vuexContext.getters.user.id
                }
                await firebase.storage().ref('shops/' + newImageName).put(newLogo, storageMetadata)
                const logoDownloadUrl = await firebase.storage().ref('shops/' + newImageName).getDownloadURL()
                logoObject = {
                    metadata: metaData,
                    url: logoDownloadUrl
                }

                await shopsRef.child(shopId).update({
                    logoImage: logoObject
                })
                await vuexContext.dispatch('updateItemsByShop', {
                    logoImage: logoObject
                })
                const updatedShop = {
                    ...loadedShop,
                    logoImage: logoObject
                }
                vuexContext.commit('setShop', updatedShop)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR-updateShopLogo]', error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        //? DONE
        async updateShopCover (vuexContext, newCover) {
            vuexContext.commit('setShopLoading', true)
            try {
                const loadedShop = vuexContext.getters.loadedShop
                const shopId = fetchId(loadedShop.url)
                const oldCover = loadedShop.coverImage
                if(oldCover) {
                    await firebase.storage().ref('shops/' + oldCover.metadata.name).delete()
                }
                if(!newCover) {
                    await shopsRef.child(shopId).update({
                        coverImage: null
                    })
                    delete loadedShop.coverImage
                    vuexContext.commit('setShopLoading', false)
                    return
                }

                let coverObject = null
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }
                const ext = newCover.name.slice(newCover.name.lastIndexOf('.'))
                const newImageName = genId(15) + ext
                const metaData = { 
                    name: newImageName, 
                    size: newCover.size, 
                    _creator: vuexContext.getters.user.id
                }
                await firebase.storage().ref('shops/' + newImageName).put(newCover, storageMetadata)
                const coverDownloadUrl = await firebase.storage().ref('shops/' + newImageName).getDownloadURL()
                coverObject = {
                    metadata: metaData,
                    url: coverDownloadUrl
                }

                await shopsRef.child(shopId).update({
                    coverImage: coverObject
                })
                const updatedShop = {
                    ...loadedShop,
                    coverImage: coverObject
                }
                vuexContext.commit('setShop', updatedShop)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR-updateShopCover]', error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        //? DONE
        async deleteShop (vuexContext) {
            vuexContext.commit('setShopLoading', true)
            try {
                const loadedShop = vuexContext.getters.loadedShop
                const shopId = fetchId(loadedShop.url)
                const logoImage = loadedShop.logoImage
                const coverImage = loadedShop.coverImage
                await vuexContext.dispatch('deleteItemsByShop', shopId)
                if(logoImage) {
                    await firebase.storage().ref('shops/' + logoImage.metadata.name).delete()
                }
                if(coverImage) {
                    await firebase.storage().ref('shops/' + coverImage.metadata.name).delete()
                }
                await shopsRef.child(shopId).remove()
                vuexContext.commit('setShop', null)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR-deleteShop]', error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        //? DONE
        async loadShop (vuexContext, shopUrl) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopId = fetchId(shopUrl)
                const shopData = await shopsRef.child(shopId).once('value')
                const shopObj = shopData.val()
                const loadedShop = shopObj
                vuexContext.commit('setShop', loadedShop)
                vuexContext.commit('setShopLoading', false)
                return loadedShop
            } catch(error) {
                console.log('[ERROR-loadShop]', error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        /**
         * Actions called by user
         */
        async updateShopsByUser(vuexContext, payload) {
            vuexContext.commit('setShopLoading', true)
            try {
                const user = vuexContext.getters.user
                const userId = user.id
                const shopsData = await shopsRef.orderByChild('_creator/id').equalTo(userId).once('value')
                let updates = {}
                shopsData.forEach(shopData => {
                    payload.username !== undefined ? updates[`${shopData.key}/_creator/username`] = payload.username : ``
                    payload.avatar !== undefined ? updates[`${shopData.key}/_creator/avatar`] = payload.avatar : ``
                })
                await shopsRef.update(updates)
                vuexContext.commit('setShop', ) // TODO: how to update current loadedshop
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR-updateShopsByUser]', error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async deleteShopsByUser (vuexContext, userId) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopsData = await shopsRef.orderByChild('_creator/id').equalTo(userId).once('value')
                const updates = {}
                const shopsObj = shopsData.val()
                if(!shopsObj) {
                    vuexContext.commit('setShopLoading', false)
                    return
                }
                Object.keys(shopsObj).forEach( async (key) =>  {
                    updates[key] = null
                    if(shopsObj[key].logoImage) {
                        await firebase.storage().ref('shops/' + shopsObj[key].logoImage.metadata.name).delete()
                    }
                    if(shopsObj[key].coverImage) {
                        await firebase.storage().ref('shops/' + shopsObj[key].coverImage.metadata.name).delete()
                    }
                })
                await shopsRef.update(updates)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR-deleteShopsByUser]', error)
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