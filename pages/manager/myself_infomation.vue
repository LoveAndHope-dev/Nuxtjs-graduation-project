<template>
  <div>
    <Divider orientation="left">个人中心</Divider>
    <myinfo
      :infos="infos"
      @changeInfoSubmit="changeInfoSubmit"
    />
  </div>
</template>

<script>
import axios from 'axios'
import myinfo from '@/components/admin/adminpage/my_info'
import { mapState } from 'vuex'
export default {
  components: {
    myinfo
  },
  computed: {
    ...mapState({ infos: state => state.usermodal.user.user })
  },
  methods: {
    async changeInfoSubmit (formData) {
      let { status, data: { code, msg, info } } = await this.$axios.post(`/manager/myself_infomation/changeInfo`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.$Message.success('修改成功,正在刷新页面')
        setTimeout(function () { location.reload() }, 1000);
      }
    }
  }
}
</script>

<style scoped>
</style>