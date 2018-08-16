<template>
    <section>
        <div class="w3-container">
            <div class="w3-display-container mySlides">
                <img src="https://picsum.photos/600/600/?image=58" style="width:100%;margin-bottom:-6px">
                <div class="w3-display-bottomleft w3-container w3-black">
                    <p>Living Room</p>
                </div>
            </div>
            <div class="w3-display-container mySlides">
                <img src="https://picsum.photos/600/600/?image=59" style="width:100%;margin-bottom:-6px">
                <div class="w3-display-bottomleft w3-container w3-black">
                    <p>Dining Room</p>
                </div>
            </div>
            <div class="w3-display-container mySlides">
                <img src="https://picsum.photos/600/600/?image=60" style="width:100%;margin-bottom:-6px">
                <div class="w3-display-bottomleft w3-container w3-black">
                    <p>Bedroom</p>
                </div>
            </div>
            <div class="w3-display-container mySlides">
                <img src="https://picsum.photos/600/600/?image=61" style="width:100%;margin-bottom:-6px">
                <div class="w3-display-bottomleft w3-container w3-black">
                    <p>Living Room II</p>
                </div>
            </div>
        </div>
        <div class="w3-row-padding w3-section">
            <div class="w3-col s3">
                <img class="demo w3-opacity w3-hover-opacity-off" src="https://picsum.photos/600/600/?image=58" style="width:100%;cursor:pointer" @click="currentDiv(1)" title="Living room">
            </div>
            <div class="w3-col s3">
                <img class="demo w3-opacity w3-hover-opacity-off" src="https://picsum.photos/600/600/?image=59" style="width:100%;cursor:pointer" @click="currentDiv(2)" title="Dining room">
            </div>
            <div class="w3-col s3">
                <img class="demo w3-opacity w3-hover-opacity-off" src="https://picsum.photos/600/600/?image=60" style="width:100%;cursor:pointer" @click="currentDiv(3)" title="Bedroom">
            </div>
            <div class="w3-col s3">
                <img class="demo w3-opacity w3-hover-opacity-off" src="https://picsum.photos/600/600/?image=61" style="width:100%;cursor:pointer" @click="currentDiv(4)" title="Second Living Room">
            </div>
        </div>
    </section>
</template>

<script>
    let slideIndex = 1;
    export default {
        mounted(){
            this.showDivs(slideIndex)
        },
        methods: {
            plusDivs(n) {
                this.showDivs(slideIndex += n);
            },
            currentDiv(n) {
                this.showDivs(slideIndex = n);
            },
            showDivs(n) {
                let i;
                let x = document.getElementsByClassName("mySlides");
                let dots = document.getElementsByClassName("demo");
                if (n > x.length) {slideIndex = 1}
                if (n < 1) {slideIndex = x.length}
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
                }
                x[slideIndex-1].style.display = "block";
                dots[slideIndex-1].className += " w3-opacity-off";
            }
        }
    }
</script>

<style scoped>
    .mySlides {display:none}
</style>
