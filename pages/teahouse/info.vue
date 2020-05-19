<template>
  <infopage @changeInfoSubmit="changeInfoSubmit" />
</template>

<script>
import infopage from '@/components/frontplatform/frontpage/info'
export default {
  components: {
    infopage
  },
  methods: {
    async changeInfoSubmit (formData) {
      let { status, data: { code, msg, staff } } = await this.$axios.post(`/teahouse/info/changeInfo`, formData, {
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