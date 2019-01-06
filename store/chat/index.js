import firebase from '~/plugins/plugin-firebase'
import { genId_ } from '~/plugins/util-helpers'
const db = firebase.database()

export default {
    state: {
        chatLoading: false,
        chatNotifying : false,
        loadedChats: [],
        countUnOpenedChats: 0
    },
    mutations: {
        setChatLoading(state, payload) {
            state.chatLoading = payload
        },
        setChatNotifying(state, payload){
            state.chatNotifying = payload
        },
        setChats(state, payload) {
            state.loadedChats = payload
        },
        setMoreChats(state, payload) {
            payload.shift()
            state.loadedChats = [...state.loadedChats, ...payload]
        },
        setCountUnOpenedChats (state, payload) {
            state.countUnOpenedChats = payload
        }
    },
    actions: {
        async sendBuyMessage (vuexContext, payload) {
            /** Message Format:
             * chatId
                * itemUrl
                * itemTitle
                * state: true/false
                * updatedDate
                * partnerId
                * partnerUsername
                * messages:
                    * messageId:
                        * fullname (optional)
                        * phone (optional)
                        * address (optional)
                        * unit (optional)
                        * content
                        * fromId
                        * fromUsername
                        * updatedDate
            */
            vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                const chatId = genId_(10)
                const messageId = genId_(10)
                const now = new Date().toISOString()
                const { itemUrl, itemTitle, partnerId, partnerUsername, fullname, phone, address, unit, price, content } = payload
                const message = {
                    fullname: fullname,
                    phone: phone,
                    address: address,
                    unit: unit,
                    price: price,
                    content: content,
                    fromId: user ? user.id : null,
                    fromUsername: user ? user.username : null,
                    updatedDate: now
                }
                // Me
                if(user) {
                    await db.ref(`chats/${user.id}`).child(chatId).set({
                        itemUrl: itemUrl,
                        itemTitle: itemTitle,
                        state: true,
                        updatedDate: now,
                        partnerId: partnerId,
                        partnerUsername: partnerUsername,
                        messages: {
                            [messageId]: {
                                ...message
                            }
                        }
                    })
                }
                //Partner
                await db.ref(`chats/${partnerId}`).child(chatId).set({
                    itemUrl: itemUrl,
                    itemTitle: itemTitle,
                    state: false,
                    updatedDate: now,
                    partnerId: user ? user.id : null,
                    partnerUsername: user ? user.id : null,
                    messages: {
                        [messageId]: {
                            ...message
                        }
                    }
                })
                vuexContext.commit('setChatLoading', false)
                return true
            } catch (e) {
                console.log('[ERROR-sendBuyMessage]', e)
                vuexContext.commit('setChatLoading', false)
                return false
            }
        },

        async sendChatMessage (vuexContext, payload) {
            //vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                const { partnerId, chatId, now, messageId, message } = payload
                // Me
                await db.ref(`chats/${user.id}/${chatId}/messages`).child(messageId).set(message)
                await db.ref(`chats/${user.id}`).child(chatId).update({
                    updatedDate: now
                })

                // Partner
                await db.ref(`chats/${partnerId}/${chatId}/messages`).child(messageId).set(message)
                await db.ref(`chats/${partnerId}`).child(chatId).update({
                    state: false,
                    updatedDate: now
                })
                //vuexContext.commit('setChatLoading', false)
                return true
            } catch (e) {
                console.log('[ERROR-sendChatMessage]', e)
                //vuexContext.commit('setChatLoading', false)
                return false
            }
        },

        async loadChats (vuexContext) {
            vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                const numChats = vuexContext.getters.loadedChats.length > 15 ? vuexContext.getters.loadedChats.length : 15
                await db.ref(`chats/${user.id}`).orderByChild('updatedDate').limitToLast(numChats).on('value', chatsData => {
                    const loadedChats = []
                    chatsData.forEach(chatData => {
                        const loadedMessages = []
                        const { itemUrl, itemTitle, state, updatedDate, messages, partnerId, partnerUsername } = chatData.val()
                        for(const key in messages) {
                            loadedMessages.push({
                                id: key,
                                ...messages[key]
                            })
                        }
                        const chatObj = {
                            id: chatData.key,
                            itemUrl: itemUrl,
                            itemTitle: itemTitle,
                            state: state,
                            updatedDate: updatedDate,
                            partnerId: partnerId,
                            partnerUsername: partnerUsername,
                            messages: loadedMessages
                        }
                        loadedChats.push(chatObj)
                    })
                    loadedChats.reverse()
                    vuexContext.commit('setChats', loadedChats)
                })
                vuexContext.commit('setChatLoading', false)
            } catch(e) {
                console.log('[ERROR-loadChats]', e)
                vuexContext.commit('setChatLoading', false)
            }
        },

        async loadMoreChats (vuexContext) {
            vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                const numChats = vuexContext.getters.loadedChats.length
                const endAtKey = vuexContext.getters.loadedChats[numChats-1].updatedDate
                const chatsData = await db.ref(`chats/${user.id}`).orderByChild('updatedDate').endAt(endAtKey).limitToLast(16).once('value')
                const loadedChats = []
                chatsData.forEach(chatData => {
                    const loadedMessages = []
                    const { itemUrl, itemTitle, state, updatedDate, messages, partnerId, partnerUsername } = chatData.val()
                    for(const key in messages) {
                        loadedMessages.push({
                            id: key,
                            ...messages[key]
                        })
                    }
                    const chatObj = {
                        id: chatData.key,
                        itemUrl: itemUrl,
                        itemTitle: itemTitle,
                        state: state,
                        updatedDate: updatedDate,
                        partnerId: partnerId,
                        partnerUsername: partnerUsername,
                        messages: loadedMessages
                    }
                    loadedChats.push(chatObj)
                })
                loadedChats.reverse()
                vuexContext.commit('setMoreChats', loadedChats)
                vuexContext.commit('setChatLoading', false)
            } catch(e) {
                console.log('[ERROR-loadMoreChats]', e)
                vuexContext.commit('setChatLoading', false)
            }
        },

        async loadCountUnOpenedChats (vuexContext) {
            vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                let count = 0
                const chatsData = await db.ref(`chats/${user.id}`).orderByChild('state').equalTo(false).once('value')
                chatsData.forEach(chatData => {
                    count = count + 1
                })
                vuexContext.commit('setCountUnOpenedChats', count)
                // In Navbar:
                // async mounted() {
                //     this.user ? await this.$store.dispatch('loadCountUnOpenedChats') : ``
                // }
                //
                // In store:
                // await db.ref(`chats/${user.id}`).orderByChild('state').equalTo(false).on('value', chatsData => {
                //     let count = 0
                //     chatsData.forEach(chatData => {
                //         count = count + 1
                //     })
                //     vuexContext.commit('setCountUnOpenedChats', count)
                // })
                vuexContext.commit('setChatLoading', false)
            } catch(e) {
                console.log('[ERROR-loadCountUnOpenedChats]', e)
                vuexContext.commit('setChatLoading', false)
            }
        },

        async setChatState (vuexContext, chatId) {
            vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                await db.ref(`chats/${user.id}`).child(chatId).update({
                    state : true
                })
                vuexContext.commit('setChatLoading', false)
            } catch(e) {
                console.log('[ERROR-setMessageState]', e)
                vuexContext.commit('setChatLoading', false)
            }
        },
        async deleteChat (vuexContext, chatId) {
            vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                await db.ref(`chats/${user.id}`).child(chatId).remove()
                vuexContext.commit('setChatLoading', false)
            } catch(e) {
                console.log('[ERROR-deleteChat]', e)
                vuexContext.commit('setChatLoading', false)
            }
        },
        
        async deleteChats (vuexContext, userId) {
            vuexContext.commit('setChatLoading', true)
            try {
                await db.ref('chats').child(userId).remove()
                vuexContext.commit('setCountUnOpenedChats', 0)
                vuexContext.commit('setChatLoading', false)
            } catch(e) {
                console.log('[ERROR-deleteChatsByUser]', e)
                vuexContext.commit('setChatLoading', false)
            }
        }
    },
    getters: {
        chatLoading(state) {
            return state.chatLoading
        },
        chatNotifying(state) {
            return state.chatNotifying
        },
        loadedChats(state) {
            return state.loadedChats
        },
        numChats(state) {
            return state.numChats
        },
        countUnOpenedChats(state) {
            return state.countUnOpenedChats
        }
    }
}