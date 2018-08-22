<template>
    <section>
        
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <app-sidebar-shop :shopData="loadedShop" />
            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">       
                <div class="w3-padding w3-white w3-margin-bottom">
                    <div class="w3-row">
                        <a href="javascript:void(0)" @click="openTab($event, 'shopInfo')">
                            <div class="w3-col l3 m3 s3 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                                <h5><strong>Sửa</strong></h5>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="openTab($event, 'shopImg')">
                            <div class="w3-col l3 m3 s3 tablink w3-bottombar w3-hover-light-grey w3-padding">
                                <h5><strong>Logo</strong></h5>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="openTab($event, 'panelImg')">
                            <div class="w3-col l3 m3 s3 tablink w3-bottombar w3-hover-light-grey w3-padding">
                                <h5><strong>Panel</strong></h5>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="openTab($event, 'delShop')">
                            <div class="w3-col l3 m3 s3 tablink w3-bottombar w3-hover-light-grey w3-padding">
                                <h5><strong>Xóa</strong></h5>
                            </div>
                        </a>
                    </div>
                    <hr>

                    <form id="shopInfo" class="w3-margin-bottom section">
                        <h6><strong>Thông tin cửa hàng</strong></h6><br>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-trello w3-large"></i><strong> Tên cửa hàng </strong>*</label>
                                <input class="w3-input w3-border" type="text" disabled v-model.trim="loadedShop.title">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-facebook-official w3-large"></i><strong> Facebook</strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="loadedShop.facebook">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-phone w3-large"></i><strong> Số điện thoại </strong>*</label>
                                <input class="w3-input w3-border" type="tel" v-model.trim="loadedShop.phone">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-envelope w3-large"></i><strong> Email liên hệ</strong></label>
                                <input class="w3-input w3-border" type="email" v-model.trim="loadedShop.email">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-map-pin w3-large"></i><strong> Địa chỉ </strong>*</label>
                                <input class="w3-input w3-border" type="text" v-model="loadedShop.location">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-bullseye w3-large"></i><strong> Tỉnh/Thành Phố </strong>*</label>
                                <select class="w3-select w3-bar-item w3-border" v-model="loadedShop.province">
                                    <option value="" disabled selected>Lựa Chọn</option>
                                    <option v-for="(province, i) in provinceList" :key="i">{{ province }}</option>
                                </select>
                            </div>
                        </div>
                        <label><strong>Miêu tả</strong> *</label>
                        <textarea class="w3-input w3-border" rows="5" style="resize:none" v-model="loadedShop.description"></textarea>
                        <hr>
                        <h6><strong>Các mặt hàng sẽ bán</strong> *</h6><br>
                        <app-item-types :selectedItemTypes="loadedShop.itemTypes" @onCheckBox="loadedShop.itemTypes=$event"/>
                        <br>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onUpdateShop" :disabled="$v.loadedShop.$invalid">
                                <i class="w3-xlarge w3-margin-right" :class="shopLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Sửa cửa hàng
                            </button>
                        </div>
                    </form>

                    <div id="shopImg" class="w3-margin-bottom section" style="display:none; min-height: 800px">
                        <h6><strong>Ảnh logo</strong></h6><br>
                        <app-img-upload :numberImg="1" :section="'shopPanel'"/>
                        <br>
                    </div>

                    <div id="panelImg" class="w3-margin-bottom section" style="display:none; min-height: 800px">
                        <h6><strong>Ảnh panel (tối đa 2 ảnh)</strong></h6><br>
                        <app-img-upload :numberImg="2" :section="'shopPanel'"/>
                        <br>
                    </div>

                    <div id="delShop" class="w3-margin-bottom section" style="display:none; min-height: 800px">
                        <h6><strong>Xóa cửa hàng</strong></h6><br>
                        <form style="max-width:500px; margin: auto"> 
                            <div class="w3-margin-bottom">
                                <label><i class="fa fa-trello w3-large"></i><strong> Tên cửa hàng </strong></label>
                                <input class="w3-input w3-border" type="text" disabled v-model.trim="loadedShop.title">
                            </div>
                            <div class="w3-margin-bottom">
                                <label><strong> Nhập tên cửa hàng </strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="deletedShopTitle">
                            </div>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onDeleteShop" :disabled="$v.deletedShopTitle.$invalid">
                                    <i class="fa fa-close w3-xlarge w3-margin-right"></i>Xóa
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
    import provinceList from '~/plugins/province-list'
    import { required, email, numeric, sameAs } from 'vuelidate/lib/validators'
    import Vue from 'vue'
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)

    export default {
        middleware: 'auth',
        layout: 'shop',
        computed: {
            ...mapGetters(['shopLoading', 'loadedShop'])
        },
        async fetch({ store, params }) {
            try{
                if(!Object.keys(store.getters.loadedShop) || store.getters.loadedShop.shopId != params.shopId) {
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
        data() {
            return {
                deletedShopTitle: '',
                loadedShopTitle: this.$store.getters.loadedShop.title,
                provinceList: provinceList
            }   
        },
        validations: {
            loadedShop: {
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
            deletedShopTitle: {
                required,
                sameAs: sameAs('loadedShopTitle')
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
            async onUpdateShop() {
                try{
                    await this.$store.dispatch('updateShop', this.loadedShop)
                    this.$router.push("/shops/" + this.$route.params.shopId)
                } catch(error){
                    console.log('[_ERROR] ' + error)
                    context.error({ statusCode: 500, message: '...Lỗi' })
                }
            },
            async onDeleteShop() {
                try{
                    await this.$store.dispatch('deleteShop', this.loadedShop.shopId)
                    this.$router.push('/')
                } catch(error){
                    console.log('[_ERROR] ' + error)
                    context.error({ statusCode: 500, message: '...Lỗi' })
                }
            }
        }
    }
</script>