<template>
    <div class="container">
        <nav class="breadcrumb is-hidden-mobile">
            <ul>
                <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                <li class="is-active"><a>Cửa hàng</a></li>
            </ul>
        </nav>
        <div class="card">
            <div class="card-content">
                <b-tabs>
                    <b-tab-item>
                        <template slot="header">
                            <b-icon icon="store"></b-icon>
                            <span> Cửa hàng </span>
                        </template>
                        <div class="columns is-multiline is-variable is-2" style="padding-top: 1rem">
                            <div class="column is-2" v-for="shop in loadedShops" :key="shop.id">
                                <v-card-shop class="is-hidden-mobile" :shopData="shop" />
                                <v-card-shop-mobile class="is-hidden-tablet" :shopData="shop" />
                            </div>
                            <b-loading class="is-hidden-mobile" :is-full-page="false" :active.sync="queryLoading"></b-loading>
                        </div>
                        <div class="level">
                            <div class="level-item">
                                <button class="button is-rounded is-outlined" :class="{'is-loading': queryLoading}" :disabled="!loadedShops.length" @click="onLoad"> Xem thêm</button>
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
                const limit = 18
                const loadedShops = await store.dispatch('loadAllShops', {limit: limit})
                return { 
                    loadedShops: loadedShops ,
                    limit: limit
                }
            }catch(e) {
                console.log('[ERROR-query/shops]', e)
                error({ statusCode: 500, message: 'Lỗi loadAllShops' })
            }
        },
        methods: {
            async onLoad() {
                const endAtKey = this.loadedShops[this.loadedShops.length - 1].updatedDate
                let loadedMoreShops = await this.$store.dispatch('loadAllShops', {
                    limit: this.limit + 1,
                    endAtKey: endAtKey
                })
                loadedMoreShops.length ? loadedMoreShops.shift() : `` // Remove first item
                this.loadedShops = [...this.loadedShops, ...loadedMoreShops]
            }
        },
        head () {
            return {
                title: 'Xóm Chợ | Các cửa hàng nổi bật',
                meta: [
                    { hid: 'description', name: 'description', content: 'Xóm Chợ - Các cửa hàng nổi bật'}
                ]
            }
        }
    }
</script>