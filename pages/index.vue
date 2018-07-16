<template>
    <section>
        <div class="w3-display-container w3-center">
            <div class="mySlides w3-animate-opacity">
                <img class="w3-image" src="https://picsum.photos/600/300/?image=16" alt="Image 1" style="width: 100%; height: 75%">
                <div class="w3-display-left w3-padding w3-hide-small" style="width:35%">
                <div class="w3-black w3-opacity w3-hover-opacity-off w3-padding-large w3-round-large">
                    <h1 class="w3-xlarge">Take photos with our app</h1>
                    <hr class="w3-opacity">
                    <p>Super simple installment: free of charge</p>
                    <p><button class="w3-button w3-block w3-green w3-round" @click="document.getElementById('download').style.display='block'">Download <i class="fa fa-android"></i> <i class="fa fa-apple"></i> <i class="fa fa-windows"></i></button></p>
                </div>
                </div>
            </div>
            <div class="mySlides w3-animate-opacity">
                <img class="w3-image" src="https://picsum.photos/600/300/?image=17" alt="Image 2" style=" width: 100%; height: 75%">
                <div class="w3-display-left w3-padding w3-hide-small" style="width:35%">
                <div class="w3-black w3-opacity w3-hover-opacity-off w3-padding-large w3-round-large">
                    <h1 class="w3-xlarge w3-text-red"><b>CLICK!</b> Fast and Easy</h1>
                    <hr class="w3-opacity">
                    <p>Choose from thousands of features</p>
                    <p><button class="w3-button w3-block w3-red w3-round" @click="document.getElementById('download').style.display='block'">Download <i class="fa fa-android"></i> <i class="fa fa-apple"></i> <i class="fa fa-windows"></i></button></p>
                </div>
                </div>
            </div>
            <div class="mySlides w3-animate-opacity">
                <img class="w3-image" src="https://picsum.photos/600/300/?image=18" alt="Image 3" style=" width: 100%; height: 75%">
                <div class="w3-display-left w3-padding w3-hide-small" style="width:35%">
                <div class="w3-black w3-opacity w3-hover-opacity-off w3-padding-large w3-round-large">
                    <h1 class="w3-xlarge">Smart Design</h1>
                    <hr class="w3-opacity">
                    <p>Customize photos as you go</p>
                    <p><button class="w3-button w3-block w3-indigo w3-round" @click="document.getElementById('download').style.display='block'">Download <i class="fa fa-android"></i> <i class="fa fa-apple"></i> <i class="fa fa-windows"></i></button></p>
                </div>
                </div>
            </div>
            <a class="w3-button w3-large w3-black w3-display-right w3-margin-right w3-hide-small w3-hover-light-grey" @click="plusDivs(1)">Khám phá <i class="fa fa-angle-right"></i></a>
            <a class="w3-button w3-block w3-black w3-hide-large w3-hide-medium" @click="plusDivs(1)">Khám phá <i class="fa fa-angle-right"></i></a>
        </div>

        <div class="w3-padding w3-margin-bottom">
            <div class="w3-row w3-content" style="max-width:1300px">
                <div class="w3-col l4">
                    <h3 class="w3-padding"><strong>Cửa hàng</strong></h3>
                </div>     
                <div class="w3-col l8 w3-padding-24 w3-margin-bottom">
                    <div class="w3-row-padding">
                        <div class="w3-col l3 m4 s6 w3-margin-bottom" v-for="i in 8" :key="i">
                            <div class="w3-display-container">
                                <img src="https://picsum.photos/600/600/?image=45" class="w3-round-xlarge w3-hover-opacity" style="width:100%">
                                <div class="w3-display-middle w3-display-hover">
                                    <nuxt-link to="/shops/1re43565hy" class="w3-button w3-black" target="_blank">Chi tiết <i class="fa fa-external-link"></i></nuxt-link>
                                </div>
                            </div>
                            <h5><strong>Shop DuyThang</strong></h5>  
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row w3-content" style="max-width:1400px">
                <div class="w3-col l4 w3-hide-large">
                    <h3 class="w3-padding"><strong>Các sản phẩm mới nhất</strong></h3>
                </div>    
                <div class="w3-col l8 w3-padding-24 w3-margin-bottom">
                    <div class="w3-row-padding">
                        <div class="w3-col l3 m4 s6 w3-margin-bottom" v-for="i in 8" :key="i">
                            <div class="w3-display-container">
                                <img src="https://picsum.photos/600/600/?image=42" class="w3-round-xlarge w3-hover-opacity" style="width:100%">
                                <div class="w3-display-middle w3-display-hover">
                                    <nuxt-link to="/shops/1re43565hy" class="w3-button w3-black" target="_blank">Chi tiết <i class="fa fa-external-link"></i></nuxt-link>
                                </div>
                            </div>
                            <div class="w3-container w3-padding">
                                <h6>Mega Ripped Jeans<br><b>$19.99</b></h6>
                                <button class="w3-button w3-green w3-right">Lưu <i class=""></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w3-col l4 w3-hide-medium w3-hide-small">
                    <h3 class="w3-padding w3-right"><strong>Các sản phẩm mới nhất</strong></h3>
                </div>   
            </div>
        </div>

    </section>
</template>

<script>
    let slideIndex = 1
    export default {
        layout: 'main',
        mounted() {
            this.showDivs(1)
        },
        methods: {
            showDivs(n) {
                let i 
                let x = document.getElementsByClassName("mySlides")
                if (n > x.length) {slideIndex = 1}    
                if (n < 1) {slideIndex = x.length}
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none"
                }
                x[slideIndex-1].style.display = "block"
            },
            plusDivs(n) {
                this.showDivs(slideIndex += n)
            }
        }
    }
</script>

<style>
    .mySlides {display: none;}
</style>
