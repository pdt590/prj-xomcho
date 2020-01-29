<template>
    <div class="container">
        <nav class="breadcrumb is-hidden-mobile">
            <ul>
                <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                <li class="is-active"><a>Tin nhắn</a></li>
            </ul>
        </nav>
        <div class="card" v-if="loadedChats.length && user">
            <div class="card-content">
                <div class="columns">
                    <div class="column is-4 has-background-white-ter v-chat-list">
                        <div class="media"
                            :class="{'v-chat-select': i === selectedChatIndex}" 
                            style="padding: 1rem" 
                            v-for="(info, i) in tbnInfos" 
                            :key="i">
                            <div class="media-content" style="overflow: hidden;" @click="setMainChat(i)">
                                <p>
                                    <b-icon icon="account-circle" size="is-small" v-if="info.message.fromId === user.id"></b-icon>
                                    <b-icon :icon="!info.message.fromId ? `account-question` : `account-check`" size="is-small" type="is-dark" v-else></b-icon>
                                    <span class="has-text-weight-semibold has-text-info">{{info.message.fromId ? info.message.fromUsername : info.message.fullname }}</span>
                                    <small class="has-text-grey-light"> &#8226; {{info.message.updatedDate | fmDate}}</small>
                                </p>
                                <p class="has-text-weight-semibold has-text-grey">{{info.itemTitle}}</p>
                                <p v-if="info.message.content">{{info.message.content | fmString(100)}}</p>
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
                        <div class="level" style="padding-bottom: 0.5rem">
                            <div class="level-item">
                                <button class="button is-rounded is-outlined" :class="{'is-loading': chatLoading}" @click="onLoad">Xem thêm</button>
                            </div>
                        </div>
                    </div>
                    <div class="column is-8 v-chat-view">
                        <div class="v-chat-view-title">
                            <a class="has-text-weight-bold" :href="selectedChat.itemUrl" target="_blank">{{selectedChat.itemTitle}}</a>
                        </div>
                        <div id="chatView" class="v-chat-view-content">
                            <div v-if="selectedChat.messages">
                                <div v-for="(message, i) in selectedChat.messages" :key="i">
                                    <!-- Message Content -->
                                    <div :class="message.fromId === user.id ? `me` : `fr`">
                                        <span v-if="message.fromId !== user.id" >{{message.fromUsername}}</span>
                                        <div class="chat-content" style="margin-top: 1.5rem">
                                            <p v-if="message.unit">Thông tin đặt mua 🛒</p>
                                            <p v-if="message.unit && message.fullname">Sản phẩm: <strong>{{selectedChat.itemTitle}}</strong></p>
                                            <p v-if="message.unit && message.fullname">Tên người mua: <strong>{{message.fullname}}</strong></p>
                                            <p v-if="message.unit && message.phone">   Số điện thoại: <strong>{{message.phone}}</strong></p>
                                            <p v-if="message.unit && message.address"> Địa chỉ: <strong>{{message.address}}</strong></p>
                                            <p v-if="message.unit">                    Số Lượng: <strong>{{message.unit}}</strong></p>
                                            <p v-if="message.unit">                    Tổng tiền: <strong>{{message.price | fmPrice}}</strong></p>
                                            <p v-if="message.unit">&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;</p>
                                            <p v-if="message.content">{{message.content}}</p>
                                        </div> 
                                    </div>
                                    <!--  -->
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
    import { genId_ } from '~/libs/helpers'

    export default {
        middleware: 'auth',
        async mounted() {
            process.client ? await this.$store.dispatch('loadChats') : `` // Trigger .on() firebase when reloading the page
            this.loadedChats.length ? this.selectedChat = this.loadedChats[0] : ``
        },
        updated() {
            this.loadedChats.length ? this.$nextTick(() => {
                this.selectedChatIndex == 0 ? this.selectedChat = this.loadedChats[0] : ``
                this.user ? this.scrollToEnd() : ``
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
                error({ statusCode: 500, message: 'Lỗi loadChats' })
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
            async onLoad() {
                await this.$store.dispatch('loadMoreChats')
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
                await this.$store.dispatch('sendChatMessage', {
                    partnerId: this.selectedChat.partnerId,
                    chatId: this.selectedChat.id,
                    now: now,
                    messageId: messageId,
                    message: message
                })
                this.selectedChatIndex = 0
                this.messageContent = null
            },
            async onDelete(index) {
                const chatId = this.loadedChats[index].id
                await this.$store.dispatch('deleteChat', chatId)
            },
            scrollToEnd(){
                const container = this.$el.querySelector("#chatView")
                container.scrollTop = container.scrollHeight
            }
        }
    }
</script>

<style lang="scss" scoped>
    .media:hover {
        cursor: pointer;
    }

    .v-chat-view {
        display: flex; 
        flex-direction: column; 
        justify-content: space-between;
        padding: 0;
    }

    .v-chat-select {
        background-color: #FFF;
        border-radius: 0.3rem
    }

    @media screen and (min-width: 768px) {
        .v-chat-list {
            height: 40rem; 
            overflow-y: scroll;
            border-radius: 0.3rem
        }
        .v-chat-view-title {
            height: 3rem; 
            padding: 0.7rem 0 0.5rem 1rem
        };
        .v-chat-view-content {
            height: 32rem; 
            overflow-y: scroll;
            border: solid 1px #D8D8D8;
            border-left: none;
            border-radius: 0.3rem
        };
        .v-chat-input {
            height: 5rem;
            padding: 0.5rem
        }
    }

    @media screen and (max-width: 768px) {
        .v-chat-list {
            max-height: 15rem; 
            overflow-y: scroll;
            border-radius: 0.3rem;
        }
        .v-chat-view-title {
            padding: 0.5rem 0 0.5rem 1rem
        };
        .v-chat-view-content {
            max-height: 15rem; 
            overflow-y: scroll;
            border: solid 1px #D8D8D8;
            border-radius: 0.3rem
        };
        .v-chat-input {
            max-height: 5rem;
            padding: 0.5rem
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
