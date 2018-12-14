<template>
    <div class="container">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <!-- Signup form -->
                <form v-if="isSignup">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title is-size-4">Đăng ký</p>
                        </header>
                        <div class="card-content">
                            <b-field label="Username*"
                                :type="!$v.formDataSignup.username.minlen ? `is-danger` : ``" 
                                :message="!$v.formDataSignup.username.minlen ? `Username phải dài hơn 6 kí tự` : ``">
                                <b-input
                                    type="text"
                                    v-model.trim="formDataSignup.username"
                                    placeholder="Nhập username">
                                </b-input>
                            </b-field>

                            <b-field label="Email*" 
                                :type="!$v.formDataSignup.email.email || !responseSignup ? `is-danger` : ``" 
                                :message="!$v.formDataSignup.email.email || !responseSignup ? `Nhập email hợp lệ` : ``">
                                <b-input
                                    type="email"
                                    v-model.trim="formDataSignup.email"
                                    placeholder="Nhập email">
                                </b-input>
                            </b-field>

                            <b-field label="Password*" 
                                :type="!$v.formDataSignup.password.minlen ? `is-danger` : ``" 
                                :message="!$v.formDataSignup.password.minlen ? `Mật khẩu phải dài hơn 6 kí tự` : ``">
                                <b-input
                                    type="password"
                                    v-model.trim="formDataSignup.password"
                                    password-reveal
                                    placeholder="Nhập mật khẩu">
                                </b-input>
                            </b-field>

                            <b-checkbox>Remember me</b-checkbox>
                        </div>
                        <footer class="card-footer">
                            <div class="card-footer-item">
                                <button class="button is-info is-rounded" 
                                    :class="{'is-loading': authLoading}"
                                    :disabled="$v.formDataSignup.$invalid" 
                                    @click.prevent="onSignup">
                                    Đăng ký
                                </button>
                                <button class="button is-rounded" type="button"
                                    @click.prevent="isSignup = !isSignup">
                                    {{ isSignup ? `Đăng nhập` : `Đăng ký`}}
                                </button>
                            </div>
                        </footer>
                    </div>
                </form>

                <!-- Login form -->
                <form v-else>
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title is-size-4">Đăng nhập</p>
                        </header>
                        <div class="card-content">
                            <b-field label="Email" 
                                :type="!$v.formDataLogin.email.email || !responseLogin? `is-danger` : ``" 
                                :message="!$v.formDataLogin.email.email || !responseLogin ? `Nhập email hợp lệ` : ``">
                                <b-input
                                    type="email"
                                    v-model.trim="formDataLogin.email"
                                    placeholder="Nhập Email">
                                </b-input>
                            </b-field>

                            <b-field label="Password" 
                                :type="!$v.formDataLogin.password.minlen ? `is-danger` : ``" 
                                :message="!$v.formDataLogin.password.minlen ? `Mật khẩu phải dài hơn 6 kí tự` : ``">
                                <b-input
                                    type="password"
                                    v-model.trim="formDataLogin.password"
                                    password-reveal
                                    placeholder="Nhập mật khẩu">
                                </b-input>
                            </b-field>

                            <b-checkbox>Remember me</b-checkbox>
                        </div>
                        <footer class="card-footer">
                            <div class="card-footer-item">
                                <button class="button is-info is-rounded" 
                                    :class="{'is-loading': authLoading}" 
                                    :disabled="$v.formDataLogin.$invalid"
                                    @click.prevent="onLogin">
                                    Đăng nhập
                                </button>
                                <button class="button is-rounded" type="button"
                                    @click.prevent="isSignup = !isSignup">
                                    {{ isSignup ? `Đăng nhập` : `Đăng ký`}}
                                </button>
                            </div> 
                        </footer>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { required, email, minLength } from 'vuelidate/lib/validators'
    import { authMessage } from '~/plugins/util-helpers'

    export default {
        computed: {
            ... mapGetters(['authError', 'authLoading'])
        },
        data() {
            return {
                formDataSignup: {
                    username:'',
                    email: '',
                    password: ''
                },
                formDataLogin: {
                    email: '',
                    password: ''
                },
                responseSignup: true,
                responseLogin: true,
                isSignup: true
            }
        },
        validations: {
            formDataSignup: {
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
            },
            formDataLogin: {
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
                this.responseSignup = await this.$store.dispatch('signUserUp', this.formDataSignup)
                if(this.responseSignup) {
                    this.$router.push('/')
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
            },
            async onLogin() {
                this.responseLogin = await this.$store.dispatch('signUserIn', this.formDataLogin)
                if(this.responseLogin) {
                    this.$router.push('/')
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

<style lang="scss" scoped>
    .card {
        border-radius: 0.3rem;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.1);
        margin-top: 3rem;
        .card-header {
            padding: 1rem;
        }
        .card-footer .card-footer-item {
            justify-content: space-between;
            padding: 1rem;
        }
    }
</style>
