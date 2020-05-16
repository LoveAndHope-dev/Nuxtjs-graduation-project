<template>
  <div>
    <Divider orientation="left">新品图片上传</Divider>
    <newfunc
      @addPhotoSubmit="addPhotoSubmit"
      :full="full"
    />
    <Divider orientation="left">新品图片预览</Divider>
    <newcontent :photos="photos" />
  </div>
</template>

<script>
import newcontent from '@/components/admin/adminpage/newmanage/newcontent'
import newfunc from '@/components/admin/adminpage/newmanage/newfunc'
export default {
  components: {
    newcontent,
    newfunc
  },
  async asyncData (ctx) {
    let { status, data: { code, result, full } } = await ctx.$axios.get('/manager/new_manage/getPhoto')
    if (status === 200 & code === 0) {
      return {
        photos: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            photo: item.photo
          }
        }),
        full
      }
    }
  },
  methods: {
    async addPhotoSubmit (formData) {
      let self = this
      let { status, data: { code, msg, result } } = await this.$axios.post(`/manager/new_manage/addPhoto`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.$Message.success('添加成功，正在刷新')
        setTimeout(function () { location.reload() }, 1000);
      }
    }
  }
}
</script>

<style scoped>
</style>