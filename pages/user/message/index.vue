<template>
    <div class="container">
        <nav class="breadcrumb is-hidden-mobile" style="margin-bottom: 2rem">
            <ul>
                <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                <li class="is-active"><a>Tin nhắn</a></li>
            </ul>
        </nav>
        <div class="card">
            <div class="card-content">
                <div class="columns">
                    <div class="column is-4" style="max-height: 40rem; overflow-y: scroll;">
                        <!-- <b-tabs type="is-boxed"> -->
                            <!-- <b-tab-item>
                                <template slot="header">
                                    <b-icon icon="inbox-arrow-down"></b-icon>
                                </template> -->
                            
                                <div class="media" :class="{'has-background-white-ter': i === selectedChatId}" style="padding: 1rem" v-for="(chat, i) in loadedChats" :key="i" @click="setMainChat(i)">
                                    <div class="media-content" style="overflow: hidden;">
                                        <p class="has-text-weight-semibold has-text-info">{{chat.messages[chat.messages.length - 1].fromId ? chat.messages[chat.messages.length - 1].fromUsername : chat.messages[chat.messages.length - 1].fullname }}
                                            <span class="has-text-grey-light" v-if="!chat.messages[chat.messages.length - 1].fromId">(Khách vãng lai)</span>
                                            <span class="has-text-grey-light" v-if="chat.messages[chat.messages.length - 1].fromId === user.id">(Tôi)</span>
                                        </p>
                                        <a class="has-text-weight-semibold has-text-grey" :href="chat.itemUrl" target="_blank">{{chat.itemTitle}}</a>
                                        <p>💬 {{chat.messages[chat.messages.length - 1].content | fmString(100)}}</p>
                                    </div>
                                    <div class="media-right">
                                        <b-icon :icon="chat.state ? `eye-outline` :  `eye-off-outline`" size="is-small"></b-icon>
                                        <button class="delete is-small"></button>
                                    </div>
                                </div>
                            <!-- </b-tab-item> -->
                            <!-- <b-loading :is-full-page="false" :active.sync="chatLoading"></b-loading> -->
                        <!-- </b-tabs> -->
                        <div class="level">
                            <div class="level-item">
                                <a class="button is-rounded" :class="{'is-loading': chatLoading}" @click="onLoad">Xem thêm</a>
                            </div>
                        </div>
                    </div>
                    <div class="column is-8" v-if="selectedChat" style="display: flex; flex-direction: column; justify-content: space-between">
                        <div style="border-bottom: solid 1px #D8D8D8; padding: 0.7rem">
                            <a class="has-text-weight-bold" :href="selectedChat.itemUrl" target="_blank">{{selectedChat.itemTitle}}</a>
                        </div>
                        <div id="chatView" style="max-height: 30rem; overflow-y: scroll;">
                            <div :class="message.fromId === user.id ? `me` : `fr`" v-for="(message, i) in selectedChat.messages" :key="i">
                                <div class="chat-content v-wrap-text">
                                    <p v-if="message.fullname">Tên: {{message.fullname}}</p>
                                    <p v-if="message.phone">SĐT: {{message.phone}}</p>
                                    <p v-if="message.address">Địa Chỉ: {{message.address}}</p>
                                    <p v-if="message.unit">Số Lượng: {{message.unit}}</p>
                                    <p v-if="message.content">{{message.content}}</p>
                                </div>
                            </div>
                        </div>
                        <b-field grouped style="border-top: solid 1px #D8D8D8; padding-top: 1rem">
                            <b-input
                                type="textarea"
                                maxlength="200"
                                v-model.trim="messageContent"
                                @blur="$v.messageContent.$touch()"
                                expanded
                                :has-counter="false"
                                size="is-small"
                                :disabled="!selectedChat.messages[selectedChat.messages.length - 1].fromId">
                            </b-input>
                            <p class="control">
                                <button class="button is-info is-outlined is-rounded" 
                                    :disabled="!selectedChat.messages[selectedChat.messages.length - 1].fromId || $v.messageContent.$invalid"
                                    @click.prevent="onSend">Gửi
                                </button>
                            </p>
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
        mounted() {
            this.scrollToEnd()
        },
        updated() {
            this.$nextTick(() => this.scrollToEnd());
        },
        computed: {
            ...mapGetters(['chatLoading', 'user'])
        },
        async asyncData({ store, params, error }) {
            try {
                const limit = 4
                const loadedChats = await store.dispatch('loadChats', {limit: limit})
                if(loadedChats.length) {
                    await store.dispatch('setChatState', loadedChats[0].id)
                    loadedChats[0].state = true
                }
                return { 
                    loadedChats: loadedChats,
                    limit: limit,
                    selectedChat: loadedChats[0]
                }
            }catch(e) {
                console.log('[ERROR-user/message]', e)
                error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        data() {
            return {
                messageContent: null,
                selectedChatId: 0
            }
        },
        validations: {
            messageContent: {
                required
            }
        },
        methods: {
            async setMainChat(index) {
                await this.$store.dispatch('setChatState', this.loadedChats[index].id)
                this.loadedChats[index].state = true
                this.selectedChat = this.loadedChats[index]
                this.selectedChatId = index
            },
            async onLoad() {
                const endAtKey = this.loadedChats[this.loadedChats.length - 1].updatedDate
                let loadedMoreChats = await this.$store.dispatch('loadChats', {
                    limit: this.limit + 1,
                    endAtKey: endAtKey
                })
                loadedMoreChats.length ? loadedMoreChats.shift() : `` // Remove first item
                this.loadedChats = [...this.loadedChats, ...loadedMoreChats]
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
                this.loadedChats[this.selectedChatId].messages.push({
                    id: messageId,
                    ...message
                })
                this.messageContent = null
                await this.$store.dispatch('sendChatMessage', {
                    partnerId: this.loadedChats[this.selectedChatId].partnerId,
                    chatId: this.loadedChats[this.selectedChatId].id,
                    now: now,
                    messageId: messageId,
                    message: message
                })
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

    .media:hover {
        cursor: pointer;
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
