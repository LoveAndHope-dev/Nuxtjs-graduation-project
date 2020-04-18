import axios from 'axios'

const state = () => ({ table: [] })

const mutations = {
  setTable (state, val) {
    state.table = val
  },
  addtable (state, payload) {
    console.log(payload)
    state.table.table.push(payload.table[0])
  },
  removetable (state, removeID) {
    const i = state.table.table.findIndex(x => x.id === removeID)
    if (i !== -1) {
      state.table.table.splice(i, 1)
    }
  },
  changetable (state, table) {
    const i = state.table.table.findIndex(x => x.id === table.id)
    if (i !== -1) {
      state.table.table.splice(i, 1, table)
    }
  }
}

const actions = {
  setTable: ({ commit }, table) => {
    commit('setTable', table)
  },
  async addtableSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/table_manage/addTable`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      console.log(result)
      commit('addtable', {
        table: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.tablename,
            condition: item.tablecondition,
            people: item.tablepeople
          }
        })
      })
    }
  },
  async removetableSubmit ({ commit }, formData) {
    let { status, data: { code, msg, removeID } } = await axios.post(`/manager/table_manage/removeTable`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('removetable', removeID)
    }
  },
  async changetableSubmit ({ commit }, formData) {
    let { status, data: { code, msg, table } } = await axios.post(`/manager/table_manage/changeTable`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('changetable', table)
    }
  },
  async searchtableSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/table_manage/searchTable`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('setTable', {
        table: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.tablename,
            condition: item.tablecondition,
            people: item.tablepeople
          }
        })
      })
    }
  }
}

export default { namespaced: true, state, mutations, actions }