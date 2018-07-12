<template>
    <section>
        <app-navbar :navItems="navItems"></app-navbar>
        <div class="w3-content w3-padding-64" style="max-width:1500px">     
            <!-- Sidebar left -->
            <div class="w3-sidebar w3-light-grey w3-collapse w3-top w3-padding-64" style="z-index:3;width:270px" ref="mySidebar">
                <div class="w3-container w3-display-container">
                    <nuxt-link to="/">
                        <img src="https://picsum.photos/600/600/?image=52" style="width:100%;" class="w3-round">
                    </nuxt-link>
                    <br>
                    <h4><b>@TaDiCho</b></h4>
                    <h5 class="w3-text-grey"><i>Công cụ giúp bạn đơn giản hóa việc bán hàng</i></h5>
                </div>
                <hr>
            </div>

            <!-- Top menu on small screens -->
            <header class="w3-bar w3-top w3-padding w3-hide-large w3-green">
                <div class="w3-bar-item w3-padding-large">LOGO</div>
                <a href="javascript:void(0)" class="w3-bar-item w3-padding-large w3-button w3-right" @click="w3_open"><i class="fa fa-bars"></i></a>
                <nuxt-link
                    v-for="(item, i) in navItems"
                    :key="i"
                    :to="item.link" class="w3-bar-item w3-padding-large w3-button w3-right"> 
                    <i :class="item.icon"></i>
                </nuxt-link>
            </header>

            <!-- Overlay effect when opening sidebar on small screens -->
            <div class="w3-overlay w3-hide-large" @click="w3_close" style="cursor:pointer" title="close side menu" ref="myOverlay"></div>

            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-row-padding">
                    <div class="w3-col l9">
                        <nuxt/>
                        <div class="w3-center w3-padding-24">
                            Powered by 
                            <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
                        </div>                         
                    </div>
                    <div class="w3-col l3">
                        <div class="w3-border w3-white w3-round w3-container w3-hide-medium w3-hide-small">
                        <br>
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
                ]
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
