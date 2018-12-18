<template>
    <div>
        <form class="">
            <div class="modal-card v-modal-card">
                <div  v-if="!isMessageActive">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Mua hàng qua...</p>
                    </header>
                    <section class="modal-card-body">
                        <div class="buttons" style="display: flex; justify-content: center">
                            <a href="https://www.facebook.com/discount.real" class="button is-link is-outlined is-rounded is-large" target="_blank">
                                <b-icon icon="facebook"></b-icon>
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
                                    <button class="button is-rounded is-outlined" @click.prevent="unit>1 ? unit=unit-1 : ``">-</button>
                                </div>
                                <b-input type="number" v-model="unit" expanded></b-input>
                                <div class="control">
                                    <button class="button is-rounded is-outlined" @click.prevent="unit=unit+1">+</button>
                                </div>
                            </b-field>
                        </b-field>

                        <b-field label="Tin nhắn">
                            <b-input
                                type="textarea"
                                maxlength="100"
                                v-model.trim="formData.message"
                                placeholder="Tin nhắn nếu có...">
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot" style="justify-content: space-between">
                        <button class="button is-rounded" type="button" @click="isMessageActive = false">Quay lại</button>
                        <div class="buttons">
                            <button class="button is-rounded" type="button" @click="$parent.close()">Close</button>
                            <button class="button is-info is-rounded" 
                                :class="{'is-loading': authLoading}" 
                                :disabled="$v.formData.$invalid"
                                @click.prevent="">Gửi</button>
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
    import { required, numeric } from 'vuelidate/lib/validators'

    export default {
        props: {
            unit: Number
        },
        computed: {
            ...mapGetters(['itemLoading', 'loadedShop']),
            loadedItem() {
                return this.$store.getters.loadedItem(this.$route.params.itemUrl)
            }
        },
        data() {
            return {
                isMessageActive: false,
                formData: {
                    fullname: null,
                    phone: null,
                    address: null,
                    message: null
                }
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
        }
    }
</script>
