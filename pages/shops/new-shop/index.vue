<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row">
                <a href="javascript:void(0)" @click="openTab($event, 'shopInfo')">
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

            <form id="shopInfo" class="w3-margin-bottom section">
                <h5><strong>Thông tin cửa hàng</strong></h5><br>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-trello w3-large"></i> Tên cửa hàng</label>
                        <input class="w3-input w3-border" type="text" required v-model="shopTitle">
                    </div>
                </div>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-facebook-official w3-large"></i> Facebook</label>
                        <input class="w3-input w3-border" type="text" v-model="shopFb">
                    </div>
                    <div class="w3-half">
                        <label><i class="fa fa-map-pin w3-large"></i> Địa chỉ</label>
                        <input class="w3-input w3-border" type="text" required v-model="shopLocation">
                    </div>
                </div>
                <div class="w3-row-padding" style="margin:8px -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-phone w3-large"></i> Số điện thoại</label>
                        <input class="w3-input w3-border" type="phone" required v-model="shopPhone">
                    </div>
                    <div class="w3-half">
                        <label><i class="fa fa-envelope w3-large"></i> Email</label>
                        <input class="w3-input w3-border" type="email" v-model="shopEmail">
                    </div>
                </div>
                <hr>
                <h5><strong>Miêu tả</strong></h5><br>
                <textarea class="w3-input w3-border" rows="5" style="resize:none" required v-model="shopDesc"></textarea>
                <hr>
                <h5><strong>Các mặt hàng sẽ bán</strong></h5><br>
                <app-product-types/>
                <br>
                <div class="w3-row">
                    <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" type="submit" @click.prevent="onAddShop">
                        <i class="w3-xlarge w3-margin-right" :class="shopLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Tạo cửa hàng
                    </button>
                </div>
            </form>

            <div id="shopImg" class="w3-margin-bottom section" style="display:none; min-height: 1300px">
                <h5><strong>Ảnh logo</strong></h5><br>
                <app-img-upload :numberImg="1" :section="'shopPanel'"/>
                <br>
            </div>

            <div id="panelImg" class="w3-margin-bottom section" style="display:none; min-height: 1300px">
                <h5><strong>Ảnh panel (tối đa 2 ảnh)</strong></h5><br>
                <app-img-upload :numberImg="2" :section="'shopPanel'"/>
                <br>
            </div>

        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        middleware: 'auth',
        computed: {
            ...mapGetters(['shopLoading'])
        },
        data() {
            return {
                shopTitle: '',
                shopFb: '',
                shopLocation: '',
                shopPhone: '',
                shopEmail: '',
                shopDesc: '',
                shopLogoUrl: 'https://imgplaceholder.com/600x600/cccccc/757575/glyphicon-user',
                shopPanelUrl: [
                    'https://picsum.photos/600/200?image=0',
                    'https://picsum.photos/600/200?image=1'
                ]
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
            async onAddShop() {
                const shopData = {
                    shopTitle: this.shopTitle,
                    shopFb: this.shopFb,
                    shopLocation: this.shopLocation,
                    shopPhone: this.shopPhone,
                    shopEmail: this.shopEmail,
                    shopDesc: this.shopDesc,
                    shopLogoUrl: this.shopLogoUrl,
                    shopPanelUrl: this.shopPanelUrl
                }
                const shopId = await this.$store.dispatch('addShop', shopData)
                this.$router.push("/shops/" + shopId)
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
