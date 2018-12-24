<template>
    <div>
        <nav class="navbar is-fixed-top">
            <div class="container">
                <div class="navbar-brand">
                    <nuxt-link class="navbar-item" to="/">
                        <no-ssr>
                            <img class="v-main-logo" v-lazy="`/logo.png`" style='display: none' onload="this.style.display = 'block'" alt="brand_logo">
                        </no-ssr>
                    </nuxt-link>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-start">
                    </div>
                    <div class="v-navbar-center">
                        <div class="navbar-item">
                            <b-field position="is-centered">
                                <b-select v-model="searchTarget">
                                    <option value="shop">Cửa hàng</option>
                                    <option value="item">Sản phẩm</option>
                                </b-select>
                                <b-autocomplete
                                    v-model="searchKey"
                                    placeholder="Tìm kiếm"
                                    icon="magnify">
                                    <template slot="empty"></template>
                                </b-autocomplete>
                                <div class="control">
                                    <button class="button" @click="onSearch">Tìm Kiếm</button>
                                </div>
                            </b-field>
                        </div>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item" v-if="!user && $route.path !== '/user/join' && $route.path !== '/user/activekey' && $route.path !== '/user/resetpassword'">
                            <div class="buttons">
                                <a class="button is-info is-rounded is-outlined" @click="isModalJoinActive=true">
                                    <strong>Đăng nhập</strong>
                                </a>
                            </div>
                        </div>
                        <div class="navbar-item" v-if="user">
                            <nuxt-link class="button is-info is-rounded is-outlined" to="/shops/new-shop">
                                <strong>Tạo cửa hàng</strong>
                            </nuxt-link>
                        </div>
                        <div class="navbar-item">
                            <nuxt-link class="button is-rounded is-outlined" :class="countUnOpenedChats ? 'is-danger' : 'is-info'" to="/user/message" v-if="user">
                                <b-icon icon="email-outline"></b-icon><span v-if="countUnOpenedChats">&nbsp;{{countUnOpenedChats}}</span>
                            </nuxt-link>
                        </div>
                        <div class="navbar-item has-dropdown is-hoverable" v-if="user">
                            <a class="navbar-link">
                                <no-ssr>
                                    <img class="v-nav-avatar" v-lazy="user.avatar ? user.avatar.url : `/icon-user.png`" style='display: none' onload="this.style.display = 'block'" alt="avatar">
                                </no-ssr>
                            </a>
                            <div class="navbar-dropdown is-right">
                                <nuxt-link class="navbar-item" to="/user/profile">
                                    <b-icon icon="settings-outline"></b-icon><p class="is-size-6">Cài đặt</p> 
                                </nuxt-link>
                                <nuxt-link class="navbar-item" to="/user/mgmt">
                                    <b-icon icon="finance"></b-icon><p class="is-size-6">Quản lý</p>
                                </nuxt-link>
                                <hr class="navbar-divider">
                                <a class="navbar-item" @click="onLogout">
                                    <b-icon icon="logout-variant"></b-icon><p class="is-size-6">Thoát</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <b-modal :active.sync="isModalJoinActive" has-modal-card>
                    <v-modal-join />
                </b-modal>        
            </div>
        </nav>

        <nav class="navbar v-tag-navbar">
            <div class="container">
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                Danh mục
                            </a>
                            <div class="navbar-dropdown">
                                <nuxt-link class="navbar-item" :to="`/query/${category.id}`" v-for="(category, i) in categories" :key="i">
                                    <b-icon :icon="category.icon"></b-icon><p class="is-size-6">{{category.name}}</p> 
                                </nuxt-link>
                            </div>
                        </div>
                        <a href="" class="navbar-item" >Hướng dẫn</a>
                    </div>
                    <div class="navbar-end" style="border-left: 1px solid #D8D8D8">
                        <a href="" class="navbar-item" style="padding-right: 1.5rem; padding-left: 1.5rem"><b-icon icon="facebook"></b-icon></a>
                        <a href="" class="navbar-item" style="padding-right: 1rem; padding-left: 1.5rem"><b-icon icon="youtube"></b-icon></a>
                    </div>
                </div>
            </div>
        </nav>
        
        <div class="container" v-if="user && !user.isActive && $route.path!=='/user/activekey'">
            <b-message type="is-danger" size="is-small">
                Tài khoản chưa được kích hoạt
            </b-message>
        </div>
        <!-- <div class="container" v-if="user && countUnOpenedChats">
            <b-message type="is-danger" size="is-small" auto-close :duration="2000">
                Có tin nhắn mới
            </b-message>
        </div> -->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { categories } from '~/plugins/util-lists'

    export default {
        computed: {
            ...mapGetters(['countUnOpenedChats', 'user'])
        },
        async mounted() {
            await this.$store.dispatch('loadCountUnOpenedChats')
        },
        data() {
            return {
                searchKey: null,
                searchTarget: 'shop',

                isModalJoinActive: false,

                categories: categories
            }
        },
        methods: {
            async onLogout() {
                await this.$store.dispatch('logOut')
                if(this.$route.params.shopUrl && this.$route.params.itemUrl) {
                    this.$router.push(`/shops/${this.$route.params.shopUrl}/${this.$route.params.itemUrl}`)
                }else if(this.$route.params.shopUrl) {
                    this.$router.push(`/shops/${this.$route.params.shopUrl}`)
                }else {
                    this.$router.push('/')
                }
            },
            onSearch() {
                window.location.href = `/search?target=${this.searchTarget}&key=${this.searchKey}`
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        border: none;
        border-bottom: 1px solid #D8D8D8;
        &.v-tag-navbar {
            margin-top: 4rem;
            z-index: 5;
            align-items: center;
            box-sizing: border-box;
            border-top: 1px solid #D8D8D8;
            border-bottom: 1px solid #D8D8D8;
            //min-height: unset;
            //height: 3rem;
        }
    }
    .navbar-menu .v-navbar-center {
        display: flex;
        align-items: center;
    }
    .navbar-dropdown .navbar-item {
        display: flex;
        align-items: center;
        padding-right: 1rem;
        p {
            margin-left: 1rem;
        }
    }
</style>