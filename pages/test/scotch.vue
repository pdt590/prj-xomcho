<template>
    <div>
        <section class="section search-box">
            <div class="container">
                <p class="title">Tìm kiếm</p>
                <b-field class="search-bar">
                    <b-input placeholder="Tìm kiếm" 
                        size="is-large">
                    </b-input>
                </b-field>
                <div class="search-option">
                    <b-radio-button
                        class="search-option-item" 
                        v-model="radioButton"
                        native-value="Nop"
                        type="is-danger"
                        size="is-medium">
                        <b-icon icon="close"></b-icon>
                        <span>Nop</span>
                    </b-radio-button>

                    <b-radio-button
                        class="search-option-item"
                        v-model="radioButton"
                        native-value="Yep"
                        type="is-success"
                        size="is-medium">
                        <b-icon icon="check"></b-icon>
                        <span>Yep</span>
                    </b-radio-button>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="header">
                    <div class="header-title">
                        <div class="title-dot">
                        </div>
                        <p class="title">Cửa hàng</p>
                    </div>
                    <div class="view-control">
                        <b-field>
                            <b-select class="sort-control-mode" icon="sort-alphabetical">
                                <option value="flint">Flint</option>
                                <option value="silver">Silver</option>
                                <option value="vane">Vane</option>
                                <option value="billy">Billy</option>
                                <option value="jack">Jack</option>
                            </b-select>
                        </b-field>
                        <button class="button view-control-mode is-medium">
                            <b-icon icon="view-module"></b-icon>
                        </button>
                        <button class="button view-control-mode is-medium">
                            <b-icon icon="view-list"></b-icon>
                        </button>
                    </div>
                </div>
                <div class="columns is-multiline is-variable is-2">
                    <div class="column is-3-fullhd is-4-desktop is-6-tablet" v-for="(shop, i) in loadedShops" :key="i">
                        <v-card-shop-hover :shopData="shop" />
                    </div>
                </div>
                <div class="read-more">
                    <a class="button is-medium is-outlined">
                        <span>Khám phá thêm</span>
                        <b-icon icon="rotate-left"></b-icon>
                    </a>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="header">
                    <div class="header-title">
                        <div class="title-dot">
                        </div>
                        <p class="title">Sản phẩm</p>
                    </div>
                    <div class="view-control">
                        <b-field>
                            <b-select class="sort-control-mode" icon="sort-alphabetical">
                                <option value="flint">Flint</option>
                                <option value="silver">Silver</option>
                                <option value="vane">Vane</option>
                                <option value="billy">Billy</option>
                                <option value="jack">Jack</option>
                            </b-select>
                        </b-field>
                        <button class="button view-control-mode is-medium">
                            <b-icon icon="view-module"></b-icon>
                        </button>
                        <button class="button view-control-mode is-medium">
                            <b-icon icon="view-list"></b-icon>
                        </button>
                    </div>
                </div>
                <div class="columns is-multiline is-variable is-2">
                    <div class="column is-3-fullhd is-4-desktop is-6-tablet" v-for="(shop, i) in loadedShops" :key="i">
                        <v-card-item-hover :itemData="shop" />
                    </div>
                </div>
                <div class="read-more">
                    <a class="button is-medium is-outlined">
                        <span>Khám phá thêm</span>
                        <b-icon icon="rotate-left"></b-icon>
                    </a>
                </div>
            </div>
        </section>
    </div>
    
    <!--
    <div class="w3-content" style="max-width:1300px">
        <app-slider-homepanel />
    </div>

    <div class="w3-margin-bottom w3-margin-top">
        <div class="w3-row w3-content" style="max-width:1300px;"> 
            <div class="w3-col l6 m6 s6">
                <nuxt-link to="/shops/new-shop" class="w3-button w3-white w3-border w3-center w3-padding w3-hover-shadow w3-hover-white" style="width: 100%">
                    <i class="fa fa-plus-square-o w3-xxlarge"></i>
                    <h5><b>Tạo cửa hàng</b></h5>
                </nuxt-link>
            </div>
            <div class="w3-col l6 m6 s6">
                <nuxt-link to="/user/mgmt" class="w3-button w3-white w3-border w3-center w3-padding w3-hover-shadow w3-hover-white" style="width: 100%">
                    <i class="fa fa-cube w3-xxlarge"></i>
                    <h5><b>Quản lý đơn hàng</b></h5>
                </nuxt-link>
            </div>
        </div>
    </div>

    <div class="w3-margin-bottom">
        <div class="w3-content w3-white w3-border" style="max-width:1300px">
            <h5 class="w3-padding w3-border-bottom"><i class="fa fa-trello w3-xlarge w3-margin-right"></i><b>Cửa hàng nổi bật</b></h5>
            <app-slider-homeshop :shopsData="loadedShops"/>
        </div>
    </div>

    <div class="w3-margin-bottom">
        <div class="w3-content w3-white w3-border" style="max-width:1300px">
            <h5 class="w3-padding w3-border-bottom"><i class="fa fa-shopping-bag w3-xlarge w3-margin-right"></i><b>SẢN PHẨM MỚI</b></h5>
            <p>Hallo Tôi là thắngfsdfsds Cộng hòa xã hội</p>
            <div class="w3-row-padding">
                <div class="w3-col l2 m3 s6 w3-margin-bottom" v-for="(item, i) in loadedItems" :key="i">
                    <app-item-card-home :itemData="item"/>
                    <br>
                </div>
            </div>
        </div>
    </div>-->
</template>

<script>
    export default {
        layout: 'home',
        async asyncData({ store, error }) {
            try {
                const [loadedShops, loadedItems] = await Promise.all([
                    store.dispatch('loadPreviewShops'),
                    store.dispatch('loadPreviewItems')
                ])
                return {
                    loadedShops: loadedShops,
                    loadedItems: loadedItems
                }
            }catch(error) {
                console.log('[_ERROR] ' + error)
                error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        data() {
            return {
                radioButton: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-box {
        background-color: #EEE;
        padding-top: 5rem;
        .search-option {
            display: flex;
            margin-top: 2rem;
            .search-option-item {
                margin-right: 0.5rem;
            }
        }
    }
    .header {
        display: flex;
        margin-bottom: 1.5rem;
        justify-content: space-between;
        .header-title {
            display: flex;
            align-items: center;
            .title-dot {
                background-image: linear-gradient(80deg,#fc4a1a,#f7b733);
                border-radius: 50%;
                width: 1rem;
                height: 1rem;
                margin-top: 0.1rem;
                margin-right: 1rem;
            }
        }
        .view-control {
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
            align-items: center;
            margin: 2rem 0;
            .view-control-mode {
                margin-left: 0.5rem;
                margin-bottom: 0.5rem;
            }
        }
    }
    .columns:not(:last-child) {
        margin-bottom: 3rem;
    }
    .read-more {
        display: flex;
        justify-content: center;
    }
</style>