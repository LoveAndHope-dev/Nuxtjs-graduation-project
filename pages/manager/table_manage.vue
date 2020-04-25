<template>
  <div>
    <Divider orientation="left">桌位管理</Divider>
    <card>
      <Row>
        <Col span="8">
        <tablefunc
          @addTableSubmit="addTableSubmit"
          @searchTableSubmit="searchTableSubmit"
        />
        </Col>
        <Col
          offset="2"
          span="14"
        >
        <tablecontent :tables="tables" />
        </col>
      </Row>
    </card>
  </div>
</template>

<script>
import axios from 'axios'
import tablecontent from '@/components/admin/adminpage/tablemanage/table_content'
import tablefunc from '@/components/admin/adminpage/tablemanage/table_func'
export default {
  components: {
    tablecontent,
    tablefunc
  },
  async asyncData (ctx) {
    let { status: tmstatus, data: { tmcode, tmresult } } = await ctx.$axios.get('/manager/table_manage/getTable')
    if (tmstatus === 200 & tmcode === 0) {
      return {
        tables: tmresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.tablename,
            condition: item.tablecondition,
            people: item.tablepeople
          }
        })
      }
    }
  },
  data () {
    return {
      table: Array
    }
  },
  methods: {
    async addTableSubmit (formData) {
      let { status, data: { code, msg, result } } = await axios.post(`/manager/table_manage/addTable`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.tables = result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.tablename,
            condition: item.tablecondition,
            people: item.tablepeople
          }
        })
      }
      this.tables.push(this.table[0])
      this.$Message.success('添加成功')
    },
    async searchTableSubmit (formData) {
      let { status, data: { code, msg, result } } = await axios.post(`/manager/table_manage/searchTable`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.tables = result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.tablename,
            condition: item.tablecondition,
            people: item.tablepeople
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>