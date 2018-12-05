<template>
    <div>
        <form>
            <div class="modal-card v-modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Đăng nhập</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Email" 
                        :type="!$v.formData.email.email || !responseLogin? `is-danger` : ``" 
                        :message="!$v.formData.email.email || !responseLogin ? `Nhập email hợp lệ` : ``">
                        <b-input
                            type="email"
                            v-model.trim="formData.email"
                            placeholder="Nhập Email">
                        </b-input>
                    </b-field>

                    <b-field label="Password" 
                        :type="!$v.formData.password.minlen ? `is-danger` : ``" 
                        :message="!$v.formData.password.minlen ? `Mật khẩu phải dài hơn 6 kí tự` : ``">
                        <b-input
                            type="password"
                            v-model.trim="formData.password"
                            password-reveal
                            placeholder="Nhập mật khẩu">
                        </b-input>
                    </b-field>

                    <b-checkbox>Remember me</b-checkbox>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-rounded" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-info is-rounded" 
                        :class="{'is-loading': authLoading}" 
                        :disabled="$v.formData.$invalid"
                        @click.prevent="onLogin">
                        Đăng nhập
                    </button>
                </footer>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { required, email, minLength } from 'vuelidate/lib/validators'
    import { authMessage } from '~/plugins/utility-helpers'

    export default {
        computed: {
            ... mapGetters(['authError', 'authLoading'])
        },
        data() {
            return {
                formData: {
                    email: '',
                    password: ''
                },
                responseLogin: true
            }
        },
        validations: {
            formData: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minlen: minLength(6)
                }
            }
        },
        methods: {
            async onLogin() {
                this.responseLogin = await this.$store.dispatch('signUserIn', this.formData)
                if(this.responseLogin) {
                    this.$parent.close()
                }else {
                    const message = authMessage(this.authError)
                    if(message === 'InvalEmail') {
                        this.$toast.open({
                            duration: 4000,
                            message: 'Email đã được sử dụng',
                            type: 'is-danger'
                        })
                    }else if(message === 'WrongUser') {
                        this.$toast.open({
                            duration: 4000,
                            message: 'Email không tồn tại',
                            type: 'is-danger'
                        })
                    }else if(message === 'WrongPass') {
                        this.$toast.open({
                            duration: 4000,
                            message: 'Sai mật khẩu',
                            type: 'is-danger'
                        })
                    }
                }
            }
        }
    }
</script>