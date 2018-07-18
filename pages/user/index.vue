<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row">
                <a href="javascript:void(0)" @click="openTab($event, 'Profile')">
                    <div class="w3-col l4 m4 s6 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Thông tin</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'Image')">
                    <div class="w3-col l2 m2 s6 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Ảnh</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'ShopList')">
                    <div class="w3-col l2 m2 s6 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                        <h5><strong>Cửa hàng</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'ItemList')">
                    <div class="w3-col l2 m2 s6 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Sản phẩm</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'Bookmark')">
                    <div class="w3-col l2 m2 s12 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Lưu</strong></h5>
                    </div>
                </a>
            </div>
            <hr>     
            
            <form id="Profile" class="w3-margin-bottom section">
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
                <div class="w3-row">
                    <button class="w3-button w3-green w3-right w3-quarter" type="submit">
                        <i class="fa fa-save w3-xlarge w3-margin-right"></i> 
                        Lưu thay đổi
                    </button>
                </div>
            </form>

            <div id="Image" class="w3-margin-bottom section" style="display:none">
                <h5><strong>Ảnh đại diện</strong></h5><br>
                <app-img-upload ></app-img-upload>
                <br>
            </div>

            <div id="ShopList" class="w3-margin-bottom section" style="display:none">
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

            <div id="ItemList" class="w3-margin-bottom section" style="display:none">
                <ul class="w3-ul w3-border">
                    <li v-for="i in 3" :key="i" class="w3-bar">
                        <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-close"></i></span>
                        <nuxt-link to="/items/df123/edit-shop" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
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
            
            <div id="Bookmark" class="section" style="display:none">
                <h5><strong>Cửa hàng</strong></h5>
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
                <h5><strong>Sản phẩm</strong></h5>
                <ul class="w3-ul w3-border">
                    <li v-for="i in 3" :key="i" class="w3-bar">
                        <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-close"></i></span>
                        <nuxt-link to="/items/th345">
                            <img src="https://picsum.photos/600/600/?image=32" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                        </nuxt-link>
                        <div class="w3-bar-item">
                            <span class="w3-large">Mike</span><br>
                            <nuxt-link to="/shops/df123" href="javascript:void(0)">Shop duythang</nuxt-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            openTab(event, arg) {
                let i, x, tablinks;
                x = document.getElementsByClassName("section");
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablink");
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
                }
                document.getElementById(arg).style.display = "block";
                event.currentTarget.firstElementChild.className += " w3-border-red";
            }
        }
    }
</script>