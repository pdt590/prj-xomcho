<template>
    <section>
        <div class="w3-margin-bottom">
            <div class="w3-border w3-border-grey w3-padding w3-round w3-white">
                <h5><strong>Giới thiệu</strong></h5><br>
                <p>This is my shop</p>
                <hr>
                <h6>
                    <span class="w3-tag w3-yellow w3-margin-right w3-margin-top"
                        v-for="(type, i) in itemTypes" 
                        :key="i">
                        <b>{{ type.title }}</b>
                    </span>
                </h6>
                <hr>
                <h5><strong>Các mặt hàng hiển thị</strong></h5><br>
                <form>
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
                </form>
            </div>      
        </div>

        <div class="w3-margin-bottom">
            <div class="w3-border w3-border-grey w3-padding w3-round w3-white">
                <!-- Product grid -->
                <div class="w3-row-padding w3-margin-top">
                    <div class="w3-col l3 s6 w3-margin-bottom" v-for="i in 15" :key="i">
                        <div class="w3-border w3-border-grey w3-light-grey">
                            <div class="w3-display-container">
                                <img src="https://picsum.photos/1020/600/?image=32" style="width:100%">
                                <span class="w3-tag w3-display-topleft">New</span>
                                <div class="w3-display-middle w3-display-hover">
                                    <nuxt-link to="/items/dsds" class="w3-button w3-black" target="_blank">Chi tiết <i class="fa fa-external-link"></i></nuxt-link>
                                </div>
                            </div>
                            <div class="w3-container w3-padding">
                                <p>Mega Ripped Jeans<br><b>$19.99</b></p>
                                <button class="w3-button w3-green w3-right">Lưu <i class=""></i></button>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        layout: 'shop',
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
        }
    }
</script>