<template>
    <div class="container">
        <div class="columns">
            <div class="column is-3">
                <div style="position: sticky; top: 8rem;">  
                    <div class="card">
                        <div class="card-content">
                            <div class="v-username" v-if="user">
                                <nuxt-link :to="`/user/profile`">
                                    <figure class="image v-image-border">
                                        <no-ssr>
                                            <img class="v-user-avatar" v-lazy="user.avatar ? user.avatar.url : `/icon-user.png`" style='display: none' onload="this.style.display = 'block'" alt="user_avatar">
                                        </no-ssr>
                                    </figure> 
                                </nuxt-link> 
                                <br>
                                <h5 class="title is-size-5">{{user.username}}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-9">
                <div class="card">
                    <div class="card-content">
                        <b-tabs type="is-boxed" @change="onTabChange">
                            <b-tab-item>
                                <template slot="header">
                                    <b-icon icon="store"></b-icon>
                                    <span> Cửa hàng </span>
                                </template>
                                <div style="padding-top: 1rem;" v-for="shop in loadedPersonalShops" :key="shop.url">
                                    <v-card-shop-4user :shopData="shop"/>
                                </div>
                            </b-tab-item>

                            <b-tab-item>
                                <template slot="header">
                                    <b-icon icon="shopping"></b-icon>
                                    <span> Sản phẩm </span>
                                </template>
                                <div style="padding-top: 1rem;" v-for="item in loadedPersonalItems" :key="item.url">
                                    <v-card-item-4user :itemData="item"/>
                                </div>
                            </b-tab-item>

                            <b-tab-item>
                                <template slot="header">
                                    <b-icon icon="shopping"></b-icon>
                                    <span> Cửa hàng đã lưu </span>
                                </template>
                                <div style="padding-top: 1rem;" v-for="shop in fullBmShops" :key="shop.url">
                                    <v-card-shop-mobile :shopData="shop"/>
                                </div>
                            </b-tab-item>

                            <b-tab-item>
                                <template slot="header">
                                    <b-icon icon="shopping"></b-icon>
                                    <span> Sản phẩm đã lưu </span>
                                </template>
                                <div style="padding-top: 1rem;" v-for="item in fullBmItems" :key="item.url">
                                    <v-card-item-mobile :itemData="item"/>
                                </div>
                            </b-tab-item>
                        </b-tabs> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        middleware: 'auth',
        computed: {
            ...mapGetters(['user', 'queryLoading', 'loadedPersonalShops', 'loadedPersonalItems', 'fullBmShops', 'fullBmItems']),
        },
        async fetch({ store, error}) {
            try {
                await store.dispatch('loadPersonalShops')
            }catch(e) {
                console.log('[ERROR-user/mgmt]', e)
                error({ statusCode: 500, message: 'Lỗi loadPersonalShops và loadPersonalItems' })
            }
        },
        data() {
            return {
                loadedBmShops: [],
                loadedBmItem: [],
                isItemsLoaded: false,
                isBmItemsLoaded: false,
                isBmShopsLoaded: false
            }
        },
        methods: {
            async onTabChange(tabIndex) {
                if(tabIndex==1 && !this.isItemsLoaded) {
                    await this.$store.dispatch('loadPersonalItems')
                    this.isItemsLoaded = true
                }else if(tabIndex==2 && !this.isBmShopsLoaded) {
                    await this.$store.dispatch('loadFullBmShops')
                    this.isBmShopsLoaded = true
                }else if(tabIndex==3 && !this.isBmItemsLoaded) {
                    await this.$store.dispatch('loadFullBmItems')
                    this.isBmItemsLoaded = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-username {
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center
    }
</style>