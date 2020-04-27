<style scoped>
@import "@/assets/frontpage/main.css";
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu
          mode="horizontal"
          theme="dark"
          active-name="1"
        >
          <div class="layout-logo main_title_logo">🍵Teahub Chakela🍮</div>
          <div class="layout-nav">
            <router-link to="/teahouse">
              <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              首页
              </MenuItem>
            </router-link>
            <router-link to="/teahouse/shop">
              <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              点餐台
              </MenuItem>
            </router-link>
            <router-link to="/teahouse/order">
              <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              订单区
              </MenuItem>
            </router-link>
            <router-link to="/teahouse/info">
              <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              个人中心
              </MenuItem>
            </router-link>
          </div>
        </Menu>
      </Header>
      <Content class="index_content">
        <nuxt-child></nuxt-child>
        {{users}}
      </Content>
    </Layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({ users: state => state.usermodal.user.user })
  }
}
</script>
