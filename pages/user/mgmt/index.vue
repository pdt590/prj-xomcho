<template>
    <section>
        <app-navbar :navItems="navItems" />
        <app-navbar-mobile :navItems="navItems" />
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <div class="w3-sidebar w3-bar-block w3-collapse w3-card w3-top w3-padding-64" style="z-index:3;width:320px;" ref="mySidebar">
                <h4 class="w3-bar-item"><i class="fa fa-inbox w3-margin-right w3-xlarge"></i>Đặt hàng</h4>
                <a href="javascript:void(0)" class="w3-bar-item w3-button w3-border-bottom w3-hover-light-grey" @click="openTab($event, 'Borge')">
                    <div class="w3-container tablink w3-light-grey">
                        <img class="w3-round w3-margin-right" src="https://picsum.photos/600/600/?image=18" style="width:15%;"><span class="w3-opacity w3-large">Borge Refsnes</span>
                        <h6>Subject: Remember Me</h6>
                        <p>Hello, i just wanted to let you know that i'll be home at...</p>
                    </div>
                </a>
                <a href="javascript:void(0)" class="w3-bar-item w3-button w3-border-bottom w3-hover-light-grey" @click="openTab($event, 'Jane')">
                    <div class="w3-container tablink">
                        <img class="w3-round w3-margin-right" src="https://picsum.photos/600/600/?image=18" style="width:15%;"><span class="w3-opacity w3-large">Jane Doe</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </div>
                </a>  
            </div>
            <!-- Overlay effect when opening sidebar on small screens -->
            <div class="w3-overlay w3-hide-large" @click="closeSideBar" style="cursor:pointer" title="close side menu" ref="myOverlay"></div>

            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:320px;">
                <div class="w3-padding w3-white w3-margin-bottom">
                    <div id="Borge" class="w3-container section">
                        <br>
                        <img class="w3-round  w3-animate-top" src="https://picsum.photos/600/600/?image=18" style="width:20%;">
                        <h5 class="w3-opacity">Subject: Remember Me</h5>
                        <h4><i class="fa fa-clock-o"></i> From Borge Refsnes, Sep 27, 2015.</h4>
                        <a class="w3-button w3-light-grey" href="#">Reply<i class="w3-margin-left fa fa-mail-reply"></i></a>
                        <a class="w3-button w3-light-grey" href="#">Forward<i class="w3-margin-left fa fa-arrow-right"></i></a>
                        <hr>
                        <p>Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Best Regards, <br>Borge Refsnes</p>
                    </div>

                    <div id="Jane" class="w3-container section" style="display: none">
                        <br>
                        <img class="w3-round w3-animate-top" src="https://picsum.photos/600/600/?image=18" style="width:20%;">
                        <h5 class="w3-opacity">Subject: None</h5>
                        <h4><i class="fa fa-clock-o"></i> From Jane Doe, Sep 25, 2015.</h4>
                        <a class="w3-button w3-light-grey">Reply<i class="w3-margin-left fa fa-mail-reply"></i></a>
                        <a class="w3-button w3-light-grey">Forward<i class="w3-margin-left fa fa-arrow-right"></i></a>
                        <hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Forever yours,<br>Jane</p>
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
        layout: 'test',
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
        mounted() {
        },
        data() {
            return {
                navItems: [
                    {link: '/shops/new-shop', icon: 'fa fa-plus-square', title: 'Tạo cửa hàng'}
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
                    tablinks[i].className = tablinks[i].className.replace(" w3-light-grey", "");
                }
                document.getElementById(arg).style.display = "block";
                event.currentTarget.firstElementChild.className += " w3-light-grey";
            },
            closeSideBar() {
                this.$store.dispatch('openSideBar', false)
                this.$refs.myOverlay.style.display = 'none'
            }
        }
    }
</script>

<style>
    .w3-bar-block .w3-bar-item {padding: 16px}
</style>
