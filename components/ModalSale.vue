<template>
    <div>
        <form class="">
            <div class="modal-card v-modal-card">
                <div  v-if="!isFormActive">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Mua hàng qua...</p>
                    </header>
                    <section class="modal-card-body">
                        <div class="buttons" style="display: flex; justify-content: center">
                            <a href="https://www.facebook.com/discount.real" class="button is-link is-outlined is-rounded is-large" target="_blank">
                                <b-icon icon="facebook"></b-icon>
                            </a>
                            <a class="button is-grey is-outlined is-rounded is-large" @click.prevent="isFormActive = true">
                                <b-icon icon="comment-processing-outline"></b-icon>
                            </a>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                    </footer>
                </div>
                
                <div v-if="isFormActive">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Tin nhắn</p>
                    </header>
                    <section class="modal-card-body" >
                        <b-field label="Tên người mua">
                            <b-input
                                type="text"
                                icon="account"
                                v-model.trim="formData.name"
                                placeholder="Họ tên..."
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Điện thoại">
                            <b-input
                                type="tel"
                                icon="cellphone"
                                v-model.trim="formData.phone"
                                placeholder="Số điện thoại..."
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Số lượng">
                            <b-input
                                type="text"
                                icon="basket"
                                v-model.trim="formData.numItems"
                                placeholder="Số lượng sản phẩm..."
                                required>
                            </b-input>
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
                    <footer class="modal-card-foot v-modal-card-foot">
                        <div>
                            <button class="button is-rounded" type="button" @click="$parent.close()">Close</button>
                            <button class="button is-info is-rounded" :class="{'is-loading': authLoading}" @click.prevent="">Gửi</button>
                        </div>
                        <button class="button is-rounded" type="button" @click="isFormActive = false">Quay lại</button>
                    </footer>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { authMessage } from '~/plugins/utility-helpers'

    export default {
        computed: {
            ... mapGetters(['authError', 'authLoading'])
        },
        data() {
            return {
                isFormActive: false,
                formData: {
                    name: '',
                    phone: '',
                    numItems: '',
                    message: ''
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-modal-card-foot {
        display: flex;
        justify-content: space-between;
    }
</style>
