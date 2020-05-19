<style scoped>
@import "@/assets/frontpage/main.css";
</style>
<template>
  <div class="layout">
    <Layout>
      <Header class="frontpage-header">
        <Menu
          mode="horizontal"
          theme="light"
        >
          <nuxt-link to="/">
            <div class="layout-logo main_title_logo">🍵Teahub Chakela🍮</div>
          </nuxt-link>
          <div class="layout-nav">
            <MenuItem
              name="1"
              to="/teahouse"
            >
            <Icon type="ios-navigate"></Icon>
            首页
            </MenuItem>
            <MenuItem
              name="2"
              to="/teahouse/shop"
            >
            <Icon type="ios-cart-outline" />
            点餐台
            </MenuItem>
            <MenuItem
              name="3"
              to="/teahouse/order"
            >
            <Icon type="ios-paper-outline" />
            订单区
            </MenuItem>
            <MenuItem
              name="4"
              to="/teahouse/info"
            >
            <Icon type="ios-contact-outline" />
            个人中心
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content class="index_content">
        <div
          id="coloregg"
          @click="change"
          class="b-background1 head-pic"
          style="width: 100%;height: 0;padding-bottom: 35%;"
        >
        </div>
        <nuxt-child></nuxt-child>
      </Content>
    </Layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      m14_appear: 0
    }
  },
  computed: {
    ...mapState({ users: state => state.usermodal.user.user })
  },
  methods: {
    async change () {
      this.m14_appear = this.m14_appear + 1
      if (this.m14_appear == 5) {
        this.$Message.warning('啊啦，你要干嘛')
      }
      if (this.m14_appear == 10) {
        this.$Message.warning('不要扒我裙子啦，我会不好意思的（＞人＜；）')
      }
      if (this.m14_appear == 15) {
        this.$Message.warning('不要，啊❤❤❤~~~~~~')
      }
      if (this.m14_appear == 17) {
        var coloregg = document.getElementById('coloregg');//查找元素
        coloregg.className = 'b-background4 head-pic';
        this.$Message.success('这是一个小彩蛋，m14出现啦')
      }
    }
  }
}
</script>

<style>

</style>
