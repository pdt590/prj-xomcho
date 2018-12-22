<template>
    <div>
        <section class="section">
            <div class="container" >
                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="title is-2 is-spaced">
                                XomCho.net
                            </p>
                            <p class="subtitle is-5">
                                Công cụ hỗ trợ bán hàng Online
                            </p>
                            <br>
                            <nuxt-link class="button is-large is-info is-rounded is-outlined" to="/shops/new-shop">Tạo cửa hàng</nuxt-link>
                        </div>
                    </div>
                    <div class="level-item">
                        <img src="/home-01.svg" style="max-height: 30rem">
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="v-header">
                    <p class="is-size-5 is-capitalized has-text-black has-text-weight-semibold">Cửa hàng nổi bật</p>
                    <nuxt-link class="is-size-6 has-text-grey-light has-text-weight-semibold" to="/query/shops">
                        Xem thêm
                    </nuxt-link>
                </div>
                <div class="columns is-multiline is-variable is-1 is-hidden-mobile">
                    <div class="column is-2" v-for="(shop, i) in loadedShops" :key="i">
                        <v-card-shop :shopData="shop" />
                    </div>
                </div>
                <div class="columns is-multiline is-variable is-1 is-hidden-tablet">
                    <div class="column" v-for="(shop, i) in loadedShops.slice(0, 4)" :key="i">
                        <v-card-shop-mobile :shopData="shop" />
                    </div>
                </div>
            </div>
        </section>
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
        <section class="section">
            <div class="container">
                <div class="v-header">
                    <p class="is-size-5 is-capitalized has-text-black has-text-weight-semibold">Sản phẩm nổi bật</p>
                    <nuxt-link class="is-size-6 has-text-grey-light has-text-weight-semibold" to="/query/items"> 
                        Xem thêm
                    </nuxt-link>
                </div>
                <div class="columns is-multiline is-variable is-3 is-hidden-mobile">
                    <div class="column is-2" v-for="(item, i) in loadedItems" :key="i">
                        <v-card-item :itemData="item" />
                    </div>
                </div>
                <div class="columns is-multiline is-variable is-3 is-hidden-tablet">
                    <div class="column" v-for="(item, i) in loadedItems.slice(0, 4)" :key="i">
                        <v-card-item-mobile :itemData="item" />
                    </div>
                </div>
            </div>
        </section>
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
                error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        data() {
            return {
                categories: categories
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
</style>

