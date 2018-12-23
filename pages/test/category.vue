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
                <b-tabs type="is-boxed" :animated="false">
                    <b-tab-item>
                        <template slot="header">
                            <b-icon icon="store"></b-icon>
                            <span> Cửa hàng </span>
                        </template>
                        <b-field label="Sắp xếp">
                            <b-select v-model="sortShopType" placeholder="Sắp xếp">
                                <option v-for="(type, i) in sortShopTypes" :key="i">{{type}}</option>
                            </b-select>
                        </b-field>
                        <div class="columns is-multiline is-variable is-1" style="padding-top: 1rem">
                            <div class="column is-3" v-for="(shop, i) in loadedShops" :key="i">
                                <v-card-shop class="is-hidden-mobile" :shopData="shop" />
                                <v-card-shop-mobile class="is-hidden-tablet" :shopData="shop" />
                            </div>
                        </div>
                        <b-pagination
                            :total="total"
                            :current.sync="current"
                            order="is-centered"
                            size="is-medium"
                            :per-page="perPage"
                            :simple="true"
                            @change="onPaginationShopChange">
                        </b-pagination>
                    </b-tab-item>

                    <b-tab-item>
                        <template slot="header">
                            <b-icon icon="shopping"></b-icon>
                            <span> Sản phẩm </span>
                        </template>
                        <b-field label="Sắp xếp">
                            <b-select v-model="sortItemType" placeholder="Sắp xếp">
                                <option v-for="(type, i) in sortItemTypes" :key="i">{{type}}</option>
                            </b-select>
                        </b-field>
                        <div class="columns is-multiline is-variable is-3" style="padding-top: 1rem">
                            <div class="column is-3" v-for="(item, i) in loadedItems" :key="i">
                                <v-card-item class="is-hidden-mobile" :itemData="item" />
                                <v-card-item-mobile class="is-hidden-tablet" :itemData="item" />  
                            </div>
                        </div>
                        <b-pagination
                            :total="total"
                            :current.sync="current"
                            order="is-centered"
                            size="is-medium"
                            :per-page="perPage"
                            @change="onPaginationItemChange">
                        </b-pagination>
                    </b-tab-item>
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
            queryName() {
                return categories.find(category => category.id === this.$route.params.category).name
            }
        },
        async asyncData({ app, store, params, error }) {
            try {
                const [loadedShops, loadedItems] = await Promise.all([
                    store.dispatch('loadCategoryShops', {
                        category: params.category,
                        limit: 4,
                        isToLast: true
                    }),
                    store.dispatch('loadCategoryItems', {
                        category: params.category,
                        limit: 4,
                        isToLast: true
                    })
                ])
                return {
                    loadedShops: loadedShops,
                    loadedItems: loadedItems
                }
            }catch(e) {
                console.log('[ERROR-query/category]', e)
                error({ statusCode: 500, message: 'Lỗi loadCategoryShops và loadCategoryItems' })
            }
        },
        data() {
            return {
                sortShopTypes: sortShopTypes,
                sortItemTypes: sortItemTypes,
                sortShopType: 'Mới nhất',
                sortItemType: 'Mới nhất',

                total: 16,
                current: 1,
                perPage: 4,
            }
        },
        methods: {
            async onPaginationShopChange(pageCount) {
                let currentCount = pageCount
                if(pageCount == 1) {
                    this.loadedShops = await this.$store.dispatch('loadCategoryShops', {
                        category: this.$route.params.category,
                        limit: this.perPage,
                        isToLast: this.sortShopType === 'Mới nhất' ? true : false
                    })
                }else {
                    this.loadedShops = await this.$store.dispatch('loadCategoryShops', {
                        category: this.$route.params.category,
                        startKey: this.loadedShops[this.perPage-1].id,
                        limit: this.perPage,
                        isToLast: this.sortShopType === 'Mới nhất' ? true : false
                    })
                }
            },
            async onPaginationItemChange(pageCount) {
                if(pageCount == 1) {
                    this.loadedItems = await this.$store.dispatch('loadCategoryItems', {
                        category: this.$route.params.category,
                        limit: this.perPage
                    })
                }else {
                    this.loadedItems = await this.$store.dispatch('loadCategoryItems', {
                        category: this.$route.params.category,
                        startKey: this.loadedItems[this.perPage-1].id,
                        limit: this.perPage
                    })
                }
            },
        }
    }
// async loadCategoryShops (vuexContext, payload) {
//     vuexContext.commit('setQueryLoading', true)
//     try {
//         let shopsData = null
//         if(payload.isToLast) {
//             payload.startKey ? 
//                 shopsData = 
//                     await shopsRef.orderByChild('category').endAt(payload.category, payload.startKey).limitToLast(payload.limit).once('value')  
//                 :
//                 shopsData = 
//                     await shopsRef.orderByChild('category').endAt(payload.category).limitToLast(payload.limit).once('value')
//         }else {
//             payload.startKey ? 
//                 shopsData = 
//                     await shopsRef.orderByChild('category').startAt(payload.category, payload.startKey).limitToFirst(payload.limit).once('value')  
//                 :
//                 shopsData = 
//                     await shopsRef.orderByChild('category').startAt(payload.category).limitToFirst(payload.limit).once('value')
//         }
//         const loadedShops = []
//         shopsData.forEach(shopData => {
//             const shopObj = shopData.val()
//             loadedShops.push({
//                 id: shopData.key,
//                 ...shopObj
//             })
//         })
//         payload.isToLast ? loadedShops.reverse() : ``
//         vuexContext.commit('setQueryLoading', false)
//         return loadedShops
//     } catch(e) {
//         console.log('[ERROR-loadCategoryShops]', e)
//         vuexContext.commit('setQueryLoading', false)
//     }
// },
// async loadCategoryItems (vuexContext, payload) {
//     vuexContext.commit('setQueryLoading', true)
//     try {
//         let itemsData = null
//         if(payload.isToLast) {
//             payload.startKey ?
//                 itemsData = 
//                     await itemsRef.orderByChild('category').startAt(payload.category, payload.startKey).limitToLast(payload.limit).once('value')  
//                 :
//                 itemsData = 
//                     await itemsRef.orderByChild('category').startAt(payload.category).limitToLast(payload.limit).once('value')
//         }else {
//             payload.startKey ?
//                 itemsData = 
//                     await itemsRef.orderByChild('category').startAt(payload.category, payload.startKey).limitToFirst(payload.limit).once('value')  
//                 :
//                 itemsData = 
//                     await itemsRef.orderByChild('category').startAt(payload.category).limitToFirst(payload.limit).once('value')
//         }
//         const loadedItems = []
//         itemsData.forEach(itemData => {
//             const itemObj = itemData.val()
//             loadedItems.push({
//                 id: itemData.key,
//                 ...itemObj
//             })
//         })
//         vuexContext.commit('setQueryLoading', false)
//         return loadedItems
//     } catch(e) {
//         console.log('[ERROR-loadCategoryItems]', e)
//         vuexContext.commit('setQueryLoading', false)
//     }
// },
</script>

