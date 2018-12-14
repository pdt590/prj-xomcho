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
                                        <figure class="image is-128x128" style="border: solid 1px #D8D8D8">
                                            <img class="v-shop-logo" v-lazy="loadedItem.images[0] ? loadedItem.images[0].url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
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
                                            icon="store">
                                        </b-input>
                                    </b-field>
                                </form>
                                <div class="level is-mobile">
                                    <div class="level-left"></div>
                                    <div class="level-right">
                                        <button class="button is-info is-rounded" 
                                            :class="{'is-loading': itemLoading}"
                                            :disabled="$v.itemTitle.$invalid || !$v.itemTitle.isValid"
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
                                        <b-field label="Giá*" expanded>
                                            <b-input
                                                type="number"
                                                step="1"
                                                v-model.trim="itemContent.price"
                                                icon="cash-100">
                                            </b-input>
                                        </b-field>

                                        <b-field label="Giá cũ" expanded>
                                            <b-input
                                                type="number"
                                                step="1"
                                                v-model.trim="itemContent.oldPrice"
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

                                    <b-field label="Miêu tả*">
                                        <b-input
                                            type="textarea"
                                            v-model.trim="itemContent.description"
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
                                    <b-field label="Ảnh sản phẩm* (Tối thiểu 1 ảnh - Tối đa 4 ảnh, kích thước < 2MB)"
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
                                        <div class="level-item" style="flex-grow: 0.1; padding-bottom: 1rem" v-for="(file, index) in itemOldImages"
                                            :key="index">
                                            <figure class="image is-128x128 v-image-frame">
                                                <img class="v-preview-image" v-lazy="file.url" :alt="`item_image_${index}`">
                                                <span class="v-image-size">{{file.metadata.size | fmBytes}}</span>
                                                <a class="delete v-image-bndelete" @click="itemOldImages.splice(index, 1)"></a>
                                            </figure>
                                        </div>
                                        <div class="level-item" style="flex-grow: 0.1;" v-for="(file, index) in itemPreviewImages"
                                            :key="itemOldImages.length + index">
                                            <figure class="image is-128x128 v-image-frame">
                                                <img class="v-preview-image" v-lazy="file.url" :alt="`item_image_${itemOldImages.length + index}`">
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
    import { required, email, decimal, sameAs, not, minLength, maxLength} from 'vuelidate/lib/validators'

    export default {
        middleware: ['auth', 'permission'],
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
        async fetch({ store, params, error }) {
            try{
                if(process.client) {
                    if(!store.getters.loadedShop || store.getters.loadedShop.url !== params.shopUrl) { 
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
                console.log('[ERROR-shops/shopUrl/itemUrl/edit-item]', error)
                error({ statusCode: 500, message: '...Lỗi'})
            }
            if(!store.getters.loadedItem(params.itemUrl)) {
                console.log('[ERROR-shops/shopUrl/itemUrl/edit-item]', 'Cannot load item')
                error({ statusCode: 404, message: '...Lỗi'})
            }
            if(!store.getters.loadedShop) {
                console.log('[ERROR-shops/shopUrl/itemUrl/edit-item]', 'Cannot load shop')
                error({ statusCode: 404, message: 'Cannot load shop'})
            }
        },
        data() {
            return {
                itemData: null,

                itemTitle: null,

                itemImages: [],
                itemPreviewImages: [],
                itemOldImages: [],

                itemContent: null,
                
                confirmTitle: null,

                currencies: currencies
            }
        },
        validations: {
            itemTitle: {
                required,
                isValid: not(sameAs(vm => {
                    if(vm.loadedItem) {
                        return vm.loadedItem.title
                    }
                }))
            },
            itemImages: {
                isImg: isImage(2097152) // <2MB
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
                sameAs: sameAs(vm => {
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

<style lang="scss" scoped>
    .card {
        border-radius: 0.3rem;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.1);
        .card-header {
            padding: 1rem;
        }
    }
</style>