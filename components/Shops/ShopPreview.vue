<template>
    <div>
      <card style="width:350px">
        <p slot="title">
          <Icon type="ios-film0outline"></Icon>
          Cửa hàng
        </p>
        <nuxt-link slot="extra" :to="shopLink">
          <Icon type="ios-loop-strong"></Icon>
          Change
        </nuxt-link>
        <div style="text-align:center">
          <img :src="thumbnail"  height="200" width="300">
        </div>
        <p>Tên cửa hàng: {{title}}</p>
        <p>Loại cửa hàng: {{type}}</p>
        <p>Miêu tả: {{desc}}</p>
      </card>
    </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    shopLink() {
      return this.isAdmin ? '/shops/' + this.id : '/shops'
    }
  }
}
</script>
