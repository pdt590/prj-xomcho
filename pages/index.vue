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
                    <a class="has-text-weight-bold">Xem thêm ...</a>
                </div>
                <div class="columns is-multiline is-variable is-1">
                    <div class="column is-2" v-for="(shop, i) in loadedShops" :key="i">
                        <v-card-shop class="is-hidden-mobile" :shopData="shop" />
                        <v-card-shop-mobile class="is-hidden-tablet" :shopData="shop" />
                    </div>
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
                    <a class="has-text-weight-bold">Xem thêm ...</a>
                </div>
                <div class="columns is-multiline is-variable is-3">
                    <div class="column is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-one-fifth-fullhd" v-for="(item, i) in loadedItems.slice(0, 5)" :key="i">
                        <v-card-item class="is-hidden-mobile" :itemData="item" />
                        <v-card-item-mobile class="is-hidden-tablet" :itemData="item"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
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
                console.log('[/]', error)
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
</style>

