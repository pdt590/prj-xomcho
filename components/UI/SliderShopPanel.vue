<template>
    <section>
        <div v-if="displayedImages.length" v-for="(img, i) in displayedImages" :key="i">
            <img class="w3-image" :src="img.url" style="width: 200%;">
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
        computed: {
            displayedImages() {
                if(this.images === undefined || !this.images.length) {
                    return []
                }else {
                    return this.images
                }
            }
        }
    }
</script>