<template>
        <!-- Sidebar left -->
        <div class="w3-sidebar w3-light-grey w3-collapse w3-top w3-padding-64" style="z-index:3;width:270px" ref="mySidebar">
            <div class="w3-container w3-display-container">
                <nuxt-link :to="'/shops/' + $route.params.shopId">
                    <img src="https://picsum.photos/600/600/?image=52" style="width:100%;" class="w3-round">
                </nuxt-link>
                <br>
                <h4><b>Shop Duy Thang</b></h4>
            </div>
            <hr>
            <div class="w3-bar-block w3-large">
                <h5 class="w3-bar-item w3-text-grey"><b>Thông tin</b></h5>
                <div class="w3-bar-item w3-padding">
                    <a href="https://maps.google.com/?q=Long Biên, Hà Nội" target=_blank>
                        <img src="/location.svg" class="w3-round w3-margin-right" style="width:10%;" alt="location_icon">
                    </a>
                    Hà Nội
                </div>
                <div class="w3-bar-item w3-padding">
                    <a href="https://facebook.com" target=_blank>
                        <img src="/facebook.svg" class="w3-round w3-margin-right" style="width:10%;" alt="facebook_icon">
                    </a>
                    duythang
                </div>
                <div class="w3-bar-item w3-padding">
                    <a href="tel:016727735514">
                        <img src="/phone.svg" class="w3-round w3-margin-right" style="width:10%;" alt="phone_icon">
                    </a>
                    017627735514
                </div>
                <div class="w3-bar-item w3-padding">
                    <a href="mailto:thangecp@gmail.com?Subject=Xin%20Chào%20Cửa%20Hàng">
                        <img src="/email.svg" class="w3-round w3-margin-right" style="width:10%;" alt="email_icon">
                    </a> 
                    thangecp@gmail.com
                </div>
            </div>
            <hr>
            <div class="w3-bar-block w3-large">
                <h5 class="w3-bar-item w3-text-grey"><b>Công cụ</b></h5>
                <nuxt-link :to="'/shops/' + $route.params.shopId + '/edit-shop'" class="w3-bar-item w3-button">
                    <img src="/config.svg" class="w3-round w3-margin-right" style="width:10%;" alt="Alps">
                    Chỉnh sửa
                </nuxt-link>
                <nuxt-link :to="'/shops/' + $route.params.shopId + '/new-item'" class="w3-bar-item w3-button">
                    <img src="/add.svg" class="w3-round w3-margin-right" style="width:10%;" alt="Alps">
                    Thêm sản phẩm
                </nuxt-link>
                <nuxt-link :to="'/shops/' + $route.params.shopId + '/comments'" class="w3-bar-item w3-button">
                    <img src="/comment.svg" class="w3-round w3-margin-right" style="width:10%;" alt="Alps">
                    Đánh giá cửa hàng
                </nuxt-link> 
                <button  class="w3-bar-item w3-button">
                    <img src="/bookmark.svg" class="w3-round w3-margin-right" style="width:10%;" alt="Alps">
                    Lưu cửa hàng
                </button>  
            </div>
        </div>
</template>

<script>
    export default {
        computed: {
            openSideBar() {
                return this.$store.getters.sideBar
            }
        },
        watch: {
            openSideBar(value) {
                value ? 
                this.$refs.mySidebar.style.display = 'block' : this.$refs.mySidebar.style.display = 'none'
            }
        }
    }
</script>

<style>

</style>
