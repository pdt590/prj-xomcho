<template>
    <section>
        <div class="w3-padding">
            <div class="w3-row w3-content" style="max-width:1300px">
                <div class="w3-container w3-large w3-third">
                    <h4 class="w3-bottombar w3-border-green"><strong>Thông tin liên hệ</strong></h4>
                    <p>
                        <a href="https://maps.google.com/?q=Long Biên, Hà Nội" target=_blank>
                            <img src="/location.svg" class="w3-round w3-margin-right" style="width:8%;" alt="location_icon">
                        </a>
                        Hà Nội
                    </p>
                    <p>
                        <a href="tel:016727735514">
                            <img src="/phone.svg" class="w3-round w3-margin-right" style="width:8%;" alt="phone_icon">
                        </a>
                        017627735514
                    </p>
                    <p>
                        <a href="mailto:thangecp@gmail.com?Subject=Xin%20Chào%20Cửa%20Hàng">
                            <img src="/email.svg" class="w3-round w3-margin-right" style="width:8%;" alt="email_icon">
                        </a> 
                        thangecp@gmail.com
                    </p>
                </div>
                <div class="w3-container w3-large w3-third">
                    <h4 class="w3-bottombar w3-border-red"><strong>Thông tin chung</strong></h4>
                    <nuxt-link to="/">Trang chủ</nuxt-link><br><br>
                    <nuxt-link to="/about">Giới thiệu</nuxt-link><br><br>
                    <nuxt-link to="/pricing">Dịch vụ</nuxt-link><br><br>
                </div>
                <div class="w3-container w3-large w3-third">
                    <h4 class="w3-bottombar w3-border-orange"><strong>Links</strong></h4>
                    <p><i class="fa fa-facebook-official w3-xxlarge w3-margin-right"></i>Facebook</p>
                </div>
            </div>
        </div>
        
    </section>
</template>
