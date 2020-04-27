<style scoped>
@import "@/assets/admin/main.css";
</style>
<template>
  <div class="layout">
    <Sider class="admin_sider">
      <nuxt-link to="/manager">
        <div class="main_title_logo">🍵TeaHub<br>Chakela🍮</div>
      </nuxt-link>
      <Menu
        :open-names="['1']"
        active-name="active"
        theme="dark"
        width="auto"
      >
        <MenuGroup title="食品管理">
          <nuxt-link to="/manager/tea_manage">
            <MenuItem name="1">
            <Icon type="md-leaf" />
            茶品管理
            </MenuItem>
          </nuxt-link>
          <nuxt-link to="/manager/cake_manage">
            <MenuItem name="2">
            <Icon type="md-ice-cream" />
            茶点管理
            </MenuItem>
          </nuxt-link>
        </MenuGroup>
        <MenuGroup title="人员管理">
          <nuxt-link to="/manager/worker_manage">
            <MenuItem name="3">
            <Icon type="md-contacts" />
            工作人员管理
            </MenuItem>
          </nuxt-link>
          <nuxt-link
            to="/manager/manager_manage"
            v-if="users[0].type === true"
          >
            <MenuItem name="4">
            <Icon type="md-contact" />
            管理员管理
            </MenuItem>
          </nuxt-link>
          <div v-else></div>
        </MenuGroup>
        <MenuGroup title="杂项">
          <nuxt-link to="/manager/table_manage">
            <MenuItem name="5">
            <Icon type="md-desktop" />桌位管理
            </MenuItem>
          </nuxt-link>
          <nuxt-link to="/manager/order_manage">
            <MenuItem name="6">
            <Icon type="md-paper" />订单管理</MenuItem>
          </nuxt-link>
          <nuxt-link to="/manager/article_manage">
            <MenuItem name="7">
            <Icon type="md-book" />文章管理</MenuItem>
          </nuxt-link>
          <nuxt-link to="/manager/myself_infomation">
            <MenuItem name="8">
            <Icon type="md-people" />个人信息</MenuItem>
          </nuxt-link>
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