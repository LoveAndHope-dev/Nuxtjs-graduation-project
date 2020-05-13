import usermodal from './modules/usermodal'
import positionmodal from './modules/positionmodal'

export const modules = {
  usermodal,
  positionmodal
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
              wages: item.adminwages,
              isadmin: true
            }
          })
        })
      }
    } else if (req.user && req.user.auth === 'staff') {
      let { status: smistatus, data: { smicode, smiresult } } = await app.$axios.get('/teahouse/info/getInfo')
      if (smistatus === 200 & smicode === 0) {
        commit('usermodal/setUser', {
          user: smiresult.filter(item => item._id.length).map(item => {
            return {
              id: item._id,
              name: item.staffname,
              sex: item.staffsex,
              email: item.staffemail,
              workdate: item.staffworkdate,
              photo: item.staffphoto,
              phonenumber: item.staffphonenumber,
              password: item.staffpassword,
              wages: item.staffwages,
              isadmin: false
            }
          })
        })
      }
    }
  }
}