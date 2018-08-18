<template>
    <section>
        <nuxt-link :to="'/shops/' + itemData.shopId + '/' + itemData.itemId" target="_blank">
            <img src="https://picsum.photos/600/600/?image=52" class=" w3-hover-shadow" style="width:100%">
        </nuxt-link>
        <div class="w3-container w3-padding">
            <h6>{{itemData.title}}<br><b class="w3-text-red">{{itemData.price}} {{itemData.currency}}</b></h6>
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
