<template>
    <section>
        <div class="w3-bar w3-top w3-padding w3-green w3-hide-small w3-hide-medium" style="z-index:1001">
            <nuxt-link to="/" class="w3-bar-item w3-button w3-hover-none w3-hover-text-white"><strong>TA ĐI CHỢ</strong></nuxt-link>
            <button
                @click="openLoginModal"
                class="w3-bar-item w3-button w3-right">
                <i class="fa fa-user w3-large"></i>
                Đăng nhập/Đăng ký
            </button>
            <app-modal-login ref="modalLogin" />
            <nuxt-link
                v-for="(item, i) in navItems"
                :key="i"
                :to="item.link" class="w3-bar-item w3-padding w3-button w3-right"> 
                <i class="w3-large" :class="item.icon"></i> {{item.title}}
            </nuxt-link>

            <!--<button @click="onSearch" class="w3-bar-item w3-button"><i :class="enableSearch ? 'fa fa-close' : 'fa fa-search'" class="w3-large"></i></button>-->
            <form ref="search" class="my-center">
                <button class="w3-button w3-light-grey w3-bar-item w3-margin-left">Search</button>
                <select class="w3-select w3-bar-item" name="option">
                    <option value="" disabled selected>Danh mục</option>
                    <option value="1">Cửa hàng</option>
                    <option value="2">Sản phẩm</option>
                </select>
                <input  type="text" class="w3-bar-item w3-input" placeholder="Tìm kiếm ..." style="width:30%" required>
            </form> 
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
