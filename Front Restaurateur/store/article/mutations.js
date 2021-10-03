export default {
  setArticle (state, data) {
    state.article = data
  },

  addArticle (state, data) {
    state.article.push(data)
  },

  editArticle (state, data) {
    const index = state.article.findIndex((item) => {
      return item._id === data._id
    })
    state.article.splice(index, 1)
    state.article.push(data)
  },

  removeArticle (state, data) {
    const index = state.article.findIndex((item) => {
      return item._id === data._id
    })
    state.article.splice(index, 1)
  }
}
