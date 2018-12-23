<template>
    <div>
        <form class="">
            <div class="modal-card v-modal-card">
                <div  v-if="!isMessageActive">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Mua hàng qua ...</p>
                    </header>
                    <section class="modal-card-body">
                        <div class="buttons" style="display: flex; justify-content: center">
                            <a  v-if="$route.params.shopUrl !== genShopUrl(itemData._shop.title, itemData._shop.id)"
                                :href="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}`" 
                                class="button is-grey is-outlined is-rounded is-large" target="_blank">
                                <b-icon icon="store"></b-icon>
                            </a>
                            <a class="button is-grey is-outlined is-rounded is-large" @click.prevent="isMessageActive = true">
                                <b-icon icon="comment-processing-outline"></b-icon>
                            </a>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                    </footer>
                </div>
                
                <div v-if="isMessageActive">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Tin nhắn</p>
                    </header>
                    <section class="modal-card-body" >
                        <b-field label="Tên*"
                            :type="$v.formData.fullname.$error ? `is-danger` : ``">
                            <b-input
                                type="text"
                                icon="account"
                                v-model.trim="formData.fullname"
                                @blur="$v.formData.fullname.$touch()"
                                placeholder="Họ tên...">
                            </b-input>
                        </b-field>

                        <b-field label="Điện thoại*"
                            :type="$v.formData.phone.$error ? `is-danger` : ``" 
                            :message="!$v.formData.phone.numeric ? `Nhập số điện thoại hợp lệ` : ``">
                            <b-input
                                type="tel"
                                icon="cellphone"
                                v-model.trim="formData.phone"
                                @blur="$v.formData.phone.$touch()"
                                placeholder="Số điện thoại...">
                            </b-input>
                        </b-field>

                        <b-field label="Địa chỉ*"
                            :type="$v.formData.address.$error ? `is-danger` : ``">
                            <b-input
                                type="text"
                                icon="map-marker"
                                v-model.trim="formData.address"
                                @blur="$v.formData.address.$touch()"
                                placeholder="Địa chỉ...">
                            </b-input>
                        </b-field>

                        <b-field label="Số lượng*">
                            <b-field>
                                <div class="control">
                                    <button class="button is-outlined" @click.prevent="unit>1 ? unit=unit-1 : ``">-</button>
                                </div>
                                <b-input type="number" v-model.number="unit" expanded></b-input>
                                <div class="control">
                                    <button class="button is-outlined" @click.prevent="unit=unit+1">+</button>
                                </div>
                            </b-field>
                        </b-field>

                        <b-field label="Tin nhắn">
                            <b-input
                                type="textarea"
                                maxlength="100"
                                v-model.trim="formData.content"
                                placeholder="Tin nhắn nếu có...">
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot" style="justify-content: space-between">
                        <button class="button is-rounded" type="button" @click="isMessageActive = false">Quay lại</button>
                        <div class="buttons">
                            <button class="button is-rounded" type="button" @click="$parent.close()">Close</button>
                            <button class="button is-info is-rounded" 
                                :class="{'is-loading': chatLoading}" 
                                :disabled="$v.formData.$invalid"
                                @click.prevent="onSend">Gửi</button>
                        </div>
                    </footer>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { authMessage } from '~/plugins/util-helpers'
    import { genUrl } from '~/plugins/util-helpers'
    import { required, numeric } from 'vuelidate/lib/validators'

    export default {
        props: {
            itemData: Object,
            unit: Number
        },
        created() {
            this.formData = {
                fullname: this.user && this.user.fullname ? this.user.fullname : null,
                phone: this.user && this.user.phone ? this.user.phone : null,
                address: this.user && this.user.address ? this.user.address + ' ' + this.user.province : null,
                content: null
            }
        },
        computed: {
            ...mapGetters(['chatLoading', 'user'])
        },
        data() {
            return {
                isMessageActive: false,
                formData: {
                    fullname: null,
                    phone: null,
                    address: null,
                    content: null
                },
                response: null
            }
        },
        validations: {
            formData: {
                fullname: {
                    required
                },
                phone: {
                    required,
                    numeric
                },
                address: {
                    required
                }
            }
        },
        methods: {
            async onSend() {
                this.response = await this.$store.dispatch('sendBuyMessage', {
                    itemUrl: this.$route.path,
                    itemTitle: this.itemData.title,
                    ...this.formData,
                    unit: this.unit,
                    partnerId: this.itemData._creator.id,
                    partnerUsername: this.itemData._creator.username
                })
                if(this.response) {
                        this.$parent.close()
                        this.$toast.open({
                            duration: 3000,
                            message: 'Gửi tin nhắn thành công',
                            type: 'is-success'
                        })
                    }else {
                        this.$toast.open({
                            duration: 3000,
                            message: authMessage(this.authError),
                            type: 'is-danger'
                        })
                    }
            },
            genShopUrl(title, id) {
                return genUrl(title, id)
            }
        }
    }
</script>
