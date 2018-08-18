<template>
    <section>
        <div class="w3-border w3-border-grey w3-white w3-hover-shadow">
            <div class="w3-display-container"> 
                <span class="w3-tag w3-display-topleft">New</span>
                <nuxt-link :to="$route.path + '/' + itemData.itemId">
                    <img src="https://picsum.photos/600/600/?image=41" width="200" height="150" style="width:100%">
                </nuxt-link>
            </div>
            <div class="w3-container w3-padding">
                <p>{{itemData.title}}<br><b>{{itemData.price}}</b></p>
                <div class="w3-bar-item w3-left">
                    <app-btn-saveitem />
                </div>
                <div class="w3-bar-item w3-right">
                    <app-btn-salecard />
                </div>
            </div>        
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            itemData: {
                type: Object,
                required: true
            }
        }   
    }
</script>
