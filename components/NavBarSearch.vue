<template>
    <section>
        <div class="w3-bar w3-top w3-padding w3-green w3-hide-small w3-hide-medium" style="z-index:4">
            <nuxt-link to="/" class="w3-bar-item w3-button w3-hover-none w3-hover-text-white">LOGO</nuxt-link>
            <button
                @click="openSignModal"
                class="w3-bar-item w3-button w3-right">
                <i class="fa fa-user-o w3-large"></i>
                Đăng nhập/Đăng ký
            </button>
            <!-- Modal for on click-->
            <div id="modal" class="w3-modal w3-text-black">
                <div class="w3-modal-content w3-card w3-round w3-animate-zoom" style="max-width:500px">
                    
                    <div class="w3-center"><br>
                        <span @click="closeSignModal" 
                            class="w3-button w3-xlarge w3-transparent w3-light-grey w3-display-topright" 
                            title="Close Modal">×</span>
                    </div>
                    <form class="w3-container">
                        <div class="w3-section ">
                            <h3 class="w3-center"><strong>Đăng nhập</strong></h3>
                            <br>
                            <label><b>Username</b></label>
                            <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nhập username" required>
                            <label><b>Email</b></label>
                            <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nhập email" required>
                            <label><b>Mật khẩu</b></label>
                            <input class="w3-input w3-border" type="text" placeholder="Nhập mật khẩu" required>
                            <button class="w3-button w3-block w3-green w3-section w3-round w3-padding" type="submit">Đăng nhập</button>
                        </div>
                        <hr>
                    </form>
                    <div class="w3-row-padding w3-margin-bottom">
                        <div class="w3-half">
                            <button class="w3-button w3-block w3-red w3-round" disabled>
                                <i class="fa fa-google"></i>
                                Google
                            </button>
                        </div>
                        <div class="w3-half">
                            <button class="w3-button w3-block w3-blue w3-round" disabled>
                                <i class="fa fa-facebook-official"></i> 
                                Facebook
                            </button>
                        </div>   
                    </div>
                        
                    <div class="w3-container w3-border-top w3-round w3-padding w3-light-grey">
                        <button class="w3-button w3-border w3-light-grey">Đăng ký</button>
                        <span class="w3-right w3-padding w3-hide-small w3-disabled">Quên <a href="">mật khấu?</a></span>
                    </div>

                </div>
            </div>

            <nuxt-link
                v-for="(item, i) in navItems"
                :key="i"
                :to="item.link" class="w3-bar-item w3-padding w3-button w3-right"> 
                <i class="w3-large" :class="item.icon"></i> {{item.title}}
            </nuxt-link>
            <button @click="onSearch" class="w3-bar-item w3-button w3-right"><i :class="enableSearch ? 'fa fa-close' : 'fa fa-search'" class="w3-large"></i></button>
            <form ref="search" style="display: none">
                <button class="w3-button w3-light-grey w3-bar-item w3-right w3-margin-right">Search</button>
                <select class="w3-select w3-bar-item w3-right" name="option">
                    <option value="" disabled selected>Danh mục</option>
                    <option value="1">Cửa hàng</option>
                    <option value="2">Sản phẩm</option>
                </select>
                <input  type="text" class="w3-bar-item w3-input w3-right" placeholder="Tìm kiếm ..." style="width:20%" required>
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
                enableSearch: false
            }
        },
        methods: {
            openSignModal() {
                document.getElementById('modal').style.display='block'
            },
            closeSignModal() {
                document.getElementById('modal').style.display='none'
            },
            onSearch() {
                this.enableSearch = !this.enableSearch;
                this.enableSearch ? this.$refs.search.style.display = 'block' : this.$refs.search.style.display = 'none'
            }
        }
    }
</script>