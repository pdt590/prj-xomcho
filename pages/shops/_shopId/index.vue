<template>
  <div>
    <ShopForm :shop="loadedShop"/>
  </div>
</template>

<script>
import ShopForm from "~/components/Shops/ShopForm";

export default {
  components: {
    ShopForm
  },
  data () {
    return {
      loadedShop: {
        desc: 'Bán rau',
        type: '3',
        thumbnail: 'http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/502435-iStock-157773518.jpg'
      }
    }
  }
}
</script>
