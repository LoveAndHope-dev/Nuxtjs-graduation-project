import axios from 'axios'

const state = () => ({ admin: [] })

const mutations = {
  setadmin (state, val) {
    state.admin = val
  },
  addadmin (state, payload) {
    console.log(payload)
    state.admin.admin.push(payload.admin[0])
  },
  removeadmin (state, removeID) {
    const i = state.admin.admin.findIndex(x => x.id === removeID)
    if (i !== -1) {
      state.admin.admin.splice(i, 1)
    }
  },
  changeadmin (state, admin) {
    const i = state.admin.admin.findIndex(x => x.id === admin.id)
    if (i !== -1) {
      state.admin.admin.splice(i, 1, admin)
    }
  }
}

const actions = {
  setadmin: ({ commit }, admin) => {
    commit('setadmin', admin)
  },
  async addadminSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/manager_manage/addadmin`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('addadmin', {
        admin: result.filter(item => item.adminid.length).map(item => {
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
      })
    }
  },
  async removeadminSubmit ({ commit }, formData) {
    let { status, data: { code, msg, removeID } } = await axios.post(`/manager/manager_manage/removeadmin`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('removeadmin', removeID)
    }
  },
  async changeadminSubmit ({ commit }, formData) {
    let { status, data: { code, msg, admin } } = await axios.post(`/manager/manager_manage/changeadmin`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('changeadmin', admin)
    }
  },
  async searchadminSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/manager_manage/searchadmin`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('setadmin', {
        admin: result.filter(item => item._id.length).map(item => {
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
      })
    }
  }
}

export default { namespaced: true, state, mutations, actions }