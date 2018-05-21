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
      Ngày tạo: {{loadedShop.updatedDate}}
    </div>
    <div>
      <ShopForm :shop="loadedShop" @submit="onEdited"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ShopForm from '~/components/Shops/ShopForm'

export default {
  components: {
    ShopForm
  },
  asyncData(context) {
    return axios.get('https://nuxt-blog-12734.firebaseio.com/shops/' + context.params.shopId + '.json')
      .then(res => {
        return {
          loadedShop: {...res.data, id: context.params.shopId}
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
