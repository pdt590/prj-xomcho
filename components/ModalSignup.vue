<template>
    <div>
        <form>
            <div class="modal-card v-modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Đăng ký</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Username*"
                        :type="!$v.formData.username.minlen ? `is-danger` : ``" 
                        :message="!$v.formData.username.minlen ? `Username phải dài hơn 6 kí tự` : ``">
                        <b-input
                            type="text"
                            v-model.trim="formData.username"
                            placeholder="Nhập username">
                        </b-input>
                    </b-field>

                    <b-field label="Email*" 
                        :type="!$v.formData.email.email || !responseSignup ? `is-danger` : ``" 
                        :message="!$v.formData.email.email || !responseSignup ? `Nhập email hợp lệ` : ``">
                        <b-input
                            type="email"
                            v-model.trim="formData.email"
                            placeholder="Nhập email">
                        </b-input>
                    </b-field>

                    <b-field label="Password*" 
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
                        @click.prevent="onSignup">
                        Đăng ký
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
                    username:'',
                    email: '',
                    password: ''
                },
                responseSignup: true
            }
        },
        validations: {
            formData: {
                username: {
                    required,
                    minlen: minLength(6)
                },
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
            async onSignup() {
                this.responseSignup = await this.$store.dispatch('signUserUp', this.formData)
                if(this.responseSignup) {
                    this.$parent.close()
                }else {
                    const message = authMessage(this.authError)
                    if(message === 'InvalEmail') {
                        this.$toast.open({
                            duration: 4000,
                            message: 'Email đã được sử dụng',
                            type: 'is-danger'
                        })
                    }
                }
            }
        }
    }
</script>