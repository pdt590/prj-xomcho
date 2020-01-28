<template>
    <div class="container">
        <div class="columns">
            <div class="column is-3" >
                <!-- for mobile -->
                <div class="card is-hidden-tablet" v-if="loadedShop.coverImage">
                    <div class="card-image">
                        <figure class="image is-16by9">
                            <client-only>
                                <img class="v-image-cover" v-lazy="loadedShop.coverImage.url" style='display: none' onload="this.style.display = 'block'" alt="shop_cover">
                            </client-only>
                        </figure>
                    </div>
                </div>
                <!--  -->

                <div style="position: sticky; top: 8rem;">   
                    <div class="card is-hidden-mobile">
                        <div class="card-content" v-if="loadedShop">
                            <div class="level">
                                <div class="level-item">
                                    <figure class="image v-image-border">
                                        <client-only>
                                            <img class="v-shop-logo" v-lazy="loadedShop.logoImage ? loadedShop.logoImage.url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                                        </client-only>
                                    </figure>
                                </div>
                            </div>
                            <div class="has-text-centered">
                                <h5 class="title is-size-5">{{loadedShop.title}}</h5>
                            </div>
                            <hr>
                            <div class="menu">
                                <div class="menu-label" style="font-size: 0.9rem" @click="isDescriptionOpen = !isDescriptionOpen">
                                    <a class="has-text-grey">Miêu tả</a>
                                    <b-icon icon="information-outline" size="is-small"></b-icon>
                                </div>
                                <b-collapse :open.sync="isDescriptionOpen">
                                    <ul class="menu-list">
                                        <li>
                                            <a class="v-wrap-text">{{loadedShop.description}}</a>
                                        </li>
                                    </ul>
                                </b-collapse>
                            </div>
                            <hr>
                            <div class="menu">
                                <p class="menu-label" style="font-size: 0.9rem">
                                    Liên hệ
                                </p>
                                <ul class="menu-list">
                                    <li>
                                        <a class="v-list-item" :href="`https://maps.google.com/?q=${loadedShop.address}+${loadedShop.province}`" target=_blank>
                                            <b-icon icon="map-marker"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.address}}, {{loadedShop.province}}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="v-list-item" :href="`tel:${loadedShop.phone}`"><b-icon icon="cellphone">
                                            </b-icon>&nbsp;&nbsp;<span>{{loadedShop.phone}}</span>
                                        </a>
                                    </li>
                                    <li v-if="loadedShop.email">
                                        <a class="v-list-item" :href="`mailto:${loadedShop.email}` + `?Subject=Xin%20Chào%20${loadedShop.title}`">
                                            <b-icon icon="email"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.email}}</span> 
                                        </a>
                                    </li>
                                    <li v-if="loadedShop.webUrl">
                                        <a class="v-list-item" :href="loadedShop.webUrl" target=_blank>
                                            <b-icon icon="web"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.webUrl | fmString(30)}}</span>
                                        </a>
                                    </li>
                                    <li v-if="loadedShop.fbUrl">
                                        <a class="v-list-item" :href="loadedShop.fbUrl" target=_blank>
                                            <b-icon icon="facebook-box"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.fbName ? loadedShop.fbName : fbName}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <hr v-if="loadedShop.itemTypes">
                            <div class="menu">
                                <p class="menu-label" style="font-size: 0.9rem">
                                    Danh mục sản phẩm
                                </p>
                                <ul class="menu-list">
                                    <li v-for="(type, i) in loadedShop.itemTypes" :key="i">
                                        <a class="v-wrap-text" @click="displayItemType = type">🌱 {{type}}</a>
                                    </li>
                                </ul>
                            </div>
                            <hr>
                            <div class="buttons">
                                <a class="button is-info is-rounded is-outlined" 
                                    :href="`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/shops/${$route.params.shopUrl}`" 
                                    target="_blank">
                                    <b-icon icon="share-variant"></b-icon>
                                    <strong>Chia sẻ</strong>
                                </a>
                                <a class="button is-info is-rounded is-outlined"
                                    @click="onSave"
                                    v-if="!user || user && user.id !== loadedShop._creator.id">
                                    <b-icon icon="bookmark" :type="isSaved ? `is-danger` : ``"></b-icon>
                                    <strong>{{isSaved ? 'Hủy lưu' : 'Lưu'}} </strong>
                                </a>
                                <nuxt-link class="button is-info is-rounded is-outlined" 
                                    :to="`/shops/${$route.params.shopUrl}/edit-shop`"
                                    v-if="user && user.id === loadedShop._creator.id">
                                    <b-icon icon="settings-outline" size="is-small"></b-icon>
                                    <strong>Chỉnh sửa</strong>
                                </nuxt-link>
                                <nuxt-link class="button is-info is-rounded is-outlined" 
                                    :to="`/shops/${$route.params.shopUrl}/new-item`"
                                    v-if="user && user.id === loadedShop._creator.id">
                                    <b-icon icon="plus-box-outline" size="is-small"></b-icon>
                                    <strong>Thêm sản phẩm</strong>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>

                    <!-- for mobile -->
                    <b-collapse class="card is-hidden-tablet" :open="true">
                        <header class="card-header" slot="trigger" slot-scope="props">
                            <p class="card-header-title">
                                <b-icon icon="store"></b-icon>&nbsp;<span class="has-text-grey">{{loadedShop.title}}</span>
                            </p>
                            <p class="card-header-icon">
                                <b-icon
                                    :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="level">
                                <div class="level-item">
                                    <figure class="image v-image-border">
                                        <client-only>
                                            <img class="v-shop-logo" v-lazy="loadedShop.logoImage ? loadedShop.logoImage.url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                                        </client-only>
                                    </figure>
                                </div>
                            </div>
                            <div class="has-text-centered">
                                <h5 class="title is-size-5">{{loadedShop.title}}</h5> 
                            </div>
                            <hr>
                            <div class="menu">
                                <p class="menu-label" style="font-size: 0.9rem">
                                    Miêu tả
                                </p>
                                <ul class="menu-list">
                                    <li>
                                        <a class="v-wrap-text">{{loadedShop.description}}</a>
                                    </li>
                                </ul>
                            </div>
                            <hr>
                            <div class="menu">
                                <p class="menu-label" style="font-size: 0.9rem">
                                    Liên hệ
                                </p>
                                <ul class="menu-list">
                                    <li>
                                        <a class="v-list-item" :href="`https://maps.google.com/?q=${loadedShop.address}+${loadedShop.province}`" target=_blank>
                                            <b-icon icon="map-marker"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.address}}, {{loadedShop.province}}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="v-list-item" :href="`tel:${loadedShop.phone}`"><b-icon icon="cellphone">
                                            </b-icon>&nbsp;&nbsp;<span>{{loadedShop.phone}}</span>
                                        </a>
                                    </li>
                                    <li v-if="loadedShop.email">
                                        <a class="v-list-item" :href="`mailto:${loadedShop.email}` + `?Subject=Xin%20Chào%20${loadedShop.title}`">
                                            <b-icon icon="email"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.email}}</span> 
                                        </a>
                                    </li>
                                    <li v-if="loadedShop.webUrl">
                                        <a class="v-list-item" :href="loadedShop.webUrl" target=_blank>
                                            <b-icon icon="web"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.webUrl | fmString(30)}}</span>
                                        </a>
                                    </li>
                                    <li v-if="loadedShop.fbUrl">
                                        <a class="v-list-item" :href="loadedShop.fbUrl" target=_blank>
                                            <b-icon icon="facebook-box"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.fbName ? loadedShop.fbName : fbName}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <hr>
                            <div class="buttons">
                                <a class="button is-info is-rounded is-outlined" 
                                    :href="`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/shops/${$route.params.shopUrl}`" 
                                    target="_blank">
                                    <b-icon icon="share-variant"></b-icon>
                                    <strong>Chia sẻ</strong>
                                </a>
                                <a class="button is-info is-rounded is-outlined"
                                    @click="onSave"
                                    v-if="!user || user && user.id !== loadedShop._creator.id">
                                    <b-icon icon="bookmark" :type="isSaved ? `is-danger` : ``"></b-icon>
                                    <strong>{{isSaved ? 'Hủy lưu' : 'Lưu'}} </strong>
                                </a>
                                <nuxt-link class="button is-info is-rounded is-outlined" 
                                    :to="`/shops/${$route.params.shopUrl}/edit-shop`"
                                    v-if="user && user.id === loadedShop._creator.id">
                                    <b-icon icon="settings-outline" size="is-small"></b-icon>
                                    <strong>Chỉnh sửa</strong>
                                </nuxt-link>
                                <nuxt-link class="button is-info is-rounded is-outlined" 
                                    :to="`/shops/${$route.params.shopUrl}/new-item`"
                                    v-if="user && user.id === loadedShop._creator.id">
                                    <b-icon icon="plus-box-outline" size="is-small"></b-icon>
                                    <strong>Thêm sản phẩm</strong>
                                </nuxt-link>
                            </div>
                        </div>
                    </b-collapse>
                    <!--  -->
                </div> 
            </div>
            <div class="column is-9">
                <div class="card is-hidden-mobile" v-if="loadedShop.coverImage">
                    <div class="card-image">
                        <figure class="image is-3by1">
                            <client-only>
                                <img class="v-image-cover" v-lazy="loadedShop.coverImage.url" style='display: none' onload="this.style.display = 'block'" alt="shop_cover">
                            </client-only>
                        </figure>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <b-field grouped group-multiline>
                            <b-field label="Sắp xếp">
                                <b-select v-model="sortItemType" placeholder="Sắp xếp">
                                    <option v-for="(type, i) in sortItemTypes" :key="i">{{type}}</option>
                                </b-select>
                            </b-field>
                            <b-field label="Danh mục">
                                <b-select  v-model="displayItemType" placeholder="Danh mục sản phẩm">
                                    <option value="Tất cả">Tất cả</option>
                                    <option v-for="(type, i) in loadedShop.itemTypes" :key="i">{{type}}</option>
                                </b-select>
                            </b-field>
                        </b-field>
                        <div class="columns is-multiline is-variable is-4" style="padding-top: 1rem">
                            <div class="column is-one-third-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd" 
                                v-for="item in displayedItems" :key="item.images[0].url">
                                <v-card-item class="is-hidden-mobile" :itemData="item" />
                                <v-card-item-mobile class="is-hidden-tablet" :itemData="item" />
                            </div>
                        </div>
                        <b-pagination
                            :total="totalItem"
                            :current.sync="currentItemPage"
                            order="is-centered"
                            size="is-medium"
                            :per-page="perPage"
                            @change="onPagItemChange">
                        </b-pagination>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div id="fb-root"></div>
                        <div class="fb-comments" :data-href="`${baseUrl}/shops/${$route.params.shopUrl}`" data-numposts="5" data-width="100%"></div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal :active.sync="isModalJoinActive" has-modal-card>
            <v-modal-join />
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { sortItemTypes } from '~/plugins/util-lists'
    import { deepCopy } from '~/plugins/util-helpers'

    export default {
        mounted() {
            this.$initFbSDK()
        },
        computed: {
            ...mapGetters(['user', 'bmShops', 'loadedShop', 'loadedItems']),
            totalItem() {
                return this.loadedItems.length
            },
            displayedItems() {
                let loadedItems = this.loadedItems
                if(this.displayItemType !== "Tất cả") {
                    loadedItems = loadedItems.filter(item => item.type === this.displayItemType)
                }
                switch(this.sortItemType) {
                    case "Mới nhất":
                        loadedItems = loadedItems.sort((a, b) => Date.parse(b.updatedDate) - Date.parse(a.updatedDate))
                        break
                    case "Cũ nhất":
                        loadedItems = loadedItems.sort((a, b) => Date.parse(a.updatedDate) - Date.parse(b.updatedDate))
                        break
                    case "Giá thấp":
                        loadedItems = loadedItems.sort((a, b) => Date.parse(a.price) - Date.parse(b.price))
                        break
                    case "Giá cao":
                        loadedItems = loadedItems.sort((a, b) => Date.parse(b.price) - Date.parse(a.price))
                        break
                }
                return loadedItems.slice((this.currentItemPage-1)*this.perPage, this.currentItemPage*this.perPage)
            },
            fbName() {
                return this.$options.filters.fmFacebook(this.loadedShop.fbUrl)
            },
            isSaved() {
                return this.bmShops.find(bmShop => bmShop.url === this.loadedShop.url)
            }
        },
        async fetch({ store, params, error }) {
            try {
                if(process.client) {
                    if(!store.getters.loadedShop || store.getters.loadedShop.url !== params.shopUrl) { 
                        await Promise.all([
                            store.dispatch('loadShop', params.shopUrl),
                            store.dispatch('loadItems', params.shopUrl)
                        ])
                    }
                }else {
                    await Promise.all([
                        store.dispatch('loadShop', params.shopUrl),
                        store.dispatch('loadItems', params.shopUrl)
                    ])
                }
            } catch(e) {
                console.log('[ERROR-shops/shopUrl]', e)
                error({ statusCode: 500, message: 'Lỗi loadShop và loadItems'})
            }
        },
        data() {
            return {
                isDescriptionOpen: true,
                sortItemTypes: sortItemTypes,
                sortItemType: 'Mới nhất',
                displayItemType: 'Tất cả',

                currentItemPage: 1,
                perPage: 3,

                isModalJoinActive: false,

                baseUrl: process.env.baseUrl,
            }
        },
        methods: {
            onPagItemChange(pageCount) {
                this.currentItemPage = pageCount
            },
            async onSave() {
                if(this.user && !this.isSaved) {
                    await this.$store.dispatch('addBmShop', this.loadedShop.url)
                }else if(this.user && this.isSaved) {
                    await this.$store.dispatch('removeBmShop', this.isSaved.id)
                }else {
                    this.isModalJoinActive = true
                }
            }
        },
        head () {
            return {
                title: this.loadedShop.title,
                meta: [
                    { hid: 'description', name: 'description', content: this.loadedShop.description },
                    { hid: 'og-url', property: 'og:url', content: `${process.env.baseUrl}${this.$route.path}` },
                    { hid: 'og-title', property: 'og:title', content: this.loadedShop.title },
                    { hid: 'og-description', property: 'og:description', content: this.loadedShop.description },
                    { hid: 'og-image', property: 'og:image', content: this.loadedShop.logoImage ? this.loadedShop.logoImage.url : `${process.env.baseUrl}/icon-photo.png`},
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-list-item {
        display: flex; 
        align-items: center; 
        margin-bottom: 0.5rem;
    }
</style>
