<template>
    <section>
        <b-container>
            <b-row>
                <b-col lg="3">
                    <h4 class="my-4"><b>{{shop.title}}</b></h4>
                    <b-card
                        no-body
                        border-variant="success" 
                        class="my-2"
                    >
                        <h5 slot="header" class="mb-0"> <b>Thông tin</b></h5>
                        <b-list-group flush>
                            <b-list-group-item>
                                <h6><b>Chủ cửa hàng</b></h6>
                                <b-form-input v-model="ownerName" :plaintext= "!enableEdit" ></b-form-input>
                            </b-list-group-item>
                            <b-list-group-item>
                                <h6><b>Điạ chỉ liên hệ</b></h6>
                                <b-form-textarea v-model="desc" no-resize :rows="2" :max-rows="2" :plaintext= "!enableEdit" ></b-form-textarea>
                            </b-list-group-item>
                            <b-list-group-item>
                                <h6><b>Điện thoại</b></h6>
                                <b-form-input v-model="phone" :plaintext= "!enableEdit" ></b-form-input>
                            </b-list-group-item>
                            <b-list-group-item>
                                <h6><b>Facebook</b></h6>
                                <b-form-input v-model="facebook" :plaintext= "!enableEdit" ></b-form-input>
                            </b-list-group-item>
                            <b-list-group-item>
                                <h6><b>Từ khóa</b></h6>
                                <b-form-input v-model="facebook" :plaintext= "!enableEdit" ></b-form-input>
                            </b-list-group-item>
                        </b-list-group>
                        <b-card-body>
                            <h6><b>Miêu tả</b></h6>
                            <b-form-textarea v-model="desc" no-resize :rows="5" :max-rows="5" :plaintext= "!enableEdit" ></b-form-textarea>
                        </b-card-body>
                    </b-card>
                    <b-button @click="onEdit" variant="outline-sucess" block>{{ enableEdit ? "Lưu" : "Sửa thông tin"}}</b-button>
                    <b-button @click="onNewItem" variant="outline-sucess" block>Thêm sản phẩm</b-button>
                </b-col>
                <b-col lg="9">
                    <b-carousel
                        style="text-shadow: 1px 1px 2px #333;"
                        controls
                        indicators
                        background="#ababab"
                        :interval="4000"
                        img-width="300"
                        img-height="100"
                        class="my-4"
                    >
                        <!-- Text slides with image -->
                        <b-carousel-slide caption="First slide"
                                            text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                                            img-src="https://picsum.photos/300/100/?image=25"
                        ></b-carousel-slide>

                        <!-- Slides with custom text -->
                        <b-carousel-slide img-src="https://picsum.photos/300/100/?image=29">
                            <h1>Hello world!</h1>
                        </b-carousel-slide>
                    </b-carousel>
                    <b-row>
                        <b-col lg="4" md="6" class="mb-4">
                            <b-card title="Card Title"
                                img-src="https://picsum.photos/600/300/?image=25"
                                img-alt="Image"
                                img-top
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
        computed : {
            shop() {
                return this.$store.getters.loadedShop(this.$route.params.shopId)
            }
        },
        data () {
            return {
                enableEdit: false,
                ownerName: 'Phan Duy Thang',
                phone: true,
                facebook: '@duythang',
                desc: 'I am Phan Duy Thắng'
            }
        },
        methods: {
            onEdit(editedShop) {
                if (this.enableEdit) {
                    this.enableEdit = !this.enableEdit
                    this.$store.dispatch("editShop", editedShop).then(
                        () => {
                            this.$router.push('/shops/' + this.$route.params.shopId)
                        }
                    )
                }else {
                    this.enableEdit = !this.enableEdit
                }   
            },
            onNewItem() {

            }
        }
    }
</script>
