<template>
    <div>
        <div class="is-disapper" v-for="(img, i) in displayedImages" :key="i">
            <figure class="image is-square">
                <img :src="img.url">
            </figure>
        </div>
        <div class="columns is-variable is-1" style="margin-top: 0.1rem">
            <div class="column is-3" v-for="(img, i) in displayedImages" :key="i">
                <figure class="image is-square is-preview" @click="currentDiv(i+1)">
                    <img :src="img.url">
                </figure>
            </div>
            <div class="column is-3" v-for="(img, i) in displayedImages" :key="i">
                <figure class="image is-square is-preview" @click="currentDiv(i+1)">
                    <img :src="img.url">
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
    let slideIndex = 1;
    export default {
        props: {
            images: Array
        },
        mounted(){
            this.showDivs(slideIndex)
        },
        computed: {
            displayedImages() {
                if(this.images === undefined || !this.images.length) {
                    return [{url: '/icon-photo.png'}]
                }else {
                    return this.images
                }
            }
        },
        methods: {
            plusDivs(n) {
                this.showDivs(slideIndex += n);
            },
            currentDiv(n) {
                this.showDivs(slideIndex = n);
            },
            showDivs(n) {
                let x = document.getElementsByClassName("is-disapper");
                let dots = document.getElementsByClassName("is-preview");

                if (n > x.length) {slideIndex = 1}
                if (n < 1) {slideIndex = x.length}
                for (let i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                for (let i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
                }
                x[slideIndex-1].style.display = "block";
                dots[slideIndex-1].className += " w3-opacity-off";
            }
        }
    }
</script>

<style scoped>
    .is-disapper {
        display:none
    }
</style>