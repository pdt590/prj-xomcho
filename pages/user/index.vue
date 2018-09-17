<template>
    <section>
        <app-navbar :navItems="navItems" />
        <app-navbar-mobile :navItems="navItems" />
        <div class="w3-content w3-padding-64" style="max-width:1300px">
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
                    <a class="w3-bar-item w3-button tablink app-hover" @click="openTab($event, '01')">                    
                        <div class="w3-row">
                            <div class="w3-col l2 m2 s2">
                                <i class="fa fa-cube w3-xlarge w3-margin-right"></i>
                            </div>
                            <div class="w3-col l10 m10 s10">
                                <h6 class="mySideBar">Quản lý chung</h6>
                            </div>
                        </div>
                    </a>

                    <a class="w3-bar-item w3-button tablink" @click="openTab($event, '02')">  
                        <div class="w3-row">
                            <div class="w3-col l2 m2 s2">
                                <i class="fa fa-envelope w3-xlarge w3-margin-right"></i>
                            </div>
                            <div class="w3-col l10 m10 s10">
                                <h6 class="mySideBar">Tin nhắn đặt hàng</h6><span class="w3-badge w3-right w3-red">3</span>
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
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, '03')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Cửa hàng đã tạo</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, '04')">
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
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, '05')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Sản phẩm đã tạo</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, '06')">
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
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, '07')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Cài đặt thông tin</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, '08')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Ảnh đại diện</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, '09')">
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

                    <div id="01" class="w3-padding-32 section" style="min-height: 1300px">
                        <div class="w3-row">
                            <div class="w3-quarter app-padding">
                                <div class="w3-container w3-blue w3-padding-16">
                                    <div class="w3-left"><i class="fa fa-trello w3-xxxlarge"></i></div>
                                    <div class="w3-right">
                                    <h3>52</h3>
                                    </div>
                                    <div class="w3-clear"></div>
                                    <h4>Số cửa hàng</h4>
                                </div>
                            </div>
                            <div class="w3-quarter app-padding">
                                <div class="w3-container w3-red w3-padding-16">
                                    <div class="w3-left"><i class="fa fa-shopping-bag w3-xxxlarge"></i></div>
                                    <div class="w3-right">
                                    <h3>99</h3>
                                    </div>
                                    <div class="w3-clear"></div>
                                    <h4>Số sản phẩm</h4>
                                </div>
                            </div>
                            <div class="w3-quarter app-padding">
                                <div class="w3-container w3-teal w3-padding-16">
                                    <div class="w3-left"><i class="fa fa-envelope w3-xxxlarge"></i></div>
                                    <div class="w3-right">
                                    <h3>23</h3>
                                    </div>
                                    <div class="w3-clear"></div>
                                    <h4>Số tin nhắn đặt hàng</h4>
                                </div>
                            </div>
                            <div class="w3-quarter app-padding">
                                <div class="w3-container w3-orange w3-text-white w3-padding-16">
                                    <div class="w3-left"><i class="fa fa-comment w3-xxxlarge"></i></div>
                                    <div class="w3-right">
                                    <h3>0</h3>
                                    </div>
                                    <div class="w3-clear"></div>
                                    <h4>Số nhận xét</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="02" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Tin nhắn đặt hàng</strong></h5><br>
                        <ul class="w3-ul" >
                            <li class="w3-bar w3-button w3-border" :class="on1 ? 'app-hover' : ''" @click="on1 = !on1">
                                <img src="https://picsum.photos/600/600/?image=35" class="w3-bar-item w3-circle" style="width:85px">
                                <div class="w3-bar-item">
                                    <span class="w3-xlarge">Mike</span><br>
                                    <span>Web Designer</span>
                                </div>
                            </li>
                            <div class="w3-padding w3-border" v-show="on1">
                                <h5 class="w3-opacity">Subject: None</h5>
                                <h6><i class="fa fa-clock-o"></i> From Jane Doe, Sep 25, 2015.</h6>
                                <a class="w3-button w3-light-grey">Reply<i class="w3-margin-left fa fa-mail-reply"></i></a>
                                <a class="w3-button w3-light-grey">Forward<i class="w3-margin-left fa fa-arrow-right"></i></a>
                                <hr>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <p>Forever yours,<br>Jane</p>
                                <hr>
                                <div class="w3-row-padding">
                                    <div class="w3-third w3-center">
                                        <app-btn-switch/>
                                    </div>
                                    <div class="w3-third w3-center">
                                        <app-btn-switch/>
                                    </div>
                                    <div class="w3-third w3-center">
                                        <i class="fa fa-trash w3-xxlarge w3-button w3-text-blue" style="padding: 0"></i>
                                        <p>Xóa</p>
                                    </div>
                                </div>
                            </div>
                            <li class="w3-bar w3-button w3-border" :class="on2 ? 'app-hover' : ''" @click="on2 = !on2">
                                <img src="https://picsum.photos/600/600/?image=35" class="w3-bar-item w3-circle" style="width:85px">
                                <div class="w3-bar-item">
                                    <span class="w3-xlarge">Mike</span><br>
                                    <span>Web Designer</span>
                                </div>
                            </li>
                            <div class="w3-padding w3-border" v-show="on2">
                                <h6 class="w3-opacity">Subject: None</h6>
                                <h6><i class="fa fa-clock-o"></i> From Jane Doe, Sep 25, 2015.</h6>
                                <a class="w3-button w3-light-grey">Reply<i class="w3-margin-left fa fa-mail-reply"></i></a>
                                <a class="w3-button w3-light-grey">Forward<i class="w3-margin-left fa fa-arrow-right"></i></a>
                                <hr>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <p>Forever yours,<br>Jane</p>
                            </div>
                        </ul>
                    </div>

                    <div id="03" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Cửa hàng của bạn</strong></h5><br>
                        <ul class="w3-ul w3-border">
                            <li v-for="i in 5" :key="i" class="w3-bar">
                                <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-close"></i></span>
                                <nuxt-link to="/shops/df123/edit-shop" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                                <nuxt-link to="/shops/df123">
                                    <img src="https://picsum.photos/600/600/?image=35" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">Mike</span><br>
                                    <span>Web Designer</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="04" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Cửa hàng đã lưu</strong></h5><br>
                        <ul class="w3-ul w3-border">
                            <li v-for="i in 5" :key="i" class="w3-bar">
                                <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-close"></i></span>
                                <nuxt-link to="/shops/df123">
                                    <img src="https://picsum.photos/600/600/?image=35" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">Mike</span><br>
                                    <span>Web Designer</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="05" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Sản phẩm của bạn</strong></h5><br>
                        <ul class="w3-ul w3-border">
                            <li v-for="i in 3" :key="i" class="w3-bar">
                                <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-xlarge w3-right"><i class="fa fa-close"></i></span>
                                <nuxt-link to="/items/df123/edit-shop" class="w3-bar-item w3-button w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                                <nuxt-link to="/items/th345">
                                    <img src="https://picsum.photos/600/600/?image=32" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">Mike</span><br>
                                    <nuxt-link to="/shops/df123">Shop duythang</nuxt-link>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="06" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Sản phẩm đã lưu</strong></h5><br>
                        <ul class="w3-ul w3-border">
                            <li v-for="i in 3" :key="i" class="w3-bar">
                                <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-xlarge w3-right"><i class="fa fa-close"></i></span>
                                <nuxt-link to="/items/th345">
                                    <img src="https://picsum.photos/600/600/?image=32" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">Mike</span><br>
                                    <nuxt-link to="/shops/df123">Shop duythang</nuxt-link>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="07" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <form>
                            <h5><strong>Thông tin cá nhân</strong></h5><br>
                            <div class="w3-row-padding" style="margin:0 -16px;">
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-address-card-o w3-large"></i> Họ và tên</label>
                                    <input class="w3-input w3-border" type="text" required>
                                </div>
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-address-book-o w3-large"></i> Username</label>
                                    <input class="w3-input w3-border" type="text" required>
                                </div>
                            </div>
                            <hr>
                            <div class="w3-row-padding" style="margin:0 -16px;">
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-tablet w3-large"></i> Số điện thoại</label>
                                    <input class="w3-input w3-border" type="number" required placeholder="">
                                </div>
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-envelope-o w3-large"></i> Email</label>
                                    <input class="w3-input w3-border" type="text" required placeholder="">
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

                    <div id="08" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Ảnh đại diện</strong></h5><br>
                        <app-img-uploader :maxImages="1" />
                        <br>
                    </div>

                    <div id="09" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Đổi mật khẩu</strong></h5><br>
                        <form style="max-width:500px; margin: auto"> 
                            <div class="w3-margin-bottom">
                                <label>Mật khẩu cũ</label>
                                <input class="w3-input w3-border" type="text" required>
                            </div>
                            <div class="w3-margin-bottom">
                                <label>Mật khẩu mới</label>
                                <input class="w3-input w3-border" type="text" required>
                            </div>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue  w3-right w3-quarter" type="submit"><i class="fa fa-save w3-xlarge w3-margin-right"></i>Lưu</button>
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
    export default {
        middleware: 'auth',
        layout: 'user',
        computed: {
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
        data() {
            return {
                navItems: [
                    {link: '/shops/new-shop', icon: 'fa fa-plus-square', title: 'Tạo cửa hàng'}
                ],
                caretShop: false,
                caretItem: false,
                caretInfo: false,
                on1: false,
                on2: false
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
                //event.currentTarget.firstElementChild.className.replace("", "")
                event.currentTarget.className += " app-hover"
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
