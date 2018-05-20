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
  data () {
    return {
      loadedShops : [
        {
          id: '1',
          title: 'Hoa Qủa',
          desc: 'Bán hoa quả',
          type: '1',
          thumbnail: 'https://www.worldatlas.com/r/w728-h425-c728x425/upload/46/cb/e1/shutterstock-252338818.jpg'
        },
        {
          id: '2',
          title: 'Thịt',
          desc: 'Bán thịt',
          type: '2',
          thumbnail: 'https://wholesalemeatscoventry.co.uk/wp-content/uploads/2015/12/Family-Pack-min.jpg'
        },
        {
          id: '3',
          title: 'Rau',
          desc: 'Bán rau',
          type: '3',
          thumbnail: 'http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/502435-iStock-157773518.jpg',
        },
      ]
    }
  }
}
</script>
