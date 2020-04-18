import axios from 'axios'

const state = () => ({ staff: [] })

const mutations = {
  setStaff (state, val) {
    state.staff = val
  },
  addStaff (state, payload) {
    console.log(payload)
    state.staff.staff.push(payload.staff[0])
  },
  removeStaff (state, removeID) {
    const i = state.staff.staff.findIndex(x => x.id === removeID)
    if (i !== -1) {
      state.staff.staff.splice(i, 1)
    }
  },
  changeStaff (state, staff) {
    const i = state.staff.staff.findIndex(x => x.id === staff.id)
    if (i !== -1) {
      state.staff.staff.splice(i, 1, staff)
    }
  }
}

const actions = {
  setStaff: ({ commit }, staff) => {
    commit('setStaff', staff)
  },
  async addWorkerSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/worker_manage/addStaff`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('addStaff', {
        staff: result.filter(item => item.staffid.length).map(item => {
          return {
            id: item.staffid,
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
      })
    }
  },
  async removeWorkerSubmit ({ commit }, formData) {
    let { status, data: { code, msg, removeID } } = await axios.post(`/manager/worker_manage/removeStaff`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('removeStaff', removeID)
    }
  },
  async changeWorkerSubmit ({ commit }, formData) {
    let { status, data: { code, msg, staff } } = await axios.post(`/manager/worker_manage/changeStaff`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('changeStaff', staff)
    }
  },
  async searchWorkerSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/worker_manage/searchStaff`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('setStaff', {
        staff: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.staffname,
            sex: item.staffsex,
            workdate: item.staffworkdate,
            photo: item.staffphoto,
            email: item.staffemail,
            phonenumber: item.staffphonenumber,
            password: item.staffpassword
          }
        })
      })
    }
  }
}

export default { namespaced: true, state, mutations, actions }