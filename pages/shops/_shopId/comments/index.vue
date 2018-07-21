<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <h5 class="w3-text-grey"><strong>Giới thiệu</strong></h5><br>
            <p>This is my shop</p>
            <hr>
            <h6>
                <span class="w3-tag w3-yellow w3-margin-right w3-margin-top"
                    v-for="(type, i) in itemTypes" 
                    :key="i">
                    <b>{{ type.title }}</b>
                </span>
            </h6>
        </div> 
        <div class="w3-padding w3-white">
            <form>
                <h5><strong>Các nhận xét gần đây</strong></h5><br>
                <p><input class="w3-input w3-border" type="text" placeholder="Name" required name="Name"></p>
                <p><input class="w3-input w3-border" type="email" placeholder="Email" required name="Email"></p>
                <p><input class="w3-input w3-border" type="text" placeholder="Message" required name="Message"></p>
                <div class="w3-row">
                    <button type="submit" class="w3-button w3-green w3-right w3-quarter">Gửi nhận xét <i class="fa fa-send-o w3-large w3-margin-left"></i></button>
                </div>
            </form>
            <hr>
            <div class="w3-row">
                <div class="w3-col l1 m2 text-center">
                    <img class="w3-circle" src="https://picsum.photos/600/600/?image=49" style="width:50px;height:50px">
                </div>
                <div class="w3-col l11 m10">
                    <h4>Nam <span class="w3-opacity w3-medium">Sep 29, 2018, 9:12 PM</span></h4>
                    <p>Cừa hàng phục vụ rất tận tình. Hàng hóa rất đẹp</p>
                </div>
            </div>
            <hr>
        </div>
    </section>
</template>

<script>
    export default {
        layout: 'shop',
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
        }
    }
</script>