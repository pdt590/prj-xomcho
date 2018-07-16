<template>
    <section>
        <div class="w3-display-container w3-center w3-margin-bottom">
            <div class="mySlides w3-animate-opacity" v-for="i in 3" :key="i">
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
            <a class="w3-button w3-large w3-black w3-display-right w3-margin-right w3-hide-small w3-hover-light-grey" @click="plusDivs(1)">Khám phá <i class="fa fa-angle-right"></i></a>
            <a class="w3-button w3-block w3-black w3-hide-large w3-hide-medium" @click="plusDivs(1)">Khám phá <i class="fa fa-angle-right"></i></a>
        </div>
        <div class="w3-padding w3-white w3-margin-bottom">
            <h5><strong>Giới thiệu</strong></h5><br>
            <p>This is my shop</p>
            <hr>
            <h6>
                <span class="w3-tag w3-yellow w3-margin-right w3-margin-top"
                    v-for="(type, i) in itemTypes" 
                    :key="i">
                    <b>{{ type.title }}</b>
                </span>
            </h6>
            <hr>
            <h5><strong>Các mặt hàng hiển thị</strong></h5><br>
            <form>
                <div class="w3-row">
                    <div class="w3-col l4 m4 s6" 
                        v-for="(type, i) in itemTypes" 
                        :key="i">
                        <p>
                            <input class="w3-check w3-margin-right" type="checkbox" checked="checked">
                            <label>
                                <img :src="type.icon" class="w3-round w3-margin-right" style="width:10%;">
                                {{ type.title }}
                            </label>
                        </p>
                    </div>
                </div>
            </form>
        </div>

        <div class="w3-margin-bottom">
            <div class="w3-row-padding">
                <div class="w3-col l3 m4 s6 w3-margin-bottom" v-for="i in 8" :key="i">
                    <div class="w3-display-container">
                        <img src="https://picsum.photos/600/600/?image=42" class="w3-round-xlarge w3-hover-opacity" style="width:100%">
                        <div class="w3-display-middle w3-display-hover">
                            <nuxt-link to="/items/1re43565hy" class="w3-button w3-black" target="_blank">Chi tiết <i class="fa fa-external-link"></i></nuxt-link>
                        </div>
                    </div>
                    <div class="w3-container w3-padding">
                        <h5>Mega Ripped Jeans<br><b>$19.99</b></h5>
                        <button class="w3-button w3-green w3-right">Lưu <i class=""></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    let slideIndex = 1
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
        },
        mounted() {
            this.showDivs(5)
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