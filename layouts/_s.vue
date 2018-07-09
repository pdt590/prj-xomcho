<template>
    <section>

        <div class="w3-display-container w3-container w3-center" style="max-width:1500px">
            <img class="w3-image w3-card w3-border w3-border-grey" src="https://picsum.photos/600/300/?image=70" alt="Me" style="max-height: 23rem" width="100%">

            <!-- Navbar (placed at the bottom of the header image) -->
            <div class="w3-bar w3-light-grey w3-round w3-display-bottomright w3-hide-small" style="right: 2rem; bottom:1rem">
                <a href="#contact" class="w3-bar-item w3-button w3-border"><i class="fa fa-photo w3-margin-right"></i>Photo</a>
            </div>
        </div>

        <div class="w3-container w3-margin-top w3-margin-bottom">
            <div class="w3-card w3-border w3-border-grey w3-padding w3-white">
                <h5 class="w3-text-grey"><b><i>Giới thiệu:</i></b></h5>
                <p>This is my shop</p>
            </div>      
        </div>

        <!-- Product grid -->
        <div class="w3-row-padding">
            <div class="w3-col l3 s6 w3-margin-bottom">
                <div class="w3-card w3-border w3-border-grey w3-white">
                    <div class="w3-display-container">
                        <img src="https://picsum.photos/1020/600/?image=29" style="width:100%">
                        <span class="w3-tag w3-display-topleft">New</span>
                        <div class="w3-display-middle w3-display-hover">
                            <button class="w3-button w3-black">Chi tiết <i class="fa fa-shopping-cart"></i></button>
                        </div>
                    </div>
                    <div class="w3-container w3-padding">
                        <p>Mega Ripped Jeans<br><b>$19.99</b></p>
                        <button class="w3-button w3-green w3-right"><i class="">Lưu</i></button>
                    </div>        
                </div>
            </div>
            <div class="w3-col l3 s6 w3-margin-bottom">
                <div class="w3-card w3-border w3-border-grey w3-white">
                    <div class="w3-display-container">
                        <img src="https://picsum.photos/1020/600/?image=29" style="width:100%">
                        <span class="w3-tag w3-display-topleft">New</span>
                        <div class="w3-display-middle w3-display-hover">
                            <button class="w3-button w3-black">Chi tiết <i class="fa fa-shopping-cart"></i></button>
                        </div>
                    </div>
                    <div class="w3-container w3-padding">
                        <p>Mega Ripped Jeans<br><b>$19.99</b></p>
                        <button class="w3-button w3-green w3-right">Lưu <i class=""></i></button>
                    </div>        
                </div>
            </div>
            <div class="w3-col l3 s6 w3-margin-bottom">
                <div class="w3-card w3-border w3-border-grey w3-white">
                    <div class="w3-display-container">
                        <img src="https://picsum.photos/1020/600/?image=29" style="width:100%">
                        <span class="w3-tag w3-display-topleft">New</span>
                        <div class="w3-display-middle w3-display-hover">
                            <button class="w3-button w3-black">Chi tiết <i class="fa fa-shopping-cart"></i></button>
                        </div>
                    </div>
                    <div class="w3-container w3-padding">
                        <p>Mega Ripped Jeans<br><b>$19.99</b></p>
                        <button class="w3-button w3-green w3-right">Lưu <i class=""></i></button>
                    </div>        
                </div>
            </div>
        </div>

        <div class="w3-light-grey w3-center w3-padding-24">Powered by <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a></div>

    </section>
</template>

<script>
    export default {
        layout: 'shop'
    }
</script>