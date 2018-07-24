<template>
    <section>
        <header class="w3-bar w3-top w3-padding w3-hide-large w3-blue" style="z-index:1001">
            <nuxt-link to="/" class="w3-bar-item w3-button w3-hover-none w3-hover-text-white"><strong>TA ĐI CHỢ</strong></nuxt-link>
            <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right" @click="openSideBar" v-show="!isMainLayout"><i class="fa fa-bars"></i></a>
            <button
                @click="openLoginModal"
                class="w3-bar-item w3-button w3-right">
                <i class="fa fa-user w3-large"></i>
            </button>
            <app-modal-login ref="modalLogin" />
            <nuxt-link
                v-for="(item, i) in navItems"
                :key="i"
                :to="item.link" class="w3-bar-item w3-button w3-right"> 
                <i class="w3-large" :class="item.icon"></i>
            </nuxt-link>
            <button @click="onSearch" class="w3-bar-item w3-button w3-right"><i :class="enableSearch ? 'fa fa-close' : 'fa fa-search'" class="w3-large"></i></button>
            <form ref="search" style="display: none">
                <button class="w3-button w3-light-grey w3-bar-item w3-mobile">Tìm kiếm</button>
                <select class="w3-select w3-bar-item w3-mobile" name="option">
                    <option value="" disabled selected>Danh mục</option>
                    <option value="1">Cửa hàng</option>
                    <option value="2">Sản phẩm</option>
                </select>                    
                <input  type="text" class="w3-bar-item w3-input w3-mobile" placeholder="nhập từ khóa..." required>
            </form>
        </header>
    </section>
</template>

<script>
    export default {
        props: {
            navItems: {
                type: Array
            },
            isMainLayout: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                enableSearch: false
            }
        },
        methods: {
            openSideBar() {
                if(this.$store.getters.sideBar) {
                    this.$store.dispatch('openSideBar', false)
                }else {
                    this.$store.dispatch('openSideBar', true)
                }  
            },
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

</style>
