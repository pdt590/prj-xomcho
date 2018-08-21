<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row">
                <a href="javascript:void(0)" @click="openTab($event, 'shopData')">
                    <div class="w3-col l4 m4 s4 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                        <h5><strong>Thông tin</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'shopImg')">
                    <div class="w3-col l4 m4 s4 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Logo</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'panelImg')">
                    <div class="w3-col l4 m4 s4 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Panel</strong></h5>
                    </div>
                </a>
            </div>
            <hr>

            <form id="shopData" class="w3-margin-bottom section">
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
                <div class="w3-row">
                    <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onAddShop" :disabled="$v.shopData.$invalid">
                        <i class="w3-xlarge w3-margin-right" :class="shopLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Tạo cửa hàng
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

        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'
    import provinceList from '~/plugins/province-list'
    import { required, email, numeric } from 'vuelidate/lib/validators'
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
                    province: '',
                    phone: '',
                    email: '',
                    description: '',
                    logoUrl: '/icon-user.png',
                    panelUrls: [],
                    itemTypes: []
                },
                provinceList: provinceList
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
            async onAddShop() {
                const shopUrl = await this.$store.dispatch('addShop', this.shopData)
                this.$router.push("/shops/" + shopUrl)
            }
        }
    }
</script>

<style>
    #dropzoneAva {
        border-style: dotted; 
        border-width: medium; 
        border-color: green;
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 35%;
        background-color: #f1f1f1;
    }
    #dropzone {
        border-style: dotted; 
        border-width: medium; 
        border-color: green;
        display: block;
        margin-left: auto;
        margin-right: auto;
        background-color: #f1f1f1;
    }
</style>
