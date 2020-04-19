import axios from 'axios'

const state = () => ({ article: [] })

const mutations = {
  setarticle (state, val) {
    state.article = val
  },
  addarticle (state, payload) {
    console.log(payload)
    state.article.article.push(payload.article[0])
  },
  removearticle (state, removeID) {
    const i = state.article.article.findIndex(x => x.id === removeID)
    if (i !== -1) {
      state.article.article.splice(i, 1)
    }
  }
}

const actions = {
  setarticle: ({ commit }, article) => {
    commit('setarticle', article)
  },
  async addarticleSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/article_manage/addarticle`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      console.log(result)
      commit('addarticle', {
        article: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.articlename,
            date: item.articledate,
            text: item.articletext
          }
        })
      })
    }
  },
  async removearticleSubmit ({ commit }, formData) {
    let { status, data: { code, msg, removeID } } = await axios.post(`/manager/article_manage/removearticle`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('removearticle', removeID)
    }
  },
  async searcharticleSubmit ({ commit }, formData) {
    let { status, data: { code, msg, result } } = await axios.post(`/manager/article_manage/searcharticle`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    })
    if (status === 200 & code === 0) {
      commit('setarticle', {
        article: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.articlename,
            date: item.articledate,
            text: item.articletext
          }
        })
      })
    }
  }
}

export default { namespaced: true, state, mutations, actions }