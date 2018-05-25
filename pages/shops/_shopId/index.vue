<template>
  <div>
    <div>
      ID: {{loadedShop.id}}
    </div>
    <div>
      Tên: {{loadedShop.title}}
    </div>
    <div>
      Miêu tả: {{loadedShop.desc}}
    </div>
    <div>
      Ngày tạo: {{loadedShop.updatedDate | date}}
    </div>
    <div>
      <ShopForm :shop="loadedShop" @submit="onEdited"/>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'main',
  asyncData(context) {
    return context.app.$axios
      .$get('/shops/' + context.params.shopId + '.json')
      .then(data => {
        return {
          loadedShop: {...data, id: context.params.shopId}
        }
      })
      .catch(e => context.error(e))
  },
  methods: {
    onEdited(editedShop) {
      this.$store.dispatch("editShop", editedShop).then(() => {
        this.$router.push('/shops/' + this.$route.params.shopId)
      })
    }
  }
}
</script>

<!--
  Editing shop should be here as a modal form and re-use ShopForm component
  ToDo: Implement Auto refresh to view new change
-->
