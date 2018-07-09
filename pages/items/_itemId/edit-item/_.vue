<template>
    <section>
        <div class="w3-container">
            <div class="w3-border w3-border-grey w3-padding w3-round w3-white w3-margin-bottom">
                <form class="w3-container w3-margin-bottom">
                    <h5><b>Ảnh sản phẩm</b></h5><br>
                    <input class="w3-input w3-border" type="file" multiple>
                    <br>
                    <button class="w3-button w3-green w3-right" type="submit"><i class="fa fa-pencil w3-margin-right"></i>Lưu ảnh</button>
                </form>
                <hr>
                <form class="w3-container w3-margin-bottom">
                    <h5><b>Thông tin sản phẩm</b></h5><br>
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
                    <h5><b>Miêu tả</b></h5><br>
                    <textarea class="w3-input w3-border" rows="8" style="resize:none"></textarea>
                    <hr>
                    <h5><b>Loại sản phẩm</b></h5><br>
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
                    <button class="w3-button w3-green w3-right" type="submit"><i class="fa fa-pencil w3-margin-right"></i> Lưu thay đổi</button>
                    <button class="w3-button w3-green w3-right w3-margin-right"><i class="fa fa-pencil w3-margin-right"></i> Chỉnh sửa</button>
                </form>
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
                    {icon: "/meat.png", title: "Thực phẩm"},
                    {icon: "/agri.png", title: "Hàng nông sản"},
                    {icon: "/pot.png", title: "Đồ gia dụng"},
                    {icon: "/electronic.png", title: "Đồ điện tử"},
                    {icon: "/medicine.png", title: "Y tế"},
                    {icon: "/fashion.png", title: "Thời trang"},
                    {icon: "/others.png", title: "Khác"}
                ]
            }
        },
        methods: {
            onClick(event) {
                let element  = event.currentTarget
                this.$refs.modal.style.display = "block"
                this.$refs.imgModal.src = element.getAttribute('src')  
                //this.$refs.captionModal.innerHTML = element.getAttribute('alt')
            },
            onClose() {
                this.$refs.modal.style.display = "none"
            }
        }
    }
</script>