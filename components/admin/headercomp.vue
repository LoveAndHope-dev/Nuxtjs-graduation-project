<template>
  <div class="header-right">
    <Poptip
      trigger="hover"
      placement="bottom"
    >
      <div slot="title">
        {{users[0].name}}
      </div>
      <div slot="content">
        <nuxt-link to="/manager/myself_infomation">
          <Button class="pop-item">个人信息</Button>
        </nuxt-link><br />
        <nuxt-link to="/">
          <Button class="pop-item">退回主界面</Button>
        </nuxt-link><br />
        <Button
          class="pop-item"
          type="error"
          @click="exit()"
        >退出登录</Button>
      </div>
      <Avatar
        shape="square"
        icon="ios-person"
        size="large"
        :src="users[0].photo"
      />
    </Poptip>
  </div>
</template>

<style scoped>
@import "@/assets/admin/main.css";
</style>

<script>
export default {
  props: {
    users: null
  },
  methods: {
    async exit () {
      this.$Message.success('你已经退出，请重新登录')
      this.$router.push('/exit')
    }
  }
}
</script>