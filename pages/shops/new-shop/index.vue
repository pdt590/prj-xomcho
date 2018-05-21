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
      this.$store.dispatch("addShop", shopData).then(() => {

      })
    }
  }
}
</script>
