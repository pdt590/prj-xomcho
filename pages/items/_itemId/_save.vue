<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row-padding">
                <h5><strong>Hình ảnh sảm phẩm</strong></h5><br>
                <div class="w3-quarter w3-margin-bottom">
                    <img src="https://picsum.photos/600/600/?image=58" style="width:100%" class="w3-round" @click="openImgModal" alt="Lost Image">
                </div>
            </div>
            <!-- Modal for full size images on click-->
            <div ref="modal" class="w3-modal w3-black">
                <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
                    <span class="w3-button w3-black w3-xlarge w3-display-topright" @click="closeImgModal">×</span>
                    <img ref="imgModal" class="w3-image">
                    <h5 ref="captionModal"></h5>
                </div>
            </div>
            <hr>
            <div class="w3-row">
                <h5><strong>Miêu tả sản phẩm</strong></h5><br>
                <h5>Sản phẩm có những đặc điểm sau</h5>
            </div>
            <hr>     
            <div class="w3-row">
                <h5><strong>Giá sản phẩm</strong></h5><br>
                <div class="w3-col s6">
                    <h6 class="w3-tag w3-yellow"><i class="fa fa-fw fa-dollar"></i> <strong>200.000 VND / 4 cái</strong></h6>
                </div>
                <div class="w3-col s6">
                    <p><i class="fa fa-fw fa-clock-o"></i> Ngày tạo: 20/10/2018</p>
                </div>
            </div>
            <hr>           
            <div class="w3-row">
                <h5><strong>Loại sản phẩm</strong></h5><br>
                <div class="w3-col l4 m4 s6" 
                    v-for="(type, i) in itemTypes" 
                    :key="i">
                    <p>
                        <img :src="type.icon" class="w3-margin-right" style="width:10%;">
                        {{ type.title }}
                    </p>
                </div>
            </div>
            <div class="w3-row">
                <nuxt-link
                    v-if="false"
                    :to="'/items/' + $route.params.itemId + '/edit-item'" 
                    class="w3-button w3-green w3-margin-bottom w3-right w3-quarter">
                    <i class="fa fa-edit w3-large w3-margin-right"></i> 
                    Chỉnh sửa
                </nuxt-link>
                <div v-else class="w3-margin-bottom w3-right w3-quarter">
                    <app-btn-sale />
                </div>
            </div>
        </div>
        <div class="w3-padding w3-white w3-margin-bottom">
            <form>
                <h5><strong>Các nhận xét gần đây</strong></h5><br>
                <p><input class="w3-input w3-border" type="text" placeholder="Name" required name="Name"></p>
                <p><input class="w3-input w3-border" type="email" placeholder="Email" required name="Email"></p>
                <p><input class="w3-input w3-border" type="text" placeholder="Message" required name="Message"></p>
                <div class="w3-row">
                    <button type="submit" class="w3-button w3-green w3-right w3-quarter">Gửi nhận xét <i class="fa fa-send-o w3-margin-left"></i></button>
                </div>
            </form>
            <hr>
            <div class="w3-row">
                <div class="w3-col l1 m2 text-center">
                    <img src="https://picsum.photos/600/600/?image=49" class="w3-circle" style="width:50px;height:50px">
                </div>
                <div class="w3-col l11 m10">
                    <h4>Hoa <span class="w3-opacity w3-medium">Sep 29, 2018, 9:12 PM</span></h4>
                    <p>Chất lượng sản phẩm rất tốt</p>
                </div>
            </div>
            <hr>
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
            openImgModal(event) {
                let element  = event.currentTarget
                this.$refs.modal.style.display = 'block'
                this.$refs.imgModal.src = element.getAttribute('src')  
                //this.$refs.captionModal.innerHTML = element.getAttribute('alt')
                console.log(this.$route.path)
            },
            closeImgModal() {
                this.$refs.modal.style.display = 'none'
            }
        }
    }
</script>