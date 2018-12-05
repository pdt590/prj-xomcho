<template>
    <div class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <div style="position: sticky; top: 8rem;">  
                        <div class="card">
                            <div class="card-content">
                                <div class="v-shop-title" v-if="user">
                                    <figure class="image is-128x128">
                                        <img :src="user.avatar ? user.avatar.url : `/icon-user.png`" alt="user_avatar">
                                    </figure>  
                                    <br>
                                    <h5 class="title is-size-5">{{user.username}}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-9">
                    <div class="card">
                        <div class="card-content">
                            <b-tabs type="is-boxed">
                                <b-tab-item label="Thông tin">
                                    <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                        <b-field label="Username*"
                                            :type="!$v.userContent.username.min ? `is-danger` : ``" 
                                            :message="!$v.userContent.username.min ? `Username phải dài hơn 6 kí tự` : ``">
                                            <b-input
                                                v-model="userContent.username"
                                                icon="account">
                                            </b-input>
                                        </b-field>
                                        <b-field label="Họ và tên">
                                            <b-input
                                                v-model.trim="userContent.fullname"
                                                icon="account-card-details">
                                            </b-input>
                                        </b-field>

                                        <b-field label="Số điện thoại" 
                                            :type="!$v.userContent.phone.numeric ? `is-danger` : ``" 
                                            :message="!$v.userContent.phone.numeric ? `Nhập số điện thoại hợp lệ` : ``">
                                            <b-input
                                                type="tel"
                                                v-model="userContent.phone"
                                                icon="cellphone">
                                            </b-input>
                                        </b-field>

                                        <b-field grouped>
                                            <b-field label="Địa chỉ" expanded>
                                                <b-input 
                                                    v-model="userContent.address"
                                                    icon="map-marker">
                                                </b-input>
                                            </b-field>
                                            <b-field label="Tỉnh/Thành">
                                                <b-select v-model="userContent.province">
                                                    <option v-for="(province, i) in provinces" :key="i">{{province}}</option>
                                                </b-select>
                                            </b-field>
                                        </b-field>
                                    </form>
                                    <div class="level">
                                        <div class="level-left"></div>
                                        <div class="level-right">
                                            <button class="button is-info is-rounded" 
                                                :class="{'is-loading': authLoading}"
                                                :disabled="$v.userContent.$invalid" 
                                                type="submit" 
                                                @click.prevent="onUpdateContent">
                                                Lưu thay đổi
                                            </button>
                                        </div>
                                    </div>
                                </b-tab-item>

                                <b-tab-item label="Email">
                                    <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                        <b-field label="Mật khẩu*"
                                            :type="!responseNewEmail ? `is-danger` : ``" 
                                            :message="!responseNewEmail ? `Nhập lại mật khẩu` : ``">
                                            <b-input
                                                type="password"
                                                v-model.trim="confirmPasswordForNewEmail"
                                                password-reveal>
                                            </b-input>
                                        </b-field>
                                        <b-field label="Email mới*" 
                                            :type="!$v.userEmail.email ? `is-danger` : ``" 
                                            :message="!$v.userEmail.email ? `Nhập email hợp lệ` : ``">
                                            <b-input
                                                type="email"
                                                v-model.trim="userEmail"
                                                icon="email">
                                            </b-input>
                                        </b-field>
                                    </form>
                                    <div class="level">
                                        <div class="level-left"></div>
                                        <div class="level-right">
                                            <button class="button is-info is-rounded" 
                                                :class="{'is-loading': authLoading}"
                                                :disabled="$v.userEmail.$invalid || $v.confirmPasswordForNewEmail.$invalid"
                                                type="submit" 
                                                @click.prevent="onUpdateEmail">
                                                Lưu thay đổi
                                            </button>
                                        </div>
                                    </div>
                                </b-tab-item>

                                <b-tab-item label="Mật khẩu">
                                    <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                        <b-field label="Mật khẩu*"
                                            :type="!responseNewPassword ? `is-danger` : ``" 
                                            :message="!responseNewPassword ? `Nhập lại mật khẩu` : ``">
                                            <b-input
                                                type="password"
                                                v-model.trim="confirmPasswordForNewPassword"
                                                password-reveal>
                                            </b-input>
                                        </b-field>
                                        <b-field label="Mật khẩu mới*"
                                            :type="!$v.userPassword.minlen ? `is-danger` : ``" 
                                            :message="!$v.userPassword.minlen ? `Mật khẩu phải dài hơn 6 kí tự` : ``">
                                            <b-input
                                                type="password"
                                                v-model.trim="userPassword"
                                                password-reveal>
                                            </b-input>
                                        </b-field>
                                        <b-field label="Xác nhận mật khẩu mới*"
                                            :type="!$v.confirmUserPassword.minlen || $v.confirmUserPassword.$error ? `is-danger` : ``" 
                                            :message="!$v.confirmUserPassword.minlen ? `Mật khẩu phải dài hơn 6 kí tự` : $v.confirmUserPassword.$error ? `Mật khẩu không trùng khớp` : ``">
                                            <b-input
                                                type="password"
                                                v-model.trim="confirmUserPassword"
                                                @blur="$v.confirmUserPassword.$touch()"
                                                password-reveal>
                                            </b-input>
                                        </b-field>
                                    </form>
                                    <div class="level">
                                        <div class="level-left"></div>
                                        <div class="level-right">
                                            <button class="button is-info is-rounded" 
                                                :class="{'is-loading': authLoading}"
                                                :disabled="$v.confirmPasswordForNewPassword.$invalid || $v.userPassword.$invalid || $v.confirmUserPassword.$invalid" 
                                                type="submit" 
                                                @click.prevent="onUpdatePassword">
                                                Lưu thay đổi
                                            </button>
                                        </div>
                                    </div>
                                </b-tab-item>

                                <b-tab-item label="Avatar">
                                    <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                        <b-field label="Avatar (Kích thước < 2MB)"
                                            :type="!$v.userAvatar.isImg ? `is-danger` : ``"
                                            :message="!$v.userAvatar.isImg ? `File ảnh không hợp lệ` : ``">
                                            <b-upload v-model="userAvatar"
                                                @input="onAvatarChange"
                                                :disabled="$v.userAvatar.$invalid || (userOldAvatar !== null) || (userAvatar !== null)"
                                                drag-drop>
                                                <section class="section">
                                                    <div class="content has-text-centered">
                                                        <p>
                                                            <b-icon
                                                                icon="upload"
                                                                size="is-large">
                                                            </b-icon>
                                                        </p>
                                                        <p>Upload avatar cho tài khoản</p>
                                                    </div>
                                                </section>
                                            </b-upload>
                                        </b-field>
                                        <div class="level">
                                            <div class="level-left">
                                                <div class="level-item" v-if="userOldAvatar">
                                                    <figure class="image is-128x128 v-image-preview">
                                                        <img :src="userOldAvatar.url" alt="shop_cover">
                                                        <span class="v-image-size">{{userOldAvatar.metadata.size | fmBytes}}</span>
                                                        <a class="delete v-image-delete" @click="userOldAvatar = null"></a>
                                                    </figure>
                                                </div>
                                                <div class="level-item" v-if="userAvatar">
                                                    <figure class="image is-128x128 v-image-preview">
                                                        <img :src="userPreviewAvatar.url" alt="shop_cover">
                                                        <span class="v-image-size">{{userPreviewAvatar.size | fmBytes}}</span>
                                                        <a class="delete v-image-delete" @click="userPreviewAvatar= null; userAvatar = null"></a>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <span v-if="userAvatar" class="tags has-addons">
                                            <span class="tag is-info">{{userAvatar.name}}</span>
                                            <span class="tag is-light">{{userAvatar.size | fmBytes}}</span>
                                            <a class="tag is-delete is-light" @click="userAvatar = null"></a>
                                        </span>
                                        <span v-if="userOldAvatar" class="tags has-addons">
                                            <span class="tag is-info">{{userOldAvatar.metadata.name}}</span>
                                            <span class="tag is-light">{{userOldAvatar.metadata.size | fmBytes}}</span>
                                            <a class="tag is-delete is-light" @click="userOldAvatar = null"></a>
                                        </span> -->
                                    </form>
                                    <div class="level">
                                        <div class="level-left"></div>
                                        <div class="level-right">
                                            <button class="button is-info is-rounded" 
                                                :class="{'is-loading': authLoading}"
                                                :disabled="$v.userAvatar.$invalid" 
                                                type="submit" 
                                                @click.prevent="onUpdateAvatar">
                                                Lưu thay đổi
                                            </button>
                                        </div>
                                    </div>
                                </b-tab-item>

                                <b-tab-item label="Xóa tài khoản">
                                    <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                        <b-field label="Mật khẩu*"
                                            :type="!responseDeleting ? `is-danger` : ``" 
                                            :message="!responseDeleting ? `Nhập lại mật khẩu` : ``">
                                            <b-input
                                                type="password"
                                                v-model.trim="confirmPasswordForDeleting"
                                                password-reveal>
                                            </b-input>
                                        </b-field>
                                    </form>
                                    <div class="level">
                                        <div class="level-left"></div>
                                        <div class="level-right">
                                            <button class="button is-danger is-rounded" 
                                                :class="{'is-loading': authLoading}"
                                                :disabled="$v.confirmPasswordForDeleting.$invalid" 
                                                @click.prevent="onDelete">
                                                Xóa cửa hàng
                                            </button>
                                        </div>
                                    </div>
                                </b-tab-item>
                            </b-tabs> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { isImage, deepCopy } from '~/plugins/utility-helpers'
    import { provinces } from '~/plugins/utility-lists'
    import { required, email, numeric, sameAs, not, minLength } from 'vuelidate/lib/validators'

    export default {
        middleware: 'auth',
        created() {
            this.userData = deepCopy(this.user)
            delete this.userData.id
            this.userEmail = this.userData.email
            delete this.userData.email
            if(this.userData.avatar) {
                this.userOldAvatar = deepCopy(this.userData.avatar)
                delete this.userData.avatar
            }
            this.userContent = deepCopy(this.userData)
        },
        computed: {
            ...mapGetters(['authLoading', 'user'])
        },
        data() {
            return {
                provinces: provinces,
                userData: null,

                userEmail: null,

                userPassword: null,
                confirmUserPassword: null,

                userAvatar: null,
                userPreviewAvatar: null,
                userOldAvatar: null,

                userContent: null,

                confirmPasswordForNewEmail: null,
                confirmPasswordForNewPassword: null,
                confirmPasswordForDeleting: null,
                responseNewEmail: true,
                responseNewPassword: true,
                responseDeleting: true
            }
        },
        validations: {
            userEmail: {
                required,
                email,
                isValid: not(sameAs(vm => {
                    if(vm.user) {
                        return vm.user.email
                    }
                }))
            },
            userPassword: {
                required, 
                minlen: minLength(6)
            },
            confirmUserPassword: {
                required,
                minlen: minLength(6),
                isValid: sameAs(vm => {
                    if(vm.userPassword) {
                        return vm.userPassword
                    }
                })
            },
            userAvatar: {
                isImg: isImage(2097152) // <2MB
            },
            userContent: {
                username: {
                    required,
                    min: minLength(6) // TODO: Why cannot name minLen here
                },
                phone: {
                    required,
                    numeric
                }
            },
            confirmPasswordForNewEmail: {
                required,
                // async isPassword(value) {
                //     if (!value) return true
                //     const response = await this.$store.dispatch('isCorrectPassword', value)
                //     return response
                // }
            },
            confirmPasswordForNewPassword: {
                required
            },
            confirmPasswordForDeleting: {
                required
            },
        },
        methods: {
            async onUpdateContent() {       
                await this.$store.dispatch('updateUserContent', this.userContent)
                this.$router.push(`${this.$route.path}`)
            },
            async onUpdateEmail() {
                this.responseNewEmail = await this.$store.dispatch('updateUserEmail', {
                    confirmPassword: this.confirmPasswordForNewEmail,
                    newEmail: this.userEmail
                })
                if(!this.responseNewEmail) {
                    this.$toast.open({
                        duration: 4000,
                        message: 'Mật khẩu không chính xác',
                        type: 'is-danger'
                    })
                }
                this.$router.push(`${this.$route.path}`)
            },
            async onUpdatePassword() {
                this.responseNewPassword = await this.$store.dispatch('updateUserPassword', {
                    confirmPassword: this.confirmPasswordForNewPassword,
                    newPassword: this.userPassword
                })
                if(!this.responseNewPassword) {
                    this.$toast.open({
                        duration: 4000,
                        message: 'Mật khẩu không chính xác',
                        type: 'is-danger'
                    })
                }
                this.$router.push(`${this.$route.path}`)
            },
            async onUpdateAvatar() {  
                await this.$store.dispatch('updateUserAvatar', this.userAvatar)
                this.$router.push(`${this.$route.path}`)
            },
            async onDelete() {
                this.responseDeleting = await this.$store.dispatch('deleteUser', this.confirmPasswordForDeleting)
                if(!this.responseDeleting) {
                    this.$toast.open({
                        duration: 4000,
                        message: 'Mật khẩu không chính xác',
                        type: 'is-danger'
                    })
                }
                this.$router.push('/')
            },
            onAvatarChange() {
                this.userPreviewAvatar = null
                this.userPreviewAvatar = {
                    url: URL.createObjectURL(this.userAvatar),
                    size: this.userAvatar.size
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        border-radius: 0.3rem;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.1);
        .card-header {
            padding: 1rem;
        }
    }
    .v-shop-title {
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center
    }
</style>
