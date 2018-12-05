<template>
    <div>
        <section class="section">
            <div class="container">
                <div class="v-header">
                    <div class="v-header-title">
                        <div class="v-title-dot">
                        </div>
                        <p class="title is-4">Cửa hàng</p>
                    </div>
                    <div class="v-view-control">
                        <b-field grouped group-multiline>
                            <b-select placeholder="Sắp xếp">
                                <option value="flint">Flint</option>
                                <option value="silver">Silver</option>
                                <option value="vane">Vane</option>
                                <option value="billy">Billy</option>
                                <option value="jack">Jack</option>
                            </b-select>
                            <a class="button" @click="isGridView = !isGridView">
                                <b-icon :icon="isGridView ? 'view-grid' : 'view-list'"></b-icon>
                            </a>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline is-mobile is-variable is-3 is-0-mobile">
                    <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-one-fifth-fullhd" v-for="(shop, i) in loadedShops" :key="i">
                        <v-card-shop :shopData="shop" />
                    </div>
                </div>
                <div class="v-read-more">
                    <a class="button is-rounded is-outlined">
                        <span>Xem thêm</span>
                        <b-icon icon="rotate-left"></b-icon>
                    </a>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="v-header">
                    <div class="v-header-title">
                        <div class="v-title-dot">
                        </div>
                        <p class="title is-4">Sản phẩm</p>
                    </div>
                    <div class="v-view-control">
                        <b-field grouped group-multiline>
                            <b-select placeholder="Sắp xếp">
                                <option value="flint">Flint</option>
                                <option value="silver">Silver</option>
                                <option value="vane">Vane</option>
                                <option value="billy">Billy</option>
                                <option value="jack">Jack</option>
                            </b-select>
                            <a class="button" @click="isGridView = !isGridView">
                                <b-icon :icon="isGridView ? 'view-grid' : 'view-list'"></b-icon>
                            </a>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline is-mobile is-variable is-3 is-0-mobile">
                    <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-one-fifth-fullhd" v-for="(shop, i) in loadedShops" :key="i">
                        <v-card-item :itemData="shop" />
                    </div>
                </div>
                <div class="v-read-more">
                    <a class="button is-rounded is-outlined">
                        <span>Xem thêm</span>
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
                isGridView: true,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        .v-header-title {
            display: flex;
            align-items: center;
            .v-title-dot {
                background-image: linear-gradient(80deg,#fc4a1a,#f7b733);
                border-radius: 50%;
                width: 1rem;
                height: 1rem;
                margin-top: 0.1rem;
                margin-right: 1rem;
            }
        }
    }
    .column:last-child {
        margin-bottom: 2rem;
    }
    .v-read-more {
        display: flex;
        justify-content: center;
    }
</style>

