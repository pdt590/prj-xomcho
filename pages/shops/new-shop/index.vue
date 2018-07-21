<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row">
                <a href="javascript:void(0)" @click="openTab($event, 'shopInfo')">
                    <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                        <h5><strong>Thông tin</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'shopImg')">
                    <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Ảnh</strong></h5>
                    </div>
                </a>
            </div>
            <hr>

            <form id="shopInfo" class="w3-margin-bottom section">
                <h5><strong>Thông tin cửa hàng</strong></h5><br>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa fa-newspaper-o w3-xlarge"></i> Tên cửa hàng</label>
                        <input class="w3-input w3-border" type="text" required>
                    </div>
                </div>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-facebook-square w3-xlarge"></i> Facebook</label>
                        <input class="w3-input w3-border" type="text" required>
                    </div>
                    <div class="w3-half">
                        <label><i class="fa fa-location-arrow w3-xlarge"></i> Vị trí</label>
                        <input class="w3-input w3-border" type="text" required>
                    </div>
                </div>
                <div class="w3-row-padding" style="margin:8px -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-phone w3-xlarge"></i> Số điện thoại</label>
                        <input class="w3-input w3-border" type="phone" required>
                    </div>
                    <div class="w3-half">
                        <label><i class="fa fa-envelope-open w3-xlarge"></i> Email</label>
                        <input class="w3-input w3-border" type="email" required>
                    </div>
                </div>
                <hr>
                <h5><strong>Miêu tả</strong></h5><br>
                <textarea class="w3-input w3-border" rows="5" style="resize:none"></textarea>
                <hr>
                <h5><strong>Các mặt hàng sẽ bán</strong></h5><br>
                <app-product-types/>
                <br>
                <div class="w3-row">
                    <button class="w3-button w3-green w3-right w3-quarter" type="submit"><i class="fa fa-save w3-xlarge w3-margin-right"></i> Tạo cửa hàng</button>
                </div>
            </form>

            <div id="shopImg" class="w3-margin-bottom section" style="display:none">
                <h5><strong>Ảnh đại diện</strong></h5><br>
                <app-img-upload :numberImg="1" :section="'shopAvatar'"/>
                <hr>
                <h5><strong>Ảnh panel (Tối đa 2 ảnh)</strong></h5><br>
                <app-img-upload :numberImg="2" :section="'shopPanel'"/>
                <br>
            </div>

        </div>
    </section>
</template>

<script>

    export default {
        data() {
            return {
                options: {
                    url: "http://httpbin.org/anything"
                }

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
                    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
                }
                document.getElementById(arg).style.display = "block";
                event.currentTarget.firstElementChild.className += " w3-border-red";
            }
        }
    }
</script>

<style>
    #dropzoneAva {
        border-style: dotted; 
        border-width: medium; 
        border-color: green;
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 35%;
        background-color: #f1f1f1;
    }
    #dropzone {
        border-style: dotted; 
        border-width: medium; 
        border-color: green;
        display: block;
        margin-left: auto;
        margin-right: auto;
        background-color: #f1f1f1;
    }
</style>
