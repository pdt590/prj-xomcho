<template>
    <div>
        <nav class="navbar is-fixed-top">
            <div class="container">
                <div class="navbar-brand">
                    <nuxt-link class="navbar-item" to="/">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="brand_logo">
                    </nuxt-link>
                    <a class="navbar-item v-mobile-navbar-button is-hidden-tablet" data-target="mobile-search" @click="activeSearch">
                        <b-icon
                            icon="magnify">
                        </b-icon>
                    </a>
                    <a class="navbar-item v-mobile-navbar-button is-hidden-tablet" data-target="mobile-new-shop">
                        <b-icon
                            icon="plus-box-outline">
                        </b-icon>
                    </a>
                    <a class="navbar-item v-mobile-navbar-button is-hidden-tablet" data-target="mobile-page-list" @click="activeList">
                        <b-icon
                            icon="store">
                        </b-icon>
                    </a>
                    <a class="navbar-burger v-burger-button" data-target="mobile-desktop-menu" @click="activeMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>

                <div id="mobile-search" class="navbar-menu is-hidden-tablet" :class="{'is-active': isSearchActive}">
                    <div class="navbar-start">
                        <div class="navbar-item">
                            <b-field class="v-mobile-search-bar">
                                <b-autocomplete
                                    size="is-medium"
                                    placeholder="e.g. jQuery"
                                    icon="magnify"
                                    v-model="searchKeyword">
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
                        <div class="navbar-item v-mobile-page-list">
                            <nuxt-link class="button v-mobile-page-item is-rounded" v-for="(type, i) in types" :key="i" :to="`/query/${type.en}`">
                                #{{type.vi}}
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <div id="mobile-desktop-menu" class="navbar-menu" :class="{'is-active': isMenuActive}">
                    <div class="navbar-start">
                    </div>
                    <div class="v-navbar-center is-hidden-mobile">
                        <div class="navbar-item">
                            <b-field class="v-search-bar">
                                <b-autocomplete
                                    size="is-medium"
                                    expanded
                                    placeholder="e.g. jQuery"
                                    icon="magnify"
                                    v-model="searchKeyword">
                                    <template slot="empty">No results found</template>
                                </b-autocomplete>
                                <b-select size="is-medium" v-model="option">
                                    <option>Cửa hàng</option>
                                    <option>Sản phẩm</option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>
                    <div class="navbar-end">
                        <div v-if="!user" class="navbar-item">
                            <div class="buttons">
                                <a class="button is-info is-rounded is-outlined" @click="isModalSignupActive = true">
                                    <strong>Đăng ký</strong>
                                </a>
                                <a class="button is-info is-rounded is-outlined" @click="isModalLoginActive = true">
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
                                <img :src="user.avatar !== undefined ? user.avatar.url : '/icon-user.png'" alt="avatar">
                            </a>
                            <div class="navbar-dropdown is-right">
                                <nuxt-link class="navbar-item" to="/user/profile">
                                    <b-icon icon="settings-outline"></b-icon><p class="is-size-6">Cài đặt</p> 
                                </nuxt-link>
                                <nuxt-link class="navbar-item" to="/user/mgmt">
                                    <b-icon icon="finance"></b-icon><p class="is-size-6">Thống kê</p>
                                </nuxt-link>
                                <nuxt-link class="navbar-item" to="/user/messages">
                                    <b-icon icon="message-text-outline"></b-icon><p class="is-size-6">Tin nhắn</p>
                                </nuxt-link>
                                <hr class="navbar-divider">
                                <a class="navbar-item" @click="onLogout">
                                    <b-icon icon="logout-variant"></b-icon><p class="is-size-6">Thoát</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <b-modal :active.sync="isModalLoginActive" has-modal-card>
                    <v-modal-login></v-modal-login>
                </b-modal>
                <b-modal :active.sync="isModalSignupActive" has-modal-card>
                    <v-modal-signup></v-modal-signup>
                </b-modal>           
            </div>
        </nav>

        <nav class="navbar v-tag-navbar is-hidden-touch">
            <div class="container">
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <!-- <nuxt-link class="navbar-item" v-for="(type, i) in types" :key="i" :to="`/query/${type.en}`">
                            #{{type.vi}}
                        </nuxt-link> -->
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                Danh mục sản phẩm
                            </a> 
                            <div class="navbar-dropdown">
                                <div class="columns">
                                    <div class="column" v-for="(type, i) in types" :key="i" :to="`/query/${type.en}`">
                                        <nuxt-link class="navbar-item" :to="`/query/${type.en}`">
                                            #{{type.vi}}
                                        </nuxt-link>
                                        <a class="navbar-item">
                                            Lorem ipsum dolor,
                                        </a>
                                        <a class="navbar-item">
                                            Lorem ipsum dolor,
                                        </a>
                                        <a class="navbar-item">
                                            Lorem ipsum dolor,
                                        </a>
                                        <a class="navbar-item">
                                            Lorem ipsum dolor,
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="navbar-end">
                        <a href="" class="navbar-item" style="border-right: 1px solid #D8D8D8">Hướng dẫn</a>
                        <a href="" class="navbar-item" style="padding-right: 2rem; padding-left: 2rem"><b-icon icon="facebook"></b-icon></a>
                        <a href="" class="navbar-item" style="padding-right: 2rem; padding-left: 2rem"><b-icon icon="youtube"></b-icon></a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import { types } from '~/plugins/utility-lists'
    import { mapGetters } from 'vuex'

    export default {
        props: {
            isHome: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters(['user']),
            searchKeyword() {
                if(this.$route.params.type === 'agri') return '#Nông sản#'
                
            }
        },
        data() {
            return {
                isSearchActive: false,
                isListActive: false,
                isMenuActive: false,
                isModalLoginActive: false,
                isModalSignupActive: false,
                radioButton: 'shop',
                option: 'Cửa hàng',
                types: types
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
                if(this.$route.params.shopId && this.$route.params.itemId) {
                    this.$router.push('/shops/' + this.$route.params.shopId + '/' + this.$route.params.itemId)
                }else if(this.$route.params.shopId) {
                    this.$router.push('/shops/' + this.$route.params.shopId)
                }else {
                    this.$router.push('/')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        border: none;
        &.v-tag-navbar {
            margin-top: 5rem;
            z-index: 1;
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
            height: 5rem;
            width: 5rem;
        }
        .v-mobile-search-option {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            margin-top: 0.5rem;
            margin-bottom: 0.3rem;
        }
        &.v-mobile-page-list {
            //display: flex;
            //flex-wrap: wrap;
            .v-mobile-page-item {
                margin-top: 0.3rem;
                margin-right: 0.5rem;
            }
        }
    }
    .navbar-menu .v-navbar-center {
        display: flex;
        align-items: center;
        flex-basis: 50rem;
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
    .navbar-dropdown .column .navbar-item {
        padding-right: 0;
    }
</style>
