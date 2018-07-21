<template>
    <section>
        <div class="w3-hover-shadow">
            <div class="w3-display-container">
                <img src="https://picsum.photos/600/600/?image=42" class="w3-hover-opacity" style="width:100%">
                <div class="w3-display-middle w3-display-hover">
                    <nuxt-link to="/items/1re43565hy" class="w3-button w3-black" target="_blank">Chi tiết <i class="fa fa-external-link"></i></nuxt-link>
                </div>
            </div>
            <div class="w3-container w3-padding w3-border-bottom w3-border-green">
                <h6>Mega Ripped Jeans<br><b>$19.99</b></h6>
                <div class="w3-bar-item w3-left">
                    <app-btn-saveitem />
                </div>
                <div class="w3-bar-item w3-right">
                    <app-btn-sale />
                </div>
            </div>
        </div>
    </section>
</template>