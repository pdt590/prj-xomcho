<template>
    <div>
        <figure class="image is-square" @dblclick="isModalImageActive=true;">
            <img class="v-image-contain" :src="mainImage.url" style='display: none' onload="this.style.display = 'block'" alt="item_image">
        </figure>
        <div class="columns is-variable is-1 is-mobile" style="margin-top: 0.1rem">
            <div class="column is-3" v-for="(image, i) in images" :key="i">
                <figure class="image is-square is-preview" @click="setMainImage(i)">
                    <img class="v-image-contain" v-lazy="image.url" style='display: none' onload="this.style.display = 'block'" :alt="`item_image_${i}`">
                </figure>
            </div>
        </div>
        <b-modal :active.sync="isModalImageActive">
            <v-modal-image :selectedId="selectedId" :images="images" style="overflow: hidden;"/>
        </b-modal> 
    </div>
</template>

<script>
    export default {
        props: {
            images: Array
        },
        data() {
            return {
                mainImage: this.images[0],
                selectedId: 0,
                isModalImageActive: false
            }
        },
        methods: {
            setMainImage(index) {
                this.selectedId = index
                this.mainImage = this.images[index]
            }
        }
    }
</script>