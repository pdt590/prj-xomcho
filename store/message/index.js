import firebase from '~/plugins/plugin-firebase'
import { genId_ } from '~/plugins/util-helpers'
const db = firebase.database()

export default {
    state: {
        messageLoading: false
    },
    mutations: {
        setMessageLoading(state, payload) {
            state.messageLoading = payload
        },
    },
    actions: {
        async sendBuyMessage (vuexContext, payload) {
            /** Message Format:
             * topicId
             * mode (sender/receiver)
             * name
             * phone
             * address
             * message
             * itemUrl
             * unit
             * to
             * from
             * isOpened
             * updatedDate
            */
            vuexContext.commit('setMessageLoading', true)
            try {
                const user = vuexContext.getters.user
                const topicId = genId_(10)
                let message = {
                    ...payload,
                    topicId: topicId,
                    from: user ? user.id : null,
                    mode: 'receiver',
                    isOpened: false,
                    updatedDate: new Date().toISOString()
                }
                const messageId = genId_(10)
                await db.ref(`messages/${message.to}`).child(messageId).set(message)
                if(message.from) {
                    message = {
                        ...message,
                        mode: 'sender',
                        isOpened: true
                    }
                    await db.ref(`messages/${message.from}`).child(messageId).set(message)
                }
                vuexContext.commit('setMessageLoading', false)
                return true
            } catch (error) {
                console.log('[ERROR-sendBuyMessage]', error)
                vuexContext.commit('setMessageLoading', false)
                return false
            }
        },
        async loadInboxMessages (vuexContext, payload) {
            vuexContext.commit('setMessageLoading', true)
            try {
                const user = vuexContext.getters.user
                let messagesData = null
                if(payload.endAtKey !== undefined) {
                    messagesData = await db.ref(`messages/${user.id}`).orderByChild('mode').endAt('receiver', payload.endAtKey).limitToLast(payload.limit).once('value')  
                }else {
                    messagesData = await db.ref(`messages/${user.id}`).orderByChild('mode').equalTo('receiver').limitToLast(payload.limit).once('value') 
                }    
                const loadedMessages = []
                messagesData.forEach(messageData => {
                    const messageObj = {
                        id: messageData.key,
                        ...messageData.val()
                    }
                    loadedMessages.push(messageObj)
                })
                loadedMessages.reverse()
                vuexContext.commit('setMessageLoading', false)
                return loadedMessages
            } catch(error) {
                console.log('[ERROR-loadInboxMessages]', error)
                vuexContext.commit('setMessageLoading', false)
            }
        },
        async loadOutboxMessages (vuexContext, payload) {
            vuexContext.commit('setMessageLoading', true)
            try {
                const user = vuexContext.getters.user
                let messagesData = null
                if(payload.endAtKey !== undefined) {
                    messagesData = await db.ref(`messages/${user.id}`).orderByChild('mode').endAt('sender', payload.endAtKey).limitToLast(payload.limit).once('value')  
                }else {
                    messagesData = await db.ref(`messages/${user.id}`).orderByChild('mode').equalTo('sender').limitToLast(payload.limit).once('value') 
                }    
                const loadedMessages = []
                messagesData.forEach(messageData => {
                    const messageObj = {
                        id: messageData.key,
                        ...messageData.val()
                    }
                    loadedMessages.push(messageObj)
                })
                loadedMessages.reverse()
                vuexContext.commit('setMessageLoading', false)
                return loadedMessages
            } catch(error) {
                console.log('[ERROR-loadOutboxMessages]', error)
                vuexContext.commit('setMessageLoading', false)
            }
        },
        async setMessageState (vuexContext, messageId) {
            //vuexContext.commit('setMessageLoading', true)
            try {
                const user = vuexContext.getters.user
                await db.ref(`messages/${user.id}`).child(messageId).update({
                    isOpened: true
                })
                //vuexContext.commit('setMessageLoading', false)
            } catch(error) {
                console.log('[ERROR-setMessageState]', error)
                //vuexContext.commit('setMessageLoading', false)
            }
        }
    },
    getters: {
        messageLoading(state) {
            return state.messageLoading
        },
    }
}