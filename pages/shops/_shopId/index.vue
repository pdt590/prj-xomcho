<template>
    <section>
        <div class="w3-margin-bottom">
            <app-slider-shoppanel/>
        </div>
        <div class="w3-padding w3-white w3-margin-bottom">
            <h5><strong>Thông tin</strong></h5><hr>
            <h5>Đây là cửa hàng DuyThang. Shop chuyên cung cấp các mặt hàng thể thao</h5>
        </div>
        <div class="w3-padding w3-white w3-margin-bottom">
            <h5><strong>Chọn mặt hàng hiển thị</strong></h5><hr>
            <app-product-types />
        </div>

        <div class="w3-margin-bottom">
            <div class="w3-row-padding">
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
        data() {
            return {
                itemTypes: [
                    {icon: "/meat.svg", title: "Thực phẩm"},
                    {icon: "/agri.svg", title: "Nông sản"},
                    {icon: "/pot.svg", title: "Gia dụng"},
                    {icon: "/electronic.svg", title: "Điện tử"},
                    {icon: "/medicine.svg", title: "Y tế"},
                    {icon: "/fashion.svg", title: "Thời trang"},
                    {icon: "/others.svg", title: "Khác"}
                ]
            }
        }
    }
</script>