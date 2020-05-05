<template>
  <div>
    <Divider orientation="left">茶点管理</Divider>
    <cakefunc @addCakeSubmit="addCakeSubmit" />
    <Divider orientation="left">茶点列表</Divider>
    <cakecontent
      :cakes="cakes"
      :ismore="isMore"
      @getCakeLists="getCakeLists"
    />
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
    let { status: cmstatus, data: { cmcode, cmresult, isMore } } = await ctx.$axios.get('/manager/cake_manage/getCake')
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
        }),
        isMore
      }
    }
  },
  data () {
    return {
      cake: Array,
      isMore: true
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
        this.getCakeLists({ page: 1 })
        this.$Message.success('添加成功')
      }
    },
    async getCakeLists ({
      word = '',
      pageSize = 15,
      page = 1,
      loadMore = false
    }) {
      let { data: { cmcode, cmresult, isMore } } = await axios.get('/manager/cake_manage/getCake', {
        params: {
          word: word,
          pageSize: pageSize,
          page: page
        }
      });
      if (cmcode == 0) {
        let more = cmresult.filter(item => item._id.length).map(item => {
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
        this.cakes = loadMore
          ? [...this.cakes, ...more]
          : more;
        this.isMore = isMore
      }
    }
  }
}
</script>

<style scoped>
</style>