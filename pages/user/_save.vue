<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row">
                <a href="javascript:void(0)" @click="openTab($event, 'Profile')">
                    <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                        <h5><strong>Thông tin</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'Image')">
                    <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Ảnh</strong></h5>
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
                <app-img-upload :numberImg="1" :section="'userAvatar'"/>
                <br>
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