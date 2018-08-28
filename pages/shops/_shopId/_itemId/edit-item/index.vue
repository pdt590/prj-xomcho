<template>
    <section>
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <app-sidebar-shop :shopData="loadedShop" />
            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-padding w3-white w3-margin-bottom">
                    <div class="w3-row">
                        <a href="javascript:void(0)" @click="openTab($event, 'updateItem')">
                            <div class="w3-col l4 m4 s4 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                                <h5><strong>Thông tin</strong></h5>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="openTab($event, 'updateImg')">
                            <div class="w3-col l4 m4 s4 tablink w3-bottombar w3-hover-light-grey w3-padding">
                                <h5><strong>Ảnh</strong></h5>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="openTab($event, 'delItem')">
                            <div class="w3-col l4 m4 s4 tablink w3-bottombar w3-hover-light-grey w3-padding">
                                <h5><strong>Xóa</strong></h5>
                            </div>
                        </a>
                    </div>
                    <hr>
                    
                    <form id="updateItem" class="w3-margin-bottom section">
                        <h6><strong>Thông tin sản phẩm</strong></h6><br>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-file-archive-o w3-large"></i><strong> Tên sản phẩm </strong>*</label>
                                <input class="w3-input w3-border" type="text" disabled v-model.trim="editedItemData.title">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-codepen w3-large"></i><strong> Thương hiệu </strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="editedItemData.brand">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-dollar w3-large"></i><strong> Giá </strong>*</label>
                                <input class="w3-input w3-border" type="number" step="0.1" v-model="editedItemData.price">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-dollar w3-large"></i><strong> Giá sale </strong></label>
                                <input class="w3-input w3-border" type="number" step="0.1" v-model="editedItemData.salePrice">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-money w3-large"></i><strong> Loại tiền </strong>*</label>
                                <select class="w3-select w3-border" name="option" v-model="editedItemData.currency">
                                    <option value="" disabled selected>Lựa Chọn</option>
                                    <option value="vnd">VND</option>
                                </select>
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-balance-scale w3-large"></i><strong> Đơn vị sản phẩm </strong>*</label>
                                <input class="w3-input w3-border" type="tex" placeholder= "Ví dụ: '5 cái'" required v-model.trim="editedItemData.unit">
                            </div>
                        </div>
                        <p><strong>Miêu tả </strong>*</p>
                        <textarea class="w3-input w3-border" rows="5" style="resize:none" v-model="editedItemData.description"></textarea>
                        <hr>
                        <h6><strong>Loại sản phẩm</strong> *</h6><br>
                        <app-item-types :selectedItemTypes="editedItemData.types" @onCheckBox="editedItemData.types=$event"/>
                        <br>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue  w3-right w3-quarter" type="submit" @click.prevent="onUpdateItemContent" :disabled="$v.editedItemData.$invalid">
                                <i class="w3-xlarge w3-margin-right" :class="itemLoading ? 'fa fa-circle-o-notch fa-spin' : 'fa fa-save'"></i>Sửa sản phẩm
                            </button>
                        </div>
                    </form>

                    <div id="updateImg" class="w3-margin-bottom section" style="min-height: 800px; display:none">
                        <div class="w3-row-padding w3-section" >
                            <div v-if="editedItemData.images.length" class="w3-col s3 w3-display-container" v-for="(img, i) in editedItemData.images" :key="i">
                                <img :src="img.url" style="width:100%;cursor:pointer">
                                <div class="w3-display-middle w3-display-hover">
                                    <button class="w3-button w3-light-grey w3-hover-light-grey" @click.prevent="onDeleteItemImg(i)">Xóa ảnh <i class="fa fa-trash-o w3-large"></i></button>
                                </div>
                            </div>
                        </div>
                        <h6><strong>Ảnh sản phẩm (tối đa 4 ảnh)</strong></h6><br>
                        <app-img-uploader :maxImages="numImages" @imagesAdded="onImagesAdded" @imageRemoved="onImageRemoved" />
                        <br>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onUpdateItemImg" :disabled="$v.editedItemData.images.$invalid">
                                <i class="w3-xlarge w3-margin-right" :class="itemLoading ? 'fa fa-circle-o-notch fa-spin' : 'fa fa-save'"></i>Lưu thay đổi
                            </button>
                        </div>
                    </div>

                    <div id="delItem" class="w3-margin-bottom section" style="display:none; min-height: 800px">
                        <h6><strong>Đổi tên sản phẩm</strong></h6><br>
                        <form style="max-width:500px; margin: auto"> 
                            <div class="w3-margin-bottom">
                                <label><strong> Nhập tên sẩn phẩm </strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="editedItemData.title">
                            </div>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onUpdateItemTitle" :disabled="$v.editedItemData.title.$invalid">
                                    <i class="w3-xlarge w3-margin-right" :class="itemLoading ? 'fa fa-circle-o-notch fa-spin' : 'fa fa-save'"></i>Đổi tên
                                </button>
                            </div>
                        </form>
                        <br>
                        <h6><strong>Xóa sản phẩm</strong></h6><br>
                        <form style="max-width:500px; margin: auto"> 
                            <div class="w3-margin-bottom">
                                <label><i class="fa fa-trello w3-large"></i><strong> Tên sản phẩm </strong></label>
                                <input class="w3-input w3-border" type="text" disabled v-model.trim="editedItemData.title">
                            </div>
                            <div class="w3-margin-bottom">
                                <label><strong> Nhập tên sản phẩm </strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="deletedItemTitle">
                            </div>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onDeleteItem" :disabled="$v.deletedItemTitle.$invalid">
                                    <i class="w3-xlarge w3-margin-right" :class="itemLoading ? 'fa fa-circle-o-notch fa-spin' : 'fa fa-close'"></i>Xóa
                                </button>
                            </div>
                        </form>
                        <br>
                    </div>
                </div>
                <hr>
                <div class="w3-center w3-padding-24">
                    Powered by 
                    <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
                </div>                         
            </div>  
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { required, email, decimal, sameAs, maxLength} from 'vuelidate/lib/validators'
    import Vue from 'vue'
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)

    export default {
        middleware: 'auth',
        layout: 'shop',
        computed: {
            ...mapGetters(['itemLoading', 'loadedShop']),
            loadedItem() {
                return this.$store.getters.loadedItem(this.$route.params.itemId)
            },
            uploadedImages() {
                return this.editedItemData.images
            }
        },
        watch: {
            uploadedImages(newValue) {
                console.log(newValue.length)
                if(newValue.length) {
                    let count = 0
                    newValue.forEach( image => {
                        if(image.url !== undefined) {
                            count = count + 1
                        }
                    })
                    this.numImages = 4 - count
                    console.log(this.numImages)
                }else {
                    this.numImages = 4
                }
            }
        },
        async fetch({ store, params }) {
            try{
                // ? Issue when using multi tabs
                // ? When refreshing, new ``params.shopId`` from client will be tranferred to 
                // ? server. So, there is a conflict bw new ``params.shopId`` and the old ``shopId`` 
                // ? at store of server, which is rendered for previous page. 
                if(process.client) {
                    if(!store.getters.loadedShop) { 
                        await Promise.all([
                            store.dispatch('loadShop', params.shopId),
                            store.dispatch('loadItems', params.shopId)
                        ])
                    }
                }else {
                    await Promise.all([
                        store.dispatch('loadShop', params.shopId),
                        store.dispatch('loadItems', params.shopId)
                    ])
                }
            } catch(error) {
                console.log('[_ERROR] ' + error)
                context.error({ statusCode: 500, message: '...Lỗi'})
            } 
        },
        created() {
            this.editedItemData = JSON.parse(JSON.stringify(this.loadedItem))
        },
        data() {
            return {
                deletedItemTitle: '',
                editedItemData: {}, // ? cannot set computed directly to data prop because data() is created before computed()
                numImages: 0
            }   
        },
        validations: {
            editedItemData: {
                title: {
                    required    
                },
                brand: {},
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
                description: {
                    required
                },
                types: {
                    required
                },
                images: {
                    maxLen: maxLength(4)
                }
            },
            deletedItemTitle: {
                required,
                sameAs: sameAs(vm => {
                    if(vm.loadedItem !== undefined) {
                        return vm.loadedItem.title
                    }
                })
            }
        },
        methods: {
            openTab(event, arg) {
                let i, x, tablinks
                x = document.getElementsByClassName("section")
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none"
                }
                tablinks = document.getElementsByClassName("tablink")
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "")
                }
                document.getElementById(arg).style.display = "block"
                event.currentTarget.firstElementChild.className += " w3-border-red"
                this.editedItemData = JSON.parse(JSON.stringify(this.loadedItem)) // ? Reset changes when switching tab
            },
            async onUpdateItemContent() {
                await this.$store.dispatch('updateItemContent', this.editedItemData)
                this.$router.push("/shops/" + this.$route.params.shopId + '/' + this.$route.params.itemId)
            },
            async onUpdateItemTitle() {
                try{
                    const newItemId = await this.$store.dispatch('updateItemTitle', this.editedItemData)
                    this.$router.push('/shops/' + this.$route.params.shopId + '/' + newItemId)
                } catch(error){
                    console.log('[_ERROR] ' + error)
                    context.error({ statusCode: 500, message: '...Lỗi' })
                }
            },
            async onUpdateItemImg() {
                await this.$store.dispatch('updateItemImg', this.editedItemData)
                this.$router.push("/shops/" + this.$route.params.shopId + '/' + this.$route.params.itemId)
            },
            async onDeleteItem() {
                try{
                    await this.$store.dispatch('deleteItem', this.loadedItem.itemId)
                    this.$router.push('/shops/' + this.$route.params.shopId)
                } catch(error){
                    console.log('[_ERROR] ' + error)
                    context.error({ statusCode: 500, message: '...Lỗi' })
                }
            },
            onDeleteItemImg(index) {
                this.editedItemData.images.splice(index, 1)
            },
            onImagesAdded(addedImgs) {
                for(let key in addedImgs) {
                    this.editedItemData.images.push(addedImgs[key])
                }
            },
            onImageRemoved(removedImg) {
                const index = this.editedItemData.images.findIndex( img => img === removedImg)
                if(index === -1) this.editedItemData.images.splice(0)
                this.editedItemData.images.splice(index, 1)
            }
        }
    }
</script>