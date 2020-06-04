<template>
  <div>
    <Divider orientation="left">工作人员管理</Divider>
    <workerfunc @addWorkerSubmit="addWorkerSubmit" />
    <Divider orientation="left">人员列表</Divider>
    <workercontent
      :staffs="staffs"
      :ismore="isMore"
      @getWorkerLists="getWorkerLists"
    />
  </div>
</template>

<script>
import axios from 'axios'
import workercontent from '@/components/admin/adminpage/workermanage/worker_content'
import workerfunc from '@/components/admin/adminpage/workermanage/worker_func'
export default {
  components: {
    workercontent,
    workerfunc
  },
  async asyncData (ctx) {
    let { status, data: { code, result, isMore } } = await ctx.$axios.get('/manager/worker_manage/getStaff')
    if (status === 200 & code === 0) {
      return {
        staffs: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.staffname,
            sex: item.staffsex,
            workdate: item.staffworkdate,
            photo: item.staffphoto,
            email: item.staffemail,
            phonenumber: item.staffphonenumber,
            password: item.staffpassword,
            wages: item.staffwages
          }
        }),
        isMore
      }
    }
  },
  data () {
    return {
      staff: Array,
      isMore: true
    }
  },
  methods: {
    async addWorkerSubmit (formData) {
      let { status, data: { code, msg, result } } = await this.$axios.post(`/manager/worker_manage/addStaff`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.getWorkerLists({page: 1})
        this.$Message.success('添加成功')
      }
    },
    async getWorkerLists ({
      word = '',
      pageSize = 15,
      page = 1,
      loadMore = false
    }) {
      let { data: { code, result, isMore } } = await this.$axios.get('/manager/worker_manage/getStaff', {
        params: {
          word: word,
          pageSize: pageSize,
          page: page
        }
      });
      if (code == 0) {
        let more = result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.staffname,
            sex: item.staffsex,
            workdate: item.staffworkdate,
            photo: item.staffphoto,
            email: item.staffemail,
            phonenumber: item.staffphonenumber,
            password: item.staffpassword,
            wages: item.staffwages
          }
        })
        this.staffs = loadMore
          ? [...this.staffs, ...more]
          : more;
        this.isMore = isMore
      }
    }
  }
}
</script>

<style scoped>
</style>