<template>
  <div>
    <shop-form @submit="onSubmitted"/>
  </div>
</template>

<script>
import axios from "axios"

export default {
  middleware: ['check-auth','auth'],
  layout: 'main',
  methods: {
    onSubmitted(shopData) {
      this.$store.dispatch("addShop", shopData).then(() => {
        this.$router.push("/shops")
      })
    }
  }
}
</script>
