<template>
    <div class="container">
        <nav class="breadcrumb is-hidden-mobile" style="margin-bottom: 2rem">
            <ul>
                <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                <li class="is-active"><a>Sản phẩm</a></li>
            </ul>
        </nav>
        <div class="card">
            <div class="card-content">
                <b-tabs type="is-boxed">
                    <b-tab-item>
                        <template slot="header">
                            <b-icon icon="shopping"></b-icon>
                            <span> Sản phẩm </span>
                        </template>
                        <div class="columns is-multiline is-variable is-2" style="padding-top: 1rem">
                            <div class="column is-2" v-for="(item, i) in loadedItems" :key="i">
                                <v-card-item class="is-hidden-mobile" :itemData="item" />
                                <v-card-item-mobile class="is-hidden-tablet" :itemData="item" />
                            </div>
                        </div>
                        <div class="level">
                            <div class="level-item">
                                <button class="button is-rounded is-outlined" :class="{'is-loading': queryLoading}" @click="onLoad"> Xem thêm</button>
                            </div>
                        </div>
                    </b-tab-item>
                </b-tabs> 
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters(['queryLoading'])
        },
        async asyncData({ store, params, error }) {
            try {
                const limit = 1
                const loadedItems = await store.dispatch('loadAllItems', {limit: limit})
                return { 
                    loadedItems: loadedItems ,
                    limit: limit
                }
            }catch(e) {
                console.log('[ERROR-query/type]', e)
                error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        methods: {
            async onLoad() {
                const endAtKey = this.loadedItems[this.loadedItems.length - 1].updatedDate
                let loadedMoreItems = await this.$store.dispatch('loadAllItems', {
                    limit: this.limit + 1,
                    endAtKey: endAtKey
                })
                loadedMoreItems.shift() // Remove first item
                this.loadedItems = [...this.loadedItems, ...loadedMoreItems]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        border-radius: 0.3rem;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.1);
        .card-header {
            padding: 1rem;
        }
        .card-footer .card-footer-item {
            justify-content: flex-end;
            padding: 1rem;
        }
    }
</style>