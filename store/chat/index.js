import firebase from '~/plugins/plugin-firebase'
import { genId_ } from '~/plugins/util-helpers'
const db = firebase.database()

export default {
    state: {
        chatLoading: false
    },
    mutations: {
        setChatLoading(state, payload) {
            state.chatLoading = payload
        },
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
                if(user.id) {
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
        async loadChats (vuexContext, payload) {
            vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                let chatsData = null
                if(payload.endAtKey !== undefined) {
                    chatsData = await db.ref(`chats/${user.id}`).orderByChild('updatedDate').endAt(payload.endAtKey).limitToLast(payload.limit).once('value')  
                }else {
                    chatsData = await db.ref(`chats/${user.id}`).orderByChild('updatedDate').limitToLast(payload.limit).once('value') 
                }    
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
                    // Mới nhất
                    // loadedMessages = loadedMessages.sort((a, b) => Date.parse(b.updatedDate) - Date.parse(a.updatedDate))
                    // loadedMessages.reverse()
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
                vuexContext.commit('setChatLoading', false)
                return loadedChats
            } catch(error) {
                console.log('[ERROR-loadChats]', error)
                vuexContext.commit('setChatLoading', false)
            }
        },
        async setChatState (vuexContext, chatId) {
            //vuexContext.commit('setChatLoading', true)
            try {
                const user = vuexContext.getters.user
                await db.ref(`chats/${user.id}`).child(chatId).update({
                    state : true
                })
                //vuexContext.commit('setChatLoading', false)
            } catch(error) {
                console.log('[ERROR-setMessageState]', error)
                //vuexContext.commit('setChatLoading', false)
            }
        }
    },
    getters: {
        chatLoading(state) {
            return state.chatLoading
        },
    }
}