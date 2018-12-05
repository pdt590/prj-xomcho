<template>
    <div class="section">
        <div class="container">
            <nav class="breadcrumb">
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
                            <div class="card-content">
                                <div class="v-shop-title">
                                    <nuxt-link class="has-text-centered" :to="`/shops/${$route.params.shopUrl}`">
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
                    <form>
                        <div class="card">
                            <header class="card-header v-card-header">
                                <p class="card-header-title v-card-header-title">Thông tin sản phẩm</p>
                            </header>
                            <div class="card-content">
                                <!-- Item info -->
                                <b-field grouped>
                                    <b-field label="Tên sản phẩm*" expanded>
                                        <b-input
                                            v-model.trim="itemData.title"
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
                                    <b-field label="Giá*" expanded>
                                        <b-input
                                            type="number"
                                            step="0.1"
                                            v-model.trim="itemData.price"
                                            icon="cash-100">
                                        </b-input>
                                    </b-field>

                                    <b-field label="Giá sale" expanded>
                                        <b-input
                                            type="number"
                                            step="0.1"
                                            v-model.trim="itemData.salePrice"
                                            icon="cash-100">
                                        </b-input>
                                    </b-field>

                                    <b-field label="Loại tiền*">
                                        <b-select v-model="itemData.currency">
                                            <option v-for="(currency, i) in currencies" :key="i">{{currency}}</option>
                                        </b-select>
                                    </b-field>
                                </b-field>

                                <b-field label="Đơn vị sản phẩm cho giá ở trên*" expanded>
                                    <b-input 
                                        v-model="itemData.unit"
                                        icon="unity"
                                        placeholder="ví dụ: 1Kg / 1 cái / 1 mớ rau">
                                    </b-input>
                                </b-field>

                                <b-field label="Miêu tả*">
                                    <b-input
                                        type="textarea"
                                        v-model.trim="itemData.description"
                                        maxlength="300">
                                    </b-input>
                                </b-field>
                                
                                <!-- Image upload -->
                                <b-field label="Ảnh sản phẩm (Tối đa 5 ảnh, kích thước < 2MB)"
                                    :type="!$v.itemData.images.isImg ? `is-danger` : ``"
                                    :message="!$v.itemData.images.isImg ? `File ảnh không hợp lệ` : ``">
                                    <b-upload v-model="itemData.images"
                                        @input="onFileChange"
                                        multiple
                                        :disabled="!$v.itemData.images.isImg || itemData.images.length == 5"
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
                                </b-field>
                                <div class="level">
                                    <div class="level-left">
                                        <div class="level-item" v-for="(file, index) in previewImages"
                                            :key="index">
                                            <figure class="image is-128x128 v-image-preview">
                                                <img :src="file.url" :alt="`item_image_${index}`">
                                                <span class="v-image-size">{{file.size | fmBytes}}</span>
                                                <a class="delete v-image-delete" @click="previewImages.splice(index, 1); itemData.images.splice(index, 1)"></a>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="field is-grouped is-grouped-multiline">
                                    <div class="control" v-for="(file, index) in itemData.images"
                                        :key="index">
                                        <div class="tags has-addons">
                                            <span class="tag is-info">{{file.name}}</span>
                                            <span class="tag is-light">{{file.size | fmBytes}}</span>
                                            <a class="tag is-delete is-light" @click="itemData.images.splice(index, 1)"></a>
                                        </div>
                                    </div>
                                </div> -->
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { isImage } from '~/plugins/utility-helpers'
    import { currencies } from '~/plugins/utility-lists'
    import { required, email, decimal, minLength, maxLength } from 'vuelidate/lib/validators' 

    export default {
        middleware: 'auth',
        created() {
            this.itemData.category = this.loadedShop.category
            this.itemData.type = this.loadedShop.itemTypes[0]
        },
        computed: {
            ...mapGetters(['itemLoading', 'loadedShop']), 
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
                console.log('[ERROR-shops/shopUrl/new-item]', error)
                error({ statusCode: 500, message: '...Lỗi'})
            }
            if(!store.getters.loadedShop) {
                console.log('[ERROR-shops/shopUrl/new-item]', 'Cannot load shop')
                error({ statusCode: 404, message: 'Cannot load shop'})
            }
        },
        data() {
            return {
                itemData: {
                    title: null,
                    category: null,
                    brand: null, // can be set to "", and if(brand) == false
                    price: null,
                    salePrice: null,
                    currency: 'đ',
                    unit: null,
                    type: null,
                    description: null,
                    images: []
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
                salePrice: {
                    decimal
                },
                currency: {
                    required
                },
                unit: {
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
                    maxLen: maxLength(5),
                    isImg: isImage(2097152) // <2MB
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
        .card-footer .card-footer-item {
            justify-content: flex-end;
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
