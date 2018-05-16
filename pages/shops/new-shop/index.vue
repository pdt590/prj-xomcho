<template>
  <div>
    <Form ref="formNewShop" :model="formNewShop" :rules="ruleNewShop" :label-width="130">
      <FormItem label="Tên cửa hàng" prop="shopName">
        <Input v-model="formNewShop.shopName" placeholder="Đặt tên cửa hàng"></Input>
      </FormItem>
      <FormItem label="Miêu tả" prop="shopDesc">
        <Input v-model="formNewShop.shopDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="Loại cửa hàng" prop="shopType">
        <Select v-model="formNewShop.shopType" placeholder="Lựa chọn loại cửa hàng">
            <Option value="1">Mỹ Phẩm/Thời Trang</Option>
            <Option value="2">Sản Phẩm Nông Nghiệp</Option>
            <Option value="3">Đồ Điện Tử</Option>
            <Option value="4">Khác</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSubmit('formNewShop')">Submit</Button>
        <Button type="ghost" @click="onReset('formNewShop')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default { 
  data () {
    return {
      formNewShop: {
        shopName: '',
        shopDesc: '',
        shopType: ''
      },
      ruleNewShop: {
        shopName: [
          { required: true, message: 'Vui lòng điền tên cửa hàng', trigger: 'blur' },
          { type: 'string', trigger: 'blur' }
        ],
        shopDesc: [
          { required: true, message: 'Vui lòng điền miêu tả về cửa hàng', trigger: 'blur' },
          { type: 'string', min: 10, message: 'Miêu tả về cửa hàng không được ngắn quá 10 từ', trigger: 'blur' }
        ],
        shopType: [
          { required: true, message: 'Vui lòng chọn loại cửa hàng', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    onReset(name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>
