<template>
  <div>
    <Form ref="formNewShop" :model="formNewShop" :rules="ruleNewShop" :label-width="130">
      <FormItem label="Tên cửa hàng" prop="title">
        <Input v-model="formNewShop.title" placeholder="Đặt tên cửa hàng"></Input>
      </FormItem>
      <FormItem label="Miêu tả" prop="desc">
        <Input v-model="formNewShop.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="Url" prop="thumbnail">
        <Input v-model="formNewShop.thumbnail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="Loại cửa hàng" prop="type">
        <Select v-model="formNewShop.type" placeholder="Lựa chọn loại cửa hàng">
            <Option value="1">Mỹ Phẩm/Thời Trang</Option>
            <Option value="2">Sản Phẩm Nông Nghiệp</Option>
            <Option value="3">Đồ Điện Tử</Option>
            <Option value="4">Khác</Option>
        </Select>
      </FormItem>
      <FormItem label="Tên cửa hàng" prop="title">
        <Input v-model="formNewShop.author" placeholder="Người tạo"></Input>
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
  props: {
    shop: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      formNewShop: this.shop
      ? {...this.shop}
      : {
        title: '',
        desc: '',
        type: '',
        thumbnail: '',
        updatedDate:'',
        author: ''
      },
      ruleNewShop: {
        title: [
          { required: true, message: 'Vui lòng điền tên cửa hàng', trigger: 'blur' },
          { type: 'string', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: 'Vui lòng điền miêu tả về cửa hàng', trigger: 'blur' },
          { type: 'string', min: 10, message: 'Miêu tả về cửa hàng không được ngắn quá 10 từ', trigger: 'blur' }
        ],
        type: [
          { required: true, message: 'Vui lòng chọn loại cửa hàng', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.formNewShop);
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    onReset(name) {
      this.$refs[name].resetFields();
    }
  },
  layout: 'main'
}
</script>
