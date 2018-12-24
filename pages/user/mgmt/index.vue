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
                        <b-tabs type="is-boxed">
                            <b-tab-item>
                                <template slot="header">
                                    <b-icon icon="store"></b-icon>
                                    <span> Cửa hàng <b-tag rounded> {{loadedPersonalShops.length}}</b-tag> </span>
                                </template>
                                <div style="padding-top: 1rem;" v-for="(shop, i) in loadedPersonalShops" :key="i">
                                    <v-card-shop-4user :shopData="shop"/>
                                </div>
                            </b-tab-item>

                            <b-tab-item>
                                <template slot="header">
                                    <b-icon icon="shopping"></b-icon>
                                    <span> Sản phẩm <b-tag rounded> {{loadedPersonalItems.length}} </b-tag> </span>
                                </template>
                                <div style="padding-top: 1rem;" v-for="(item, i) in loadedPersonalItems" :key="i">
                                    <v-card-item-4user :itemData="item"/>
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
            ...mapGetters(['user', 'loadedPersonalShops', 'loadedPersonalItems']),
        },
        async fetch({ store, error}) {
            try {
                await Promise.all([
                    store.dispatch('loadPersonalShops'),
                    store.dispatch('loadPersonalItems')
                ])
            }catch(e) {
                console.log('[ERROR-user/mgmt]', e)
                error({ statusCode: 500, message: 'Lỗi loadPersonalShops và loadPersonalItems' })
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