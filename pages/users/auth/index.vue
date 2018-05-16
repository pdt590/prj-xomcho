<template>
  <div>
    <Form ref="formAuth" :model="formAuth" :rules="ruleAuth" inline>
      <FormItem prop="user">
        <Input type="text" v-model="formAuth.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formAuth.password" placeholder="Password">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSignin('formAuth')">Sign In</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () { 
    return {
      formAuth: {
        user: '',
        password: ''
      },
      ruleAuth: {
        user: [
          { required: true, message: 'Điền username', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Điền mật khẩu', trigger: 'blur' },
          { type: 'string', min: 6, message: 'Mật khẩu không được ngắn hơn 6 kí tự', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSignin(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Thành công !');
        } else {
          this.$Message.error('Lỗi !');
        }
      })
    }
  }
}
</script>
