<template>
    <section>
        <app-navbar :navItems="navItems"></app-navbar>
        <div class="w3-content w3-padding-64" style="max-width:1300px">     
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

            <!-- Top menu on small screens -->
            <header class="w3-bar w3-top w3-padding w3-hide-large w3-green">
                <div class="w3-bar-item w3-padding-large">LOGO</div>
                <a href="javascript:void(0)" class="w3-bar-item w3-padding-large w3-button w3-right" @click="w3_open"><i class="fa fa-bars"></i></a>
                <nuxt-link
                    v-for="(item, i) in navItems"
                    :key="i"
                    :to="item.link" class="w3-bar-item w3-padding-large w3-button w3-right"> 
                    <i :class="item.icon"></i>
                </nuxt-link>
            </header>

            <!-- Overlay effect when opening sidebar on small screens -->
            <div class="w3-overlay w3-hide-large" @click="w3_close" style="cursor:pointer" title="close side menu" ref="myOverlay"></div>

            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">
                <nuxt/>
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