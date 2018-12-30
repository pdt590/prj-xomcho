<template>
    <div class="container">
        <nav class="breadcrumb is-hidden-mobile" style="margin-bottom: 1rem">
            <ul>
                <li><nuxt-link to="/">Trang chủ</nuxt-link></li>
                <li><nuxt-link :to="`/shops/${$route.params.shopUrl}`">{{loadedShop.title}}</nuxt-link></li>
                <li v-if="loadedItem"><nuxt-link :to="`/shops/${$route.params.shopUrl}/${$route.params.itemUrl}`">{{loadedItem.title}}</nuxt-link></li>
                <li class="is-active"><a>Chỉnh sửa</a></li>
            </ul>
        </nav>
        <div class="columns">
            <div class="column is-3">
                <div style="position: sticky; top: 8rem;">  
                    <div class="card">
                        <div class="card-content" v-if="loadedItem">
                            <div class="level">
                                <div class="level-item">
                                    <nuxt-link class="" :to="`/shops/${$route.params.shopUrl}/${$route.params.itemUrl}`">
                                        <figure class="image v-image-border">
                                            <no-ssr>
                                                <img class="v-shop-logo" v-lazy="loadedItem.images[0] ? loadedItem.images[0].url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="item_image">
                                            </no-ssr>
                                        </figure>
                                    </nuxt-link>
                                </div>
                            </div>
                            <div class="has-text-centered">
                                <h5 class="title is-size-5">{{loadedItem.title}}</h5>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-9">
                <div class="card">
                    <div class="card-content">
                        <b-tabs type="is-boxed">
                            <b-tab-item label="Tên sản phẩm">
                                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                    <b-field label="Nhập tên mới*">
                                        <b-input
                                            v-model.trim="itemTitle"
                                            @blur="$v.itemTitle.$touch()"
                                            icon="store">
                                        </b-input>
                                    </b-field>
                                </form>
                                <div class="level is-mobile">
                                    <div class="level-left"></div>
                                    <div class="level-right">
                                        <button class="button is-info is-rounded" 
                                            :class="{'is-loading': itemLoading}"
                                            :disabled="$v.itemTitle.$invalid"
                                            type="submit" 
                                            @click.prevent="onUpdateTitle">
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            </b-tab-item>

                            <b-tab-item label="Thông tin">
                                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                    <b-field label="Thương hiệu" expanded>
                                        <b-input
                                            v-model.trim="itemContent.brand"
                                            icon="label">
                                        </b-input>
                                    </b-field>

                                    <b-field label="Danh mục sản phẩm*"> 
                                        <b-select v-model="itemContent.type" expanded placeholder="Loại sản phẩm">
                                            <option v-for="(type, i) in loadedShop.itemTypes" :key="i">{{type}}</option>
                                        </b-select>
                                    </b-field>
                                    
                                    <b-field grouped>
                                        <b-field label="Giá*" expanded
                                            :type="$v.itemContent.price.$error ? `is-danger` : ``"
                                            :message="!$v.itemContent.price.decimal ? `Nhập giá hợp lệ` : ``">
                                            <b-input
                                                type="number"
                                                step="1"
                                                v-model.trim="itemContent.price"
                                                @blur="$v.itemContent.price.$touch()"
                                                icon="cash-100">
                                            </b-input>
                                        </b-field>

                                        <b-field label="Giá cũ" expanded
                                            :type="$v.itemContent.oldPrice.$error ? `is-danger` : ``"
                                            :message="!$v.itemContent.oldPrice.decimal ? `Nhập giá hợp lệ` : ``">
                                            <b-input
                                                type="number"
                                                step="1"
                                                v-model.trim="itemContent.oldPrice"
                                                @blur="$v.itemContent.oldPrice.$touch()"
                                                icon="cash-100">
                                            </b-input>
                                        </b-field>

                                        <b-field label="Loại tiền*">
                                            <b-select v-model="itemContent.currency">
                                                <option v-for="(currency, i) in currencies" :key="i">{{currency}}</option>
                                            </b-select>
                                        </b-field>
                                    </b-field>

                                    <b-field label="Đơn vị sản phẩm cho giá ở trên" expanded>
                                        <b-input 
                                            v-model="itemContent.unit"
                                            icon="unity"
                                            placeholder="ví dụ: 1Kg / 1 cái / 1 mớ rau">
                                        </b-input>
                                    </b-field>

                                    <b-field label="Miêu tả*"
                                        :type="$v.itemContent.description.$error ? `is-danger` : ``">
                                        <b-input
                                            type="textarea"
                                            v-model.trim="itemContent.description"
                                            @blur="$v.itemContent.description.$touch()"
                                            maxlength="300">
                                        </b-input>
                                    </b-field>
                                </form>
                                <div class="level is-mobile">
                                    <div class="level-left"></div>
                                    <div class="level-right">
                                        <button class="button is-info is-rounded" 
                                            :class="{'is-loading': itemLoading}"
                                            :disabled="$v.itemContent.$invalid" 
                                            type="submit" 
                                            @click.prevent="onUpdateContent">
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            </b-tab-item>

                            <b-tab-item label="Ảnh">
                                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                    <b-field label="Ảnh sản phẩm*"
                                        :type="!$v.itemImages.isImg ? `is-danger` : ``"
                                        :message="!$v.itemImages.isImg ? `File ảnh không hợp lệ` : ``">
                                        <div class="level">
                                            <div class="level-item">
                                                <b-upload v-model="itemImages"
                                                    @input="onFileChange"
                                                    multiple
                                                    :disabled="!$v.itemImages.isImg || (itemImages.length + itemOldImages.length) == 4"
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
                                            v-for="(file, index) in itemOldImages"
                                            :key="index">
                                            <figure class="image is-128x128 v-image-frame">
                                                <img class="v-preview-image" :src="file.url" :alt="`item_image_${index}`">
                                                <span class="v-image-size">{{file.metadata.size | fmBytes}}</span>
                                                <a class="delete v-image-bndelete" @click="itemOldImages.splice(index, 1)"></a>
                                            </figure>
                                        </div>
                                        <div class="level-item" style="flex-grow: 0.1;" 
                                            v-for="(file, index) in itemPreviewImages"
                                            :key="itemOldImages.length + index">
                                            <figure class="image is-128x128 v-image-frame">
                                                <img class="v-preview-image" :src="file.url" :alt="`item_image_${itemOldImages.length + index}`">
                                                <span class="v-image-size">{{file.size | fmBytes}}</span>
                                                <a class="delete v-image-bndelete" @click="itemPreviewImages.splice(index, 1); itemImages.splice(index, 1)"></a>
                                            </figure>
                                        </div>
                                    </div>
                                </form>
                                <div class="level is-mobile">
                                    <div class="level-left"></div>
                                    <div class="level-right">
                                        <button class="button is-info is-rounded" 
                                            :class="{'is-loading': itemLoading}"
                                            :disabled="$v.itemImages.$invalid || (itemImages.length + itemOldImages.length) == 0" 
                                            type="submit" 
                                            @click.prevent="onUpdateImages">
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            </b-tab-item>

                            <b-tab-item label="Xóa sản phẩm">
                                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                                    <b-field label="Nhập tên sản phẩm*" expanded>
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
                                            :class="{'is-loading': itemLoading}"
                                            :disabled="$v.confirmTitle.$invalid" 
                                            type="submit" 
                                            @click.prevent="onDelete">
                                            Xóa sản phẩm
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
    import { currencies } from '~/plugins/util-lists'
    import { required, email, decimal, sameAs, not } from 'vuelidate/lib/validators'

    export default {
        middleware: ['auth', 'edit-permission'],
        created() {
            this.itemData  = deepCopy(this.loadedItem)
            this.itemTitle = this.itemData.title
            delete this.itemData.title
            if(this.itemData.images) {
                this.itemOldImages  = deepCopy(this.itemData.images)
                delete this.itemData.images
            }
            this.itemContent = deepCopy(this.itemData)
        },
        computed: {
            ...mapGetters(['itemLoading', 'loadedShop']),
            loadedItem() {
                return this.$store.getters.loadedItem(this.$route.params.itemUrl)
            }
        },
        data() {
            return {
                currencies: currencies,
                itemData: null,

                itemTitle: null,

                itemContent: null,

                itemImages: [],
                itemPreviewImages: [],
                itemOldImages: [],
                
                confirmTitle: null,
            }
        },
        validations: {
            itemTitle: {
                required,
                isValidTitle: not(sameAs(vm => {
                    if(vm.loadedItem) {
                        return vm.loadedItem.title
                    }
                }))
            },
            itemImages: {
                isImg: isImage
            },
            itemContent : {
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
                }
            },
            confirmTitle: {
                required,
                isValidTitle: sameAs(vm => {
                    if(vm.loadedItem) {
                        return vm.loadedItem.title
                    }
                })
            }
        },
        methods: {
            async onUpdateContent() {       
                await this.$store.dispatch('updateItemContent', this.itemContent)
                this.$router.push(`${this.$route.path}`)
            },
            async onUpdateTitle() {
                const newItemUrl = await this.$store.dispatch('updateItemTitle', {
                    url: this.loadedItem.url,
                    newItemTitle: this.itemTitle
                })
                this.$router.push(`/shops/${this.$route.params.shopUrl}/${newItemUrl}/edit-item`)
            },
            async onUpdateImages() {
                await this.$store.dispatch('updateItemImages', {
                    url: this.loadedItem.url,
                    newImages: this.itemImages,
                    oldImages: this.itemOldImages
                })
                this.$router.push(`${this.$route.path}`)
            },
            async onDelete() {
                await this.$store.dispatch('deleteItem', this.loadedItem.url)
                this.$router.push('/')
            },
            onFileChange() {
                this.itemPreviewImages = []
                for(let file of this.itemImages) {
                    this.itemPreviewImages.push({
                        url: URL.createObjectURL(file),
                        size: file.size
                    })
                }
            }
        },
        head () {
            return {
                title: this.loadedItem ? this.loadedItem.title: ``,
                meta: [
                    { hid: 'description', name: 'description', content: this.loadedItem ? this.loadedItem.description : ``}
                ]
            }
        }
    }
</script>