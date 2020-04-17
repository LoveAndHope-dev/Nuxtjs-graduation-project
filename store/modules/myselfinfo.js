import axios from 'axios'

const state = () => ({ info: [] })

const mutations = {
  setinfo (state, val) {
    state.info = val
  }
}

const actions = {
  setinfo: ({ commit }, info) => {
    commit('setinfo', info)
  },
  async changeinfoSubmit ({ commit }, formData) {
    let { status, data: { code, msg, info } } = await axios.post(`/manager/myself_infomation/changeInfo`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('setinfo', {
        info: info.filter(item => item.adminid.length).map(item => {
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

export default { namespaced: true, state, mutations, actions }