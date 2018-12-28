<template>
    <div class="container">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <form>
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title is-size-4">Tạo cửa hàng</p>
                        </header>
                        <div class="card-content">
                            <!-- Shop info -->
                            <b-field grouped>
                                <b-field label="Tên*" expanded 
                                    :type="$v.shopData.title.$error ? `is-danger` : ``">
                                    <b-input
                                        type="text"
                                        v-model.trim="shopData.title"
                                        @blur="$v.shopData.title.$touch()"
                                        icon="store">
                                    </b-input>
                                </b-field>
                                <b-field label="Sản phẩm kinh doanh*">
                                    <b-select v-model="shopData.category">
                                        <option v-for="(category, i) in categories" :key="i" :value="category.id">{{category.name}}</option>
                                    </b-select>
                                </b-field>
                            </b-field>
                            
                            <b-field label="Facebook"
                                :type="$v.shopData.facebook.$error ? `is-danger` : ``" 
                                :message="!$v.shopData.facebook.url ? `Nhập địa chỉ facebook hợp lệ` : ``">
                                <b-input
                                    type="url"
                                    v-model.trim="shopData.facebook"
                                    @blur="$v.shopData.facebook.$touch()"
                                    icon="facebook-box"
                                    placeholder="Link địa chỉ facebook của cửa hàng hoặc cá nhân">
                                </b-input>
                            </b-field>

                            <b-field label="Số điện thoại*" 
                                :type="$v.shopData.phone.$error ? `is-danger` : ``" 
                                :message="!$v.shopData.phone.numeric ? `Nhập số điện thoại hợp lệ` : ``">
                                <b-input
                                    type="tel"
                                    v-model="shopData.phone"
                                    @blur="$v.shopData.phone.$touch()"
                                    icon="cellphone">
                                </b-input>
                            </b-field>

                            <b-field label="Email" 
                                :type="$v.shopData.email.$error ? `is-danger` : ``" 
                                :message="!$v.shopData.email.email ? `Nhập email hợp lệ` : ``">
                                <b-input
                                    type="email"
                                    v-model.trim="shopData.email"
                                    @blur="$v.shopData.email.$touch()"
                                    icon="email">
                                </b-input>
                            </b-field>

                            <b-field grouped>
                                <b-field label="Địa chỉ*" expanded
                                    :type="$v.shopData.address.$error ? `is-danger` : ``">
                                    <b-input 
                                        v-model="shopData.address"
                                        @blur="$v.shopData.address.$touch()"
                                        icon="map-marker">
                                    </b-input>
                                </b-field>
                                <b-field label="Tỉnh/Thành*">
                                    <b-select v-model="shopData.province">
                                        <option v-for="(province, i) in provinces" :key="i">{{province}}</option>
                                    </b-select>
                                </b-field>
                            </b-field>
                            
                            <b-field label="Danh mục sản phẩm*"
                                :type="$v.shopData.itemTypes.$error ? `is-danger` : ``">
                                <b-taginput
                                    v-model="shopData.itemTypes"
                                    @blur="$v.shopData.itemTypes.$touch()"
                                    maxlength="20"
                                    maxtags="20"
                                    placeholder="Các loại sản phẩm dự định bán">
                                </b-taginput>
                            </b-field>

                            <b-field label="Miêu tả*"
                                :type="$v.shopData.description.$error ? `is-danger` : ``">
                                <b-input
                                    type="textarea"
                                    v-model.trim="shopData.description"
                                    @blur="$v.shopData.description.$touch()"
                                    maxlength="300">
                                </b-input>
                            </b-field>
                            
                            <!-- Logo upload -->
                            <b-field label="Logo"
                                :type="!$v.shopData.logoImage.isImg ? `is-danger` : ``"
                                :message="!$v.shopData.logoImage.isImg ? `File ảnh không hợp lệ` : ``">
                                <div class="level">
                                    <div class="level-item">
                                        <b-upload v-model="shopData.logoImage"
                                            @input="onLogoChange"
                                            :disabled="$v.shopData.logoImage.$invalid || shopData.logoImage !== null"
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
                                <div class="level-item" v-if="shopData.logoImage">
                                    <figure class="image is-128x128 v-image-frame">
                                        <img class="v-preview-image" :src="previewLogoImage.url" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                                        <span class="v-image-size">{{previewLogoImage.size | fmBytes}}</span>
                                        <a class="delete v-image-bndelete" @click="previewLogoImage = null; shopData.logoImage = null"></a>
                                    </figure>
                                </div>
                            </div>

                            <!-- Cover upload -->
                            <b-field label="Cover"
                                :type="!$v.shopData.coverImage.isImg ? `is-danger` : ``"
                                :message="!$v.shopData.coverImage.isImg ? `File ảnh không hợp lệ` : ``">
                                <div class="level">
                                    <div class="level-item">
                                        <b-upload v-model="shopData.coverImage"
                                            @input="onCoverChange"
                                            :disabled="$v.shopData.coverImage.$invalid || shopData.coverImage !== null"
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
                                <div class="level-item" v-if="shopData.coverImage">
                                    <figure class="image is-128x128 v-image-frame">
                                        <img class="v-preview-image" :src="previewCoverImage.url" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                                        <span class="v-image-size">{{previewCoverImage.size | fmBytes}}</span>
                                        <a class="delete v-image-bndelete" @click="previewCoverImage =null; shopData.coverImage = null"></a>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <div class="card-footer-item">
                                <button class="button is-info is-rounded" 
                                    :class="{'is-loading': shopLoading}"
                                    :disabled="$v.shopData.$invalid" 
                                    type="submit" 
                                    @click.prevent="onAddShop">
                                    Tạo cửa hàng
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
    import { isImage } from '~/plugins/util-helpers'
    import { provinces, categories } from '~/plugins/util-lists'
    import { required, email, url, numeric } from 'vuelidate/lib/validators'
    
    export default {
        middleware: 'auth',
        computed: {
            ...mapGetters(['shopLoading'])
        },
        data() {
            return {
                shopData: {
                    title: null,
                    category: 'nông-nghiệp',
                    facebook: null,
                    address: null,
                    province: 'Hà Nội',
                    phone: null,
                    email: null,
                    itemTypes: [],
                    description: null,
                    logoImage: null,
                    coverImage: null
                },
                provinces: provinces,
                categories: categories,
                previewLogoImage: null,
                previewCoverImage: null
            }
        },
        validations: {
            shopData: {
                title: {
                    required
                },
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
                    required
                },
                description: {
                    required
                },
                logoImage: {
                    isImg: isImage
                },
                coverImage: {
                    isImg: isImage
                }
            }
        },
        methods: {
            async onAddShop() {
                const shopUrl = await this.$store.dispatch('addShop', this.shopData)
                window.location.href = `/shops/${shopUrl}`
            },
            onLogoChange() {
                this.previewLogoImage = null
                this.previewLogoImage = {
                    url: URL.createObjectURL(this.shopData.logoImage),
                    size: this.shopData.logoImage.size
                }
            },
            onCoverChange() {
                this.previewCoverImage = null
                this.previewCoverImage = {
                    url: URL.createObjectURL(this.shopData.coverImage),
                    size: this.shopData.coverImage.size
                }
            }
        }
    }
</script>
