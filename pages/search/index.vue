<template>
    <div class="container">
        <nav class="breadcrumb is-hidden-mobile">
            <ul>
                <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                <li class="is-active"><a>Tìm kiếm "{{searchKey}}"</a></li>
            </ul>
        </nav>
        <div class="card">
            <div class="card-content">
                <b-tabs :animated="false">
                    <b-tab-item v-if="searchTarget==='shop'">
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
                            <div class="column is-2" v-for="shop in displayedShops" :key="shop.id">
                                <v-card-shop class="is-hidden-mobile" :shopData="shop" />
                                <v-card-shop-mobile class="is-hidden-tablet" :shopData="shop" />
                            </div>
                        </div>
                        <b-pagination
                            :total="totalShops"
                            :current.sync="currentShopPage"
                            order="is-centered"
                            size="is-medium"
                            :per-page="perPage"
                            @change="onPagShopChange">
                        </b-pagination>
                    </b-tab-item>

                    <b-tab-item v-if="searchTarget==='item'">
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
                            <div class="column is-2" v-for="item in displayedItems" :key="item.id">
                                <v-card-item class="is-hidden-mobile" :itemData="item" />
                                <v-card-item-mobile class="is-hidden-tablet" :itemData="item" />  
                            </div>
                        </div>
                        <b-pagination
                            :total="totalItems"
                            :current.sync="currentItemPage"
                            order="is-centered"
                            size="is-medium"
                            :per-page="perPage"
                            @change="onPagItemChange">
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
            },
            totalShops() {
                return this.loadedShops.length
            },
            totalItems() {
                return this.loadedItems.length
            },
            displayedShops() {
                switch(this.sortShopType) {
                    case "Mới nhất":
                        this.loadedShops = this.loadedShops.sort((a, b) => Date.parse(b.updatedDate) - Date.parse(a.updatedDate))
                        break
                    case "Cũ nhất":
                        this.loadedShops = this.loadedShops.sort((a, b) => Date.parse(a.updatedDate) - Date.parse(b.updatedDate))
                        break
                }
                return this.loadedShops.slice((this.currentShopPage-1)*this.perPage, this.currentShopPage*this.perPage)
            },
            displayedItems() {
                switch(this.sortItemType) {
                    case "Mới nhất":
                        this.loadedItems = this.loadedItems.sort((a, b) => Date.parse(b.updatedDate) - Date.parse(a.updatedDate))
                        break
                    case "Cũ nhất":
                        this.loadedItems = this.loadedItems.sort((a, b) => Date.parse(a.updatedDate) - Date.parse(b.updatedDate))
                        break
                    case "Giá thấp":
                        this.loadedItems = this.loadedItems.sort((a, b) => Date.parse(a.price) - Date.parse(b.price))
                        break
                    case "Giá cao":
                        this.loadedItems = this.loadedItems.sort((a, b) => Date.parse(b.price) - Date.parse(a.price))
                        break
                }
                return this.loadedItems.slice((this.currentItemPage-1)*this.perPage, this.currentItemPage*this.perPage)
            }
        },
        async asyncData({ store, query, error }) {
            try {
                let  loadedShops, loadedItems = []
                const searchTarget = query.target
                const searchKey = query.key
                if(searchTarget === "shop") {
                    loadedShops = await store.dispatch('loadSearchShops', searchKey)
                }else if (searchTarget === "item") {
                    loadedItems = await store.dispatch('loadSearchItems', searchKey)
                }
                return {
                    searchTarget: searchTarget,
                    searchKey: searchKey,
                    loadedShops: loadedShops,
                    loadedItems: loadedItems 
                }
            }catch(e) {
                console.log('[ERROR-query/search]', e)
                error({ statusCode: 500, message: 'Lỗi loadSearchShops hoặc loadSearchItems' })
            }
        },
        data() {
            return {
                sortShopTypes: sortShopTypes,
                sortItemTypes: sortItemTypes,
                sortShopType: 'Mới nhất',
                sortItemType: 'Mới nhất',

                currentShopPage: 1,
                currentItemPage: 1,
                perPage: 6,
            }
        },
        methods: {
            onPagShopChange(pageCount) {
                this.currentShopPage = pageCount
            },
            onPagItemChange(pageCount) {
                this.currentItemPage = pageCount
            },
        }
    }
</script>