<template>
  <div>
    <shop-preview
      v-for="shop in shopList"
      :key="shop.id"
      :id="shop.id"
      :title="shop.title"
      :desc="shop.desc"
      :type="shop.type"
      :thumbnail="shop.thumbnail"
      :is-admin="isAdmin"
      style="margin: 10px; display: inline-block" />
  </div>
</template>

<script>

export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    shopList: {
      type: Array
    }
  }
}
</script>
