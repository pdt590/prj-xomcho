<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <form class="w3-margin-bottom">
                <h5><strong>Ảnh đại diện</strong></h5><br>
                <input class="w3-input w3-border" type="file">
                <hr>
                <h5><strong>Ảnh panel</strong></h5>
                <p class="w3-text-grey"><strong><i>Tối đa 2 ảnh</i></strong></p>
                <input class="w3-input w3-border" type="file" multiple>
                <hr>
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
                    <button class="w3-button w3-green w3-right w3-quarter" type="submit"><i class="fa fa-save w3-xlarge w3-margin-right"></i> Tạo cửa hàng</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    export default {
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