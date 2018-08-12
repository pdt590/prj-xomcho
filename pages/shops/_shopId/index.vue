<template>
    <section>
        <div class="w3-margin-bottom">
            <app-slider-shoppanel/>
        </div>
        <div class="w3-padding w3-white w3-margin-bottom">
            <h5><strong>Thông tin</strong></h5><hr>
            <h6>Đây là cửa hàng DuyThang. Shop chuyên cung cấp các mặt hàng thể thao</h6>
        </div>
        <div class="w3-padding w3-white w3-margin-bottom">
            <h5><strong>Chọn mặt hàng hiển thị</strong></h5><hr>
            <app-product-types />
        </div>

        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row-padding" style="padding: 0">
                <br>
                <div class="w3-col l3 m4 s6 w3-margin-bottom" v-for="i in 8" :key="i">
                    <app-product-card02 />
                    <br>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        layout: 'shop',
        asyncData(context) {
            return context.store.dispatch('loadShop', context.params.shopId)
                .then(
                    data => {
                        return {
                            loadedShop: data
                        }
                    }
                )
        }
    }
</script>