<template>
  <div>
    <shop-list :shop-list="loadedShops" isAdmin/>
  </div>
</template>

<script>
import ShopList from "~/components/Shops/ShopList"

export default {
  components: {
    ShopList
  },
  computed: {
    loadedShops() {
      return this.$store.getters.loadedShops
    }
  }
}
</script>
