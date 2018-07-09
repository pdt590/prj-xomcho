<template>
    <section>
        <div class="w3-border w3-border-grey w3-padding w3-round w3-white w3-margin-bottom">
            <div class="w3-row">
                <a href="javascript:void(0)" @click="openTab($event, 'shopList')">
                    <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                        <h5><strong>Cửa hàng</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'itemList')">
                    <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Sản phẩm</strong></h5>
                    </div>
                </a>
            </div>
            <br><br>
            <div id="shopList" class=" w3-margin-bottom section">                                
                <div class="w3-row">
                    <nuxt-link to="/shops/new-shop" 
                        class="w3-button w3-green w3-right w3-quarter">
                        <i class="fa fa-edit w3-xlarge w3-margin-right"></i> 
                        Tạo cửa hàng
                    </nuxt-link>
                </div>
                <br>
                <table class="w3-table w3-bordered">
                    <tr v-for="i in 5" :key="i">
                        <td>
                            <div  class="w3-bar">
                                <img src="https://picsum.photos/600/600/?image=32" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                                <div class="w3-bar-item">
                                    <span class="w3-large">Mike</span><br>
                                    <span>Web Designer</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="w3-row">
                                <div class="w3-col w3-half w3-right">
                                    <button class="w3-button w3-border w3-border-grey">Xóa</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="itemList" class=" w3-margin-bottom section" style="display:none">
                <table class="w3-table w3-bordered">
                    <tr v-for="i in 5" :key="i">
                        <td>
                            <div class="w3-bar">
                                <img src="https://picsum.photos/600/600/?image=54" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                                <div class="w3-bar-item">
                                    <span class="w3-large">Mike</span><br>
                                    <span>Web Designer</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p>Shop DuyThang</p>
                        </td>
                        <td>
                            <div class="w3-row">
                                <div class="w3-col w3-half w3-right">
                                    <button class="w3-button w3-border w3-border-grey">Xóa</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

        </div>
    </section>
</template>

<script>
    export default {
        layout: 'main',
        data() {
            return {
                itemTypes: [
                    {icon: "/meat.png", title: "Thực phẩm"},
                    {icon: "/agri.png", title: "Nông sản"},
                    {icon: "/pot.png", title: "Gia dụng"},
                    {icon: "/electronic.png", title: "Điện tử"},
                    {icon: "/medicine.png", title: "Y tế"},
                    {icon: "/fashion.png", title: "Thời trang"},
                    {icon: "/others.png", title: "Khác"}
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