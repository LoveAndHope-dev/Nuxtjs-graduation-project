import axios from 'axios'

const state = () => ({
  position: null
})

const mutations = {
  setposition (state, val) {
    state.position = val
  }
}

const actions = {
  setposition: ({ commit }, position) => {
    commit('setposition', position)
  }
}

export default { namespaced: true, state, mutations, actions } 