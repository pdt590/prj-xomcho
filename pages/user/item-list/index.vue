<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <h5><strong>Sản phẩm của bạn</strong></h5><br>
            <ul class="w3-ul w3-border-top">
                <li v-for="i in 3" :key="i" class="w3-bar">
                    <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-close"></i></span>
                    <nuxt-link to="/items/df123/edit-shop" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                    <nuxt-link to="/items/th345">
                        <img src="https://picsum.photos/600/600/?image=32" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                    </nuxt-link>
                    <div class="w3-bar-item">
                        <span class="w3-large">Mike</span><br>
                        <nuxt-link to="/shops/df123">Shop duythang</nuxt-link>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>