<template>
  <div>
    <shop-form @submit="onSubmitted"/>
  </div>
</template>

<script>
import axios from "axios"

export default {
  methods: {
    onSubmitted(shopData) {
      this.$store.dispatch("addShop", shopData).then(() => {

      })
    }
  }
}
</script>
