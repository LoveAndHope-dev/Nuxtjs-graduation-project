import axios from 'axios'

const state = () => ({ drink: [] })

const mutations = {
  setDrink (state, val) {
    state.drink = val
  },
  addDrink (state, payload) {
    console.log(payload)
    state.drink.drink.push(payload.drink[0])
  },
  removeDrink (state, removeID) {
    const i = state.drink.drink.findIndex(x => x.id === removeID)
    if (i !== -1) {
      state.drink.drink.splice(i, 1)
    }
  },
  changeDrink (state, drink) {
    const i = state.drink.drink.findIndex(x => x.id === drink.id)
    if (i !== -1) {
      state.drink.drink.splice(i, 1, drink)
    }
  }
}

const actions = {
  setDrink: ({ commit }, drink) => {
    commit('setDrink', drink)
  },
  async addDrinkSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/tea_manage/addDrink`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      console.log(result)
      commit('addDrink', {
        drink: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.drinkname,
            price: item.drinkprice,
            description: item.drinkdescription,
            type: item.drinktype,
            position: item.drinkposition,
            photo: item.drinkphoto
          }
        })
      })
    }
  },
  async removeDrinkSubmit ({ commit }, formData) {
    let { status, data: { code, msg, removeID } } = await axios.post(`/manager/tea_manage/removeDrink`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('removeDrink', removeID)
    }
  },
  async changeDrinkSubmit ({ commit }, formData) {
    let { status, data: { code, msg, drink } } = await axios.post(`/manager/tea_manage/changeDrink`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('changeDrink', drink)
    }
  },
  async searchDrinkSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/tea_manage/searchDrink`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('setDrink', {
        drink: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.drinkname,
            price: item.drinkprice,
            description: item.drinkdescription,
            type: item.drinktype,
            position: item.drinkposition,
            photo: item.drinkphoto
          }
        })
      })
    }
  }
}

export default { namespaced: true, state, mutations, actions }