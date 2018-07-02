<template>
    <section>
        <b-container>
            <b-row>
                <b-col
                    v-for="shop in shopList"
                    :key="shop.id"
                    lg="4" md="6" class="mb-4"
                >
                    <b-card
                        :title="shop.title"
                        :img-src="shop.thumbnail"
                        img-alt="Image"
                        img-top
                        class="h-100"
                    >
                        <p class="card-text">
                        {{ shop.desc}}
                        </p>
                        <b-button :to="'/shops/' + shop.id" variant="primary">Sửa</b-button>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
    export default {
        //middleware: ['auth'],
        computed: {
            shopList() {
                return this.$store.getters.loadedShops
            }
        }
    }
</script>
