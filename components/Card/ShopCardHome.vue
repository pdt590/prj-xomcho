<template>
    <section>
        <nuxt-link :to="'/shops/' + shopData.shopId" target="_blank">
            <div class="w3-row w3-border w3-hover-shadow">
                <div class="w3-col l3 w3-padding">
                    <img src="https://picsum.photos/300/300/?image=35" style="width:100%">
                </div>
                <div class="w3-col l9 w3-padding">
                    <span class="w3-text-blue" style="font-size: 15px"><strong> {{shopData.shopTitle}}</strong></span><br>
                    <span class="w3-text-grey"><strong>Thời trang, nông sản</strong></span><br>
                    <span class="w3-text-red"><i class="fa fa-neuter"></i> {{shopData.shopLocation}}</span><br>
                    <span><i class="fa fa-clock-o"></i> {{shopData.updatedDate | date}}</span>
                </div>
            </div>  
        </nuxt-link>     
    </section>
</template>

<script>
    export default {
        props: {
            shopData: {
                type: Object,
                required: true
            }
        }
    }
</script>
