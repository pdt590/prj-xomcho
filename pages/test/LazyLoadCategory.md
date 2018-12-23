# .vue

```bash
    <template>
        <div class="container">
            <nav class="breadcrumb is-hidden-mobile">
                <ul>
                    <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                    <li class="is-active"><a>{{queryName}}</a></li>
                </ul>
            </nav>
            <div class="card">
                <div class="card-content">
                    <b-tabs type="is-boxed" :animated="false" @change="onTabChange">
                        <b-tab-item>
                            <template slot="header">
                                <b-icon icon="store"></b-icon>
                                <span> Cửa hàng </span>
                            </template>
                            <div class="columns is-multiline is-variable is-1" style="padding-top: 1rem">
                                <div class="column is-2" v-for="(shop, i) in loadedShops" :key="i">
                                    <v-card-shop class="is-hidden-mobile" :shopData="shop" />
                                    <v-card-shop-mobile class="is-hidden-tablet" :shopData="shop" />
                                </div>
                            </div>
                            <div class="level">
                                <div class="level-item">
                                    <button class="button is-rounded is-outlined" :class="{'is-loading': queryLoading}" :disabled="!loadedShops.length" @click="onLoadShop"> Xem thêm</button>
                                </div>
                            </div>
                        </b-tab-item>

                        <b-tab-item>
                            <template slot="header">
                                <b-icon icon="shopping"></b-icon>
                                <span> Sản phẩm </span>
                            </template>
                            <div class="columns is-multiline is-variable is-3" style="padding-top: 1rem">
                                <div class="column is-2" v-for="(item, i) in loadedItems" :key="i">
                                    <v-card-item class="is-hidden-mobile" :itemData="item" />
                                    <v-card-item-mobile class="is-hidden-tablet" :itemData="item" />  
                                </div>
                            </div>
                            <div class="level">
                                <div class="level-item">
                                    <button class="button is-rounded is-outlined" :class="{'is-loading': queryLoading}" :disabled="!loadedItems.length" @click="onLoadItem"> Xem thêm</button>
                                </div>
                            </div>
                        </b-tab-item>
                        <b-loading :is-full-page="false" :active.sync="queryLoading"></b-loading>
                    </b-tabs>
                </div>
            </div>
        </div>
    </template>

    <script>
        import { mapGetters } from 'vuex'
        import { sortShopTypes, sortItemTypes, categories } from '~/plugins/util-lists'

        export default {
            computed: {
                ...mapGetters(['queryLoading']),
                queryName() {
                    return categories.find(category => category.id === this.$route.params.category).name
                }
            },
            async asyncData({ app, store, params, error }) {
                try {
                    const limit = 18
                    const loadedShops = await store.dispatch('loadCategoryShops', {
                        limit: limit,
                        category: params.category
                    })
                    return { 
                        loadedShops: loadedShops,
                        limit: limit,
                        category: params.category
                    }
                }catch(e) {
                    console.log('[ERROR-query/category]', e)
                    error({ statusCode: 500, message: 'Lỗi loadCategoryShops' })
                }
            },
            data() {
                return {
                    loadedItems: [],
                }
            },
            methods: { 
                async onTabChange(tabIndex) {
                    if(tabIndex==1) {
                        this.loadedItems = await this.$store.dispatch('loadCategoryItems', {
                            limit: this.limit,
                            category: this.category
                        })
                    }
                },
                async onLoadShop() {
                    const endAtKey = this.loadedShops[this.loadedShops.length - 1].id
                    let loadedMoreShops = await this.$store.dispatch('loadCategoryShops', {
                        limit: this.limit + 1,
                        endAtKey: endAtKey,
                        category: this.category
                    })
                    loadedMoreShops.length ? loadedMoreShops.shift() : `` // Remove first item
                    this.loadedShops = [...this.loadedShops, ...loadedMoreShops]
                },
                async onLoadItem() {
                    const endAtKey = this.loadedItems[this.loadedItems.length - 1].id
                    let loadedMoreItems = await this.$store.dispatch('loadCategoryItems', {
                        limit: this.limit + 1,
                        endAtKey: endAtKey,
                        category: this.category
                    })
                    loadedMoreItems.length ? loadedMoreItems.shift() : ``// Remove first item
                    this.loadedItems = [...this.loadedItems, ...loadedMoreItems]
                }
            }
        }
    </script>
```

# store

```bash
    // Category 
    async loadCategoryShops (vuexContext, payload) {
        vuexContext.commit('setQueryLoading', true)
        try {
            let shopsData = null
            if(payload.endAtKey !== undefined) {
                shopsData = await shopsRef.orderByChild('category').endAt(payload.category, payload.endAtKey).limitToLast(payload.limit).once('value')  
            }else {
                shopsData = await shopsRef.orderByChild('category').equalTo(payload.category).limitToLast(payload.limit).once('value')
            }
            const loadedShops = []
            shopsData.forEach(shopData => {
                const shopObj = shopData.val()
                loadedShops.push({
                    id: shopData.key,
                    ...shopObj
                })
            })
            vuexContext.commit('setQueryLoading', false)
            return loadedShops.reverse()
        } catch(e) {
            console.log('[ERROR-loadCategoryShops]', e)
            vuexContext.commit('setQueryLoading', false)
        }
    },
    async loadCategoryItems (vuexContext, payload) {
        vuexContext.commit('setQueryLoading', true)
        try {
            let itemsData = null
            if(payload.endAtKey !== undefined) {
                itemsData = await itemsRef.orderByChild('category').endAt(payload.category, payload.endAtKey).limitToLast(payload.limit).once('value')  
            }else {
                itemsData = await itemsRef.orderByChild('category').equalTo(payload.category).limitToLast(payload.limit).once('value') 
            }
            const loadedItems = []
            itemsData.forEach(itemData => {
                const itemObj = itemData.val()
                loadedItems.push({
                    id: itemData.key,
                    ...itemObj
                })
            })
            vuexContext.commit('setQueryLoading', false)
            return loadedItems.reverse()
        } catch(e) {
            console.log('[ERROR-loadCategoryItems]', e)
            vuexContext.commit('setQueryLoading', false)
        }
    },
```