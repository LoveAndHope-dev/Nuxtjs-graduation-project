<template>
  <div>
    <Divider orientation="left">管理员管理</Divider>
    <managerfunc />
    <Divider orientation="left">人员列表</Divider>
    <managercontent :person="persons" />
  </div>
</template>

<script>
import managerfunc from '@/components/admin/adminpage/managermanage/manager_func'
import managercontent from '@/components/admin/adminpage/managermanage/manager_content'
export default {
  components: {
    managercontent,
    managerfunc
  },
  data () {
    return {
      persons: Array

    }
  },
  async asyncData (ctx) {
    let { status, data: { code, result } } = await ctx.$axios.get('/manager/manager_manage/getManager')
    if (status === 200 && code === 0) {
      return {
        persons: result.filter(item => item.adminid.length).map(item => {
          return {
            id: item.adminid,
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
  }
}
</script>

<style scoped>
</style>