<template>
  <div>
    <div v-for="shop in shopList" :key="shop.id" style="margin: 10px; display: inline-block">
      <card style="width:350px">
        <p slot="title">
          <Icon type="ios-film0outline"></Icon>
          Cửa hàng
        </p>
        <nuxt-link  slot="extra" to="/shops/1">
          <Icon type="ios-loop-strong"></Icon>
          Change
        </nuxt-link>
        <div style="text-align:center">
          <img :src="shop.shopUrl"  height="200" width="300">
        </div>
        <p>Tên cửa hàng: {{shop.shopName}}</p>
        <p>Loại cửa hàng: {{shop.shopType}}</p>
        <p>Miêu tả: {{shop.shopDesc}}</p>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shopList : [
        {
          shopName: 'Hoa Qủa',
          shopDesc: 'Bán hoa quả',
          shopType: '1',
          shopUrl: 'https://www.worldatlas.com/r/w728-h425-c728x425/upload/46/cb/e1/shutterstock-252338818.jpg'
        },
        {
          shopName: 'Thịt',
          shopDesc: 'Bán thịt',
          shopType: '2',
          shopUrl: 'https://wholesalemeatscoventry.co.uk/wp-content/uploads/2015/12/Family-Pack-min.jpg'
        },
        {
          shopName: 'Rau',
          shopDesc: 'Bán rau',
          shopType: '3',
          shopUrl: 'http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/502435-iStock-157773518.jpg',
        },
      ]
    }
  }
}
</script>
