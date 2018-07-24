<template>
    <section>
        <app-slider-mainpanel/>

        <div class="w3-padding w3-margin">
            <div class="w3-row-padding w3-content" style="max-width:1300px"> 
                <div class="w3-col l4">
                    <button class="w3-button w3-white w3-border w3-round-large w3-center w3-padding w3-hover-green" style="width: 100%">
                        <i class="fa fa-smile-o w3-xxlarge"></i>
                        <h5><b>Đăng nhập / Đăng ký</b></h5>
                    </button>
                </div>
                <div class="w3-col l4">
                    <button class="w3-button w3-white w3-border w3-round-large w3-center w3-padding w3-hover-green" style="width: 100%">
                        <i class="fa fa-plus-square-o w3-xxlarge"></i>
                        <h5><b>Tạo cửa hàng</b></h5>
                    </button>
                </div>
                <div class="w3-col l4">
                    <button class="w3-button w3-white w3-border w3-round-large w3-center w3-padding w3-hover-green" style="width: 100%">
                        <i class="fa fa-table w3-xxlarge"></i>
                        <h5><b>Quản lý đơn hàng</b></h5>
                    </button>
                </div>
            </div>
        </div>

        <div class="w3-padding w3-white w3-margin-bottom">
            <app-slider-mainshop/>
        </div>

        <!--<div class="w3-padding w3-margin-bottom">
            <div class="w3-row w3-content" style="max-width:1300px">
                <div class="w3-col l4">
                    <h3 class="w3-padding"><strong>Cửa hàng</strong></h3>
                </div>     
                <div class="w3-col l8 w3-padding-24 w3-margin-bottom">
                    <div class="w3-row-padding">
                        <div class="w3-col l2 m4 s6 w3-margin-bottom" v-for="i in 8" :key="i">
                            <app-shop-card />
                        </div>
                    </div>
                </div>
            </div>
        </div>-->

        <div class="w3-margin-bottom">
            <div class="w3-content" style="max-width:1300px">
                <h4 class="w3-padding"><strong>DANH MỤC SẢN PHẨM</strong></h4>
                <div class="w3-row-padding">
                    <div class="w3-col l2 m6 s6 w3-center" v-for="i in 6" :key="i">
                        <nuxt-link to="/" class="w3-button w3-white w3-border w3-hover-shadow w3-hover-white w3-padding" style="width: 100%;">
                            <img src="https://picsum.photos/100/100/?image=63" class="w3-margin-top" style="width:60%">
                            <h6><b>Food</b></h6>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-content" style="max-width:1300px">
                <h4 class="w3-padding"><strong>SẢN PHẨM MỚI</strong></h4>   
                <div class="w3-row-padding">
                    <div class="w3-col l2 m6 s6 w3-margin-bottom" v-for="i in 12" :key="i">
                        <app-product-card03 />
                        <br>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    export default {
        layout: 'main'
    }
</script>