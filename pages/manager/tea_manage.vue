<template>
  <div>
    <Divider orientation="left">茶品管理</Divider>
    <teafunc @addDrinkSubmit="addDrinkSubmit" />
    <Divider orientation="left">茶品列表</Divider>
    <teacontent
      :drinks="drinks"
      :ismore="isMore"
      @getTeaLists="getTeaLists"
    />
  </div>
</template>

<script>
import axios from 'axios'
import teafunc from '@/components/admin/adminpage/teamanage/tea_func'
import Teacontent from '@/components/admin/adminpage/teamanage/tea_content'
export default {
  components: {
    Teacontent,
    teafunc
  },
  async asyncData (ctx) {
    let { status: dmstatus, data: { dmcode, dmresult, isMore } } = await ctx.$axios.get('/manager/tea_manage/getDrink')
    if (dmstatus === 200 & dmcode === 0) {
      return {
        drinks: dmresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.drinkname,
            price: item.drinkprice,
            description: item.drinkdescription,
            type: item.drinktype,
            position: item.drinkposition,
            photo: item.drinkphoto
          }
        }),
        isMore
      }
    }
  },
  data () {
    return {
      drink: Array,
      isMore: true
    }
  },
  methods: {
    async addDrinkSubmit (formData) {
      let self = this
      let { status, data: { code, msg, result } } = await this.$axios.post(`/manager/tea_manage/addDrink`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.getTeaLists({page: 1})
        this.$Message.success('添加成功')
      }
    },
    async getTeaLists ({
      word = '',
      pageSize = 15,
      page = 1,
      loadMore = false
    }) {
      let { data: { dmcode, dmresult, isMore } } = await this.$axios.get('/manager/tea_manage/getDrink', {
        params: {
          word: word,
          pageSize: pageSize,
          page: page
        }
      });
      if (dmcode == 0) {
        let more = dmresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.drinkname,
            price: item.drinkprice,
            description: item.drinkdescription,
            type: item.drinktype,
            position: item.drinkposition,
            photo: item.drinkphoto
          }
        })
        this.drinks = loadMore
          ? [...this.drinks, ...more]
          : more;
        this.isMore = isMore
      }
    }
  }
}
</script>

<style scoped>
</style>