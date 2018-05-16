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
              <nuxt-link to="/users/auth">Đăng Ký / Đăng Nhập</nuxt-link>
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
  </div>
</template>

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
    width: 220px;
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
</style>
