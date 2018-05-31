<template>
  <div>
    <shop-list :shop-list="loadedShops" isAdmin/>
  </div>
</template>

<script>

export default {
  computed: {
    loadedShops() {
      return this.$store.getters.loadedShops
    }
  }
}
</script>
