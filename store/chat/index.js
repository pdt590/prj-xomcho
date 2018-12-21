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
            state.loadedChats = []
            state.loadedChats = payload
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
                const { itemUrl, itemTitle, partnerId, partnerUsername, fullname, phone, address, unit, content } = payload
                const message = {
                    fullname: fullname,
                    phone: phone,
                    address: address,
                    unit: unit,
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
            } catch (error) {
                console.log('[ERROR-sendBuyMessage]', error)
                vuexContext.commit('setChatLoading', false)
                return false
            }
        },
        async sendChatMessage (vuexContext, payload) {
            vuexContext.commit('setChatLoading', true)
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
                vuexContext.commit('setChatLoading', false)
                return true
            } catch (error) {
                console.log('[ERROR-sendChatMessage]', error)
                vuexContext.commit('setChatLoading', false)
                return false
            }
        },
        async loadChats (vuexContext) {
            vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                await db.ref(`chats/${user.id}`).orderByChild('updatedDate').limitToFirst(200).on('value', chatsData => {
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
            } catch(error) {
                console.log('[ERROR-loadChats]', error)
                vuexContext.commit('setChatLoading', false)
            }
        },
        async loadCountUnOpenedChats (vuexContext) {
            vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                await db.ref(`chats/${user.id}`).orderByChild('state').equalTo(false).on('value', chatsData => {
                    let count = 0
                    chatsData.forEach(chatData => {
                        count = count + 1
                    })
                    vuexContext.commit('setCountUnOpenedChats', count)
                })
                vuexContext.commit('setChatLoading', false)
            } catch(error) {
                console.log('[ERROR-loadChats]', error)
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
            } catch(error) {
                console.log('[ERROR-setMessageState]', error)
                vuexContext.commit('setChatLoading', false)
            }
        },
        async deleteChat (vuexContext, chatId) {
            vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                await db.ref(`chats/${user.id}`).child(chatId).remove()
                vuexContext.commit('setChatLoading', false)
            } catch(error) {
                console.log('[ERROR-deleteChat]', error)
                vuexContext.commit('setChatLoading', false)
            }
        },
        async deleteChatsByUser (vuexContext, userId) {
            vuexContext.commit('setChatLoading', true)
            try {
                await db.ref('chats').child(userId).remove()
                vuexContext.commit('setChatLoading', false)
            } catch(error) {
                console.log('[ERROR-deleteChatsByUser]', error)
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
        countUnOpenedChats(state) {
            return state.countUnOpenedChats
        }
    }
}