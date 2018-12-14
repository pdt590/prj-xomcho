<template>
    <div>
        <nav class="navbar is-fixed-top">
            <div class="container">
                <div class="navbar-brand">
                    <nuxt-link class="navbar-item" to="/">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" style='display: none' onload="this.style.display = 'block'" alt="brand_logo">
                    </nuxt-link>
                </div>
                <div class="navbar-menu" :class="{'is-active': isMenuActive}">
                    <div class="navbar-start">
                    </div>
                    <div class="v-navbar-center">
                        <div class="navbar-item">
                            <b-field>
                                <b-select v-model="searchTarget">
                                    <option value="shop">Cửa hàng</option>
                                    <option value="item">Sản phẩm</option>
                                </b-select>
                                <b-autocomplete
                                    v-model="searchKey"
                                    placeholder="Tìm kiếm"
                                    icon="magnify">
                                    <template slot="empty">...</template>
                                </b-autocomplete>
                                <button class="button" @click="onSearch">Tìm Kiếm</button>
                            </b-field>
                        </div>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item" v-if="!user && $route.path !== '/user/join'">
                            <div class="buttons">
                                <a class="button is-info is-rounded is-outlined" @click="isModalSignupActive=true;isMenuActive=false">
                                    <strong>Đăng ký</strong>
                                </a>
                                <a class="button is-info is-rounded is-outlined" @click="isModalLoginActive=true;isMenuActive=false">
                                    <strong>Đăng nhập</strong>
                                </a>
                            </div>
                        </div>
                        <div class="navbar-item" v-if="user">
                            <nuxt-link class="button is-info is-rounded is-outlined" to="/shops/new-shop">
                                <strong>Tạo cửa hàng</strong>
                            </nuxt-link>
                        </div>
                        <div class="navbar-item has-dropdown is-hoverable" v-if="user">
                            <a v-if="!isMenuActive" class="navbar-link">
                                <img class="v-nav-avatar" v-lazy="user.avatar ? user.avatar.url : `/icon-user.png`" style='display: none' onload="this.style.display = 'block'" alt="avatar">
                            </a>
                            <div class="navbar-dropdown is-right">
                                <nuxt-link class="navbar-item" to="/user/profile">
                                    <b-icon icon="settings-outline"></b-icon><p class="is-size-6">Cài đặt</p> 
                                </nuxt-link>
                                <nuxt-link class="navbar-item" to="/user/mgmt">
                                    <b-icon icon="finance"></b-icon><p class="is-size-6">Quản lý</p>
                                </nuxt-link>
                                <!-- <nuxt-link class="navbar-item" to="/user/messages">
                                    <b-icon icon="message-text-outline"></b-icon><p class="is-size-6">Tin nhắn</p>
                                </nuxt-link> -->
                                <hr class="navbar-divider">
                                <a class="navbar-item" @click="onLogout">
                                    <b-icon icon="logout-variant"></b-icon><p class="is-size-6">Thoát</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <b-modal :active.sync="isModalLoginActive" has-modal-card>
                    <v-modal-login />
                </b-modal>
                <b-modal :active.sync="isModalSignupActive" has-modal-card>
                    <v-modal-signup />
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
    </div>
</template>

<script>
    import { categories } from '~/plugins/util-lists'
    import { mapGetters } from 'vuex'

    export default {
        props: {
            isHome: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        data() {
            return {
                searchKey: null,
                searchTarget: 'shop',
                isSearchActive: false,
                isListActive: false,
                isMenuActive: false,
                isModalLoginActive: false,
                isModalSignupActive: false,
                radioButton: 'shop',
                
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
                this.$router.push(`/search/${this.searchTarget}-${this.searchKey}`)
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
        p {
            margin-left: 1rem;
        }
    }
    .navbar-dropdown .navbar-item {
        padding-right: 1rem;
    }
</style>