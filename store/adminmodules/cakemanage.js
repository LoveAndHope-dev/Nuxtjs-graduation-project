import axios from 'axios'

const state = () => ({ cake: [] })

const mutations = {
  setCake (state, val) {
    state.cake = val
  },
  addCake (state, payload) {
    console.log(payload)
    state.cake.cake.push(payload.cake[0])
  },
  removeCake (state, removeID) {
    const i = state.cake.cake.findIndex(x => x.id === removeID)
    if (i !== -1) {
      state.cake.cake.splice(i, 1)
    }
  },
  changeCake (state, cake) {
    const i = state.cake.cake.findIndex(x => x.id === cake.id)
    if (i !== -1) {
      state.cake.cake.splice(i, 1, cake)
    }
  }
}

const actions = {
  setCake: ({ commit }, cake) => {
    commit('setCake', cake)
  },
  async addcakeSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/cake_manage/addCake`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      console.log(result)
      commit('addCake', {
        cake: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.cakename,
            price: item.cakeprice,
            description: item.cakedescription,
            type: item.caketype,
            taste: item.caketaste,
            photo: item.cakephoto
          }
        })
      })
    }
  },
  async removecakeSubmit ({ commit }, formData) {
    let { status, data: { code, msg, removeID } } = await axios.post(`/manager/cake_manage/removeCake`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('removeCake', removeID)
    }
  },
  async changecakeSubmit ({ commit }, formData) {
    let { status, data: { code, msg, cake } } = await axios.post(`/manager/cake_manage/changeCake`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('changeCake', cake)
    }
  },
  async searchcakeSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/cake_manage/searchCake`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('setCake', {
        cake: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.cakename,
            price: item.cakeprice,
            description: item.cakedescription,
            type: item.caketype,
            taste: item.caketaste,
            photo: item.cakephoto
          }
        })
      })
    }
  }
}

export default { namespaced: true, state, mutations, actions }