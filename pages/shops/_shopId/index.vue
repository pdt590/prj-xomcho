<template>
    <section>
        <div class="w3-display-container w3-center w3-margin-bottom">
            <div class="mySlides w3-animate-opacity" v-for="i in 3" :key="i">
                <img class="w3-image" src="https://picsum.photos/600/250/?image=16" alt="Image 1" style="width: 100%; height: 75%">
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
            <h5><strong>Thông tin</strong></h5><hr>
            <h5>Đây là cửa hàng DuyThang. Shop chuyên cung cấp các mặt hàng thể thao</h5>
        </div>
        <div class="w3-padding w3-white w3-margin-bottom">
            <p>
                <span class="w3-tag w3-yellow w3-margin-right w3-margin-top"
                    v-for="(type, i) in itemTypes" 
                    :key="i">
                    <b>{{ type.title }}</b>
                </span>
            </p>
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
    let slideIndex = 1
    export default {
        layout: 'shop',
        mounted() {
            this.showDivs(5)
        },
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