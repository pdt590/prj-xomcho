<template>
    <div class="container">
        <div class="columns">
            <div class="column is-3">
                <div style="position: sticky; top: 8rem;">  
                    <div class="card">
                        <div class="card-content" v-if="user">
                            <div class="level">
                                <div class="level-item">
                                    <figure class="image v-image-border">
                                        <no-ssr>
                                            <img class="v-user-avatar" :src="user.avatar ? user.avatar.url : `/icon-user.png`" style='display: none' onload="this.style.display = 'block'" alt="user_avatar">
                                        </no-ssr>
                                    </figure>
                                </div>
                            </div>
                            <div class="has-text-centered">
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
                                        :type="$v.userContent.username.$error ? `is-danger` : ``" 
                                        :message="!$v.userContent.username.min ? `Tối thiểu 6 kí tự` : ``">
                                        <b-input
                                            v-model="userContent.username"
                                            @blur="$v.userContent.username.$touch()"
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
                                        :type="$v.userContent.phone.$error ? `is-danger` : ``" 
                                        :message="!$v.userContent.phone.numeric ? `Nhập số điện thoại hợp lệ` : ``">
                                        <b-input
                                            type="tel"
                                            v-model="userContent.phone"
                                            @blur="$v.userContent.phone.$touch()"
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
                                <div class="level is-mobile">
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
                                        :type="$v.confirmPasswordForNewEmail.$error || !responseNewEmail ? `is-danger` : ``" 
                                        :message=" !$v.confirmPasswordForNewEmail.minLen ? `Tối thiểu 6 kí tự`: !responseNewEmail ? `Nhập mật khẩu hợp lệ` : ``">
                                        <b-input
                                            type="password"
                                            v-model.trim="confirmPasswordForNewEmail"
                                            @blur="$v.confirmPasswordForNewEmail.$touch()"
                                            password-reveal>
                                        </b-input>
                                    </b-field>
                                    <b-field label="Email mới*" 
                                        :type="$v.userEmail.$error ? `is-danger` : ``" 
                                        :message="!$v.userEmail.email ? `Nhập email hợp lệ` : !$v.userEmail.isValidEmail ? `` : ``">
                                        <b-input
                                            type="email"
                                            v-model.trim="userEmail"
                                            @blur="$v.userEmail.$touch()"
                                            icon="email">
                                        </b-input>
                                    </b-field>
                                </form>
                                <div class="level is-mobile">
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
                                    <b-field label="Mật khẩu cũ*"
                                        :type="$v.confirmPasswordForNewPassword.$error || !responseNewPassword ? `is-danger` : ``" 
                                        :message="!$v.confirmPasswordForNewPassword.minLen ? `Tối thiểu 6 kí tự` : !responseNewPassword ? `Nhập lại mật khẩu` : ``">
                                        <b-input
                                            type="password"
                                            v-model.trim="confirmPasswordForNewPassword"
                                            @blur="$v.confirmPasswordForNewPassword.$touch()"
                                            password-reveal>
                                        </b-input>
                                    </b-field>
                                    <b-field label="Mật khẩu mới*"
                                        :type="$v.userPassword.$error ? `is-danger` : ``" 
                                        :message="!$v.userPassword.minLen ? `Tối thiểu 6 kí tự` : ``">
                                        <b-input
                                            type="password"
                                            v-model.trim="userPassword"
                                            @blur="$v.userPassword.$touch()"
                                            password-reveal>
                                        </b-input>
                                    </b-field>
                                    <b-field label="Xác nhận mật khẩu mới*"
                                        :type="$v.confirmUserPassword.$error ? `is-danger` : ``" 
                                        :message="$v.confirmUserPassword.$error ? `Mật khẩu không trùng khớp` : ``">
                                        <b-input
                                            type="password"
                                            v-model.trim="confirmUserPassword"
                                            @blur="$v.confirmUserPassword.$touch()"
                                            password-reveal>
                                        </b-input>
                                    </b-field>
                                </form>
                                <div class="level is-mobile">
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
                                        <div class="level">
                                            <div class="level-item">
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
                                            </div>
                                        </div>
                                    </b-field>
                                    <div class="level">
                                        <div class="level-item" v-if="userOldAvatar">
                                            <figure class="image is-128x128 v-image-frame">
                                                <no-ssr>
                                                    <img class="v-preview-image" v-lazy="userOldAvatar.url" style='display: none' onload="this.style.display = 'block'" alt="shop_cover">
                                                </no-ssr>
                                                <span class="v-image-size">{{userOldAvatar.metadata.size | fmBytes}}</span>
                                                <a class="delete v-image-bndelete" @click="userOldAvatar = null"></a>
                                            </figure>
                                        </div>
                                        <div class="level-item" v-if="userAvatar">
                                            <figure class="image is-128x128 v-image-frame">
                                                <no-ssr>
                                                    <img class="v-preview-image" v-lazy="userPreviewAvatar.url" style='display: none' onload="this.style.display = 'block'" alt="shop_cover">
                                                </no-ssr>
                                                <span class="v-image-size">{{userPreviewAvatar.size | fmBytes}}</span>
                                                <a class="delete v-image-bndelete" @click="userPreviewAvatar= null; userAvatar = null"></a>
                                            </figure>
                                        </div>
                                    </div>
                                </form>
                                <div class="level is-mobile">
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
                                        :type="$v.confirmPasswordForDeleting.$error || !responseDeleting ? `is-danger` : ``" 
                                        :message="!$v.confirmPasswordForDeleting.minLen ? `Tối thiểu 6 kí tự` : !responseDeleting ? `Nhập lại mật khẩu` : ``">
                                        <b-input
                                            type="password"
                                            v-model.trim="confirmPasswordForDeleting"
                                            @blur="$v.confirmPasswordForDeleting.$touch()"
                                            password-reveal>
                                        </b-input>
                                    </b-field>
                                </form>
                                <div class="level is-mobile">
                                    <div class="level-left"></div>
                                    <div class="level-right">
                                        <button class="button is-danger is-rounded" 
                                            :class="{'is-loading': authLoading}"
                                            :disabled="$v.confirmPasswordForDeleting.$invalid" 
                                            @click.prevent="onDelete">
                                            Xóa tài khoản
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
</template>

<script>
    import { mapGetters } from 'vuex'
    import { isImage, deepCopy } from '~/plugins/util-helpers'
    import { provinces } from '~/plugins/util-lists'
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
            this.userContent = {
                ...deepCopy(this.userData),
                province: 'Hà Nội'
            }
        },
        computed: {
            ...mapGetters(['authLoading', 'user'])
        },
        data() {
            return {
                provinces: provinces,
                userData: null,

                userContent: null,

                userEmail: null,
                confirmPasswordForNewEmail: null,
                responseNewEmail: true,

                userPassword: null,
                confirmUserPassword: null,
                confirmPasswordForNewPassword: null,
                responseNewPassword: true,

                userAvatar: null,
                userPreviewAvatar: null,
                userOldAvatar: null,

                confirmPasswordForDeleting: null,
                responseDeleting: true
            }
        },
        validations: {
            userContent: {
                username: {
                    required,
                    min: minLength(6),
                    // isValidUsername: not(sameAs(function() { return this.user.username }))
                },
                phone: {
                    numeric
                }
            },

            userEmail: {
                required,
                email,
                isValidEmail: not(sameAs(function() {
                    if(this.user) {
                        return this.user.email 
                    } 
                }))
            },
            confirmPasswordForNewEmail: {
                required,
                minLen: minLength(6)
                // async isPassword(value) {
                //     if (!value) return true
                //     const response = await this.$store.dispatch('isCorrectPassword', value)
                //     return response
                // }
            },

            confirmPasswordForNewPassword: {
                required,
                minLen: minLength(6)
            },
            userPassword: {
                required,
                minLen: minLength(6)
            },
            confirmUserPassword: {
                isValidPassword: sameAs('userPassword')
            },

            userAvatar: {
                isImg: isImage(2097152) // <2MB
            }, 

            confirmPasswordForDeleting: {
                required,
                minLen: minLength(6)
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
                        duration: 3000,
                        message: 'Mật khẩu không chính xác',
                        type: 'is-danger'
                    })
                    return
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
                        duration: 3000,
                        message: 'Mật khẩu không chính xác',
                        type: 'is-danger'
                    })
                    return
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
                        duration: 3000,
                        message: 'Mật khẩu không chính xác',
                        type: 'is-danger'
                    })
                    return
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
