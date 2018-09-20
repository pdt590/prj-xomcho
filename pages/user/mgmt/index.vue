<template>
    <section>
        <app-navbar :navItems="navItems" />
        <app-navbar-mobile :navItems="navItems" />
        <div class="w3-content w3-padding-64" style="max-width:100%">
            <!-- Sidebar left -->
            <div class="w3-sidebar w3-collapse w3-light-grey w3-top w3-padding-64" style="z-index:3;width:270px;" ref="mySidebar">
                <div class="w3-container w3-center w3-margin">
                    <nuxt-link :to="'/shops/' + $route.params.shopId">
                        <img src="https://picsum.photos/600/600/?image=52" class="w3-circle" style="width:60%;">
                    </nuxt-link>
                    <br>
                    <h4><b>pdthang</b></h4>
                </div>
                <hr><br>
                <div class="w3-bar-block">
                    <a class="w3-bar-item w3-button tablink app-hover" @click="openTab($event, 't_general_mgmt')">                    
                        <div class="w3-row">
                            <div class="w3-col l2 m2 s2">
                                <i class="fa fa-cube w3-xlarge w3-margin-right"></i>
                            </div>
                            <div class="w3-col l10 m10 s10">
                                <h6 class="mySideBar">Quản lý chung</h6>
                            </div>
                        </div>
                    </a>

                    <a class="w3-bar-item w3-button" @click="extShop()">
                        <div class="w3-row">
                            <div class="w3-col l2 m2 s2">
                                <i class="fa fa-trello w3-xlarge w3-margin-right"></i>
                            </div>
                            <div class="w3-col l10 m10 s10">
                                <h6 class="mySideBar">Quản lý cửa hàng</h6> <i class="w3-right" :class="caretShop ? 'fa fa-caret-down' :'fa fa-caret-up'"></i>
                            </div>
                        </div>
                    </a>
                    <div id="subShop" class="w3-hide">
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_created_shop')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Cửa hàng đã tạo</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_saved_shop')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Cửa hàng đã lưu</h6>
                        </a>
                    </div>

                    <a class="w3-bar-item w3-button" @click="extItem()">   
                        <div class="w3-row">
                            <div class="w3-col l2 m2 s2">
                                <i class="fa fa-shopping-bag w3-xlarge w3-margin-right"></i>
                            </div>
                            <div class="w3-col l10 m10 s10">
                                <h6 class="mySideBar">Quản lý sản phẩm</h6> <i class="w3-right" :class="caretItem ? 'fa fa-caret-down' :'fa fa-caret-up'"></i>
                            </div>
                        </div>
                    </a>
                    <div id="subItem" class="w3-hide">
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_created_item')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Sản phẩm đã tạo</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_saved_item')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Sản phẩm đã lưu</h6>
                        </a>
                    </div>

                    <a class="w3-bar-item w3-button" @click="extInfo()">
                        <div class="w3-row">
                            <div class="w3-col l2 m2 s2">
                                <i class="fa fa-user w3-xlarge w3-margin-right"></i>
                            </div>
                            <div class="w3-col l10 m10 s10">
                                <h6 class="mySideBar">Thông tin cá nhân</h6> <i class="w3-right" :class="caretInfo ? 'fa fa-caret-down' :'fa fa-caret-up'"></i>
                            </div>
                        </div>
                    </a>
                    <div id="subInfo" class="w3-hide">
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_info')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Cài đặt thông tin</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_avatar')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Ảnh đại diện</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_password')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Đổi mật khẩu</h6>
                        </a>
                    </div>
                </div>
            </div>
            <!-- Overlay effect when opening sidebar on small screens -->
            <div class="w3-overlay w3-hide-large" @click="closeSideBar" style="cursor:pointer" title="close side menu" ref="myOverlay"></div>
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-padding w3-margin-bottom w3-white">

                    <div id="t_general_mgmt" class="w3-padding-32 section" style="min-height: 1300px">
                        <div class="w3-row">
                            <div class="w3-half app-padding">
                                <div class="w3-container w3-blue w3-padding-16">
                                    <div class="w3-left"><i class="fa fa-trello w3-xxxlarge"></i></div>
                                    <div class="w3-right">
                                    <h3>{{loadedShops.length}}</h3>
                                    </div>
                                    <div class="w3-clear"></div>
                                    <h4>Số cửa hàng</h4>
                                </div>
                            </div>
                            <div class="w3-half app-padding">
                                <div class="w3-container w3-red w3-padding-16">
                                    <div class="w3-left"><i class="fa fa-shopping-bag w3-xxxlarge"></i></div>
                                    <div class="w3-right">
                                    <h3>{{loadedItems.length}}</h3>
                                    </div>
                                    <div class="w3-clear"></div>
                                    <h4>Số sản phẩm</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="t_created_shop" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Cửa hàng của bạn</strong></h5><br>
                        <ul class="w3-ul w3-border" style="max-width:800px; margin: auto">
                            <li v-for="(shop, i) in loadedShops" :key="i" class="w3-bar">
                                <nuxt-link :to="'/shops/' + shop.shopId + '/edit-shop'" target="_blank" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                                <nuxt-link :to="'/shops/' + shop.shopId" target="_blank">
                                    <img :src="shop.logo !== undefined ? shop.logo : '/icon-photo.png'" class="w3-bar-item w3-circle" style="width:90px">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">{{shop.title}}</span><br>
                                    <span>{{shop.updatedDate | date}}</span><br>
                                    <span>{{shop.location}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="t_saved_shop" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Cửa hàng đã lưu</strong></h5><br>
                        <ul class="w3-ul w3-border" style="max-width:800px; margin: auto">
                            <li v-for="(shop, i) in loadedShops" :key="i" class="w3-bar">
                                <nuxt-link :to="'/shops/' + shop.shopId + '/edit-shop'" target="_blank" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                                <nuxt-link :to="'/shops/' + shop.shopId" target="_blank">
                                    <img :src="shop.logo !== undefined ? shop.logo : '/icon-area.png'" class="w3-bar-item w3-circle" style="width:90px">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">{{shop.title}}</span><br>
                                    <span>{{shop.updatedDate | date}}</span><br>
                                    <span>{{shop.location}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="t_created_item" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Sản phẩm của bạn</strong></h5><br>
                        <ul class="w3-ul w3-border" style="max-width:800px; margin: auto">
                            <li v-for="(item, i) in loadedItems" :key="i" class="w3-bar">
                                <nuxt-link :to="'/shops/' + item.shopId + '/' + item.itemId + '/edit-item'" target="_blank" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                                <nuxt-link :to="'/shops/' + item.shopId + '/' + item.itemId">
                                    <img :src="item.images !== undefined ? item.images[0].url : '/icon-area.png'" class="w3-bar-item w3-round" style="width:85px">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">{{item.title}}</span><br>
                                    <span>{{item.updatedDate | date}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="t_saved_item" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Sản phẩm đã lưu</strong></h5><br>
                        <ul class="w3-ul w3-border" style="max-width:800px; margin: auto">
                            <li v-for="(item, i) in loadedItems" :key="i" class="w3-bar">
                                <nuxt-link :to="'/shops/' + item.shopId + '/' + item.itemId + '/edit-item'" target="_blank" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                                <nuxt-link :to="'/shops/' + item.shopId + '/' + item.itemId">
                                    <img :src="item.images !== undefined ? item.images[0].url : '/icon-area.png'" class="w3-bar-item w3-round" style="width:85px">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">{{item.title}}</span><br>
                                    <span>{{item.updatedDate | date}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="t_info" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <form style="max-width:600px; margin: auto">
                            <h5><strong>Thông tin cá nhân</strong></h5><br>
                            <div class="w3-row-padding" style="margin:0 -16px;">
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-address-book-o w3-large"></i> Username</label>
                                    <input class="w3-input w3-border" type="text" disabled v-model.trim="editedUser.username">
                                </div>
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-address-card-o w3-large"></i> Họ và tên</label>
                                    <input class="w3-input w3-border" type="text" v-model.trim="editedUser.fullname">
                                </div>
                            </div>
                            <hr>
                            <div class="w3-row-padding" style="margin:0 -16px;">
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-tablet w3-large"></i> Số điện thoại</label>
                                    <input class="w3-input w3-border" type="tel" v-model.trim="editedUser.phone">
                                </div>
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-envelope-o w3-large"></i> Email</label>
                                    <input class="w3-input w3-border" type="email" v-model.trim="editedUser.email">
                                </div>
                            </div>
                            <div class="w3-row-padding" style="margin:0 -16px;">
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-facebook-f w3-large"></i> Facebook</label>
                                    <input class="w3-input w3-border" type="text" required placeholder="">
                                </div>
                                <div class="w3-half">
                                    <label><i class="fa fa-map-o w3-large"></i> Địa chỉ</label>
                                    <input class="w3-input w3-border" type="text" required placeholder="" >
                                </div>
                            </div>
                            <hr>
                            <h5><strong>Miêu tả</strong></h5><br>
                            <textarea class="w3-input w3-border" rows="4" style="resize:none"></textarea>
                            <br>
                            <br>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue  w3-right w3-quarter" type="submit"><i class="fa fa-save w3-xlarge w3-margin-right"></i>Lưu</button>
                            </div>
                        </form>
                    </div>

                    <div id="t_avatar" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Ảnh đại diện</strong></h5><br>
                        <app-img-uploader :maxImages="1" />
                        <br>
                    </div>

                    <div id="t_password" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Đổi mật khẩu</strong></h5><br>
                        <form style="max-width:600px; margin: auto"> 
                            <div class="w3-margin-bottom">
                                <label>Mật khẩu cũ</label>
                                <input class="w3-input w3-border" type="text" required>
                            </div>
                            <div class="w3-margin-bottom">
                                <label>Mật khẩu mới</label>
                                <input class="w3-input w3-border" type="text" required>
                            </div>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" type="submit"><i class="fa fa-save w3-xlarge w3-margin-right"></i>Lưu</button>
                            </div>
                        </form>
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

    export default {
        middleware: 'auth',
        layout: 'user',
        computed: {
            ...mapGetters(['user']),
            openSideBar() {
                return this.$store.getters.sideBar
            }
        },
        watch: {
            openSideBar(newValue) {
                if(newValue) {
                    this.$refs.mySidebar.style.display = 'block'
                    this.$refs.myOverlay.style.display = 'block'
                } else {
                    this.$refs.mySidebar.style.display = 'none'
                    this.$refs.myOverlay.style.display = 'none'
                }
            },
        },
        async asyncData(context) {
            try {
                const [loadedShops, loadedItems] = await Promise.all([
                    context.store.dispatch('loadOwnShops'),
                    context.store.dispatch('loadOwnItems')
                ])
                return {
                    loadedShops: loadedShops,
                    loadedItems: loadedItems
                }
            }catch(error) {
                console.log('[_ERROR] ' + error)
                context.error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        created() {
            this.editedUser = JSON.parse(JSON.stringify(this.user))
        },
        data() {
            return {
                navItems: [
                    {link: '/shops/new-shop', icon: 'fa fa-plus-square', title: 'Tạo cửa hàng'}
                ],
                editedUser: {},
                caretShop: false,
                caretItem: false,
                caretInfo: false
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
                    tablinks[i].className = tablinks[i].className.replace(" app-hover", "")
                }
                document.getElementById(arg).style.display = "block"
                event.currentTarget.className += " app-hover"
                this.closeSideBar()
            },
            closeSideBar() {
                this.$store.dispatch('openSideBar', false)
                this.$refs.myOverlay.style.display = 'none'
            },
            extShop() {
                let x = document.getElementById("subShop")
                if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show";
                } else {
                    x.className = x.className.replace(" w3-show", "")
                }
                this.caretShop = !this.caretShop
            },
            extItem() {
                let x = document.getElementById("subItem")
                if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show"
                } else {
                    x.className = x.className.replace(" w3-show", "")
                }
                this.caretItem = !this.caretItem
            },
            extInfo() {
                let x = document.getElementById("subInfo")
                if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show"
                } else {
                    x.className = x.className.replace(" w3-show", "")
                }
                this.caretInfo = !this.caretInfo
            }
        }
    }
</script>

<style>
    .w3-bar-block .w3-bar-item {padding: 10px}
    h6.mySideBar {
        display: inline-block;
        margin: 0
    }
    .app-hover {
        background-color: #ccc
    }
    .app-padding {
        padding: 0 5px
    }
</style>
