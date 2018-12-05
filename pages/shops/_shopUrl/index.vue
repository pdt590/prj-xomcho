<template>
    <div class="container" style="margin-top: 1rem">
        <div class="columns">
            <div class="column is-3" >
                <!-- for mobile -->
                <div class="card is-hidden-tablet" v-if="loadedShop.coverImage">
                    <div class="card-image">
                        <figure class="image is-3by1">
                            <img :src="loadedShop.coverImage.url" alt="shop_cover">
                        </figure>
                    </div>
                </div>
                <!--  -->
                <div style="position: sticky; top: 8rem;">   
                    <div class="card is-hidden-mobile">
                        <div class="card-content">
                            <div class="v-shop-title">
                                <figure class="image is-128x128">
                                    <img :src="loadedShop.logoImage ? loadedShop.logoImage.url : `/icon-photo.png`" alt="shop_logo">
                                </figure>
                                <br>
                                <h5 class="title is-size-5">{{loadedShop.title}}</h5>
                                <b-radio-button v-if="user"
                                    v-model="isSaved"
                                    :native-value="true"
                                    type="is-danger">
                                    <b-icon icon="bookmark-outline" style="margin-left: 0.2rem; color: #AAA"></b-icon>
                                </b-radio-button>
                                <b-radio-button v-else
                                    v-model="isModalJoinActive"
                                    :native-value="true"
                                    type="is-danger">
                                    <b-icon icon="bookmark-outline" style="margin-left: 0.2rem; color: #AAA"></b-icon>
                                </b-radio-button>
                            </div>
                            
                            <hr>
                            <!-- <div class="menu">
                                <p class="menu-label" style="font-size: 0.9rem">
                                    Miêu tả
                                </p>
                                <ul class="menu-list">
                                    <li>
                                        <a class="v-wrap-text">{{loadedShop.description}}</a>
                                    </li>
                                </ul>
                            </div> -->
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
                                    <li v-if="loadedShop.facebook">
                                        <a class="v-list-item" :href="loadedShop.facebook" target=_blank>
                                            <b-icon icon="facebook-box"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.facebook | fmFacebook}}</span>
                                        </a></li>
                                    <li v-if="loadedShop.email">
                                        <a class="v-list-item" :href="`mailto:${loadedShop.email}` + `?Subject=Xin%20Chào%20${loadedShop.title}`">
                                            <b-icon icon="email"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.email}}</span> 
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <hr v-if="user">
                            <div class="buttons" v-if="user">
                                <nuxt-link class="button is-info is-rounded is-outlined is-fullwidth" :to="`/shops/${$route.params.shopUrl}/edit-shop`">
                                    <b-icon icon="settings-outline" size="is-small"></b-icon>
                                    <span>Chỉnh sửa</span>
                                </nuxt-link>
                            
                                <nuxt-link class="button is-info is-rounded is-outlined is-fullwidth" 
                                    :to="`/shops/${$route.params.shopUrl}/new-item`">
                                    <b-icon icon="plus-box-outline" size="is-small"></b-icon>
                                    <span>Thêm sản phẩm</span>
                                </nuxt-link>
                            </div>
                            <hr v-if="loadedShop.itemTypes">
                            <div class="menu">
                                <p class="menu-label" style="font-size: 0.9rem">
                                    Danh mục sản phẩm
                                </p>
                                <ul class="menu-list">
                                    <li v-for="(type, i) in loadedShop.itemTypes" :key="i">
                                        <a class="v-wrap-text" @click="displayType = type">{{type}}</a>
                                    </li>
                                </ul>
                            </div>   
                        </div>
                    </div>
                    <!-- for mobile -->
                    <b-collapse class="card is-hidden-tablet" :open="false">
                        <header class="card-header" slot="trigger" slot-scope="props">
                            <p class="card-header-title">
                                <b-icon icon="information-outline" size="is-small"></b-icon>&nbsp;<span class="has-text-grey">{{loadedShop.title}}</span>
                            </p>
                            <p class="card-header-icon">
                                <b-icon
                                    :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="v-shop-title">
                                <figure class="image is-128x128">
                                    <img :src="loadedShop.logoImage ? loadedShop.logoImage.url : `/icon-photo.png`" alt="shop_logo">
                                </figure>
                                <h5 class="title is-size-5">{{loadedShop.title}}</h5>
                                <b-radio-button
                                    native-value="Yep"
                                    type="is-danger">
                                    <b-icon icon="bookmark-outline" style="margin-left: 0.2rem; color: #AAA"></b-icon>
                                </b-radio-button>
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
                                    <li v-if="loadedShop.facebook">
                                        <a class="v-list-item" :href="loadedShop.facebook" target=_blank>
                                            <b-icon icon="facebook-box"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.facebook | fmFacebook}}</span>
                                        </a></li>
                                    <li v-if="loadedShop.email">
                                        <a class="v-list-item" :href="`mailto:${loadedShop.email}` + `?Subject=Xin%20Chào%20${loadedShop.title}`">
                                            <b-icon icon="email"></b-icon>&nbsp;&nbsp;<span>{{loadedShop.email}}</span> 
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <hr v-if="user">
                            <div class="buttons" v-if="user">
                                <nuxt-link class="button is-info is-rounded is-outlined is-fullwidth" :to="`/shops/${$route.params.shopUrl}/edit-shop`">
                                    <b-icon icon="settings-outline" size="is-small"></b-icon>
                                    <span>Chỉnh sửa</span>
                                </nuxt-link>
                                <nuxt-link class="button is-info is-rounded is-outlined is-fullwidth" 
                                    :to="`/shops/${$route.params.shopUrl}/new-item`">
                                    <b-icon icon="plus-box-outline" size="is-small"></b-icon>
                                    <span>Thêm sản phẩm</span>
                                </nuxt-link>
                            </div>
                            <!-- <hr v-if="loadedShop.itemTypes">
                            <b-field grouped group-multiline v-if="loadedShop.itemTypes">
                                <div class="control" v-for="(type, i) in loadedShop.itemTypes" :key="i">
                                    <b-tag size="is-medium" rounded>{{type}}</b-tag>
                                </div>
                            </b-field> -->
                        </div>
                    </b-collapse>
                    <!--  -->
                </div> 
            </div>
            <div class="column is-9">
                <div class="card is-hidden-mobile" v-if="loadedShop.coverImage">
                    <div class="card-image">
                        <figure class="image is-3by1">
                            <img :src="loadedShop.coverImage.url" alt="shop_cover">
                        </figure>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <b-field grouped group-multiline>
                            <b-field label="Sắp xếp">
                                <b-select v-model="sortType" placeholder="Sắp xếp">
                                    <option v-for="(type, i) in sortTypes" :key="i">{{type}}</option>
                                </b-select>
                            </b-field>
                            <b-field label="Danh mục">
                                <b-select  v-model="displayType" placeholder="Danh mục sản phẩm">
                                    <option value="Tất cả">Tất cả</option>
                                    <option v-for="(type, i) in loadedShop.itemTypes" :key="i">{{type}}</option>
                                </b-select>
                            </b-field>
                        </b-field>
                        <div class="columns is-multiline is-variable is-4" style="padding-top: 1rem">
                            <div class="column is-one-third-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd" 
                                v-for="(item, i) in loadedItems" :key="i">
                                <v-card-item-4shop class="is-hidden-mobile" :itemData="item" />
                                <v-card-item-mobile-4shop class="is-hidden-tablet" :itemData="item" />
                            </div>
                        </div>
                        <b-pagination
                            :total="total"
                            :current.sync="current"
                            :order="order"
                            size="is-small"
                            :simple="isSimple"
                            :rounded="isRounded"
                            :per-page="perPage">
                        </b-pagination>
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
    import { sortTypes } from '~/plugins/utility-lists'
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters(['user','loadedShop', 'loadedItems'])
        },
        async fetch({ store, params, error }) {
            try {
                if(process.client) {
                    if(!store.getters.loadedShop) { 
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
            } catch(error) {
                console.log('[ERROR-shops/shopUrl]', error)
                error({ statusCode: 500, message: '...Lỗi'})
            }
            if(!store.getters.loadedShop) {
                console.log('[ERROR-shops/shopUrl]', 'Cannot load shop')
                error({ statusCode: 404, message: 'Cannot load shop'})
            }
        },
        data() {
            return {
                total: 200,
                current: 1,
                perPage: 20,
                order: 'is-centered',
                isSimple: false,
                isRounded: false,
                sortTypes: sortTypes,
                sortType: 'Mới nhất',
                displayType: 'Tất cả',
                isModalJoinActive: false,
                isSaved: true,
                isDescriptionOpen: true
            }
        },
        head () {
            return {
                title: this.loadedShop.title,
                meta: [
                    { hid: 'description', name: 'description', content: this.loadedShop.description }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        border-radius: 0.3rem;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.1);
        margin-bottom: 0.5rem;
    }
    .v-shop-title {
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center
    }
    .v-list-item {
        display: flex; 
        align-items: center; 
        margin-bottom: 0.5rem;
    }
    .v-wrap-text {
        word-wrap: break-word;
        white-space: pre-wrap;
    }
</style>
