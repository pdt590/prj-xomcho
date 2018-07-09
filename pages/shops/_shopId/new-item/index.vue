<template>
    <section>
        <div class="w3-border w3-border-grey w3-padding w3-round w3-white w3-margin-bottom">
            <form class="w3-container w3-margin-bottom">
                <h5><strong>Ảnh sản phẩm</strong></h5><br>
                <input class="w3-input w3-border" type="file" multiple>
                <hr>
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
                <button class="w3-button w3-green w3-right w3-quarter" type="submit"><i class="fa fa-save w3-xlarge w3-margin-right"></i> Thêm sản phẩm</button>
            </form>
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