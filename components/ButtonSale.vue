<template>
    <section>
        <button @click="openSaleModal" class="w3-button w3-green" style="width: 100%; min-width:70px">Mua </button>
        <div ref="modal" class="w3-modal" style="z-index:1002;">
            <div class="w3-modal-content w3-animate-zoom" style="max-width:500px; margin-top: 50px">
                <div class="w3-container w3-padding w3-green">
                    <span @click="closeSaleModal"
                    class="w3-button w3-green w3-right w3-xlarge"><i class="fa fa-remove"></i></span>
                    <h4>Gửi yêu cầu</h4>
                </div>
                <div class="w3-panel">
                    <label>Tên của bạn</label>
                    <input class="w3-input w3-border w3-margin-bottom" type="text">
                    <label>Số điện thoại / email</label>
                    <input class="w3-input w3-border w3-margin-bottom" type="text">
                    <label>Số lượng</label>
                    <input class="w3-input w3-border w3-margin-bottom" type="text">
                    <label>Tin nhắn nếu có</label>
                    <textarea class="w3-input w3-border" rows="2" style="resize:none"></textarea>
                    <div class="w3-section">
                        <a class="w3-button w3-blue" href="https://facebook.com" target=_blank><i class="fa fa-facebook w3-xlarge"></i></a>
                        <a class="w3-button w3-red" href="tel:016727735514" target=_blank><i class="fa fa-phone w3-xlarge"></i></a>
                        <a class="w3-button w3-green w3-right" style="min-width: 100px"><i class="fa fa-paper-plane w3-xlarge"></i></a> 
                    </div>    
                </div>
            </div>
        </div>
        <!--<div ref="modal" class="w3-modal w3-text-black" style="z-index:1002">
            <div class="w3-modal-content w3-card w3-animate-zoom" style="max-width:500px">
                <div class="w3-center"><br>
                    <span @click="closeSaleModal" 
                        class="w3-button w3-xlarge w3-transparent w3-light-grey w3-display-topright" 
                        title="Close Modal">×</span>
                </div>
                <form class="w3-container">
                    <div class="w3-section ">
                        <h3 class="w3-center"><strong>Gửi yêu cầu mua</strong></h3>
                        <label><b>Tên</b></label>
                        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nhập tên" required>
                        <label><b>Số điện thoại hoặc email</b></label>
                        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nhập thông tin liên hệ" required>
                        <label><b>Số lượng</b></label>
                        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nhập số lượng" required>
                        <label><b>Tin nhắn nếu có</b></label>
                        <textarea class="w3-input w3-border" rows="2" style="resize:none"></textarea>
                        <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Gửi</button>
                        <hr>
                        <a href="https://facebook.com" target=_blank class="w3-button w3-block w3-blue">
                            <i class="fa fa-facebook-official w3-large"></i> 
                            Mua qua facebook
                        </a>                   
                    </div>
                </form>
            </div>
        </div>-->
    </section>
</template>

<script>
    export default {
        methods: {
            openSaleModal() {
                this.$refs.modal.style.display='block'
            },
            closeSaleModal() {
                this.$refs.modal.style.display='none'
            }
        }
    }
</script>