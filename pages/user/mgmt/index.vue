<template>
    <div class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <div style="position: sticky; top: 8rem;">  
                        <div class="card">
                            <div class="card-content">
                                <div class="v-shop-title" v-if="user">
                                    <nuxt-link :to="`/user/profile`">
                                        <figure class="image is-128x128">
                                            <img :src="user.avatar ? user.avatar.url : `/icon-user.png`" alt="user_avatar">
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
                            <b-tabs type="is-boxed">
                                <b-tab-item>
                                    <template slot="header">
                                        <b-icon icon="store"></b-icon>
                                        <span> Cửa hàng <b-tag rounded> {{loadedOwnShops.length}}</b-tag> </span>
                                    </template>
                                    <div style="padding-top: 1rem;" v-for="(shop, i) in loadedOwnShops" :key="i">
                                        <v-card-shop-mobile-4user :shopData="shop"/>
                                    </div>
                                </b-tab-item>

                                <b-tab-item label="Sản phẩm">
                                    <template slot="header">
                                        <b-icon icon="shopping"></b-icon>
                                        <span> Cửa hàng <b-tag rounded> {{loadedOwnItems.length}} </b-tag> </span>
                                    </template>
                                    <div style="padding-top: 1rem;" v-for="(item, i) in loadedOwnItems" :key="i">
                                        <v-card-item-mobile-4user :itemData="item"/>
                                    </div>
                                </b-tab-item>
                            </b-tabs> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { testList } from '~/plugins/utility-lists'
    import { mapGetters } from 'vuex'

    export default {
        middleware: 'auth',
        computed: {
            ...mapGetters(['authLoading', 'user', 'loadedOwnShops', 'loadedOwnItems']),
        },
        async fetch({ store, error}) {
            try {
                await Promise.all([
                    store.dispatch('loadOwnShops'),
                    store.dispatch('loadOwnItems')
                ])
            }catch(error) {
                console.log('[ERROR-user/mgmt]', error)
                error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        data() {
            return {
                test: testList
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
    }
    .v-shop-title {
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center
    }
</style>