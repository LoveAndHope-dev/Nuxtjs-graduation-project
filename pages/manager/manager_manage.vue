<template>
  <div>
    <Divider orientation="left">管理员管理</Divider>
    <managerfunc @addAdminSubmit="addAdminSubmit" />
    <Divider orientation="left">人员列表</Divider>
    <managercontent
      :admins="admins"
      @searchAdminSubmit="searchAdminSubmit"
    />
  </div>
</template>

<script>
import axios from 'axios'
import managerfunc from '@/components/admin/adminpage/managermanage/manager_func'
import managercontent from '@/components/admin/adminpage/managermanage/manager_content'
export default {
  components: {
    managercontent,
    managerfunc
  },
  async asyncData (ctx) {
    let { status: mmstatus, data: { mmcode, mmresult } } = await ctx.$axios.get('/manager/manager_manage/getAdmin')
    if (mmstatus === 200 && mmcode === 0) {
      return {
        admins: mmresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.adminname,
            sex: item.adminsex,
            email: item.adminemail,
            workdate: item.adminworkdate,
            photo: item.adminphoto,
            phonenumber: item.adminphonenumber,
            password: item.adminpassword,
            type: item.admintype,
            wages: item.adminwages
          }
        })
      }
    }
  },
  methods: {
    async addAdminSubmit (formData) {
      let { status, data: { code, msg, result } } = await axios.post(`/manager/manager_manage/addadmin`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.admin = result.filter(item => item.adminid.length).map(item => {
          return {
            id: item.adminid,
            name: item.adminname,
            sex: item.adminsex,
            workdate: item.adminworkdate,
            photo: item.adminphoto,
            email: item.adminemail,
            phonenumber: item.adminphonenumber,
            password: item.adminpassword,
            type: item.admintype,
            wages: item.adminwages
          }
        })
      }
      this.admins.push(this.admin[0])
      this.$Message.success('添加成功')
    },
    async searchAdminSubmit (formData) {
      let { status, data: { code, msg, result } } = await axios.post(`/manager/manager_manage/searchadmin`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.admins = result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.adminname,
            sex: item.adminsex,
            workdate: item.adminworkdate,
            photo: item.adminphoto,
            email: item.adminemail,
            phonenumber: item.adminphonenumber,
            password: item.adminpassword,
            wages: item.adminwages,
            type: item.admintype
          }
        })
      }
      this.$Message.success('查询成功')
    }
  }
}
</script>

<style scoped>
</style>