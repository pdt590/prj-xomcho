<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row">
                <a href="javascript:void(0)" @click="openTab($event, 'itemInfo')">
                    <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                        <h5><strong>Thông tin</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'itemImg')">
                    <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Ảnh</strong></h5>
                    </div>
                </a>
            </div>
            <hr>
            
            <form id="itemInfo" class="w3-container w3-margin-bottom section">
                <h5><strong>Thông tin sản phẩm</strong></h5><br>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa fa-object-group w3-xlarge"></i> Tên sản phẩm</label>
                        <input class="w3-input w3-border" type="text" required>
                    </div>
                </div>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-third w3-margin-bottom">
                        <label><i class="fa fa-dollar w3-xlarge"></i> Giá</label>
                        <input class="w3-input w3-border" type="number" required placeholder="200">
                    </div>
                    <div class="w3-third w3-margin-bottom">
                        <label><i class="fa fa-money w3-xlarge"></i> Loại tiền</label>
                        <input class="w3-input w3-border" type="text" required placeholder="VNĐ">
                    </div>
                    <div class="w3-third">
                        <label><i class="fa fa-shopping-basket w3-xlarge"></i> Đơn vị</label>
                        <input class="w3-input w3-border" type="text" placeholder="1 Cái" required>
                    </div>
                </div>
                <hr>
                <h5><strong>Miêu tả</strong></h5><br>
                <textarea class="w3-input w3-border" rows="8" style="resize:none"></textarea>
                <hr>
                <h5><strong>Loại sản phẩm</strong></h5><br>
                <app-product-types/>
                <br>
                <button class="w3-button w3-green w3-right w3-quarter" type="submit"><i class="fa fa-save w3-xlarge w3-margin-right"></i> Thêm sản phẩm</button>
            </form>

            <div id="itemImg" class="w3-container w3-margin-bottom section" style="display:none">
                <h5><strong>Ảnh sản phẩm (Tối đa 5 ảnh)</strong></h5><br>
                <app-img-upload :numberImg="5" :section="'itemPreview'"/>
                <br>
            </div>
        </div>
    </section>
</template>

<script>

    export default {
        layout: 'shop',
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