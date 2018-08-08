<template>
    <section>
        <div class="w3-top" style="z-index:1001; font-size: 15px">
            <div class="w3-bar w3-padding w3-blue w3-hide-small w3-hide-medium">
                <nuxt-link to="/" class="w3-bar-item w3-button w3-hover-none" style="padding: 0;">
                    <img src="/logo.png" style="width: 30%;" alt="Avatar">
                </nuxt-link>
                
                <div class="w3-dropdown-hover w3-right">
                    <a class="w3-button">
                        <img src="https://picsum.photos/600/600/?image=52" class="w3-circle" style="height:25px;width:25px" alt="Avatar">
                    </a>
                    <div class="w3-dropdown-content w3-bar-block w3-card w3-light-grey" style="right:15px;">
                        <nuxt-link to="/user" class="w3-bar-item w3-button"><i class="fa fa-cube w3-large"></i> Trang quản lý</nuxt-link>
                        <a class="w3-bar-item w3-button w3-border-top"><i class="fa fa-sign-out w3-large"></i> Đăng xuất</a>
                    </div>
                </div>
                
                <button
                    @click="openLoginModal"
                    class="w3-bar-item w3-button w3-padding w3-right">
                    <i class="fa fa-sign-in w3-large"></i>
                    Đăng nhập/Đăng ký
                </button>
                <app-modal-login ref="modalLogin" />
                
                <nuxt-link
                    v-for="(item, i) in navItems"
                    :key="i"
                    :to="item.link" class="w3-bar-item w3-padding w3-button w3-right"> 
                    <i class="w3-large" :class="item.icon"></i> {{item.title}}
                </nuxt-link>

                <nuxt-link to="/user" class="w3-bar-item w3-button w3-right">
                    <i class="fa fa-bell w3-large"></i><span class="w3-badge w3-right w3-small w3-red">3</span>
                </nuxt-link>

                <!--<button @click="onSearch" class="w3-bar-item w3-button"><i :class="enableSearch ? 'fa fa-close' : 'fa fa-search'" class="w3-large"></i></button>-->
                <form ref="search" class="my-center">
                    <button class="w3-button w3-light-grey w3-bar-item w3-margin-left">Tìm kiếm</button>
                    <select class="w3-select w3-bar-item" name="option">
                        <option value="" disabled selected>Danh mục</option>
                        <option value="1">Cửa hàng</option>
                        <option value="2">Sản phẩm</option>
                    </select>
                    <input  type="text" class="w3-bar-item w3-input" placeholder="nhập từ khóa..." style="width:50%" required>
                </form> 
            </div>
        </div>
        
        
    </section> 
</template>

<script>
    export default {
        props: {
            navItems: {
                type: Array
            }      
        },
        data() {
            return {
                enableSearch: true
            }
        },
        methods: {
            openLoginModal() {
                this.$refs.modalLogin.$refs.modal.style.display='block'
            },
            onSearch() {
                this.enableSearch = !this.enableSearch;
                this.enableSearch ? this.$refs.search.style.display = 'block' : this.$refs.search.style.display = 'none'
            }
        }
    }
</script>

<style>
    .my-center {
        display: block;
        margin: auto;
        width: 50%;
    }
</style>
