<template>
    <section>
        <div ref="modal" class="w3-modal w3-text-black">
            <div class="w3-modal-content w3-card w3-animate-zoom" style="max-width:500px; margin-top: 50px">
                <div class="w3-center"><br>
                    <span @click="closeLoginModal" 
                        class="w3-button w3-xlarge w3-transparent w3-light-grey w3-display-topright" 
                        title="Close Modal">×</span>
                </div>
                <form class="w3-container">
                    <div class="w3-section ">
                        <h3 class="w3-center"><strong>Đăng nhập</strong></h3>
                        <br>
                        <label>Username</label>
                        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nhập username" required>
                        <label>Email</label>
                        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nhập email" required>
                        <label>Mật khẩu</label>
                        <input class="w3-input w3-border" type="text" placeholder="Nhập mật khẩu" required>
                        <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Đăng nhập</button>
                    </div>
                    <hr>
                </form>
                <div class="w3-row-padding w3-margin-bottom">
                    <div class="w3-half w3-margin-bottom">
                        <button class="w3-button w3-block w3-red" disabled>
                            <i class="fa fa-google"></i>
                            Google
                        </button>
                    </div>
                    <div class="w3-half">
                        <button class="w3-button w3-block w3-blue" disabled>
                            <i class="fa fa-facebook-official"></i> 
                            Facebook
                        </button>
                    </div>   
                </div>
                <div class="w3-container w3-border-top w3-round w3-padding w3-light-grey">
                    <button class="w3-button w3-border w3-light-grey">Đăng ký</button>
                    <span class="w3-right w3-padding w3-disabled">Quên <a href="">mật khấu?</a></span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            closeLoginModal() {
                this.$refs.modal.style.display='none'
            }
        }
    }
</script>