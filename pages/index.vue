<template>
    <div>
        <section class="section">
            <div class="container" >
                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="title is-2 is-spaced">
                                Xóm Chợ
                            </p>
                            <p class="subtitle is-5">
                                Công cụ hỗ trợ bán hàng Online
                            </p>
                            <br>
                            <nuxt-link class="button is-large is-info is-rounded is-outlined" to="/shops/new-shop">Tạo cửa hàng</nuxt-link>
                        </div>
                    </div>
                    <div class="level-item">
                        <img src="/home.svg" style="max-height: 30rem">
                    </div>
                </div>
            </div>
        </section>
        <!-- for desktop -->
        <section class="section is-hidden-mobile">
            <div class="container">
                <div class="v-header">
                    <p class="is-size-5 is-capitalized has-text-black has-text-weight-semibold">Danh mục</p>
                </div>
                <div class="columns is-gapless is-multiline ">
                    <div class="column is-2" style="margin-bottom: 1rem" v-for="(category, i) in categories" :key="i">
                        <div class="level">
                            <div class="level-item" style="flex-direction: column">
                                <nuxt-link class="v-category" :to="`/query/${category.id}`">
                                    <b-icon :icon="category.icon" size="is-medium"></b-icon>
                                </nuxt-link>
                                <p>{{category.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section is-hidden-mobile">
            <div class="container">
                <div class="v-header">
                    <p class="is-size-5 is-capitalized has-text-black has-text-weight-semibold">Cửa hàng nổi bật</p>
                    <nuxt-link class="is-size-6 has-text-grey-light has-text-weight-semibold" to="/query/shops">
                        Xem thêm
                    </nuxt-link>
                </div>
                <div class="columns is-multiline is-variable is-1">
                    <div class="column is-2" v-for="(shop, i) in loadedShops" :key="i">
                        <v-card-shop :shopData="shop" />
                    </div>
                </div>
            </div>
        </section>
        <section class="section is-hidden-mobile">
            <div class="container">
                <div class="v-header">
                    <p class="is-size-5 is-capitalized has-text-black has-text-weight-semibold">Sản phẩm nổi bật</p>
                    <nuxt-link class="is-size-6 has-text-grey-light has-text-weight-semibold" to="/query/items"> 
                        Xem thêm
                    </nuxt-link>
                </div>
                <div class="columns is-multiline is-variable is-3">
                    <div class="column is-2" v-for="(item, i) in loadedItems" :key="i">
                        <v-card-item :itemData="item" />
                    </div>
                </div>
            </div>
        </section>
        <!--  -->

        <!-- for mobile -->
        <section class="section is-hidden-tablet" style="padding-bottom: 0">
            <div class="container">
                <div class="v-header">
                    <p class="is-size-5 is-capitalized has-text-black has-text-weight-semibold">Cửa hàng nổi bật</p>
                    <nuxt-link class="is-size-6 has-text-grey-light has-text-weight-semibold" to="/query/shops">
                        Xem thêm
                    </nuxt-link>
                </div>
                <no-ssr>
                    <carousel-3d :disable3d="true" :space="365" :clickable="false" :animationSpeed="300">
                        <slide v-for="(count, id) in 4" :key="id" :index="id">
                            <div class="columns is-multiline is-variable is-1">
                                <div class="column" v-for="(shop, i) in loadedShops.slice(4*id, 4*(id+1))" :key="i">
                                    <v-card-shop-mobile :shopData="shop" />
                                </div>
                            </div>
                        </slide>
                    </carousel-3d>
                </no-ssr>
            </div>
        </section>
        <section class="section is-hidden-tablet" style="padding-bottom: 0">
            <div class="container">
                <div class="v-header">
                    <p class="is-size-5 is-capitalized has-text-black has-text-weight-semibold">Sản phẩm nổi bật</p>
                    <nuxt-link class="is-size-6 has-text-grey-light has-text-weight-semibold" to="/query/items"> 
                        Xem thêm
                    </nuxt-link>
                </div>
                <no-ssr>
                    <carousel-3d :disable3d="true" :space="365" :clickable="false" :animationSpeed="300">
                        <slide v-for="(count, id) in 4" :key="id" :index="id">
                            <div class="columns is-multiline is-variable is-1">
                                <div class="column" v-for="(item, i) in loadedItems.slice(4*id, 4*(id+1))" :key="i">
                                    <v-card-item-mobile :itemData="item" />
                                </div>
                            </div>
                        </slide>
                    </carousel-3d>
                </no-ssr>
            </div>
        </section>
        <!--  -->
    </div>
</template>

<script>
    import { categories } from '~/plugins/util-lists'

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
            }catch(e) {
                console.log('[/]', e)
                error({ statusCode: 500, message: 'Lỗi loadPreviewShops và loadPreviewItems' })
            }
        },
        data() {
            return {
                categories: categories,
                flickityOptions: {
                    initialIndex: 3,
                    prevNextButtons: false,
                    pageDots: false,
                    wrapAround: true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 1.5rem;
    }
    .v-category {
        height: 5vw;
        width: 5vw;
        border: solid 1px #AAA;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
    }
    .carousel-3d-container {
        height: 35rem !important;
        background-color: #FFF;
        .carousel-3d-slide {
            border: none;
            background-color: #FFF;
            height: 35rem !important;
        }
    }
</style>

