<style scoped>
@import "@/assets/admin/main.css";
</style>
<template>
  <div class="layout">
    <Sider
      collapsible
      :collapsed-width="78"
      v-model="isCollapsed"
      :class="siderstyle"
    >
      <nuxt-link to="/manager">
        <div
          v-if="!isCollapsed"
          class="main_title_logo"
        >🍵TeaHub<br>Chakela🍮</div>
        <div
          v-else
          class="main_title_logo_small"
        >🍵</div>
      </nuxt-link>
      <Menu
        theme="dark"
        width="auto"
      >
        <Submenu name="1">
          <p slot="title">
            <span>食品管理</span></p>
          <MenuItem
            name="1"
            to="/manager/tea_manage"
          >
          <Icon type="md-leaf" />
          <span>茶品管理</span>
          </MenuItem>
          <MenuItem
            name="2"
            to="/manager/cake_manage"
          >
          <Icon type="md-ice-cream" />
          <span>茶点管理</span>
          </MenuItem>
        </Submenu>
        <Submenu name="2">
          <p slot="title">
            <span>人员管理</span>
          </p>
          <MenuItem
            name="3"
            to="/manager/worker_manage"
          >
          <Icon type="md-contacts" />
          <span>工作人员管理</span>
          </MenuItem>
          <MenuItem
            name="4"
            to="/manager/manager_manage"
            v-if="users[0].type === true"
          >
          <Icon type="md-contact" />
          <span>管理员管理</span>
          </MenuItem>
          <div v-else></div>
        </Submenu>
        <Submenu name="3">
          <p slot="title">
            <span>杂项</span>
          </p>
          <MenuItem
            name="5"
            to="/manager/table_manage"
          >
          <Icon type="md-desktop" />
          <span>桌位管理</span>
          </MenuItem>
          <MenuItem
            name="6"
            to="/manager/order_manage"
          >
          <Icon type="md-paper" />
          <span>订单查看</span>
          </MenuItem>
          <MenuItem
            name="7"
            to="/manager/article_manage"
          >
          <Icon type="md-book" />
          <span>文章管理</span>
          </MenuItem>
          <MenuItem
            name="8"
            to="/manager/new_manage"
          >
          <Icon type="logo-designernews" />
          <span>新品图片上传</span>
          </MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout
      :style="contentstyle"
      class="transport-s-or-l"
    >
      <Header style="z-index:500;position:fixed;width: 100%;top: 0; background: #fff; boxShadow:0 2px 0 0 rgba(0,0,0,.1)">
        <headercomp :users="users" />
      </Header>
      <Content class="content_background">
        <nuxt-child></nuxt-child>
      </Content>
    </Layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import headercomp from '@/components/admin/headercomp'
export default {
  components: {
    headercomp
  },
  data () {
    return {
      isCollapsed: false
    };
  },
  computed: {
    ...mapState({ users: state => state.usermodal.user.user }),
    contentstyle: function () {
      return this.isCollapsed ? `margin-left:78px` : `margin-left:200px`
    },
    siderstyle: function () {
      return [
        'admin_sider',
        this.isCollapsed ? `siderchange` : ``
      ]
    }
  }
}
</script>