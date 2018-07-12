<template>
    <section>
        <app-navbar :navItems="navItems"></app-navbar>
        <div class="w3-padding-48">
            <!-- Top menu on small screens -->
            <header class="w3-bar w3-top w3-padding w3-hide-large w3-green">
                <div class="w3-bar-item">LOGO</div>
                <button
                    class="w3-bar-item w3-button w3-right">
                    <i class="fa fa-user-o w3-large"></i>
                </button>
                <nuxt-link
                    v-for="(item, i) in navItems"
                    :key="i"
                    :to="item.link" class="w3-bar-item w3-button w3-right"> 
                    <i class="w3-large" :class="item.icon"></i>
                </nuxt-link>
                <button @click="onSearch" class="w3-bar-item w3-button w3-right"><i :class="enableSearch ? 'fa fa-close' : 'fa fa-search'" class="w3-large"></i></button>
                <form ref="search" style="display: none">
                    <button class="w3-button w3-light-grey w3-bar-item w3-mobile">Search</button>
                    <select class="w3-select w3-bar-item w3-mobile" name="option">
                        <option value="" disabled selected>Danh mục</option>
                        <option value="1">Cửa hàng</option>
                        <option value="2">Sản phẩm</option>
                    </select>                    
                    <input  type="text" class="w3-bar-item w3-input w3-mobile" placeholder="Tìm kiếm ..." required>
                </form>
            </header>

            <!-- !PAGE CONTENT! -->
            <div class="w3-main">
                <nuxt/>
                <div class="w3-center w3-padding-64">
                    <div class="w3-content" style="max-width:1500px">
                        Powered by 
                        <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
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
                    {link: '/shops/new-shop', icon: 'fa fa-plus-square', title: ''}
                ],
                enableSearch: false
            }
        },
        methods: {
            onSearch() {
                this.enableSearch = !this.enableSearch;
                this.enableSearch ? this.$refs.search.style.display = 'block' : this.$refs.search.style.display = 'none'
            }
        }
    }
</script>

<style>
    html,h1,h2,h3,h4,h5,h6,p{
        font-family: "Nunito", sans-serif;
    }
    body {
        background-color:white;
    }
</style>
