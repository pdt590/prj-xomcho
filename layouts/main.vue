<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header">
        <Menu class="layout-menu" mode="horizontal" theme="light" active-name="1">
          <div class="layout-logo">
            <nuxt-link to="/">LOGO</nuxt-link>
          </div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="log-in"></Icon>
              <nuxt-link to="/shops/new-shop">Tạo Cửa Hàng</nuxt-link>
            </MenuItem>
            <MenuItem name="2">
              <Icon type="log-in"></Icon>
              <nuxt-link to="/items">Mua Sản Phẩm</nuxt-link>
            </MenuItem>
            <MenuItem name="3">
              <Button @click="enableModal = true">Tham Gia</Button>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content class="layout-content">
        <nuxt />
      </Content>
      <Footer class="layout-footer">
        This is Footer
      </Footer>
    </Layout>
    <Modal
      title="Tham Gia"
      v-model="enableModal"
      :styles="{top: '120px', width: '500px'}"
    >
      <div>
        <Form v-if="isLogin" ref="formAuth" :model="formAuth" :rules="ruleAuth" inline>
          <FormItem prop="email">
            <Input type="email" v-model="formAuth.email" placeholder="Email">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formAuth.password" placeholder="Password">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>  
        </Form>
        <Form v-else ref="formAuth" :model="formAuth" :rules="ruleAuth" inline>
          <FormItem prop="email">
            <Input type="text" v-model="formAuth.email" placeholder="Email">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="">
            <Input type="text" placeholder="Username">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>  
          <FormItem prop="password">
            <Input type="password" v-model="formAuth.password" placeholder="Password">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>  
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="onSubmit('formAuth')" style='margin: 2px'>{{ isLogin ? 'Đăng nhập' : 'Đăng kí'}}</Button>
        <Button type="primary" size="large" long @click="isLogin =!isLogin" style='margin: 2px'> Chuyển tới {{ isLogin ? 'Đăng kí' : 'Đăng nhập'}}</Button>    
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () { 
    return {
      enableModal: false,
      isLogin: false,
      formAuth: {
        email: '',
        password: ''
      },
      ruleAuth: {
        email: [
          { required: true, message: 'Điền email', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Điền mật khẩu', trigger: 'blur' },
          { type: 'string', min: 6, message: 'Mật khẩu không được ngắn hơn 6 kí tự', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(name) {
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

<style>
  html body {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 600
  }
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo {
    float: left;
    position: relative;
    left: 20px;
  }
  .layout-menu {
    background: #f5f7f9;
  }
  .layout-nav {
    width: 470px;
    margin: 0 auto;
    margin-right: 10px;
  }
  .layout-header {
    position: fixed;
    width: 100%;
    background: #f5f7f9
  }
  .layout-content {
    margin: 88px 20px 0;
    background: #fff;
    min-height: 500px;
  }
  .layout-footer {
     text-align: center;
  }
  .layout-nav a.nuxt-link-active {
    color: red;
  }
</style>