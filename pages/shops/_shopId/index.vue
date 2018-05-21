<template>
  <div>
    <div>
      {{$route.params.shopId}}
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
  </div> 
</template>

<script>
import axios from 'axios'

export default {
  asyncData(context) {
    return axios.get('https://nuxt-blog-12734.firebaseio.com/shops/' + context.params.shopId + '.json')
      .then(res => {
        console.log(res.data)
        return {
          loadedShop: res.data
        }
      })
      .catch(e => context.error(e))
  }
}
</script>

<!-- Editing shop should be here as a modal form and re-use ShopForm component -->
