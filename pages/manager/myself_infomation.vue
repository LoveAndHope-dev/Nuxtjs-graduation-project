<template>
  <div>
    <Divider orientation="left">个人中心</Divider>
    <myinfo
      :infos="infos"
      @changeInfoSubmit="changeInfoSubmit"
    />
  </div>
</template>

<script>
import axios from 'axios'
import myinfo from '@/components/admin/adminpage/my_info'
export default {
  components: {
    myinfo
  },
  async asyncData (ctx) {
    let { status: mistatus, data: { micode, miresult } } = await ctx.$axios.get('/manager/myself_infomation/getInfo')
    if (mistatus === 200 & micode === 0) {
      return {
        infos: miresult.filter(item => item._id.length).map(item => {
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
    async changeInfoSubmit (formData) {
      let { status, data: { code, msg, info } } = await axios.post(`/manager/myself_infomation/changeInfo`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.infos = info.filter(item => item._id.length).map(item => {
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
  }
}
</script>

<style scoped>
</style>