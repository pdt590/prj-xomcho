<template>
  <div>
    <shop-form @submit="onSubmitted"/>
  </div>
</template>

<script>
import axios from "axios"
import ShopForm from "~/components/Shops/ShopForm"

export default {
  components: {
    ShopForm
  },
  methods: {
    onSubmitted(shopData) {
      axios
      .post('https://nuxt-blog-12734.firebaseio.com/shops.json', {
        ...shopData, 
        updatedDate: new Date()
      })
      .then(result => console.log(result))
      .catch(e => console.log(e))
    }
  }
}
</script>
