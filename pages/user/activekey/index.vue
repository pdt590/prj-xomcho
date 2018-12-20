<template>
    <div class="container">
        <div class="columns" v-if="mode === `resetPassword`">
            <div class="column is-4 is-offset-4">
                <form>
                    <div class="card" style="margin-top: 2rem">
                        <header class="card-header">
                            <p class="card-header-title is-size-4">Yêu cầu đổi mật khẩu</p>
                        </header>
                        <div class="card-content">
                            <b-field label="Mật khẩu mới*"
                                :type="$v.formData.newPassword.$error ? `is-danger` : ``" 
                                :message="!$v.formData.newPassword.minlen ? `Tối thiểu 6 kí tự` : ``">
                                <b-input
                                    type="password"
                                    v-model.trim="formData.newPassword"
                                    @blur="$v.formData.newPassword.$touch()"
                                    password-reveal>
                                </b-input>
                            </b-field>
                            <b-field label="Xác nhận mật khẩu mới*"
                                :type="$v.formData.confirmNewPassword.$error ? `is-danger` : ``" 
                                :message="!$v.formData.confirmNewPassword.minlen ? `Tối thiểu 6 kí tự` : $v.formData.confirmNewPassword.$error ? `Mật khẩu không trùng khớp` : ``">
                                <b-input
                                    type="password"
                                    v-model.trim="formData.confirmNewPassword"
                                    @blur="$v.formData.confirmNewPassword.$touch()"
                                    password-reveal>
                                </b-input>
                            </b-field>
                        </div>
                        <footer class="card-footer">
                            <div class="card-footer-item">
                                <button class="button is-info is-rounded" 
                                    :class="{'is-loading': authLoading}"
                                    :disabled="$v.formData.$invalid" 
                                    @click.prevent="onResetPassword">
                                    Gửi yêu cầu
                                </button>
                            </div>
                        </footer>
                    </div>
                </form>
            </div>
        </div>
        <div class="has-text-centered" style="padding-top: 5rem" v-else-if="mode === `verifyEmail`">
            <div v-if="!authLoading && emailVerified!==null">
                <h1 class="title is-3" v-if="emailVerified">Kích hoạt tài khoản thành công</h1>
                <h1 class="title is-3" v-else>Mã kích hoạt không hợp lệ 😰😰😰!</h1>
                <nuxt-link class="subtitle is-4 has-text-link" to="/">Quay vể trang chủ</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { authMessage } from '~/plugins/util-helpers'
    import { required, sameAs, minLength } from 'vuelidate/lib/validators'

    export default {
        validate ( { store } ) {
            const user = store.getters.user
            return (user && user.isActive ? false : true)
        },
        async mounted() {
            // created runs in both Client and Server
            if(this.mode === 'verifyEmail' ) {
                this.emailVerified = await this.$store.dispatch('handleVerifyEmail', this.actionCode)
            }
        },
        computed: {
            ... mapGetters(['authError', 'authLoading']),
            mode() {
                return this.$route.query.mode
            },
            actionCode() {
                return this.$route.query.oobCode
            },
            apiKey() {
                return this.$route.query.apiKey
            },
        },
        data() {
            return {
                formData: {
                    newPassword: null,
                    confirmNewPassword: null
                },
                response: null,
                emailVerified: null
            }
        },
        validations: {
            formData: {
                newPassword: {
                    required, 
                    minlen: minLength(6)
                },
                confirmNewPassword: {
                    required,
                    minlen: minLength(6),
                    isValidPassword: sameAs('newPassword')
                },
            }
        },
        methods: {
            async onResetPassword() {
                this.response = await this.$store.dispatch('handleResetPassword', {
                    actionCode: this.actionCode,
                    newPassword: this.formData.newPassword
                })
                if(this.response) {
                    this.$router.push("/user/join")
                    this.$toast.open({
                        duration: 3000,
                        message: 'Mật khẩu thay đổi thành công',
                        type: 'is-success'
                    })
                }else {
                    this.$toast.open({
                        duration: 3000,
                        message: authMessage(this.authError),
                        type: 'is-danger'
                    })
                }
            }
        }
    }
</script>