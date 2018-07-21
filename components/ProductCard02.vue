<template>
    <section>
        <div class="w3-border w3-border w3-white w3-hover-shadow">
            <div class="w3-display-container">
                <img src="https://picsum.photos/600/600/?image=41" width="200" height="150" style="width:100%">
                <span class="w3-tag w3-display-topleft">New</span>
                <div class="w3-display-middle w3-display-hover">
                    <nuxt-link to="/items/dsds" class="w3-button w3-black" target="_blank">Chi tiết <i class="fa fa-external-link"></i></nuxt-link>
                </div>
            </div>
            <div class="w3-container w3-padding">
                <p>Mega Ripped Jeans<br><b>$19.99</b></p>
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