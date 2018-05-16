<template>
  <div>
    <Form ref="formNewItem" :model="formNewItem" :rules="ruleNewItem" :label-width="130">
      <FormItem label="Tên sản phẩm" prop="itemName">
        <Input v-model="formNewItem.itemName" placeholder="Đặt tên sản phẩm"></Input>
      </FormItem>
      <FormItem label="Giá" prop="itemPrice">
        <Input v-model="formNewItem.itemPrice" placeholder="Điền giá sản phẩm">
          <Select v-model="formNewItem.itemPriceType" slot="append" style="width: 100px">
            <Option value="VND">VND</Option>
          </Select>
        </Input>
      </FormItem>
      <FormItem label="Miêu tả" prop="itemDesc">
        <Input v-model="formNewItem.itemDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSubmit('formNewItem')">Submit</Button>
        <Button type="ghost" @click="onReset('formNewItem')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default { 
  data () {
    return {
      formNewItem: {
        itemName: '',
        itemPrice:'',
        itemPriceType:'VND',
        itemDesc: ''
      },
      ruleNewItem: {
        itemName: [
          { required: true, message: 'Vui lòng điền tên sản phẩm', trigger: 'blur' },
          { type: 'string', trigger: 'blur' }
        ],
        itemPrice: [
          { required: true, message: 'Vui Lòng điền giá sản phẩm', trigger: 'blur' },
        ],
        itemDesc: [
          { required: true, message: 'Vui lòng điền thông tin về sản phẩm', trigger: 'blur' },
          { type: 'string', min: 10, message: 'Thông tin về sản phẩm không ngắn qua 10 từ', trigger: 'blur' }
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