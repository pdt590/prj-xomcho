<template>
    <div>
        <section class="section">
            <div class="container">
                <p class="content">Khám phá cửa hàng (https://www.hackster.io/projects?by=featured&sort=featured_date)</p>
                <hr>
                <div class="v-header">
                    <div class="view-control">
                        <b-field grouped group-multiline>
                            <b-select placeholder="Sắp xếp">
                                <option value="flint">Flint</option>
                                <option value="silver">Silver</option>
                                <option value="vane">Vane</option>
                                <option value="billy">Billy</option>
                                <option value="jack">Jack</option>
                            </b-select>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline is-mobile is-variable is-1 is-0-mobile">
                    <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-one-fifth-fullhd" v-for="(shop, i) in loadedShops" :key="i">
                        <v-card-shop :shopData="shop" />
                    </div>
                </div>
                <div class="v-read-more">
                    <div class="v-read-more">
                        <b-pagination
                            :total="total"
                            :current.sync="current"
                            :order="order"
                            :size="size"
                            :simple="isSimple"
                            :rounded="isRounded"
                            :per-page="perPage">
                        </b-pagination>
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
                console.log('[_ERROR] ' + error)
                error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        data() {
            return {
                isGridView: true,
                total: 200,
                current: 1,
                perPage: 20,
                order: 'is-centered',
                size: 'is-medium',
                isSimple: false,
                isRounded: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-header {
        display: flex;
        margin-bottom: 2rem;
        justify-content: flex-end;
    }
    .column:last-child {
        margin-bottom: 2rem;
    }
    .v-read-more {
        display: flex;
        justify-content: center;
    }
</style>