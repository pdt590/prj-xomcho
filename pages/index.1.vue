<template>
    <section>
        <div class="w3-padding-24 w3-margin-bottom">
            <div class="w3-content" style="max-width:1400px;">
                <img src="https://picsum.photos/1400/500/?image=16" style="width:100%; max-height:500px">
            </div>
        </div>
        
        <div class="w3-padding-24 w3-margin-bottom w3-light-grey">
            <div class="w3-content" style="max-width:1400px">
                <div class="w3-bar">
                    <h3 class="w3-bar-item"><strong>Cửa hàng</strong></h3>
                    <nuxt-link to="/shops/new-shop" class="w3-bar-item w3-button w3-green w3-padding w3-third">
                        <i class="fa fa-save w3-xlarge w3-margin-right"></i> 
                        Tạo cửa hàng của bạn
                    </nuxt-link>
                </div>
                    
                <div class="w3-row-padding">
                    <div class="w3-col l3 m4 s6 w3-margin-bottom" v-for="i in 8" :key="i">
                        <div class="w3-border w3-round w3-white">
                            <div class="w3-display-container">
                                <img src="https://picsum.photos/600/600/?image=32" style="width:100%">
                                <span class="w3-tag w3-display-topleft">New</span>
                                <div class="w3-display-middle w3-display-hover">
                                    <nuxt-link to="/shops/1re43565hy" class="w3-button w3-black" target="_blank">Chi tiết <i class="fa fa-external-link"></i></nuxt-link>
                                </div>
                                <button class="w3-button w3-green w3-display-bottomright">Lưu <i class=""></i></button>
                            </div>       
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w3-padding w3-margin-bottom">
            <div class="w3-content" style="max-width:1400px">
                <h3 class="w3-padding"><strong>Sản phẩm</strong></h3>
                <div class="w3-row-padding">
                    <div class="w3-col l3 m4 s6 w3-margin-bottom" v-for="i in 12" :key="i">
                        <div class="w3-border w3-round w3-light-grey">
                            <div class="w3-display-container">
                                <img src="https://picsum.photos/1020/600/?image=32" style="width:100%">
                                <span class="w3-tag w3-display-topleft">New</span>
                                <div class="w3-display-middle w3-display-hover">
                                    <nuxt-link to="/items/dsds" class="w3-button w3-black" target="_blank">Chi tiết <i class="fa fa-external-link"></i></nuxt-link>
                                </div>
                            </div>
                            <div class="w3-container w3-padding">
                                <p>Mega Ripped Jeans<br><b>$19.99</b></p>
                                <button class="w3-button w3-green w3-right">Lưu <i class=""></i></button>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        layout: 'main',
        methods: {
            openTab(event, arg) {
                let i, x, tablinks;
                x = document.getElementsByClassName("section");
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablink");
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
                }
                document.getElementById(arg).style.display = "block";
                event.currentTarget.firstElementChild.className += " w3-border-red";
            }
        }
    }
</script>