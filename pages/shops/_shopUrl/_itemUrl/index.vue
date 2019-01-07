<template>
    <div class="container">
        <div class="columns">
            <div class="column is-3" >
                <div style="position: sticky; top: 8rem;">   
                    <div class="card is-hidden-mobile">
                        <div class="card-content" v-if="loadedShop">
                            <div class="level">
                                <div class="level-item">
                                    <nuxt-link :to="`/shops/${$route.params.shopUrl}`">
                                        <figure class="image v-image-border">
                                            <no-ssr>
                                                <img class="v-shop-logo" v-lazy="loadedShop.logoImage ? loadedShop.logoImage.url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                                            </no-ssr>
                                        </figure>
                                    </nuxt-link>
                                </div>
                            </div>
                            <div class="has-text-centered">
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
                            <hr v-if="user && user.id === loadedShop._creator.id">
                            <nuxt-link class="button is-info is-rounded is-outlined" 
                                :to="`/shops/${$route.params.shopUrl}/new-item`"
                                v-if="user && user.id === loadedShop._creator.id">
                                <b-icon icon="plus-box-outline" size="is-small"></b-icon>
                                <strong>Thêm sản phẩm</strong>
                            </nuxt-link>
                        </div>
                    </div>
                    <!-- for mobile -->
                    <b-collapse class="card is-hidden-tablet" :open="false">
                        <header class="card-header" slot="trigger" slot-scope="props">
                            <p class="card-header-title">
                                <b-icon icon="information-outline"></b-icon>&nbsp;<span>Thông tin cửa hàng</span>
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
                                    <nuxt-link :to="`/shops/${$route.params.shopUrl}`">
                                        <figure class="image v-image-border">
                                            <no-ssr>
                                                <img class="v-shop-logo" v-lazy="loadedShop.logoImage ? loadedShop.logoImage.url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                                            </no-ssr>
                                        </figure>
                                    </nuxt-link>
                                </div>
                            </div>
                            <div class="has-text-centered">
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
                            <hr v-if="user && user.id === loadedShop._creator.id">
                            <div class="level">
                                <div class="level-item">
                                    <nuxt-link class="button is-info is-rounded is-outlined" 
                                        :to="`/shops/${$route.params.shopUrl}/new-item`"
                                        v-if="user && user.id === loadedShop._creator.id">
                                        <b-icon icon="plus-box-outline" size="is-small"></b-icon>
                                        <strong>Thêm sản phẩm</strong>
                                    </nuxt-link>
                                </div>
                            </div>
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
                                <v-image-frame :images="loadedItem.images"></v-image-frame>
                            </div>
                            <div class="column is-7" >
                                <div class="v-item-description">
                                    <h4 class="title is-size-4 is-spaced">{{loadedItem.title}} <span class="has-text-danger" v-if="!loadedItem.isAvailable">(Hết hàng)</span></h4>
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
                                    <hr>
                                    <div class="menu">
                                        <p class="menu-label" style="font-size: 0.9rem">
                                            Giá
                                        </p>
                                        <ul class="menu-list">
                                            <li>
                                                <a v-if="isSale">
                                                    <p class="title is-4 has-text-danger">
                                                        {{loadedItem.price | fmPrice}} {{loadedItem.currency}}<span class="is-size-5 has-text-dark" v-if="loadedItem.note">&nbsp; &bull; {{loadedItem.note}}</span>
                                                    </p>
                                                    <p class="subtitle is-6 has-text-grey-light">
                                                        <strike>{{loadedItem.oldPrice | fmPrice}} {{loadedItem.currency}}</strike>&nbsp;&nbsp;<span>{{Math.floor((loadedItem.oldPrice - loadedItem.price)*-100/loadedItem.oldPrice)}}%</span>
                                                    </p>
                                                </a>
                                                <a v-else>
                                                    <p class="title is-4 has-text-danger">
                                                        {{loadedItem.price | fmPrice}} {{loadedItem.currency}}<span class="is-size-5 has-text-dark" v-if="loadedItem.note">&nbsp; &bull; {{loadedItem.note}}</span>
                                                    </p>
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
                                    <div class="level" v-if="loadedItem.isAvailable">
                                        <div class="level-left">
                                            <b-field grouped group-multiline v-if="!user || user && user.id !== loadedItem._creator.id">
                                                <div class="control">
                                                    <b-field>
                                                        <div class="control">
                                                            <button class="button is-rounded is-outlined" @click="unit>1 ? unit=unit-1 : ``">-</button>
                                                        </div>
                                                        <b-input type="number" style="max-width: 3rem" v-model.number="unit"></b-input>
                                                        <p class="control">
                                                            <span class="button is-static">{{$options.filters.fmPrice(unit*loadedItem.price)}} {{loadedItem.currency}}</span>
                                                        </p>
                                                        <div class="control">
                                                            <button class="button is-rounded is-outlined" @click="unit=unit+1">+</button>
                                                        </div>
                                                    </b-field>
                                                </div>
                                            </b-field>
                                        </div>
                                        
                                        <div class="level-right">
                                            <a class="button is-info is-rounded is-outlined"
                                                v-if="!user || user && user.id !== loadedItem._creator.id"
                                                @click="isModalSaleActive=true">
                                                <b-icon icon="shopping"></b-icon>
                                                <strong>Mua hàng</strong>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="level">
                                        <div class="level-left"></div>
                                        <div class="level-right">
                                            <div class="buttons">
                                                <a class="button is-info is-rounded is-outlined"
                                                    @click="onSave"
                                                    v-if="!user || user && user.id !== loadedShop._creator.id">
                                                    <b-icon icon="heart" :type="isSaved ? `is-danger` : ``"></b-icon>
                                                    <strong>{{isSaved ? 'Hủy lưu' : 'Lưu'}}</strong>
                                                </a>
                                                <a class="button is-info is-rounded is-outlined" 
                                                    :href="`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/shops/${$route.params.shopUrl}/${$route.params.itemUrl}`" 
                                                    target="_blank">
                                                    <b-icon icon="share-variant"></b-icon>
                                                    <strong>Chia sẻ</strong>
                                                </a>
                                                <nuxt-link class="button is-rounded is-outlined" 
                                                    :to="`/shops/${$route.params.shopUrl}/${$route.params.itemUrl}/edit-item`"
                                                    v-if="user && user.id === loadedShop._creator.id">
                                                    <b-icon icon="settings-outline"></b-icon>
                                                    <strong>Chỉnh sửa</strong>
                                                </nuxt-link>
                                            </div>
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
                        <div class="fb-comments" :data-href="`${baseUrl}/shops/${$route.params.shopUrl}/${$route.params.itemUrl}`" data-numposts="5" data-width="100%"></div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal :active.sync="isModalSaleActive" has-modal-card>
            <v-modal-sale :itemData="loadedItem" :unit= "unit" />
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
            ...mapGetters(['user', 'bmItems', 'loadedShop']),
            loadedItem() {
                return this.$store.getters.loadedItem(this.$route.params.itemUrl)
            },
            isSale() {
                return (this.loadedItem.oldPrice && Number(this.loadedItem.oldPrice) > Number(this.loadedItem.price) ? true : false)
            },
            fbName() {
                return this.$options.filters.fmFacebook(this.loadedShop.fbUrl)
            },
            isSaved() {
                return this.bmItems.find(bmItem => bmItem.url === this.loadedItem.url)
            }
        },
        async fetch({ store, params, error }) {
            try{
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
                console.log('[ERROR-shops/shopUrl/itemUrl]', e)
                error({ statusCode: 500, message: 'Lỗi loadShop và loadItems'})
            } 
        },
        data() {
            return {
                isModalSaleActive: false, 
                unit:  1,
                baseUrl: process.env.baseUrl,

                isModalJoinActive: false
            }
        },
        methods: {
            async onSave() {
                if(this.user && !this.isSaved) {
                    await this.$store.dispatch('addBmItem', this.loadedItem.url)
                }else if(this.user && this.isSaved) {
                    await this.$store.dispatch('removeBmItem', this.isSaved.id)
                }else {
                    this.isModalJoinActive = true
                }
            }
        },
        head () {
            return {
                title: this.loadedItem.title,
                meta: [
                    { hid: 'description', name: 'description', content: this.loadedItem.description },
                    { hid: 'og-url', property: 'og:url', content: `${process.env.baseUrl}${this.$route.path}` },
                    { hid: 'og-title', property: 'og:title', content: this.loadedItem.title },
                    { hid: 'og-description', property: 'og:description', content: this.loadedItem.description },
                    { hid: 'og-image', property: 'og:image', content: this.loadedItem.images[0].url },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
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
</style>
