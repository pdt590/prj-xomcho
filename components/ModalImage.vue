<template>
    <div>
        <figure class="image is-square">
            <img class="v-image-contain" :src="selectedImage.url" style='display: none' onload="this.style.display = 'block'" alt="item_image">
        </figure>
        <div class="columns is-variable is-1 is-mobile" style="margin-top: 0.1rem">
            <div class="column is-3" v-for="(image, i) in images" :key="i">
                <figure class="image is-square is-preview" @click="setMainImage(i)">
                    <img class="v-image-contain" v-lazy="image.url" style='display: none' onload="this.style.display = 'block'" :alt="`item_image_${i}`">
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            selectedId: Number,
            images: Array
        },
        data() {
            return {
                selectedImage: this.images[this.selectedId]
            }
        },
        methods: {
            setMainImage(index) {
                this.selectedImage = this.images[index]
            }
        }
    }
</script>
