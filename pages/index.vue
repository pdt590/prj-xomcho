<template>
    <section>
        <app-slider-mainpanel/>

        <div class="w3-margin">
            <div class="w3-row-padding w3-content" style="max-width:1300px; padding: 0"> 
                <div class="w3-col l4" style="padding: 0 2px">
                    <a class="w3-button w3-white w3-border w3-center w3-padding w3-text-blue w3-hover-blue" style="width: 100%;">
                        <i class="fa fa-smile-o w3-xxlarge"></i>
                        <h5><b>Đăng nhập / Đăng ký</b></h5>
                    </a>
                </div>
                <div class="w3-col l4" style="padding: 0 2px">
                    <a class="w3-button w3-white w3-border w3-center w3-padding w3-text-blue w3-hover-blue" style="width: 100%">
                        <i class="fa fa-plus-square-o w3-xxlarge"></i>
                        <h5><b>Tạo cửa hàng</b></h5>
                    </a>
                </div>
                <div class="w3-col l4"  style="padding: 0 2px">
                    <a class="w3-button w3-white w3-border w3-center w3-padding w3-text-blue w3-hover-blue" style="width: 100%">
                        <i class="fa fa-table w3-xxlarge"></i>
                        <h5><b>Quản lý đơn hàng</b></h5>
                    </a>
                </div>
            </div>
        </div>

        <div class="w3-margin-bottom">
            <div class="w3-content w3-white w3-border" style="max-width:1300px">
                <h5 class="w3-padding w3-border-bottom"><i class="fa fa-bank w3-xlarge w3-margin-right"></i><b>CỬA HÀNG NỔI BẬT</b></h5>
                <app-slider-mainshop/>
            </div>
        </div>

        <!--<div class="w3-margin-bottom">
            <div class="w3-content w3-white w3-border" style="max-width:1300px">
                <h5 class="w3-padding"><strong>DANH MỤC CỬA HÀNG</strong></h5>
                <div class="w3-row-padding">
                    <div class="w3-col l2 m6 s6 w3-center" style="padding: 0px" v-for="i in 6" :key="i">
                        <nuxt-link to="/" class="w3-button w3-white w3-border w3-hover-shadow w3-hover-white w3-padding" style="width: 100%;">
                            <img src="https://picsum.photos/100/100/?image=63" class="w3-margin-top" style="width:60%">
                            <h6><b>Food</b></h6>
                        </nuxt-link>
                    </div>
                </div>
                <br>
            </div>
        </div>-->

        <div class="w3-margin-bottom">
            <div class="w3-content w3-white w3-border" style="max-width:1300px">
                <h5 class="w3-padding w3-border-bottom"><i class="fa fa-shopping-bag w3-xlarge w3-margin-right"></i><b>SẢN PHẨM MỚI</b></h5>
                <div class="w3-row-padding">
                    <div class="w3-col l2 m3 s6 w3-margin-bottom" v-for="i in 12" :key="i">
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