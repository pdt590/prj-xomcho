<template>
    <div class="container">
        <nav class="breadcrumb is-hidden-mobile" style="margin-bottom: 1rem">
            <ul>
                <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                <li v-if="loadedShop"><nuxt-link :to="`/shops/${$route.params.shopUrl}`">{{loadedShop.title}}</nuxt-link></li>
                <li class="is-active"><a>Chỉnh sửa</a></li>
            </ul>
        </nav>
        <div class="columns">
            <div class="column is-3">
                <div style="position: sticky; top: 8rem;">  
                    <div class="card">
                        <div class="card-content" v-if="loadedShop">
                            <div class="level">
                                <div class="level-item">
                                    <nuxt-link :to="`/shops/${$route.params.shopUrl}`">
                                        <figure class="image v-image-border">
                                            <img class="v-shop-logo" :src="loadedShop.logoImage ? loadedShop.logoImage.url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                                        </figure> 
                                    </nuxt-link>
                                </div>
                            </div>
                            <div class="has-text-centered">
                                <h5 class="title is-size-5">{{loadedShop.title}}</h5> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-9">
                <div class="card">
                    <div class="card-content">
                        <b-tabs type="is-boxed">
                            <b-tab-item label="Tên cửa hàng">
                                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                    <b-field label="Nhập tên mới*">
                                        <b-input
                                            v-model.trim="shopTitle"
                                            @blur="$v.shopTitle.$touch()"
                                            icon="store">
                                        </b-input>
                                    </b-field>
                                </form>
                                <div class="level is-mobile">
                                    <div class="level-left"></div>
                                    <div class="level-right">
                                        <button class="button is-info is-rounded" 
                                            :class="{'is-loading': shopLoading}"
                                            :disabled="$v.shopTitle.$invalid"
                                            type="submit" 
                                            @click.prevent="onUpdateTitle">
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            </b-tab-item>

                            <b-tab-item label="Thông tin">
                                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                    <b-field label="Sản phẩm kinh doanh*">
                                        <b-select expanded v-model="shopContent.category">
                                            <option v-for="(category, i) in categories" :key="i" :value="category.id">{{category.name}}</option>
                                        </b-select>
                                    </b-field>
                                    
                                    <b-field grouped>
                                        <b-field label="Facebook" expanded
                                            :type="$v.shopContent.fbUrl.$error ? `is-danger` : ``" 
                                            :message="!$v.shopContent.fbUrl.url ? `Nhập địa chỉ facebook hợp lệ` : ``">
                                            <b-input
                                                type="url"
                                                v-model.trim="shopContent.fbUrl"
                                                @blur="$v.shopContent.fbUrl.$touch()"
                                                icon="facebook-box"
                                                placeholder="Link địa chỉ facebook của cửa hàng hoặc cá nhân">
                                            </b-input>
                                        </b-field>
                                        <b-field label="Tên Facebook">
                                            <b-input
                                                type="text"
                                                v-model.trim="shopContent.fbName"
                                                icon="facebook-box"
                                                placeholder="Tên hiển thị Facebook">
                                            </b-input>
                                        </b-field>
                                    </b-field>

                                    <b-field label="Số điện thoại*" 
                                        :type="$v.shopContent.phone.$error ? `is-danger` : ``" 
                                        :message="!$v.shopContent.phone.numeric ? `Nhập số điện thoại hợp lệ` : ``">
                                        <b-input
                                            type="tel"
                                            v-model="shopContent.phone"
                                            @blur="$v.shopContent.phone.$touch()"
                                            icon="cellphone">
                                        </b-input>
                                    </b-field>

                                    <b-field label="Email" 
                                        :type="$v.shopContent.email.$error ? `is-danger` : ``" 
                                        :message="!$v.shopContent.email.email ? `Nhập email hợp lệ` : ``">
                                        <b-input
                                            type="email"
                                            v-model.trim="shopContent.email"
                                            @blur="$v.shopContent.email.$touch()"
                                            icon="email">
                                        </b-input>
                                    </b-field>

                                    <b-field grouped>
                                        <b-field label="Địa chỉ*" expanded
                                            :type="$v.shopContent.address.$error ? `is-danger` : ``">
                                            <b-input 
                                                v-model="shopContent.address"
                                                @blur="$v.shopContent.address.$touch()"
                                                icon="map-marker">
                                            </b-input>
                                        </b-field>
                                        <b-field label="Tỉnh/Thành*">
                                            <b-select v-model="shopContent.province">
                                                <option v-for="(province, i) in provinces" :key="i">{{province}}</option>
                                            </b-select>
                                        </b-field>
                                    </b-field>
                                    
                                    <b-field label="Danh mục sản phẩm*"
                                        :type="$v.shopContent.itemTypes.$error ? `is-danger` : ``">
                                        <b-taginput
                                            v-model="shopContent.itemTypes"
                                            @blur="$v.shopContent.itemTypes.$touch()"
                                            maxlength="20"
                                            maxtags="20"
                                            placeholder="Các loại sản phẩm dự định bán">
                                        </b-taginput>
                                    </b-field>

                                    <b-field label="Miêu tả*"
                                        :type="$v.shopContent.description.$error ? `is-danger` : ``">
                                        <b-input
                                            type="textarea"
                                            v-model.trim="shopContent.description"
                                            @blur="$v.shopContent.description.$touch()"
                                            maxlength="300">
                                        </b-input>
                                    </b-field>
                                </form>
                                <div class="level is-mobile">
                                    <div class="level-left"></div>
                                    <div class="level-right">
                                        <button class="button is-info is-rounded" 
                                            :class="{'is-loading': shopLoading}"
                                            :disabled="$v.shopContent.$invalid" 
                                            type="submit" 
                                            @click.prevent="onUpdateContent">
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            </b-tab-item>

                            <b-tab-item label="Ảnh Logo">
                                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                    <b-field label="Logo"
                                        :type="!$v.shopLogo.isImg ? `is-danger` : ``"
                                        :message="!$v.shopLogo.isImg ? `File ảnh không hợp lệ` : ``">
                                        <div class="level">
                                            <div class="level-item">
                                                <b-upload v-model="shopLogo"
                                                    @input="onLogoChange"
                                                    :disabled="$v.shopLogo.$invalid || (shopOldLogo !== null) || (shopLogo !== null)"
                                                    drag-drop>
                                                    <section class="section">
                                                        <div class="content has-text-centered">
                                                            <p>
                                                                <b-icon
                                                                    icon="upload"
                                                                    size="is-large">
                                                                </b-icon>
                                                            </p>
                                                            <p>Upload ảnh Logo cho cửa hàng</p>
                                                        </div>
                                                    </section>
                                                </b-upload>
                                            </div>
                                        </div>
                                    </b-field>
                                    <div class="level">
                                        <div class="level-item" v-if="shopOldLogo">
                                            <figure class="image is-128x128 v-image-frame">
                                                <img class="v-preview-image" :src="shopOldLogo.url" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                                                <span class="v-image-size">{{shopOldLogo.metadata.size | fmBytes}}</span>
                                                <a class="delete v-image-bndelete" @click="shopOldLogo = null"></a>
                                            </figure>
                                        </div>
                                        <div class="level-item" v-if="shopLogo">
                                            <figure class="image is-128x128 v-image-frame">
                                                <img class="v-preview-image" :src="shopPreviewLogo.url" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                                                <span class="v-image-size">{{shopPreviewLogo.size | fmBytes}}</span>
                                                <a class="delete v-image-bndelete" @click="shopPreviewLogo = null; shopLogo = null"></a>
                                            </figure>
                                        </div>
                                    </div>
                                </form>
                                <div class="level is-mobile">
                                    <div class="level-left"></div>
                                    <div class="level-right">
                                        <button class="button is-info is-rounded" 
                                            :class="{'is-loading': shopLoading}"
                                            :disabled="$v.shopLogo.$invalid" 
                                            type="submit" 
                                            @click.prevent="onUpdateLogo">
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            </b-tab-item>

                            <b-tab-item label="Ảnh Cover">
                                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                    <b-field label="Cover"
                                        :type="!$v.shopCover.isImg ? `is-danger` : ``"
                                        :message="!$v.shopCover.isImg ? `File ảnh không hợp lệ` : ``">
                                        <div class="level">
                                            <div class="level-item">
                                                <b-upload v-model="shopCover"
                                                    @input="onCoverChange"
                                                    :disabled="$v.shopCover.$invalid || (shopOldCover !== null) || (shopCover !== null)"
                                                    drag-drop>
                                                    <section class="section">
                                                        <div class="content has-text-centered">
                                                            <p>
                                                                <b-icon
                                                                    icon="upload"
                                                                    size="is-large">
                                                                </b-icon>
                                                            </p>
                                                            <p>Upload ảnh Cover cho cửa hàng</p>
                                                        </div>
                                                    </section>
                                                </b-upload>
                                            </div>
                                        </div>
                                    </b-field>
                                    <div class="level">
                                        <div class="level-item" v-if="shopOldCover">
                                            <figure class="image is-128x128 v-image-frame">
                                                <img class="v-preview-image" :src="shopOldCover.url" style='display: none' onload="this.style.display = 'block'" alt="shop_cover">
                                                <span class="v-image-size">{{shopOldCover.metadata.size | fmBytes}}</span>
                                                <a class="delete v-image-bndelete" @click="shopOldCover = null"></a>
                                            </figure>
                                        </div>
                                        <div class="level-item" v-if="shopCover">
                                            <figure class="image is-128x128 v-image-frame">
                                                <img class="v-preview-image" :src="shopPreviewCover.url" style='display: none' onload="this.style.display = 'block'" alt="shop_cover">
                                                <span class="v-image-size">{{shopPreviewCover.size | fmBytes}}</span>
                                                <a class="delete v-image-bndelete" @click="shopPreviewCover= null; shopCover = null"></a>
                                            </figure>
                                        </div>
                                    </div>
                                </form>
                                <div class="level is-mobile">
                                    <div class="level-left"></div>
                                    <div class="level-right">
                                        <button class="button is-info is-rounded" 
                                            :class="{'is-loading': shopLoading}"
                                            :disabled="$v.shopCover.$invalid" 
                                            type="submit" 
                                            @click.prevent="onUpdateCover">
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            </b-tab-item>

                            <b-tab-item label="Xóa cửa hàng">
                                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                    <b-field label="Nhập tên cửa hàng*" expanded>
                                        <b-input
                                            v-model.trim="confirmTitle"
                                            @blur="$v.confirmTitle.$touch()"
                                            icon="store">
                                        </b-input>
                                    </b-field>
                                </form>
                                <div class="level is-mobile">
                                    <div class="level-left"></div>
                                    <div class="level-right">
                                        <button class="button is-danger is-rounded" 
                                            :class="{'is-loading': shopLoading}"
                                            :disabled="$v.confirmTitle.$invalid" 
                                            type="submit" 
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
</template>

<script>
    import { mapGetters } from 'vuex'
    import { isImage, deepCopy } from '~/plugins/util-helpers'
    import { provinces, categories } from '~/plugins/util-lists'
    import { required, email, url, numeric, sameAs, not, minLength, maxLength } from 'vuelidate/lib/validators'

    export default {
        middleware: ['auth', 'edit-permission'],
        created() {
            this.shopData  = deepCopy(this.loadedShop)
            this.shopTitle = this.shopData.title
            delete this.shopData.title
            if(this.shopData.logoImage) {
                this.shopOldLogo  = deepCopy(this.shopData.logoImage)
                delete this.shopData.logoImage
            }
            if(this.shopData.coverImage) {
                this.shopOldCover = deepCopy(this.shopData.coverImage)
                delete this.shopData.coverImage
            }
            this.shopContent = deepCopy(this.shopData)
        },
        computed: {
            ...mapGetters(['shopLoading', 'loadedShop'])
        },
        data() {
            return {
                provinces: provinces,
                categories: categories,
                shopData: null,
                
                shopTitle: null,

                shopContent: null,

                shopLogo: null,
                shopPreviewLogo: null,
                shopOldLogo: null,

                shopCover: null,
                shopPreviewCover: null,
                shopOldCover: null,

                confirmTitle: null,
            }
        },
        validations: {
            shopTitle: {
                required,
                isValidTitle: not(sameAs(vm => {
                    if(vm.loadedShop) {
                        return vm.loadedShop.title
                    }
                }))
            },
            shopLogo: {
                isImg: isImage
            },
            shopCover: {
                isImg: isImage
            },
            shopContent: {
                category: {
                    required
                },
                fbUrl: {
                    url
                },
                address: {
                    required
                },
                province: {
                    required
                },
                phone: {
                    required,
                    numeric
                },
                email: {
                    email
                },
                itemTypes: {
                    required,
                    minLen: minLength(1),
                },
                description: {
                    required
                },
            },
            confirmTitle: {
                required,
                isValidTitle: sameAs(vm => {
                    if(vm.loadedShop) {
                        return vm.loadedShop.title
                    }
                })
            }
        },
        methods: {
            async onUpdateContent() {       
                await this.$store.dispatch('updateShopContent', this.shopContent)
                this.$router.push(`${this.$route.path}`)
            },
            async onUpdateTitle() {
                const newShopUrl = await this.$store.dispatch('updateShopTitle', this.shopTitle)
                this.$router.push(`/shops/${newShopUrl}/edit-shop`)
            },
            async onUpdateLogo() {
                await this.$store.dispatch('updateShopLogo', this.shopLogo)
                this.$router.push(`${this.$route.path}`)
            },
            async onUpdateCover() {  
                await this.$store.dispatch('updateShopCover', this.shopCover)
                this.$router.push(`${this.$route.path}`)
            },
            async onDelete() {
                await this.$store.dispatch('deleteShop')
                this.$router.push('/user/mgmt')
            },
            onLogoChange() {
                this.shopPreviewLogo = null
                this.shopPreviewLogo = {
                    url: URL.createObjectURL(this.shopLogo),
                    size: this.shopLogo.size
                }
            },
            onCoverChange() {
                this.shopPreviewCover = null
                this.shopPreviewCover = {
                    url: URL.createObjectURL(this.shopCover),
                    size: this.shopCover.size
                }
            }
        },
        head () {
            return {
                title: this.loadedShop ? this.loadedShop.title : ``,
                meta: [
                    { hid: 'description', name: 'description', content: this.loadedShop ? this.loadedShop.description : ``}
                ]
            }
        }
    }
</script>