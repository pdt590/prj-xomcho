<template>
    <div class="container">
        <!-- resetPassword -->
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

        <!-- verifyEmail -->
        <div class="has-text-centered" style="padding-top: 5rem" v-else-if="mode === `verifyEmail`">
            <div v-if="!authLoading && emailVerified!==null">
                <p class="title is-3" v-if="emailVerified">Kích hoạt tài khoản thành công!</p>
                <p class="title is-3" v-else>Mã kích hoạt không hợp lệ 😰!</p>
                <br>
                <nuxt-link class="subtitle is-4 has-text-link" to="/">Quay về trang chủ</nuxt-link>
            </div>
        </div>

        <!-- verifyEmail -->
        <div class="has-text-centered" style="padding-top: 5rem" v-else-if="mode === `recoverEmail`">
            <div v-if="!authLoading && emailRecoverd!==null">
                <p v-if="emailRecoverd">
                    <span class="title is-3">Khôi phục email thành công!</span><br>
                    <span class="title is-3">Kiểm tra hộp thư để đổi mật khẩu</span>
                </p>
                <p class="title is-3" v-else>Mã kích hoạt không hợp lệ 😰!</p>
                <br>
                <nuxt-link class="subtitle is-4 has-text-link" to="/">Quay về trang chủ</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { authMessage } from '~/plugins/util-helpers'
    import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'

    export default {
        validate ( { store } ) {
            const user = store.getters.user
            return (user && user.isActive ? false : true)
        },
        async mounted() {
            if(this.mode === 'verifyEmail' ) {
                this.emailVerified = await this.$store.dispatch('handleVerifyEmail', this.actionCode)
            }else if (this.mode === 'recoverEmail') {
                this.emailRecoverd = await this.$store.dispatch('handleRecoverEmail', this.actionCode)
            }
        },
        computed: {
            ... mapGetters(['user', 'authError', 'authLoading']),
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
                    confirmNewPassword: null,
                },
                restoredEmail: null,
                emailVerified: null,
                emailRecoverd: null,
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
                }
            },
            restoredEmail: {
                required,
                email
            }
        },
        methods: {
            async onResetPassword() {
                const response = await this.$store.dispatch('handleResetPassword', {
                    actionCode: this.actionCode,
                    newPassword: this.formData.newPassword
                })
                if(response) {
                    this.$router.push("/user/join")
                    this.$buefy.toast.open({
                        duration: 3000,
                        message: 'Mật khẩu thay đổi thành công',
                        type: 'is-success'
                    })
                }else {
                    this.$buefy.toast.open({
                        duration: 3000,
                        message: authMessage(this.authError),
                        type: 'is-danger'
                    })
                }
            }
        }
    }
</script>