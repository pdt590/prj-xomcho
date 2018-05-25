<template>
  <div>
    <shop-list :shop-list="loadedShops" isAdmin/>
  </div>
</template>

<script>

export default {
  layout: 'main',
  computed: {
    loadedShops() {
      return this.$store.getters.loadedShops
    }
  }
}
</script>
