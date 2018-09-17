<template>
    <section>
        <div class="w3-display-container w3-center">
            <div class="app-shop-slider w3-animate-opacity" v-for="(img, i) in images" :key="i">
                <img class="w3-image" :src="img.url" :alt="'Image' + i" style="width: 200%;">
            </div>
            <a class="w3-button w3-large w3-black w3-display-right w3-margin-right w3-hide-small w3-opacity w3-hover-opacity-off" @click="plusDivs(1)">Khám phá <i class="fa fa-angle-right"></i></a>
            <a class="w3-button w3-block w3-black w3-hide-large w3-hide-medium" @click="plusDivs(1)">Khám phá <i class="fa fa-angle-right"></i></a>
        </div>
    </section>
</template>

<script>
    let slideIndex = 1
    export default {
        props: {
            images: {
                type: Array
            }
        },
        mounted() {
            this.showDivs(1)
        },
        methods: {
            showDivs(n) {
                let i 
                let x = document.getElementsByClassName("app-shop-slider")
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
    .app-shop-slider {display: none;}
</style>