export default {
  setMenu (state, data) {
    state.menu = data
  },

  addMenu (state, data) {
    state.menu.push(data)
  },

  editMenu (state, data) {
    const index = state.menu.findIndex((item) => {
      return item._id === data._id
    })
    state.menu.splice(index, 1)
    state.menu.push(data)
  },

  removeMenu (state, data) {
    const index = state.menu.findIndex((item) => {
      return item._id === data._id
    })
    state.menu.splice(index, 1)
  }
}
