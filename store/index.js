import usermodal from './modules/usermodal'

export const modules = {
  usermodal
}

export const actions = {
  async nuxtServerInit ({ commit }, { req, app }) {
    if (req.user && req.user.auth === 'admin') {
      let { status: mistatus, data: { micode, miresult } } = await app.$axios.get('/manager/myself_infomation/getInfo')
      if (mistatus === 200 & micode === 0) {
        commit('usermodal/setUser', {
          user: miresult.filter(item => item._id.length).map(item => {
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
        })
      }
    }
  }
}