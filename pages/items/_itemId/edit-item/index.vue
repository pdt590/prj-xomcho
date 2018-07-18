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
                <textarea class="w3-input w3-border" rows="5" style="resize:none"></textarea>
                <hr>
                <h5><strong>Loại sản phẩm</strong></h5><br>
                <div class="w3-row">
                    <div class="w3-col l4 m4 s6" 
                        v-for="(type, i) in itemTypes" 
                        :key="i">
                        <p>
                            <input class="w3-check w3-margin-right" type="checkbox" checked="checked">
                            <label>
                                <img :src="type.icon" class="w3-round w3-margin-right" style="width:10%;">
                                {{ type.title }}
                            </label>
                        </p>
                    </div>
                </div>
                <br>
                <div class="w3-row">
                    <button class="w3-button w3-green w3-right w3-quarter" type="submit"><i class="fa fa-save w3-xlarge w3-margin-right"></i> Lưu thay đổi</button>
                </div>
            </form>

            <div id="Image" class="w3-margin-bottom section" style="display:none">
                <h5><strong>Ảnh sản phẩm</strong></h5><br>
                <app-img-upload ></app-img-upload>
                <br>
            </div>

        </div>
    </section>
</template>

<script>
    export default {
        layout: 'item',
        data() {
            return {
                itemTypes: [
                    {icon: "/meat.svg", title: "Thực phẩm"},
                    {icon: "/agri.svg", title: "Nông sản"},
                    {icon: "/pot.svg", title: "Gia dụng"},
                    {icon: "/electronic.svg", title: "Điện tử"},
                    {icon: "/medicine.svg", title: "Y tế"},
                    {icon: "/fashion.svg", title: "Thời trang"},
                    {icon: "/others.svg", title: "Khác"}
                ]
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