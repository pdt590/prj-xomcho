<template>
    <div class="container">
        <nav class="breadcrumb is-hidden-mobile" style="margin-bottom: 1rem">
            <ul>
                <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                <li><nuxt-link :to="`/shops/${$route.params.shopUrl}`">{{loadedShop.title}}</nuxt-link></li>
                <li class="is-active"><a>Thêm sản phẩm</a></li>
            </ul>
        </nav>
        <div class="columns">
            <div class="column is-3" >
                <div style="position: sticky; top: 8rem;">  
                    <div class="card">
                        <div class="card-content" v-if="loadedShop">
                            <div class="level">
                                <div class="level-item">
                                    <nuxt-link :to="`/shops/${$route.params.shopUrl}`">
                                        <figure class="image v-image-border">
                                            <client-only>
                                                <img class="v-shop-logo" v-lazy="loadedShop.logoImage ? loadedShop.logoImage.url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                                            </client-only>
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
                <form>
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title is-size-4">Tạo sản phẩm</p>
                        </header>
                        <div class="card-content">
                            <!-- Item info -->
                            <b-field grouped>
                                <b-field label="Tên*" expanded
                                    :type="$v.itemData.title.$error ? `is-danger` : ``">
                                    <b-input
                                        v-model.trim="itemData.title"
                                        @blur="$v.itemData.title.$touch()"
                                        icon="shopping">
                                    </b-input>
                                </b-field>

                                <b-field label="Thương hiệu" expanded>
                                    <b-input
                                        v-model.trim="itemData.brand"
                                        icon="label">
                                    </b-input>
                                </b-field>
                            </b-field>

                            <b-field label="Danh mục sản phẩm*"> 
                                <b-select v-model="itemData.type" expanded placeholder="Loại sản phẩm">
                                    <option v-for="(type, i) in loadedShop.itemTypes" :key="i">{{type}}</option>
                                </b-select>
                            </b-field>
                            
                            <b-field grouped>
                                <b-field label="Giá*" expanded
                                    :type="$v.itemData.price.$error ? `is-danger` : ``"
                                    :message="!$v.itemData.price.decimal ? `Nhập giá hợp lệ` : ``">
                                    <b-input
                                        type="number"
                                        step="1"
                                        v-model.trim="itemData.price"
                                        @blur="$v.itemData.price.$touch()"
                                        icon="cash-100">
                                    </b-input>
                                </b-field>

                                <b-field label="Giá cũ" expanded
                                    :type="$v.itemData.oldPrice.$error ? `is-danger` : ``"
                                    :message="!$v.itemData.oldPrice.decimal ? `Nhập giá hợp lệ` : ``">
                                    <b-input
                                        type="number"
                                        step="1"
                                        v-model.trim="itemData.oldPrice"
                                        @blur="$v.itemData.oldPrice.$touch()"
                                        icon="cash-100">
                                    </b-input>
                                </b-field>

                                <b-field label="Loại tiền*">
                                    <b-select v-model="itemData.currency">
                                        <option v-for="(currency, i) in currencies" :key="i">{{currency}}</option>
                                    </b-select>
                                </b-field>
                            </b-field>

                            <b-field label="Ghi chú" expanded>
                                <b-input 
                                    v-model="itemData.note"
                                    icon="note"
                                    placeholder="ví dụ: 1Kg / 1 cái / 1 mớ rau">
                                </b-input>
                            </b-field>

                            <b-field label="Miêu tả*"
                                :type="$v.itemData.description.$error ? `is-danger` : ``">
                                <b-input
                                    type="textarea"
                                    v-model.trim="itemData.description"
                                    @blur="$v.itemData.description.$touch()"
                                    maxlength="600">
                                </b-input>
                            </b-field>
                            
                            <!-- Image upload -->
                            <b-field label="Ảnh sản phẩm*"
                                :type="!$v.itemData.images.isImg ? `is-danger` : ``"
                                :message="!$v.itemData.images.isImg ? `File ảnh không hợp lệ` : ``">
                                <div class="level">
                                    <div class="level-item">
                                        <b-upload v-model="itemData.images"
                                            @input="onFileChange"
                                            multiple
                                            :disabled="!$v.itemData.images.isImg || itemData.images.length == 4"
                                            drag-drop>
                                            <section class="section">
                                                <div class="content has-text-centered">
                                                    <p>
                                                        <b-icon
                                                            icon="upload"
                                                            size="is-large">
                                                        </b-icon>
                                                    </p>
                                                    <p>Upload ảnh cho sản phẩm</p>
                                                </div>
                                            </section>
                                        </b-upload>
                                    </div>
                                </div>
                            </b-field>
                            <div class="level" style="justify-content: center;">
                                <div class="level-item" style="flex-grow: 0.1; padding-bottom: 1rem" 
                                    v-for="(file, index) in previewImages"
                                    :key="index">
                                    <figure class="image is-128x128 v-image-frame">
                                        <img class="v-preview-image" :src="file.url" :alt="`item_image_${index}`">
                                        <span class="v-image-size">{{file.size | fmBytes}}</span>
                                        <a class="delete v-image-bndelete" @click="previewImages.splice(index, 1); itemData.images.splice(index, 1)"></a>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer v-card-footer">
                            <div class="card-footer-item v-card-footer-item">
                                <p class="control">
                                    <button class="button is-info is-rounded" 
                                        :class="{'is-loading': itemLoading}"
                                        :disabled="$v.itemData.$invalid"
                                        type="submit" 
                                        @click.prevent="onAddItem">
                                        Tạo sản phẩm
                                    </button>
                                </p>
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
    import { isImage} from '~/plugins/util-helpers'
    import { currencies } from '~/plugins/util-lists'
    import { required, email, decimal, minLength, maxLength } from 'vuelidate/lib/validators' 

    export default {
        middleware: ['auth', 'edit-permission'],
        created() {
            this.itemData.category = this.loadedShop.category
            this.itemData.type = this.loadedShop.itemTypes[0]
        },
        computed: {
            ...mapGetters(['itemLoading', 'loadedShop']), 
        },
        data() {
            return {
                itemData: {
                    title: null,
                    category: null,
                    brand: null, // can be set to "", and if(brand) == false
                    price: null,
                    oldPrice: null,
                    currency: 'đ',
                    note: null,
                    type: null,
                    description: null,
                    images: [],
                    isAvailable: true
                },
                currencies: currencies,
                previewImages: []
            }
        },
        validations: {
            itemData: {
                title: {
                    required    
                },
                price: {
                    required,
                    decimal
                },
                oldPrice: {
                    decimal
                },
                currency: {
                    required
                },
                type: {
                    required
                },
                description: {
                    required
                },
                images: {
                    required,
                    maxLen: maxLength(4),
                    isImg: isImage
                }
            }
        },
        methods: {
            async onAddItem() {
                const itemUrl = await this.$store.dispatch('addItem', this.itemData)
                this.$router.push(`/shops/${this.$route.params.shopUrl}/${itemUrl}`)
            },
            onFileChange() {
                this.previewImages = []
                for(let file of this.itemData.images) {
                    this.previewImages.push({
                        url: URL.createObjectURL(file),
                        size: file.size
                    })
                }
            }
        },
        head () {
            return {
                title: this.loadedShop.title,
                meta: [
                    { hid: 'description', name: 'description', content: this.loadedShop.description }
                ]
            }
        }
    }
</script>
