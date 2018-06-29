<template>
    <section>
        <!-- Nav bar -->
        <b-navbar toggleable="md" type="dark" fixed="top" variant="light">

            <b-navbar-brand to="/">
                <img src="https://dummyimage.com/50x50/000/0011ff" alt="img">
                Ta Đi Chợ
            </b-navbar-brand>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav v-if="isAuth" class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template slot="button-content">
                            <b-img rounded="circle" fluid src="https://dummyimage.com/40x40/000/0011ff" alt="img"/>
                        </template>
                        <b-dropdown-item-button @click="$router.push('/user')">Thông tin</b-dropdown-item-button>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button @click="onLogout">Đăng xuất</b-dropdown-item-button>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                <b-navbar-nav v-else class="ml-auto">
                    <b-nav-item>
                        <b-button variant="success" class="my-button" @click="$refs.signinModal.show()">Đăng nhập</b-button>    
                    </b-nav-item>
                    <b-nav-item>
                        <b-button variant="success" class="my-button" @click="$refs.signupModal.show()">Đăng kí</b-button> 
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>

        </b-navbar>

        <!-- Signin Modal -->
        <b-modal ref="signinModal" title="Đăng nhập" hide-footer>

            <!-- Alert-->
            <b-alert :show="showAlert" dismissible variant="danger">Vui lòng kiểm tra lại email và mật Khẩu</b-alert>

            <!-- Form -->
            <b-form-group
                label="Email"
                label-for="signinEmail"
                :invalid-feedback="invalidEmail"
                :state="emailState"
            >
                <b-form-input id="signinEmail" type="email" :state="emailState" v-model.trim="email"></b-form-input>
            </b-form-group>
            <b-form-group
                label="Password"
                label-for="signinPassword"
                :invalid-feedback="invalidPassword"
                :state="passwordState"
            >
                <b-form-input id="signinPassword" type="password" :state="passwordState" v-model.trim="password"></b-form-input>
            </b-form-group>
            <b-btn block @click="onSignin" variant="success">Đăng nhập</b-btn>
        </b-modal>

        <!-- Signup Modal -->
        <b-modal ref="signupModal" title="Đăng kí" hide-footer>

            <!-- Alert-->
            <b-alert :show="showAlert" dismissible variant="danger">Email của bạn đã được sử dụng</b-alert>

            <!-- Form -->
            <b-form-group
                label="Họ và Tên "
                label-for="signupUsername"
                :invalid-feedback="invalidUsername"
                :valid-feedback="validUsername"
                :state="usernameState"
            >
                <b-form-input id="signupUsername" type="text" :state="usernameState" v-model.trim="username"></b-form-input>
            </b-form-group>
            <b-form-group
                label="Email"
                label-for="signupEmail"
                :invalid-feedback="invalidEmail"
                :valid-feedback="validEmail"
                :state="emailState"
            >
                <b-form-input id="signupEmail" type="email" :state="emailState" v-model.trim="email"></b-form-input>
            </b-form-group>
            <b-form-group
                label="Mật Khẩu"
                label-for="passwordSignup"
                :invalid-feedback="invalidPassword"
                :valid-feedback="validPassword"
                :state="passwordState"
            >
                <b-form-input id="passwordSignup" type="password" :state="passwordState" v-model.trim="password"></b-form-input>
            </b-form-group>
            <b-btn block @click="onSignup" variant="info">Đăng ký</b-btn>
        </b-modal>

        <!-- New Shop Modal -->
        <b-modal ref="newShopModal" title="Tạo cửa hàng" hide-footer>
            
            <!-- Alert-->
            <b-alert :show="showAlert" dismissible variant="danger">Vui lòng kiểm tra lại thông tin</b-alert>

            <!-- Form -->
            <b-form-group
                label="Tên cửa hàng"
                label-for="shopTitle"
                :invalid-feedback="invalidTitle"
                :state="titleState"
            >
                <b-form-input id="shopTitle" type="text" :state="titleState" v-model.trim="shopTitle"></b-form-input>
            </b-form-group>
            <b-form-group
                label="Miêu tả"
                label-for="shopDesc"
                :invalid-feedback="invalidDesc"
                :state="descState"
            >
                <b-form-input id="shopDesc" type="password" :state="descState" v-model.trim="shopDesc"></b-form-input>
            </b-form-group>
            <b-btn block @click="onNewShop" variant="success">Tạo cửa hàng</b-btn>
        </b-modal>
        
        <!-- Content -->
        <div class="my-nuxt">
            <nuxt/>
        </div>

    </section>
</template>

<script>

    export default {
        computed: {
            isAuth() {
                return this.$store.getters.isAuthenticated
            },
            
            // Validate email
            emailState() {
                return this.email.search("@") > 0 ? true : false
            },
            invalidEmail() {
                if (this.email.search("@") > 0) {
                    return ''
                } else {
                    return 'Điền email của bạn'
                }
            },
            validEmail() {
                return this.emailState === true ? 'Nhập thành công' : ''
            },

            // Validate password
            passwordState() {
                return this.password.length >= 6 ? true : false
            },
            invalidPassword() {
                if (this.password.length >= 6) {
                    return ''
                } else if (this.password.length > 0) {
                    return 'Mật khẩu phải có ít nhất 6 kí tự'
                } else {
                    return 'Điền mật khẩu'
                }
            },
            validPassword() {
                return this.passwordState === true ? 'Nhập thành công' : ''
            },

            // Validate username
            usernameState() {
                return this.username.length > 0 ? true : false
            },
            invalidUsername() {
                if (this.username.length > 0) {
                    return ''
                } else {
                    return 'Điền họ và tên'
                }
            },
            validUsername() {
                return this.usernameState === true ? 'Nhập thành công' : ''
            },

            // Validate shop title
            titleState() {
                return this.shopTitle.length > 0 ? true : false
            },
            invalidTitle() {
                if (this.shopTitle.length > 0) {
                    return ''
                } else {
                    return 'Điền tên cửa hàng của bạn'
                }
            },

            // Validate shop desc
            descState() {
                return this.shopDesc.length >= 8 ? true : false
            },
            invalidDesc() {
                if (this.shopDesc.length >= 8) {
                    return ''
                } else if (this.shopDesc.length > 0) {
                    return 'Phần miêu tả phải có ít nhất 8 kí tự'
                } else {
                    return 'Điền miêu tả cửa hàng của bạn'
                }
            }   
        },
        data() {
            return {
                showAlert: false,
                username:'',
                email: '',
                password: '',

                shopTitle: '',
                shopDesc: ''
            }
        },    
        methods: {
            onSignin() {
                if (this.emailState && this.passwordState) {
                    this.$store.dispatch('authenticateUser', {
                        isLogin: true,
                        email: this.email,
                        password: this.password
                    })
                    .then(() => {
                        if (this.isAuth) {
                            this.$refs.signinModal.hide()
                            this.$router.push(this.$route.path) //ToDo: redirect to /users/_id
                        } else {
                            this.showAlert = true
                        }
                    })
                }
            },
            onSignup() {
                if ( this.usernameState && this.emailState && this.passwordState) {
                    this.$store.dispatch('authenticateUser', {
                        isLogin: false,
                        email: this.email,
                        password: this.password
                    })
                    .then(() => {
                        if (this.isAuth) {
                            this.$refs.signupModal.hide()
                            this.$router.push(this.$route.path) //ToDo: redirect to /users/_id
                        } else {
                            this.showAlert = true
                        }
                    })
                }
            },
            onNewShop() {
                if (this.titleState && this.descState) {
                    this.$store.dispatch('addShop', {
                            title: this.shopTitle,
                            desc: this.shopDesc
                        })
                        .then(() => {
                            this.$refs.newShopModal.hide()
                            this.$router.push("/shops") //ToDo /users/_userId/shops
                        })
                }
            },
            onLogout() {
                this.$store.dispatch('logOut')
                this.$router.push('/')
            }
        }
    }
</script>