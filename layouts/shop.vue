<template>
    <section>
        <app-navbar :navItems="navItems"></app-navbar>
        <div class="w3-content w3-padding-64" style="max-width:1500px">     
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
                    <a href="https://maps.google.com/?q=Long Biên, Hà Nội" class="w3-bar-item w3-button w3-padding" target=_blank>
                        <img src="/location.png" class="w3-round w3-margin-right" style="width:10%;" alt="location_icon">
                            Hà Nội
                    </a>
                    <a href="https://facebook.com" class="w3-bar-item w3-button w3-padding" target=_blank>
                        <img src="/facebook.png" class="w3-round w3-margin-right" style="width:10%;" alt="facebook_icon">
                            duythang
                    </a>  
                    <a href="tel:016727735514" class="w3-bar-item w3-button w3-padding">
                        <img src="/phone.png" class="w3-round w3-margin-right" style="width:10%;" alt="phone_icon">
                            017627735514
                    </a>
                    <a href="mailto:thangecp@gmail.com?Subject=Xin%20Chào%20Cửa%20Hàng" class="w3-bar-item w3-button w3-padding">
                        <img src="/email.png" class="w3-round w3-margin-right" style="width:10%;" alt="email_icon">
                            thangecp@gmail.com
                    </a> 
                </div>
                <hr>
                <div class="w3-bar-block w3-large">
                    <h5 class="w3-bar-item w3-text-grey"><b>Công cụ</b></h5>
                    <nuxt-link :to="'/shops/' + $route.params.shopId + '/edit-shop'" class="w3-bar-item w3-button">
                        <img src="/config.png" class="w3-round w3-margin-right" style="width:10%;" alt="Alps">
                        Chỉnh sửa
                    </nuxt-link>
                    <nuxt-link :to="'/shops/' + $route.params.shopId + '/comments'" class="w3-bar-item w3-button">
                        <img src="/comment.png" class="w3-round w3-margin-right" style="width:10%;" alt="Alps">
                        Đánh giá cửa hàng
                    </nuxt-link>
                </div>
                <hr>
                <div class="w3-bar-block w3-large w3-margin" style="font-weight:bold">
                    <nuxt-link to="/shops/new-shop" class="w3-bar-item w3-button w3-border w3-border-grey" style="margin-bottom: 2px">Tạo cửa hàng mới</nuxt-link>
                    <nuxt-link :to="'/shops/' + $route.params.shopId + '/new-item'" class="w3-bar-item w3-button w3-border w3-border-grey">Thêm sản phẩm</nuxt-link>
                </div>
            </div>

            <!-- Top menu on small screens -->
            <header class="w3-bar w3-top w3-hide-large w3-green">
                <div class="w3-bar-item w3-padding-large">LOGO</div>
                <a href="javascript:void(0)" class="w3-bar-item w3-padding-large w3-button w3-right" @click="w3_open"><i class="fa fa-bars"></i></a>
                <nuxt-link
                    v-for="(item, i) in navItems"
                    :key="i"
                    :to="item.link" class="w3-bar-item w3-padding-large w3-button w3-right"> 
                    <i :class="item.icon"></i>
                </nuxt-link>
                <a href="#" class="w3-bar-item w3-padding-large w3-button w3-green w3-right"><i class="fa fa-search"></i></a>
                <input type="text" class="w3-bar-item w3-padding-large w3-input w3-right" style="max-width:20%" placeholder="Tìm ..."> 
            </header>

            <!-- Overlay effect when opening sidebar on small screens -->
            <div class="w3-overlay w3-hide-large" @click="w3_close" style="cursor:pointer" title="close side menu" ref="myOverlay"></div>

            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-row-padding">
                    <div class="w3-col l9">
                        <nuxt/>
                        <div class="w3-center w3-padding-24">
                            Powered by 
                            <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
                        </div>                         
                    </div>
                    <div class="w3-col l3">
                        <div class="w3-border w3-border-grey w3-white w3-round w3-container w3-hide-medium w3-hide-small">
                            <h4><b>Advertisment</b></h4>
                            <hr>
                        </div>                 
                    </div>
                </div>
            </div>  
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                navItems: [
                    {link: "/", icon: "fa fa-envelope", title: "Hướng dẫn"},
                    {link: "/", icon: "fa fa-globe", title: "Về chúng tôi"}
                ]
            }
        },
        methods: {
            w3_open() {
                this.$refs.mySidebar.style.display = "block";
                this.$refs.myOverlay.style.display = "block";
            },
            w3_close() {
                this.$refs.mySidebar.style.display = "none";
                this.$refs.myOverlay.style.display = "none";
            }
        }
    }
</script>

<style>
    body,h1,h2,h3,h4,h5,p {
        font-family: "Nunito", sans-serif;
    }
    body {
        background-color: #f1f1f1;
    }
</style>
