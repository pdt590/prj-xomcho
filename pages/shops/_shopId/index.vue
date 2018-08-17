<template>
    <section>
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <app-sidebar-shop :shopData="loadedShop"/>
            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-margin-bottom">
                    <app-slider-shoppanel/>
                </div>
                <div class="w3-padding w3-white w3-margin-bottom">
                    <h5><strong>Thông tin</strong></h5><hr>
                    <h6>{{loadedShop.shopDesc}}</h6>
                </div>
                <div class="w3-padding w3-white w3-margin-bottom">
                    <h5><strong>Chọn mặt hàng hiển thị</strong></h5><hr>
                    <app-product-types />
                </div>

                <div class="w3-padding w3-white w3-margin-bottom">
                    <div class="w3-row-padding" style="padding: 0">
                        <br>
                        <div class="w3-col l3 m4 s6 w3-margin-bottom" v-for="(item, i) in loadedItems" :key="i">
                            <app-product-card-shop :itemData="item" />
                            <br>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="w3-center w3-padding-24">
                    Powered by 
                    <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
                </div>                         
            </div>  
        </div>
    </section>
</template>

<script>
    export default {
        layout: 'shop',
        async asyncData({ store, params }) {
            if(store.getters.loadedShop) {
                if (store.getters.loadedItems) {
                    return {
                        loadedShop : store.getters.loadedShop,
                        loadedItems: store.getters.loadedItems
                    }
                } 
                const loadedItems = await store.dispatch('loadItems', params.shopId)
                return {
                    loadedShop : store.getters.loadedShop,
                    loadedItems: loadedItems
                }
            }else {
                const [loadedShop, loadedItems] = await Promise.all([
                    store.dispatch('loadShop', params.shopId),
                    store.dispatch('loadItems', params.shopId)
                ])
                return { 
                    loadedShop: loadedShop,
                    loadedItems: loadedItems
                }
            }
        }
    }
</script>