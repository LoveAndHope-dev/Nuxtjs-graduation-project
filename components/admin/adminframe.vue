<style scoped>
@import "@/assets/admin/main.css";
</style>
<template>
  <div class="layout">
    <Sider class="admin_sider">
      <nuxt-link to="/">
        <div class="main_title_logo">🍵TeaHub<br>Chakela🍮</div>
      </nuxt-link>
      <Menu
        theme="dark"
        width="auto"
      >
        <MenuGroup title="食品管理">
          <MenuItem
            name="1"
            to="/manager/tea_manage"
          >
          <Icon type="md-leaf" />
          茶品管理
          </MenuItem>
          <MenuItem
            name="2"
            to="/manager/cake_manage"
          >
          <Icon type="md-ice-cream" />
          茶点管理
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="人员管理">
          <MenuItem
            name="3"
            to="/manager/worker_manage"
          >
          <Icon type="md-contacts" />
          工作人员管理
          </MenuItem>
          <MenuItem
            name="4"
            to="/manager/manager_manage"
            v-if="users[0].type === true"
          >
          <Icon type="md-contact" />
          管理员管理
          </MenuItem>
          <div v-else></div>
        </MenuGroup>
        <MenuGroup title="杂项">
          <MenuItem
            name="5"
            to="/manager/table_manage"
          >
          <Icon type="md-desktop" />桌位管理
          </MenuItem>
          <MenuItem
            name="6"
            to="/manager/order_manage"
          >
          <Icon type="md-paper" />订单管理
          </MenuItem>
          <MenuItem
            name="7"
            to="/manager/article_manage"
          >
          <Icon type="md-book" />文章管理
          </MenuItem>
          <MenuItem
            name="8"
            to="/manager/myself_infomation"
          >
          <Icon type="md-people" />个人信息
          </MenuItem>
          <MenuItem
            name="9"
            to="/manager"
          >
          <Icon type="ios-apps-outline" />管理员首页
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px', marginTop: '20px'}">
      <Content class="content_background">
        <nuxt-child></nuxt-child>
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