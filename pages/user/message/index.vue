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
                    <div class="column is-4" style="max-height: 50rem; overflow-y: scroll;">
                        <b-tabs type="is-boxed" @change="onTabChange">
                            <b-tab-item>
                                <template slot="header">
                                    <b-icon icon="inbox-arrow-down"></b-icon>
                                </template>
                                <div class="media" v-for="(message, i) in loadedInboxMessages" :key="i" @click="setMainMessageInbox(i)">
                                    <div class="media-content" style="overflow: hidden;">
                                        <p>From: {{message.updatedDate}}</p>
                                        <p>To: {{message.to}}</p>
                                    </div>
                                    <div class="media-right">
                                        <button class="delete is-small"></button>
                                    </div>
                                </div>
                            </b-tab-item>
                            <b-tab-item>
                                <template slot="header">
                                    <b-icon icon="inbox-arrow-up"></b-icon>
                                </template>
                                <div class="media" v-for="(message, i) in loadedOutboxMessages" :key="i" @click="setMainMessageOutbox(i)">
                                    <div class="media-content" style="overflow: hidden;">
                                        <p>From: {{message.updatedDate}}</p>
                                        <p>To: {{message.to}}</p>
                                    </div>
                                    <div class="media-right">
                                        <button class="delete is-small"></button>
                                    </div>
                                </div>
                            </b-tab-item>
                            <b-loading :is-full-page="false" :active.sync="messageLoading"></b-loading>
                        </b-tabs>
                        <a class="button is-rounded is-fullwidth" :class="{'is-loading': messageLoading}" @click="onLoadInbox" v-if="tabIndex == 0">Xem thêm</a>
                        <a class="button is-rounded is-fullwidth" :class="{'is-loading': messageLoading}" @click="onLoadOutbox" v-if="tabIndex == 1">Xem thêm</a>
                    </div>
                    <div class="column is-8" v-if="selectedInboxMessage && tabIndex == 0">
                        <p>{{selectedInboxMessage.message}}</p>
                        <p>From: {{selectedInboxMessage.updatedDate}}</p>
                        <p>To: {{selectedInboxMessage.to}}</p>
                    </div>
                    <div class="column is-8" v-if="selectedOutboxMessage && tabIndex == 1">
                        <p>{{selectedOutboxMessage.message}}</p>
                        <p>From: {{selectedOutboxMessage.updatedDate}}</p>
                        <p>To: {{selectedOutboxMessage.to}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        middleware: 'auth',
        computed: {
            ...mapGetters(['messageLoading'])
        },
        async asyncData({ store, params, error }) {
            try {
                const limit = 4
                const loadedInboxMessages = await store.dispatch('loadInboxMessages', {limit: limit})
                if(loadedInboxMessages.length) {
                    await store.dispatch('setMessageState', loadedInboxMessages[0].id)
                }
                return { 
                    loadedInboxMessages: loadedInboxMessages ,
                    limit: limit,
                    selectedInboxMessage: loadedInboxMessages[0],
                }
            }catch(e) {
                console.log('[ERROR-user/message]', e)
                error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        data() {
            return {
                tabIndex: 0,
                loadedOutboxMessages: [],
                selectedOutboxMessage: null
            }
        },
        methods: {
            async onTabChange(tabIndex) {
                this.tabIndex = tabIndex
                if(tabIndex == 1) {
                    this.loadedOutboxMessages = await this.$store.dispatch('loadOutboxMessages', {limit: this.limit})
                    this.selectedOutboxMessage = this.loadedOutboxMessages[0]
                }
            },
            async setMainMessageInbox(index) {
                await this.$store.dispatch('setMessageState', this.loadedInboxMessages[index].id)
                this.loadedInboxMessages[index].isOpened = true
                this.selectedInboxMessage = this.loadedInboxMessages[index]
            },
            async setMainMessageOutbox(index) {
                this.selectedOutboxMessage = this.loadedOutboxMessages[index]
            },
            async onLoadInbox() {
                const endAtKey = this.loadedInboxMessages[this.loadedInboxMessages.length - 1].id
                let loadedMoreMessages = await this.$store.dispatch('loadInboxMessages', {
                    limit: this.limit + 1,
                    endAtKey: endAtKey
                })
                loadedMoreMessages.length ? loadedMoreMessages.shift() : `` // Remove first item
                this.loadedInboxMessages = [...this.loadedInboxMessages, ...loadedMoreMessages]
            },
            async onLoadOutbox() {
                const endAtKey = this.loadedOutboxMessages[this.loadedOutboxMessages.length - 1].id
                let loadedMoreMessages = await this.$store.dispatch('loadOutboxMessages', {
                    limit: this.limit + 1,
                    endAtKey: endAtKey
                })
                loadedMoreMessages.length ? loadedMoreMessages.shift() : ``// Remove first item
                this.loadedOutboxMessages = [...this.loadedOutboxMessages, ...loadedMoreMessages]
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
</style>
