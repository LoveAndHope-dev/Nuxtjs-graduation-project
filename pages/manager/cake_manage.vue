<template>
  <div>
    <Divider orientation="left">茶点管理</Divider>
    <cakefunc @addCakeSubmit="addCakeSubmit" />
    <Divider orientation="left">茶点列表</Divider>
    <cakecontent :cakes="cakes" />
  </div>

</template>

<script>
import axios from 'axios'
import cakecontent from '@/components/admin/adminpage/cakemanage/cake_content'
import cakefunc from '@/components/admin/adminpage/cakemanage/cake_func'
export default {
  components: {
    cakecontent,
    cakefunc
  },
  async asyncData (ctx) {
    let { status: cmstatus, data: { cmcode, cmresult } } = await ctx.$axios.get('/manager/cake_manage/getCake')
    if (cmstatus === 200 & cmcode === 0) {
      return {
        cakes: cmresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.cakename,
            price: item.cakeprice,
            description: item.cakedescription,
            type: item.caketype,
            taste: item.caketaste,
            photo: item.cakephoto
          }
        })
      }
    }
  },
  data () {
    return {
      cake: Array
    }
  },
  methods: {
    async addCakeSubmit (formData) {
      let { status, data: { code, msg, result } } = await axios.post(`/manager/cake_manage/addCake`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.cake = result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.cakename,
            price: item.cakeprice,
            description: item.cakedescription,
            type: item.caketype,
            taste: item.caketaste,
            photo: item.cakephoto
          }
        })
        this.cakes.push(this.cake[0])
        this.$Message.success('添加成功')
      }
    }
  }
}
</script>

<style scoped>
</style>