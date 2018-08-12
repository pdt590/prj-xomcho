<template>
    <section>
        <div ref="modal" class="w3-modal w3-text-black">
            <div class="w3-modal-content w3-card w3-animate-zoom" style="max-width:500px; margin-top: 50px">
                <div class="w3-center"><br>
                    <span @click="closeLoginModal" 
                        class="w3-button w3-large w3-transparent w3-light-grey w3-display-topright" 
                        title="Close Modal">×</span>
                </div>
                <form class="w3-container">
                    <div class="w3-section ">
                        <h3 class="w3-center"><strong>{{ isSignin ? 'Đăng nhập' :" Đăng ký" }}</strong></h3>
                        <p v-if="error" class="w3-text-red">
                            {{error.message}}
                        </p>
                        <div v-if="!isSignin">
                            <label>Username</label>
                            <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nhập username" required v-model.trim="username">
                        </div>
                        <label>Email</label>
                        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nhập email" required v-model.trim="email">
                        <label>Mật khẩu</label>
                        <input class="w3-input w3-border" type="password" placeholder="Nhập mật khẩu" required v-model.trim="password">
                        <button class="w3-button w3-block w3-border w3-border-blue w3-section w3-padding" type="submit" @click.prevent="onSignin"><i v-show="loading" class="fa fa-spinner fa-spin w3-xlarge w3-margin-right"></i>{{ isSignin ? 'Đăng nhập' :" Đăng ký" }}</button>
                    </div>
                    <hr>
                </form>
                <div class="w3-row-padding w3-margin-bottom">
                    <div class="w3-half w3-margin-bottom">
                        <button class="w3-button w3-block  w3-red" disabled>
                            <i class="fa fa-google"></i>
                            Google
                        </button>
                    </div>
                    <div class="w3-half">
                        <button class="w3-button w3-block  w3-blue" disabled>
                            <i class="fa fa-facebook-official"></i> 
                            Facebook
                        </button>
                    </div>   
                </div>
                <div class="w3-container w3-border-top w3-round w3-padding w3-light-grey">
                    <button class="w3-button w3-border  w3-light-grey" @click="isSignin = !isSignin">{{ isSignin ? 'Đăng ký' :" Đăng nhập" }}</button>
                    <span class="w3-right w3-padding w3-disabled">Quên <a href="">mật khấu?</a></span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: {
            // ? Cannot use mapState with state from a module except state from global index.js file
            ... mapState(['loading', 'error'])
        },
        data() {
            return {
                isSignin: true,
                username: '',
                email: '',
                password: ''
            }
        },
        methods: {
            closeLoginModal() {
                this.$refs.modal.style.display='none'
                this.$store.dispatch('clearError')
            },
            onSignin() {
                if (this.isSignin) {
                    this.$store.dispatch('users/signUserIn', {
                        email: this.email,
                        password: this.password
                    })
                    .then(() => {
                        if (!this.error) this.closeLoginModal()
                    })
                } else {
                    this.$store.dispatch('users/signUserUp', {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                    .then(() => {
                        if (!this.error) this.closeLoginModal()
                    })
                }
            }
        }
    }
</script>