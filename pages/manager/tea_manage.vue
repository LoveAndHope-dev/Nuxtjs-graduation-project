<template>
  <div>
    <Divider orientation="left">茶品管理</Divider>
    <teafunc @addDrinkSubmit="addDrinkSubmit" />
    <Divider orientation="left">茶品列表</Divider>
    <teacontent :drinks="drinks" />
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
    let { status: dmstatus, data: { dmcode, dmresult } } = await ctx.$axios.get('/manager/tea_manage/getDrink')
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
        })
      }
    }
  },
  data () {
    return {
      drink: Array
    }
  },
  methods: {
    async addDrinkSubmit (formData) {
      let self = this
      let { status, data: { code, msg, result } } = await axios.post(`/manager/tea_manage/addDrink`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.drink = result.filter(item => item._id.length).map(item => {
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
        this.drinks.push(this.drink[0])
        this.$Message.success('添加成功')
      }
    }
  }
}
</script>

<style scoped>
</style>