<template>
  <div style="padding: 32px;">
    <Button type="success" long size="large" shape="circle" @click="$router.push('/items')">
      Mua Sản Phẩm
    </Button>
    <br><br>
    <Button type="warning" long size="large" shape="circle" @click="$router.push('/shops')">
      Khám phá các cửa hàng
    </Button>
    <br><br>
    <Button type="error" long size="large" shape="circle" @click="$router.push('/shops/new-shop')">
      Tạo cửa hàng online
    </Button>
  </div>
</template>

<script>
export default {

}
</script>
