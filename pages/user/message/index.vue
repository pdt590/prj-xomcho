<template>
    <div class="container">
        <nav class="breadcrumb is-hidden-mobile" style="margin-bottom: 2rem">
            <ul>
                <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                <li class="is-active"><a>Tin nhắn</a></li>
            </ul>
        </nav>
        <div class="card" v-if="loadedChats.length">
            <div class="card-content">
                <div class="columns">
                    <div class="column is-4 v-chat-list">
                        <b-tabs type="is-boxed">
                            <b-tab-item>
                                <template slot="header">
                                    <b-icon icon="inbox-arrow-down"></b-icon>
                                </template>
                                <div class="media" 
                                    :class="{'has-background-white-ter': i === selectedChatIndex}" 
                                    style="padding: 1rem" 
                                    v-for="(info, i) in tbnInfos" 
                                    :key="i">
                                    <div class="media-content" style="overflow: hidden;" @click="setMainChat(i)">
                                        <p class="has-text-weight-semibold has-text-info">
                                            <b-icon icon="account-circle" size="is-small" v-if="info.message.fromId === user.id"></b-icon>
                                            <b-icon :icon="!info.message.fromId ? `account-question` : `account-check`" size="is-small" v-else></b-icon>
                                            {{info.message.fromId ? info.message.fromUsername : info.message.fullname }}
                                            <small class="has-text-grey-light"> - {{info.message.updatedDate | fmDate}}</small>
                                        </p>
                                        <p class="has-text-weight-semibold has-text-grey">{{info.itemTitle}}</p>
                                        <p>💬 {{info.message.content | fmString(100)}}</p>
                                    </div>
                                    <div class="media-right">
                                        <div class="level">
                                            <div class="level-item">
                                                <b-tag :type="info.state ? `is-info` :  `is-danger`" size="is-small" style="margin: 0.2rem">{{info.state ? `Đã mở` :  `Chưa mở`}}</b-tag>
                                            </div>
                                            <div class="level-item">                                            
                                                <button class="delete is-small" @click="onDelete(i)"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </b-tab-item>
                        </b-tabs>
                    </div>
                    <div class="column is-8 v-chat-view">
                        <div class="v-chat-view-title">
                            <a class="has-text-weight-bold" :href="selectedChat.itemUrl" target="_blank">{{selectedChat.itemTitle}}</a>
                        </div>
                        <div id="chatView" class="v-chat-view-content">
                            <div v-if="selectedChat.messages">
                                <div v-for="(message, i) in selectedChat.messages" :key="i">
                                    <div :class="message.fromId === user.id ? `me` : `fr`">
                                        <span v-if="message.fromId !== user.id" >{{message.fromUsername}}</span>
                                        <div class="chat-content" style="margin-top: 1.5rem">
                                            <p v-if="message.unit">🛒 Thông tin đặt mua sản phẩm</p>
                                            <p v-if="message.unit && message.fullname">💳 {{message.fullname}}</p>
                                            <p v-if="message.unit && message.phone">📞 {{message.phone}}</p>
                                            <p v-if="message.unit && message.address">📍 {{message.address}}</p>
                                            <p v-if="message.unit">💵 Số Lượng {{message.unit}}</p>
                                            <p v-if="message.content">{{message.content}}</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <b-field class="v-chat-input" grouped v-if="selectedChat.messages">
                            <b-input
                                type="textarea"
                                maxlength="200"
                                v-model.trim="messageContent"
                                @blur="$v.messageContent.$touch()"
                                expanded
                                size="is-small"
                                :disabled="!selectedChat.messages[selectedChat.messages.length - 1].fromId">
                            </b-input>
                            <div class="control">
                                <button class="button is-info is-outlined is-rounded" 
                                    :disabled="!selectedChat.messages[selectedChat.messages.length - 1].fromId || $v.messageContent.$invalid"
                                    @click.prevent="onSend">Gửi
                                </button>
                            </div>
                        </b-field>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { required, numeric } from 'vuelidate/lib/validators'
    import { genId_ } from '~/plugins/util-helpers'

    export default {
        middleware: 'auth',
        async mounted() {
            process.client ? await this.$store.dispatch('loadChats') : `` // Trigger .on() firebase when reloading the page
            this.loadedChats.length ? this.selectedChat = this.loadedChats[0] : ``
        },
        updated() {
            this.loadedChats.length ? this.$nextTick(() => {
                this.selectedChatIndex == 0 ? this.selectedChat = this.loadedChats[0] : ``
                this.scrollToEnd()
            }) : ``
        },
        computed: {
            ...mapGetters(['chatLoading', 'loadedChats', 'user']),
            tbnInfos() {
                const tbnInfos = []
                for(const chat of this.loadedChats) {
                    tbnInfos.push({
                        itemUrl: chat.itemUrl,
                        itemTitle: chat.itemTitle,
                        state: chat.state,
                        message: chat.messages[chat.messages.length-1]
                    })
                }
                return tbnInfos
            }
        },
        async fetch({ store, error }) {
            try {
                process.server ? await store.dispatch('loadChats') : ``
            }catch(e) {
                console.log('[ERROR-user/message]', e)
                error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        data() {
            return {
                messageContent: '',
                selectedChat: {
                    itemUrl: '',
                    itemTitle: '',
                    messages: null
                },
                selectedChatIndex: 0
            }
        },
        validations: {
            messageContent: {
                required
            }
        },
        methods: {
            async setMainChat(index) {
                if(!this.loadedChats[index].state) {
                    await this.$store.dispatch('setChatState', this.loadedChats[index].id)
                    this.loadedChats[index].state = true
                }
                this.selectedChat = this.loadedChats[index]
                this.selectedChatIndex = index
            },
            async onSend() {
                const messageId = genId_(10)
                const now = new Date().toISOString()
                const message = {
                    fullname: this.user.fullname ? this.user.fullname : null,
                    content: this.messageContent,
                    fromId: this.user.id,
                    fromUsername: this.user.username,
                    updatedDate: now
                }
                this.selectedChat.messages.push({
                    id: messageId,
                    ...message
                })
                this.messageContent = null
                await this.$store.dispatch('sendChatMessage', {
                    partnerId: this.selectedChat.partnerId,
                    chatId: this.selectedChat.id,
                    now: now,
                    messageId: messageId,
                    message: message
                })
            },
            async onDelete(index) {
                const chatId = this.loadedChats[index].id
                await this.$store.dispatch('deleteChat', chatId)
                this.loadedChats.splice(index, 1)
            },
            scrollToEnd(){
                const container = this.$el.querySelector("#chatView")
                container.scrollTop = container.scrollHeight
            }
        }
    }
</script>

<style lang="scss" scoped>
    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .v-chat-list {
        max-height: 40rem; 
        overflow-y: scroll
    }

    .media:hover {
        cursor: pointer;
    }

    .v-chat-view {
        display: flex; 
        flex-direction: column; 
        justify-content: space-between;
        .v-chat-view-title {
            border-bottom: solid 1px #D8D8D8; 
            padding: 0.7rem
        };
        .v-chat-view-content {
            max-height: 30rem; 
            overflow-y: scroll
        };
        .v-chat-input {
            border-top: solid 1px #D8D8D8;
            padding-top: 1rem
        }
    }

    .fr, .me { 
        display: flex; 
        align-items: center; 
        position: relative;
    }

    .me { justify-content: flex-end; }

    .fr .chat-content, .me .chat-content {
        margin: 1rem .8rem;
        padding: 10px 20px;
        display: inline-block;
        position: relative;
        border-radius: 4px;
        max-width: 50%;
    }

    .fr .chat-content { background-color: #e3ecec; }

    .fr span, .me span {
        font-size: 13px;
        position: absolute;
        top: -2px;
        font-weight: 300;
        text-shadow: .2px .2px .4px rgba(0,0,0, .16);
    }

    .fr span { left: 20px; }
    .me span { right: 20px; }

    .me .chat-content { background-color: dodgerblue; color: white; }

    .fr .chat-content:before, .me .chat-content:before {
        content: '';  
        width: 0;
        height: 0;
        border-width: 7px;
        position: absolute;
        border-style: solid;
        border-color: transparent;
    }

    .fr .chat-content:before {
        left: -1px;
        bottom: -9px;
        transform: rotateZ(8.5deg);
        border-top-color: #e3ecec;
        border-left-color: #e3ecec;
    }

    .me .chat-content:before {
        right: 0px;
        bottom: -9px;
        transform: rotateZ(-8.5deg);
        border-top-color: dodgerblue;
        border-right-color: dodgerblue;
    }
</style>
