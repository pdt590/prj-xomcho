<template>
    <section>
        <!-- Sidebar left -->
        <div class="w3-sidebar w3-light-grey w3-collapse w3-top w3-padding-64" style="z-index:3;width:270px" ref="mySidebar">
            <div class="w3-container">
                <nuxt-link :to="'/shops/' + $route.params.shopId">
                    <img src="https://picsum.photos/600/600/?image=52" style="width:100%;" class="w3-round">
                </nuxt-link>
                <br>
                <h4><b>Shop Duy Thang</b></h4>
            </div>
            <br>
            <div class="w3-bar-block">
                <h5 class="w3-bar-item w3-text-grey"><b>Thông tin</b></h5>
                <div class="w3-bar-item">
                    <div class="w3-row">
                        <div class="w3-col l2 m2 s2">
                            <a href="https://maps.google.com/?q=Long Biên, Hà Nội" target=_blank>
                                <i class="fa fa-map-pin w3-xlarge w3-text-blue"></i>
                            </a>
                        </div>
                        <div class="w3-col l10 m10 s10">
                            <h6 class="mySideBar">Hà Nội</h6>
                        </div>
                    </div>
                </div>
                <div class="w3-bar-item">
                    <div class="w3-row">
                        <div class="w3-col l2 m2 s2">
                            <a href="https://facebook.com" target=_blank>
                                <i class="fa fa-facebook-official w3-xlarge w3-text-blue"></i>
                            </a>
                        </div>
                        <div class="w3-col l10 m10 s10">
                            <h6 class="mySideBar">duythang</h6>
                        </div>
                    </div>
                </div>
                <div class="w3-bar-item">
                    <div class="w3-row">
                        <div class="w3-col l2 m2 s2">
                            <a href="tel:016727735514">
                                <i class="fa fa-phone w3-xlarge w3-text-blue"></i>
                            </a>
                        </div>
                        <div class="w3-col l10 m10 s10">
                            <h6 class="mySideBar">017627735514</h6>
                        </div>
                    </div>
                </div>
                <div class="w3-bar-item">
                    <div class="w3-row">
                        <div class="w3-col l2 m2 s2">
                            <a href="mailto:thangecp@gmail.com?Subject=Xin%20Chào%20Cửa%20Hàng">
                                <i class="fa fa-envelope w3-xlarge w3-text-blue"></i>
                            </a>
                        </div>
                        <div class="w3-col l10 m10 s10">
                            <h6 class="mySideBar">thangecp@gmail.com</h6>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="w3-bar-block">
                <h5 class="w3-bar-item w3-text-grey"><b>Công cụ</b></h5>
                <div class="w3-bar-item">
                    <div class="w3-row">
                        <div class="w3-col l2 m2 s2">
                            <i class="w3-xlarge w3-margin-right" :class="isSave ? 'myHeart fa fa-bookmark' :'myHeart fa fa-bookmark-o'" @click="onSave()"></i> 
                        </div>
                        <div class="w3-col l10 m10 s10">
                            <h6 class="mySideBar">Lưu cửa hàng</h6>
                        </div>
                    </div>
                </div>
                <nuxt-link :to="'/shops/' + $route.params.shopId + '/edit-shop'" class="w3-bar-item w3-button">
                    <div class="w3-row">
                        <div class="w3-col l2 m2 s2">
                            <i class="fa fa-gear w3-xlarge w3-text-blue w3-margin-right"></i>
                        </div>
                        <div class="w3-col l10 m10 s10">                               
                            <h6 class="mySideBar">Chỉnh sửa</h6>
                        </div>
                    </div>
                </nuxt-link>
                <nuxt-link :to="'/shops/' + $route.params.shopId + '/new-item'" class="w3-bar-item w3-button">
                    <div class="w3-row">
                        <div class="w3-col l2 m2 s2">
                            <i class="fa fa-plus-square w3-xlarge w3-text-blue w3-margin-right"></i>
                        </div>
                        <div class="w3-col l10 m10 s10">                               
                            <h6 class="mySideBar">Thêm sản phẩm</h6>
                        </div>
                    </div>
                </nuxt-link>
                <nuxt-link :to="'/shops/' + $route.params.shopId + '/comments'" class="w3-bar-item w3-button">       
                    <div class="w3-row">
                        <div class="w3-col l2 m2 s2">
                            <i class="fa fa-commenting w3-xlarge w3-text-blue w3-margin-right"></i>
                        </div>
                        <div class="w3-col l10 m10 s10">                               
                            <h6 class="mySideBar">Đánh giá cửa hàng</h6>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- Overlay effect when opening sidebar on small screens -->
        <div class="w3-overlay w3-hide-large" @click="closeSideBar" style="cursor:pointer" title="close side menu" ref="myOverlay"></div>
    </section>
</template>

<script>
    export default {
        computed: {
            openSideBar() {
                return this.$store.getters.sideBar
            }
        },
        watch: {
            openSideBar(newValue) {
                if(newValue) {
                    this.$refs.mySidebar.style.display = 'block'
                    this.$refs.myOverlay.style.display = 'block'
                } else {
                    this.$refs.mySidebar.style.display = 'none'
                    this.$refs.myOverlay.style.display = 'none'
                }
            },
        },
        data() {
            return {
                isSave: false
            }
        },
        methods: {
            closeSideBar() {
                this.$store.dispatch('openSideBar', false)
                this.$refs.myOverlay.style.display = 'none'
            },
            onSave() {
                this.isSave = !this.isSave
            }
        }
    }
</script>

<style>
    h6.mySideBar {
        display: inline-block;
        margin: 0
    }
    .myHeart {
        font-size: 22px;
        color:red;
        cursor: pointer;
    }
</style>
