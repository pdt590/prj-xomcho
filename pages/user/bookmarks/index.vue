<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row">
                <a href="javascript:void(0)" @click="openTab($event, 'ShopList')">
                    <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                        <h5><strong>Cửa hàng</strong></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" @click="openTab($event, 'ItemList')">
                    <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding">
                        <h5><strong>Sản phẩm</strong></h5>
                    </div>
                </a>
            </div>
            <hr>     

            <div id="ShopList" class="w3-margin-bottom section">
                <h5><strong>Cửa hàng</strong></h5><br>
                <ul class="w3-ul w3-border-top">
                    <li v-for="i in 5" :key="i" class="w3-bar">
                        <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-close"></i></span>
                        <nuxt-link to="/shops/df123">
                            <img src="https://picsum.photos/600/600/?image=35" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                        </nuxt-link>
                        <div class="w3-bar-item">
                            <span class="w3-large">Mike</span><br>
                            <span>Web Designer</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div id="ItemList" class="section" style="display:none"> 
                <h5><strong>Sản phẩm</strong></h5><br>
                <ul class="w3-ul w3-border-top"><br>
                    <li v-for="i in 3" :key="i" class="w3-bar">
                        <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-close"></i></span>
                        <nuxt-link to="/items/th345">
                            <img src="https://picsum.photos/600/600/?image=32" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                        </nuxt-link>
                        <div class="w3-bar-item">
                            <span class="w3-large">Mike</span><br>
                            <nuxt-link to="/shops/df123" href="javascript:void(0)">Shop duythang</nuxt-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            openTab(event, arg) {
                let i, x, tablinks;
                x = document.getElementsByClassName("section");
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablink");
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
                }
                document.getElementById(arg).style.display = "block";
                event.currentTarget.firstElementChild.className += " w3-border-red";
            }
        }
    }
</script>