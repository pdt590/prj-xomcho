<template>
    <div class="section">
        <div class="container">
            <nav class="breadcrumb">
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
                            <div class="card-content">
                                <div class="v-shop-title" v-if="loadedShop">
                                    <nuxt-link :to="`/shops/${$route.params.shopUrl}`">
                                        <figure class="image is-128x128">
                                            <img :src="loadedShop.logoImage ? loadedShop.logoImage.url : `/icon-photo.png`" alt="shop_logo">
                                        </figure>  
                                    </nuxt-link>
                                    <br>
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
                                <b-tab-item label="Thông tin">
                                    <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                        <b-field label="Sản phẩm kinh doanh*">
                                            <b-select expanded v-model="shopContent.category">
                                                <option v-for="(province, i) in provinces" :key="i">{{province}}</option>
                                            </b-select>
                                        </b-field>
                                        
                                        <b-field label="Facebook"
                                            :type="!$v.shopContent.facebook.url ? `is-danger` : ``" 
                                            :message="!$v.shopContent.facebook.url ? `Nhập địa chỉ facebook hợp lệ` : ``">
                                            <b-input
                                                type="url"
                                                v-model.trim="shopContent.facebook"
                                                icon="facebook-box"
                                                placeholder="Link địa chỉ facebook của cửa hàng hoặc cá nhận">
                                            </b-input>
                                        </b-field>

                                        <b-field label="Số điện thoại*" 
                                            :type="!$v.shopContent.phone.numeric ? `is-danger` : ``" 
                                            :message="!$v.shopContent.phone.numeric ? `Nhập số điện thoại hợp lệ` : ``">
                                            <b-input
                                                type="tel"
                                                v-model="shopContent.phone"
                                                icon="cellphone">
                                            </b-input>
                                        </b-field>

                                        <b-field label="Email" 
                                            :type="!$v.shopContent.email.email ? `is-danger` : ``" 
                                            :message="!$v.shopContent.email.email ? `Nhập email hợp lệ` : ``">
                                            <b-input
                                                type="email"
                                                v-model.trim="shopContent.email"
                                                icon="email">
                                            </b-input>
                                        </b-field>

                                        <b-field grouped>
                                            <b-field label="Địa chỉ*" expanded>
                                                <b-input 
                                                    v-model="shopContent.address"
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
                                            :type="!$v.shopContent.itemTypes.minLen ? `is-danger` : ``" 
                                            :message="!$v.shopContent.itemTypes.minLen ? `Nhập ít nhẩt một loại sản phẩm` : ``">
                                            <b-taginput
                                                v-model="shopContent.itemTypes"
                                                maxlength="20"
                                                maxtags="20"
                                                placeholder="Các loại sản phẩm dự định bán">
                                            </b-taginput>
                                        </b-field>

                                        <b-field label="Miêu tả*">
                                            <b-input
                                                type="textarea"
                                                v-model.trim="shopContent.description"
                                                maxlength="300">
                                            </b-input>
                                        </b-field>
                                    </form>
                                    <div class="level">
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

                                <b-tab-item label="Tên cửa hàng">
                                    <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                        <b-field label="Nhập tên mới*">
                                            <b-input
                                                v-model.trim="shopTitle"
                                                icon="store">
                                            </b-input>
                                        </b-field>
                                    </form>
                                    <div class="level">
                                        <div class="level-left"></div>
                                        <div class="level-right">
                                            <button class="button is-info is-rounded" 
                                                :class="{'is-loading': shopLoading}"
                                                :disabled="$v.shopTitle.$invalid || !$v.shopTitle.isValid"
                                                type="submit" 
                                                @click.prevent="onUpdateTitle">
                                                Lưu thay đổi
                                            </button>
                                        </div>
                                    </div>
                                </b-tab-item>

                                <b-tab-item label="Ảnh Logo">
                                    <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                        <b-field label="Logo (Kích thước < 2MB)"
                                            :type="!$v.shopLogo.isImg ? `is-danger` : ``"
                                            :message="!$v.shopLogo.isImg ? `File ảnh không hợp lệ` : ``">
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
                                        </b-field>
                                        <div class="level">
                                            <div class="level-left">
                                                <div class="level-item" v-if="shopOldLogo">
                                                    <figure class="image is-128x128 v-image-preview">
                                                        <img :src="shopOldLogo.url" alt="shop_logo">
                                                        <span class="v-image-size">{{shopOldLogo.metadata.size | fmBytes}}</span>
                                                        <a class="delete v-image-delete" @click="shopOldLogo = null"></a>
                                                    </figure>
                                                </div>
                                                <div class="level-item" v-if="shopLogo">
                                                    <figure class="image is-128x128 v-image-preview">
                                                        <img :src="shopPreviewLogo.url" alt="shop_logo">
                                                        <span class="v-image-size">{{shopPreviewLogo.size | fmBytes}}</span>
                                                        <a class="delete v-image-delete" @click="shopPreviewLogo = null; shopLogo = null"></a>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <span v-if="shopLogo" class="tags has-addons">
                                            <span class="tag is-info">{{shopLogo.name}}</span>
                                            <span class="tag is-light">{{shopLogo.size | fmBytes}}</span>
                                            <a class="tag is-delete is-light" @click="shopLogo = null"></a>
                                        </span>
                                        <span v-if="shopOldLogo" class="tags has-addons">
                                            <span class="tag is-info">{{shopOldLogo.metadata.name}}</span>
                                            <span class="tag is-light">{{shopOldLogo.metadata.size | fmBytes}}</span>
                                            <a class="tag is-delete is-light" @click="shopOldLogo = null"></a>
                                        </span> -->
                                    </form>
                                    <div class="level">
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
                                        <b-field label="Cover (Kích thước < 2MB)"
                                            :type="!$v.shopCover.isImg ? `is-danger` : ``"
                                            :message="!$v.shopCover.isImg ? `File ảnh không hợp lệ` : ``">
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
                                        </b-field>
                                        <div class="level">
                                            <div class="level-left">
                                                <div class="level-item" v-if="shopOldCover">
                                                    <figure class="image is-128x128 v-image-preview">
                                                        <img :src="shopOldCover.url" alt="shop_cover">
                                                        <span class="v-image-size">{{shopOldCover.metadata.size | fmBytes}}</span>
                                                        <a class="delete v-image-delete" @click="shopOldCover = null"></a>
                                                    </figure>
                                                </div>
                                                <div class="level-item" v-if="shopCover">
                                                    <figure class="image is-128x128 v-image-preview">
                                                        <img :src="shopPreviewCover.url" alt="shop_cover">
                                                        <span class="v-image-size">{{shopPreviewCover.size | fmBytes}}</span>
                                                        <a class="delete v-image-delete" @click="shopPreviewCover= null; shopCover = null"></a>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <span v-if="shopCover" class="tags has-addons">
                                            <span class="tag is-info">{{shopCover.name}}</span>
                                            <span class="tag is-light">{{shopCover.size | fmBytes}}</span>
                                            <a class="tag is-delete is-light" @click="shopCover = null"></a>
                                        </span>
                                        <span v-if="shopOldCover" class="tags has-addons">
                                            <span class="tag is-info">{{shopOldCover.metadata.name}}</span>
                                            <span class="tag is-light">{{shopOldCover.metadata.size | fmBytes}}</span>
                                            <a class="tag is-delete is-light" @click="shopOldCover = null"></a>
                                        </span> -->
                                    </form>
                                    <div class="level">
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
                                                icon="store">
                                            </b-input>
                                        </b-field>
                                    </form>
                                    <div class="level">
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { isImage, deepCopy } from '~/plugins/utility-helpers'
    import { provinces } from '~/plugins/utility-lists'
    import { required, email, url, numeric, sameAs, not, minLength, maxLength } from 'vuelidate/lib/validators'

    export default {
        middleware: 'auth',
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
        async fetch({ store, params, error }) {
            try{
                if(process.client) {
                    if(!store.getters.loadedShop) { 
                        await Promise.all([
                            store.dispatch('loadShop', params.shopUrl),
                            store.dispatch('loadItems', params.shopUrl)
                        ])
                    }
                }else {
                    await Promise.all([
                        store.dispatch('loadShop', params.shopUrl),
                        store.dispatch('loadItems', params.shopUrl)
                    ])
                }
            } catch(error) {
                console.log('[ERROR-shops/shopUrl/edit-shop]', error)
                error({ statusCode: 500, message: '...Lỗi'})
            }
            if(!store.getters.loadedShop) {
                console.log('[ERROR-shops/shopUrl/edit-shop]', 'Cannot load shop')
                error({ statusCode: 404, message: 'Cannot load shop'})
            }
        },
        data() {
            return {
                provinces: provinces,
                shopData: null,
                
                shopTitle: null,

                shopLogo: null,
                shopPreviewLogo: null,
                shopOldLogo: null,

                shopCover: null,
                shopPreviewCover: null,
                shopOldCover: null,

                shopContent: null,

                confirmTitle: null,
            }
        },
        validations: {
            shopTitle: {
                required,
                isValid: not(sameAs(vm => {
                    if(vm.loadedShop) {
                        return vm.loadedShop.title
                    }
                }))
            },
            shopLogo: {
                isImg: isImage(2097152) // <2MB
            },
            shopCover: {
                isImg: isImage(2097152) // <2MB
            },
            shopContent: {
                category: {
                    required
                },
                facebook: {
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
                isValid: sameAs(vm => {
                    if(vm.loadedShop) {
                        return vm.loadedShop.title
                    }
                })
            }
        },
        methods: {
            async onUpdateContent() {       
                await this.$store.dispatch('updateShopContent', this.shopContent)
                this.$router.push(`/shops/${this.$route.params.shopUrl}/edit-shop`)
            },
            async onUpdateTitle() {
                const newShopUrl = await this.$store.dispatch('updateShopTitle', this.shopTitle)
                this.$router.push(`/shops/${newShopUrl}/edit-shop`)
            },
            async onUpdateLogo() {
                await this.$store.dispatch('updateShopLogo', this.shopLogo)
                this.$router.push(`/shops/${this.$route.params.shopUrl}/edit-shop`)
            },
            async onUpdateCover() {  
                await this.$store.dispatch('updateShopCover', this.shopCover)
                this.$router.push(`/shops/${this.$route.params.shopUrl}/edit-shop`)
            },
            async onDelete() {
                await this.$store.dispatch('deleteShop')
                this.$router.push('/')
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