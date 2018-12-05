# tadicho

> An eCommercial project for online shops and more

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

##
```javascript
<template>
    <div>
        <section class="section">
            <div class="container">
                <div class="columns is-variable is-5">
                    <div class="column is-3">

                    </div>
                    <div class="column is-8">
                        <h1 class="title is-4">Cài đặt</h1>
                        <h2 class="subtitle is-6">Thông tin chung về tài khoản</h2>
                        <div id="profile">
                            <form action="">
                                <div class="card">
                                    <header class="card-header">
                                        <p class="card-header-title">Thông tin cá nhân</p>
                                    </header>
                                    <div class="card-content">
                                        <div class="columns">
                                            <div class="column is-two-thirds">
                                                <b-field label="Tên cửa hàng">
                                                    <b-input
                                                        v-model.trim="shopData.title"
                                                        icon="store"
                                                        required>
                                                    </b-input>
                                                </b-field>

                                                <b-field label="Địa chỉ facebook">
                                                    <b-input
                                                        type="url"
                                                        v-model.trim="shopData.facebook"
                                                        icon="facebook-box"
                                                        required>
                                                    </b-input>
                                                </b-field>
                                                <b-field label="Số điện thoại">
                                                    <b-input
                                                        type="tel"
                                                        v-model.trim="shopData.phone"
                                                        icon="cellphone"
                                                        required>
                                                    </b-input>
                                                </b-field>
                                                <b-field label="Email">
                                                    <b-input
                                                        type="email"
                                                        v-model.trim="shopData.email"
                                                        icon="email"
                                                        required>
                                                    </b-input>
                                                </b-field>
                                                <b-field grouped >
                                                    <b-field label="Địa chỉ" expanded>
                                                        <b-input 
                                                            v-model="shopData.location"
                                                            icon="map-marker"
                                                            required>
                                                        </b-input>
                                                    </b-field>
                                                    <b-field label="Tỉnh">
                                                        <b-select v-model="shopData.province">
                                                            <option v-for="(province, i) in provinceList" :key="i">{{province}}</option>
                                                        </b-select>
                                                    </b-field>
                                                </b-field>
                                                <b-field label="Miêu tả">
                                                    <b-input
                                                        type="textarea"
                                                        v-model.trim="shopData.description"
                                                        maxlength="100"
                                                        required>
                                                    </b-input>
                                                </b-field>
                                            </div>
                                            <div class="column is-one-third">
                                                <b-field>
                                                    <b-upload v-model="dropFiles"
                                                        multiple
                                                        drag-drop>
                                                        <section class="section">
                                                            <div class="content has-text-centered">
                                                                <p>
                                                                    <b-icon
                                                                        icon="upload"
                                                                        size="is-large">
                                                                    </b-icon>
                                                                </p>
                                                                <p>
                                                                    Lorem ipsum dolor sit,
                                                                </p>
                                                            </div>
                                                        </section>
                                                    </b-upload>
                                                </b-field>

                                                <div class="tags">
                                                    <span v-for="(file, index) in dropFiles"
                                                        :key="index"
                                                        class="tag is-primary" >
                                                        {{file.name}}
                                                        <button class="delete is-small"
                                                            type="button"
                                                            @click="deleteDropFile(index)">
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <footer class="card-footer">
                                        <div class="card-footer-item" style="padding: 2rem; justify-content: flex-end;">
                                            <Button class="button is-info" style="min-height: 3rem;">Cập nhật</Button>
                                        </div>
                                    </footer>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!--
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row">
                <a href="javascript:void(0)">
                    <div class="w3-col w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                        <h5><strong>Tạo cửa hàng mới</strong></h5>
                    </div>
                </a>
            </div>
            <br>
            <div class="w3-row w3-margin-bottom">
                <div class="w3-half" style="padding:1px">
                    <h6><strong>Ảnh logo</strong></h6>
                    <app-logo-uploader :maxImages="1" @logoAdded="onLogoAdded" @logoRemoved="onLogoRemoved"/>
                </div>
                <div class="w3-half" style="padding:1px ">
                    <h6><strong>Ảnh panel</strong></h6>
                    <app-img-uploader 
                        :maxImages="1" 
                        @imagesAdded="onImagesAdded"
                        @imageRemoved="onImageRemoved" />  
                </div>
            </div>
            <hr>
            <form class="w3-margin-bottom">
                <h6><strong>Thông tin cửa hàng</strong></h6><br>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-trello w3-large"></i><strong> Tên cửa hàng </strong>*</label>
                        <input class="w3-input w3-border" type="text" v-model.trim="shopData.title">
                    </div>
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-facebook-official w3-large"></i><strong> Facebook</strong></label>
                        <input class="w3-input w3-border" type="text" v-model.trim="shopData.facebook">
                    </div>
                </div>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-phone w3-large"></i><strong> Số điện thoại </strong>*</label>
                        <input class="w3-input w3-border" type="tel" v-model.trim="shopData.phone">
                    </div>
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-envelope w3-large"></i><strong> Email liên hệ</strong></label>
                        <input class="w3-input w3-border" type="email" v-model.trim="shopData.email">
                    </div>
                </div>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-map-pin w3-large"></i><strong> Địa chỉ </strong>*</label>
                        <input class="w3-input w3-border" type="text" v-model="shopData.location">
                    </div>
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-bullseye w3-large"></i><strong> Tỉnh/Thành Phố </strong>*</label>
                        <select class="w3-select w3-bar-item w3-border" v-model="shopData.province">
                            <option value="" disabled selected>Lựa Chọn</option>
                            <option v-for="(province, i) in provinceList" :key="i">{{ province }}</option>
                        </select>
                    </div>
                </div>
                <label><strong>Miêu tả</strong> *</label>
                <textarea class="w3-input w3-border" rows="5" style="resize:none" v-model="shopData.description"></textarea>
                <hr>
                <h6><strong>Các mặt hàng sẽ bán</strong> *</h6><br>
                <app-item-types @onCheckBox="shopData.itemTypes=$event"/>
                <br>
            </form>
            <div class="w3-row">
                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onAddShop" :disabled="$v.shopData.$invalid && $v.newImages.$invalid">
                    <i class="w3-xlarge w3-margin-right" :class="shopLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Tạo cửa hàng
                </button>
            </div>
            <br>
        </div>
    </section>
    -->
</template>

<script>
    import { mapGetters } from 'vuex'
    import provinceList from '~/plugins/province-list'
    import { required, email, numeric, maxLength } from 'vuelidate/lib/validators'
    import Vue from 'vue'
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)

    export default {
        middleware: 'auth',
        computed: {
            ...mapGetters(['shopLoading'])
        },
        data() {
            return {
                shopData: {
                    title: '',
                    facebook: '',
                    location: '',
                    province: 'Hà Nội',
                    phone: '',
                    email: '',
                    description: '',
                    itemTypes: []
                },
                newLogo: null,
                newImages: [],
                provinceList: provinceList,
                dropFiles: []
            }
        },
        validations: {
            shopData: {
                title: {
                    required
                },
                facebook: {},
                location: {
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
                description: {
                    required
                },
                itemTypes: {
                    required
                }
            },
            newLogo: {},
            newImages: {
                maxLen: maxLength(1)
            }
        },
        methods: {
            async onAddShop() {
                const payload = {
                    shop: this.shopData,
                    logo: this.newLogo,
                    images: this.newImages
                }
                const shopUrl = await this.$store.dispatch('addShop', payload)
                this.$router.push("/shops/" + shopUrl)
            },
            onLogoAdded(addedImages) {
                this.newLogo = addedImages[0]
            },
            onLogoRemoved(removedImage) {
                this.newLogo = null
            },
            onImagesAdded(addedImages) {
                addedImages.forEach( addedImage => {
                    const index = this.newImages.findIndex( image => image === addedImage)
                    if(index >= 0) this.newImages.splice(index, 1)
                })
                for(let key in addedImages) {
                    this.newImages.push(addedImages[key])
                }
            },
            onImageRemoved(removedImage) {
                const index = this.newImages.findIndex( image => image === removedImage )
                if(index >= 0) this.newImages.splice(index, 1)
            },
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    #v-upload label{
        display: flex;
        div {
            flex-grow: 1;
        }
    }
</style>
```