<template>
    <section>
        <app-navbar :navItems="navItems"></app-navbar>
        <div class="w3-content w3-padding-64" style="max-width:1500px">     
            <!-- Sidebar left -->
            <div class="w3-sidebar w3-light-grey w3-collapse w3-top w3-padding-64" style="z-index:3;width:270px" ref="mySidebar">
                <div class="w3-bar-block w3-large w3-border w3-border-grey w3-white w3-round w3-padding">
                    <button ref="profileButton" class="w3-bar-item tablink w3-button w3-light-grey" @click="openTab($event,'Profile')">Profile</button>
                    <button ref="avatarButton" class="w3-bar-item tablink w3-button" @click="openTab($event,'Avatar')">Avatar</button>
                </div>
            </div>

            <!-- Top menu on small screens -->
            <header class="w3-bar w3-top w3-hide-large w3-green">
                <div class="w3-bar-item w3-padding-large">LOGO</div>
                <a href="javascript:void(0)" class="w3-bar-item w3-padding-large w3-button w3-right" @click="w3_open"><i class="fa fa-bars"></i></a>
                <nuxt-link
                    v-for="(item, i) in navItems"
                    :key="i"
                    :to="item.link" class="w3-bar-item w3-padding-large w3-button w3-right"> 
                    <i :class="item.icon"></i>
                </nuxt-link>
                <a href="#" class="w3-bar-item w3-padding-large w3-button w3-green w3-right"><i class="fa fa-search"></i></a>
                <input type="text" class="w3-bar-item w3-padding-large w3-input w3-right" style="max-width:20%" placeholder="Tìm ..."> 
            </header>

            <!-- Overlay effect when opening sidebar on small screens -->
            <div class="w3-overlay w3-hide-large" @click="w3_close" style="cursor:pointer" title="close side menu" ref="myOverlay"></div>

            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-row-padding">
                    <div class="w3-col l9">

                        <div id="Profile" ref="Profile" class="w3-container section">
                            <div class="w3-border w3-border-grey w3-padding w3-round w3-white w3-margin-bottom">
                                <form class="w3-container w3-margin-bottom">
                                    <h5><strong>Thông tin cá nhân</strong></h5><br>
                                    <div class="w3-row-padding" style="margin:0 -16px;">
                                        <div class="w3-half w3-margin-bottom">
                                            <label><i class="fa fa-address-card-o w3-xlarge"></i> Họ và tên</label>
                                            <input class="w3-input w3-border" type="text" required>
                                        </div>
                                        <div class="w3-half w3-margin-bottom">
                                            <label><i class="fa fa-address-book-o w3-xlarge"></i> Username</label>
                                            <input class="w3-input w3-border" type="text" required>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="w3-row-padding" style="margin:0 -16px;">
                                        <div class="w3-half w3-margin-bottom">
                                            <label><i class="fa fa-mobile-phone w3-xlarge"></i> Số điện thoại</label>
                                            <input class="w3-input w3-border" type="number" required placeholder="">
                                        </div>
                                        <div class="w3-half w3-margin-bottom">
                                            <label><i class="fa fa-envelope-open w3-xlarge"></i> Email</label>
                                            <input class="w3-input w3-border" type="text" required placeholder="">
                                        </div>

                                    </div>
                                    <div class="w3-row-padding" style="margin:0 -16px;">
                                        <div class="w3-half w3-margin-bottom">
                                            <label><i class="fa fa-facebook-official w3-xlarge"></i> Facebook</label>
                                            <input class="w3-input w3-border" type="text" required placeholder="">
                                        </div>
                                        <div class="w3-half">
                                            <label><i class="fa fa-location-arrow w3-xlarge"></i> Địa chỉ</label>
                                            <input class="w3-input w3-border" type="text" required placeholder="" >
                                        </div>
                                    </div>
                                    <hr>
                                    <h5><strong>Miêu tả</strong></h5><br>
                                    <textarea class="w3-input w3-border" rows="4" style="resize:none"></textarea>
                                    <br>
                                    <button class="w3-button w3-green w3-right w3-quarter" type="submit"><i class="fa fa-save w3-xlarge w3-margin-right"></i> Lưu thay đổi</button>
                                </form>
                            </div>
                        </div>

                        <div id="Avatar" ref="Avatar" class="w3-container section" style="display:none">
                            <div class="w3-border w3-border-grey w3-padding w3-round w3-white w3-margin-bottom">
                                <img src="https://picsum.photos/600/600/?image=32" style="width:100px;" class="w3-circle w3-margin w3-hover-opacity">
                                <form class="w3-container w3-margin-bottom">
                                    <h5><strong>Ảnh đại diện</strong></h5><br>
                                    <input class="w3-input w3-border" type="file" multiple>
                                    <br>
                                    <button class="w3-button w3-green w3-right w3-quarter" type="submit"><i class="fa fa-pencil w3-margin-right"></i>Lưu ảnh</button>
                                </form>
                            </div>
                        </div>

                        <div class="w3-center w3-padding-24">
                            Powered by 
                            <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
                        </div>                         
                    </div>
                    <div class="w3-col l3">
                        <div class="w3-container w3-border w3-border-grey w3-white w3-round w3-hide-medium w3-hide-small">
                            <h4><b>Advertisment</b></h4>
                            <hr>
                        </div>                 
                    </div>
                </div>
            </div>  
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                navItems: [
                    {link: "/", icon: "fa fa-envelope", title: "Hướng dẫn"},
                    {link: "/", icon: "fa fa-globe", title: "Về chúng tôi"}
                ],
                onTab: false
            }
        },
        methods: {
            w3_open() {
                this.$refs.mySidebar.style.display = "block";
                this.$refs.myOverlay.style.display = "block";
            },
            w3_close() {
                this.$refs.mySidebar.style.display = "none";
                this.$refs.myOverlay.style.display = "none";
            },
            openTab_(event, arg) {
                for( let key in this.$refs) {
                    if (this.$refs[key].classList.contains("section")) {
                        this.$refs[key].style.display = "none"
                    }
                    if (this.$refs[key].classList.contains("tablink")) {
                        this.$refs[key].classList.remove("w3-red")
                    }
                }
                this.$refs[arg].style.display = "block"
                event.currentTarget.className += " w3-red"
            },
            openTab(event, arg) {
                let i, x, tablinks
                x = document.getElementsByClassName("section")
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none"
                }
                tablinks = document.getElementsByClassName("tablink")
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" w3-light-grey", "");
                }
                document.getElementById(arg).style.display = "block"
                event.currentTarget.className += " w3-light-grey"
            }
        }
    }
</script>

<style>
    body,h1,h2,h3,h4,h5,p {
        font-family: "Nunito", sans-serif;
    }
    body {
        background-color: #f1f1f1;
    }
</style>
