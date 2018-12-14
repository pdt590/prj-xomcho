<template>
    <div class="container">
        <nav class="breadcrumb is-hidden-mobile" style="margin-bottom: 2rem">
            <ul>
                <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                <li class="is-active"><a>Cửa hàng</a></li>
            </ul>
        </nav>
        <div class="card">
            <div class="card-content">
                <b-tabs type="is-boxed">
                    <b-tab-item>
                        <template slot="header">
                            <b-icon icon="store"></b-icon>
                            <span> Cửa hàng </span>
                        </template>
                        <div class="columns is-multiline is-variable is-2" style="padding-top: 1rem">
                            <div class="column is-2" v-for="(shop, i) in loadedShops" :key="i">
                                <v-card-shop class="is-hidden-mobile" :shopData="shop" />
                                <v-card-shop-mobile class="is-hidden-tablet" :shopData="shop" />
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
                const limit = 4
                const loadedShops = await store.dispatch('loadAllShops', {limit: limit})
                return { 
                    loadedShops: loadedShops ,
                    limit: limit
                }
            }catch(e) {
                console.log('[ERROR-query/type]', e)
                error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        methods: {
            async onLoad() {
                const endAtKey = this.loadedShops[this.loadedShops.length - 1].updatedDate
                let loadedMoreShops = await this.$store.dispatch('loadAllShops', {
                    limit: this.limit + 1,
                    endAtKey: endAtKey
                })
                loadedMoreShops.shift() // Remove first item
                this.loadedShops = [...this.loadedShops, ...loadedMoreShops]
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