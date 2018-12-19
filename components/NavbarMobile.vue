<template>
    <div>
        <nav class="navbar is-fixed-top">
            <div class="container">
                <div class="navbar-brand">
                    <nuxt-link class="navbar-item" to="/">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" style='display: none' onload="this.style.display = 'block'" alt="brand_logo">
                    </nuxt-link>
                    <a class="navbar-item v-mobile-navbar-button is-hidden-tablet" data-target="mobile-search" @click="activeSearch">
                        <b-icon icon="magnify"></b-icon>
                    </a>
                    <nuxt-link class="navbar-item v-mobile-navbar-button is-hidden-tablet" data-target="mobile-new-shop" to="/shops/new-shop" v-if="user">
                        <b-icon icon="plus-box-outline"></b-icon>
                    </nuxt-link>
                    <a class="navbar-item v-mobile-navbar-button is-hidden-tablet" data-target="mobile-page-list" @click="activeList">
                        <b-icon icon="store"></b-icon>
                    </a>
                    <a class="navbar-burger v-burger-button" data-target="mobile-desktop-menu" @click="activeMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>
                <!-- for mobile -->
                <div id="mobile-search" class="navbar-menu is-hidden-tablet" :class="{'is-active': isSearchActive}">
                    <div class="navbar-start">
                        <div class="navbar-item">
                            <b-field class="v-mobile-search-bar">
                                <b-autocomplete
                                    size="is-medium"
                                    icon="magnify">
                                    <template slot="empty">No results found</template>
                                </b-autocomplete>
                            </b-field>
                            <div class="v-mobile-search-option">
                                <b-radio-button
                                    v-model="radioButton"
                                    native-value="shop"
                                    type="is-info">
                                    <b-icon icon="check"></b-icon>
                                    <span>Cửa hàng</span>
                                </b-radio-button>

                                <b-radio-button
                                    v-model="radioButton"
                                    native-value="item"
                                    type="is-info">
                                    <b-icon icon="check"></b-icon>
                                    <span>Sản phẩm</span>
                                </b-radio-button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="mobile-page-list" class="navbar-menu is-hidden-tablet" :class="{'is-active': isListActive}">
                    <div class="navbar-start">
                        <div class="navbar-item has-dropdown is-hoverable">
                            <div class="navbar-dropdown">
                                <b-collapse v-for="(category, i) in categories" :key="i">
                                    <nuxt-link class="navbar-item" :to="`/query/${category.id}`" slot="trigger">
                                        <b-icon :icon="category.icon"></b-icon><p class="is-size-6">{{category.name}}</p>
                                    </nuxt-link>
                                </b-collapse >
                            </div>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div id="mobile-desktop-menu" class="navbar-menu" :class="{'is-active': isMenuActive}">
                    <div class="navbar-start">
                    </div>
                    <div class="v-navbar-center is-hidden-mobile">
                        <div class="navbar-item">
                            <b-field class="v-search-bar">
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
                        <div v-if="!user" class="navbar-item">
                            <div class="buttons">
                                <a class="button is-info is-rounded is-outlined" @click="isModalSignupActive=true;isMenuActive=false">
                                    <strong>Đăng ký</strong>
                                </a>
                                <a class="button is-info is-rounded is-outlined" @click="isModalLoginActive=true;isMenuActive=false">
                                    <strong>Đăng nhập</strong>
                                </a>
                            </div>
                        </div>
                        <div v-if="user" class="navbar-item is-hidden-mobile">
                            <nuxt-link class="button is-info is-rounded is-outlined" to="/shops/new-shop">
                                <strong>Tạo cửa hàng</strong>
                            </nuxt-link>
                        </div>
                        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
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

        <nav class="navbar v-tag-navbar is-hidden-touch">
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
                        <a href="" class="navbar-item" style="padding-right: 2rem; padding-left: 2rem"><b-icon icon="facebook"></b-icon></a>
                        <a href="" class="navbar-item" style="padding-right: 2rem; padding-left: 2rem"><b-icon icon="youtube"></b-icon></a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { categories } from '~/plugins/util-lists'

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
            activeSearch() {
                this.isSearchActive = !this.isSearchActive; 
                this.isMenuActive = false
                this.isListActive = false
            },
            activeList() {
                this.isListActive = !this.isListActive; 
                this.isMenuActive = false
                this.isSearchActive = false
            },
            activeMenu() {
                this.isMenuActive = !this.isMenuActive; 
                this.isListActive = false
                this.isSearchActive = false
            },
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
    .navbar-item {
        &.v-mobile-navbar-button:nth-child(2) {
            margin-left: auto;
        }
        &.v-mobile-navbar-button {
            cursor: pointer;
            display: flex;
            justify-content: center;
            height: 4rem; // = $navbar-height
            width: 4rem; // = $navbar-height
        }
        .v-mobile-search-option {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            margin-top: 0.5rem;
            margin-bottom: 0.3rem;
        }
        &.v-mobile-page-list {
            .v-mobile-page-item {
                margin-top: 0.3rem;
                margin-right: 0.5rem;
            }
        }
    }
    .navbar-menu .v-navbar-center {
        display: flex;
        align-items: center;
        flex-basis: 30rem;
        .navbar-item {
            flex-grow: 1;
            .v-search-bar {
                width: 100%
            }
        }
    } 
    @media screen and (max-width: 768px) {
        .navbar-burger.v-burger-button{
            margin-left: initial;
        }
    }
    .navbar-dropdown .navbar-item {
        display: flex;
        align-items: center;
        p {
            margin-left: 1rem;
        }
    }
    .navbar-dropdown .column:not(:last-child) .navbar-item {
        padding-right: 0;
    }
</style>