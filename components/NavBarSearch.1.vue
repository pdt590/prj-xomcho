<template>
    <section>
        <div class="w3-bar w3-top w3-padding-16 w3-green w3-hide-small w3-hide-medium" style="z-index:4">
            <nuxt-link to="/" class="w3-bar-item w3-button w3-hover-none w3-hover-text-white">LOGO</nuxt-link>
            <button
                @click="openSignModal"
                class="w3-bar-item w3-button w3-right">
                <i class="fa fa-sign-in"></i> 
                Đăng ký/Đăng nhập
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
                <i :class="item.icon"></i> {{item.title}}
            </nuxt-link>
            <div class="w3-display-middle w3-border w3-bar-item w3-light-grey w3-round"  style="width:40%">
                <form>
                    <button class="w3-bar-item w3-button w3-border w3-light-grey" type="submit" style="margin-right:4px"><i class="fa fa-search"></i></button>
                    <select class="w3-select w3-bar-item w3-border" name="option">
                        <option value="" disabled selected>Danh mục</option>
                        <option value="1">Cửa hàng</option>
                        <option value="2">Sản phẩm</option>
                    </select>
                    <input type="text" class="w3-bar-item w3-input w3-animate-input" placeholder="Tìm kiếm ..." style="width:35%; max-width:70%" required>  
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
        methods: {
            openSignModal() {
                document.getElementById('modal').style.display='block'
            },
            closeSignModal() {
                document.getElementById('modal').style.display='none'
            }
        }
    }
</script>