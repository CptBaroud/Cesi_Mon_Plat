export default {
  setCategory (state, data) {
    state.categories = data
  },

  setType (state, data) {
    state.typeCategory = data
  },

  addCategory (state, data) {
    state.categories.push(data)
  },

  editCategory (state, data) {
    const index = state.categories.findIndex((item) => {
      return item._id === data._id
    })
    state.categories.splice(index, 1)
    state.categories.push(data)
  },

  removeCategory (state, data) {
    const index = state.categories.findIndex((item) => {
      return item._id === data._id
    })
    state.categories.splice(index, 1)
  }
}
