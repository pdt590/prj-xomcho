<template>
    <div class="container" style="margin-top: 1rem">
        <div class="columns">
            <div class="column is-3" >
                <div style="position: sticky; top: 8rem;">   
                    <div class="card is-hidden-mobile">
                        <div class="card-content">
                            <div class="v-shop-title">
                                <nuxt-link class="" :to="`/shops/${$route.params.shopUrl}`">
                                    <figure class="image is-128x128">
                                        <img :src="loadedShop.logoImage ? `/icon-photo.png` : `/icon-photo.png`" alt="shop_logo">
                                    </figure>
                                </nuxt-link>
                                <br>
                                <h5 class="title is-size-5">{{loadedShop.title}}</h5>
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
                            <hr>
                            <nuxt-link class="button is-info is-rounded is-outlined is-fullwidth" 
                                :to="`/shops/${$route.params.shopUrl}/new-item`"
                                v-if="user">
                                <b-icon icon="plus-box-outline" size="is-small"></b-icon>
                                <span>Thêm sản phẩm</span>
                            </nuxt-link>
                        </div>
                    </div>
                    <!-- for mobile -->
                    <b-collapse class="card is-hidden-tablet" :open="false">
                        <header class="card-header" slot="trigger" slot-scope="props">
                            <p class="card-header-title">
                                <b-icon icon="information-outline"></b-icon>&nbsp;<span>Thông tin</span>
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
                                    <nuxt-link class="has-text-centered" :to="`/shops/${$route.params.shopUrl}`">
                                        <figure class="image is-128x128">
                                            <img :src="loadedShop.logoImage ? `/icon-photo.png` : `/icon-photo.png`" alt="shop_logo">
                                        </figure>
                                        <h5 class="title is-size-5">{{loadedShop.title}}</h5>
                                    </nuxt-link>
                                </div>
                                <div class="buttons level-item">
                                    <a class="button is-outlined" 
                                        :href="`https://maps.google.com/?q=${loadedShop.address}+${loadedShop.province}`" target=_blank>
                                        <b-icon icon="map-marker"></b-icon>
                                    </a>
                                    <a class="button is-outlined" 
                                        :href="`tel:${loadedShop.phone}`">
                                        <b-icon icon="cellphone"></b-icon>
                                    </a>
                                    <a class="button is-outlined" 
                                        :href="loadedShop.facebook" target=_blank
                                        v-if="loadedShop.facebook">
                                        <b-icon icon="facebook-box"></b-icon>
                                    </a>
                                    <a class="button is-outlined" 
                                        :href="`mailto:${loadedShop.email}` + `?Subject=Xin%20Chào%20${loadedShop.title}`"
                                        v-if="loadedShop.email">
                                        <b-icon icon="email"></b-icon>
                                    </a>
                                </div> 
                            </div>
                            <hr>
                            <nuxt-link class="button is-info is-rounded is-outlined is-fullwidth" 
                                :to="`/shops/${$route.params.shopUrl}/new-item`"
                                v-if="user">
                                <b-icon icon="plus-box-outline" size="is-small"></b-icon>
                                <span>Thêm sản phẩm</span>
                            </nuxt-link>
                        </div>
                    </b-collapse>
                    <!--  -->
                </div>
            </div>
            <div class="column is-9">
                <div class="card">
                    <div class="card-content">
                        <div class="columns is-gapless">
                            <div class="column is-5">
                                <v-image-frame></v-image-frame>
                            </div>
                            <div class="column is-7" >
                                <div class="v-item-description">
                                    <h4 class="title is-size-4 is-spaced">{{loadedItem.title}}</h4>
                                    <b-field grouped group-multiline>
                                        <div class="control" v-if="loadedItem.brand">
                                            <b-taglist attached>
                                                <b-tag type="is-dark" rounded>Thương hiệu</b-tag>
                                                <b-tag type="is-success" rounded>{{loadedItem.brand}}</b-tag>
                                            </b-taglist>
                                        </div>
                                        <div class="control">
                                            <b-taglist attached>
                                                <b-tag type="is-dark" rounded>Danh mục</b-tag>
                                                <b-tag type="is-success" rounded>{{loadedItem.type}}</b-tag>
                                            </b-taglist>
                                        </div>
                                    </b-field>
                                    <!-- <div class="level-item has-text-grey-light">
                                        <b-icon icon="eye-outline" size="is-small"></b-icon>&nbsp;200
                                        <b-icon icon="comment-processing-outline" size="is-small" style="margin-left: 1rem"></b-icon>&nbsp;20
                                    </div> -->
                                    <hr>
                                    <div class="menu">
                                        <p class="menu-label" style="font-size: 0.9rem">
                                            Giá
                                        </p>
                                        <ul class="menu-list">
                                            <li>
                                                <a v-if="loadedItem.salePrice">
                                                    <h4 class="title is-4 has-text-danger">
                                                        {{loadedItem.salePrice | fmPrice}} {{loadedItem.currency}}<span class="is-size-5 has-text-dark">&nbsp;({{loadedItem.unit}})</span>
                                                    </h4>
                                                    <h5 class="subtitle is-6 has-text-grey-light">
                                                        <strike>{{loadedItem.price | fmPrice}} {{loadedItem.currency}}</strike>&nbsp;&nbsp;<span>{{(loadedItem.price - loadedItem.salePrice)*-100/loadedItem.price}} %</span>
                                                    </h5>
                                                </a>
                                                <a v-else>
                                                    <h4 class="title is-4 has-text-danger">
                                                        {{loadedItem.price | fmPrice}} {{loadedItem.currency}}<span class="is-size-5 has-text-dark">&nbsp;({{loadedItem.unit}})</span>
                                                    </h4>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr>
                                    <div class="menu">
                                        <p class="menu-label" style="font-size: 0.9rem">
                                            Miêu tả
                                        </p>
                                        <ul class="menu-list">
                                            <li>
                                                <a class="v-wrap-text">{{loadedItem.description}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr>
                                    <div class="level">
                                        <div class="level-left">
                                            <div class="field is-grouped">
                                                <div class="control">
                                                    <a class="button is-rounded is-info is-outlined" 
                                                        @click="isModalSaleActive=true">
                                                        <b-icon icon="shopping"></b-icon>
                                                        <span>Mua hàng</span>
                                                    </a>
                                                </div>
                                                <div class="control">
                                                    <a class="button is-rounded is-danger is-outlined"
                                                        @click="isModalJoinActive=true">
                                                        <b-icon icon="heart-outline"></b-icon>
                                                        <span>Lưu sản phẩm</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="level-right" v-if="user">
                                            <nuxt-link class="button is-rounded is-outlined" 
                                                :to="`/shops/${$route.params.shopUrl}/${$route.params.itemUrl}/edit-item`"
                                                v-if="user">
                                                <b-icon icon="settings-outline"></b-icon>
                                                <span>Chỉnh sửa</span>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div id="fb-root"></div>
                        <div class="fb-comments" :data-href="`http://localhost:3000/shops/${$route.params.shopUrl}/${$route.params.itemUrl}`" data-numposts="5" data-width="100%"></div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal :active.sync="isModalSaleActive" has-modal-card>
            <v-modal-sale />
        </b-modal>
        <b-modal :active.sync="isModalJoinActive" has-modal-card>
            <v-modal-join />
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        mounted() {
            this.$initFbSDK()
        },
        computed: {
            ...mapGetters(['user', 'loadedShop']),
            loadedItem() {
                return this.$store.getters.loadedItem(this.$route.params.itemUrl)
            }
        },
        async fetch({ store, params, error }) {
            try{
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
                console.log('[ERROR-shops/shopUrl/itemUrl]', error)
                error({ statusCode: 500, message: '...Lỗi'})
            } 
            if(!store.getters.loadedItem(params.itemUrl)) {
                console.log('[ERROR-shops/shopUrl/itemUrl]', 'Cannot load item')
                error({ statusCode: 404, message: 'Cannot load item'})
            }
        },
        data() {
            return {
                isModalSaleActive: false,
                isModalJoinActive: false
            }
        },
        head () {
            return {
                title: this.loadedItem.title,
                meta: [
                    { hid: 'description', name: 'description', content: this.loadedItem.description }
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
    @media screen and (min-width: 768px) {
        .v-item-description {
            padding: 0 1.5rem
        }
    }
    @media screen and (max-width: 768px) {
        .v-item-description {
            padding-top: 1rem;
        }
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
