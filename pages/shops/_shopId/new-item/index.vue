<template>
    <section>
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <app-sidebar-shop :shopData="loadedShop" />
            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-padding w3-white w3-margin-bottom">
                    <div class="w3-row">
                        <a href="javascript:void(0)" @click="openTab($event, 'itemInfo')">
                            <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                                <h5><strong>Thông tin</strong></h5>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="openTab($event, 'itemImg')">
                            <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding">
                                <h5><strong>Ảnh</strong></h5>
                            </div>
                        </a>
                    </div>
                    <hr>
                    
                    <form id="itemInfo" class="w3-margin-bottom section">
                        <h6><strong>Thông tin sản phẩm</strong></h6><br>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-file-archive-o w3-large"></i><strong> Tên sản phẩm </strong>*</label>
                                <input class="w3-input w3-border" type="text" v-model.trim="itemData.title">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-codepen w3-large"></i><strong> Thương hiệu </strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="itemData.brand">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-dollar w3-large"></i><strong> Giá </strong>*</label>
                                <input class="w3-input w3-border" type="number" step="0.1" v-model="itemData.price">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-dollar w3-large"></i><strong> Giá sale </strong></label>
                                <input class="w3-input w3-border" type="number" step="0.1" v-model="itemData.salePrice">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-money w3-large"></i><strong> Loại tiền </strong>*</label>
                                <select class="w3-select w3-border" name="option" v-model="itemData.currency">
                                    <option value="" disabled selected>Lựa Chọn</option>
                                    <option value="vnd">VND</option>
                                </select>
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-balance-scale w3-large"></i><strong> Đơn vị sản phẩm </strong>*</label>
                                <input class="w3-input w3-border" type="tex" placeholder= "Ví dụ: '5 cái'" required v-model.trim="itemData.unit">
                            </div>
                        </div>
                        <p><strong>Miêu tả </strong>*</p>
                        <textarea class="w3-input w3-border" rows="5" style="resize:none" v-model="itemData.description"></textarea>
                        <hr>
                        <h6><strong>Loại sản phẩm</strong> *</h6><br>
                        <app-item-types @onCheckBox="itemData.types=$event"/>
                        <br>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue  w3-right w3-quarter" type="submit" @click.prevent="onAddItem" :disabled="$v.itemData.$invalid">
                                <i class="w3-xlarge w3-margin-right" :class="itemLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Thêm sản phẩm</button>
                        </div>
                    </form>

                    <div id="itemImg" class="w3-margin-bottom section" style="min-height: 800px; display:none">
                        <h6><strong>Ảnh sản phẩm (tối đa 4 ảnh)</strong></h6><br>
                        <app-img-upload :numberImg="4" :section="'itemPreview'"/>
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
    import { required, email, decimal } from 'vuelidate/lib/validators'
    import Vue from 'vue'
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)

    export default {
        middleware: 'auth',
        layout: 'shop',
        computed: {
            ...mapGetters(['itemLoading', 'loadedShop'])
        },
        async fetch({ store, params }) {
            try{
                if(!Object.keys(store.getters.loadedShop) || store.getters.loadedShop.shopId != params.shopId) {
                    await store.dispatch('loadShop', params.shopId)
                }
            } catch(error) {
                console.log('[_ERROR] ' + error)
                context.error({ statusCode: 500, message: '...Lỗi'})
            }
        },
        data() {
            return {
                itemData: {
                    title: '',
                    brand: '',
                    price: 0,
                    salePrice: 0,
                    currency: '',
                    unit: '',
                    description: '',
                    types: []
                }
            }
        },
        validations: {
            itemData: {
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
                }
            }
        },
        methods: {
            openTab(event, arg) {
                let i, x, tablinks;
                x = document.getElementsByClassName("section");
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablink");
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
                }
                document.getElementById(arg).style.display = "block";
                event.currentTarget.firstElementChild.className += " w3-border-red";
            },
            async onAddItem() {
                const itemUrl = await this.$store.dispatch('addItem', this.itemData)
                this.$router.push('/shops/' + this.$route.params.shopId + '/' + itemUrl)
            }
        }
    }
</script>