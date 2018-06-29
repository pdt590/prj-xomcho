<template>
    <section>
        <b-container>

            <b-row>
                <b-col lg="3">
                    <h1 class="my-4">{{loadedShop.title}}</h1>
                    <div class="list-group">
                        <a href="#" class="list-group-item">Category 1</a>
                        <a href="#" class="list-group-item">Category 2</a>
                        <a href="#" class="list-group-item">Category 3</a>
                    </div>
                </b-col>

                <b-col lg="9">
                    <b-carousel 
                        id="carausel"
                        controls
                        indicators
                        :interval="4000"
                        img-width="1024"
                        img-height="480"
                        class="mb-4"
                    >
                        <b-carousel-slide 
                            caption="First slide"
                            text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                            img-src="https://picsum.photos/1024/480/?image=52"
                        ></b-carousel-slide>
                        <b-carousel-slide 
                            caption="First slide"
                            text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                            img-src="https://picsum.photos/1024/480/?image=52"
                        ></b-carousel-slide>
                        <b-carousel-slide 
                            caption="First slide"
                            text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                            img-src="https://picsum.photos/1024/480/?image=52"
                        ></b-carousel-slide>
                    </b-carousel>

                    <b-row>
                        <b-col lg="4" md="6" class="mb-4">
                            <b-card title="Card Title"
                                img-src="https://picsum.photos/600/300/?image=25"
                                img-alt="Image"
                                img-top
                                tag="article"
                                style="max-width: 20rem;"
                                class="h-100"
                            >
                                <p class="card-text">
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </p>
                                <b-button href="#" variant="primary">Go somewhere</b-button>
                            </b-card>
                        </b-col>
                    </b-row>

                </b-col>
            </b-row>

        </b-container>
    </section>
</template>

<script>
    export default {
        middleware: ['check-auth', 'auth'],
        asyncData(context) {
            return context.app.$axios
            .$get('/shops/' + context.params.shopId + '.json')
            .then(data => {
                return {
                    loadedShop: {...data, id: context.params.shopId}
                }
            })
            .catch(e => context.error(e))
        },
        methods: {
            onEdited(editedShop) {
            this.$store.dispatch("editShop", editedShop).then(() => {
                this.$router.push('/shops/' + this.$route.params.shopId)
            })
            }
        }
    }
</script>