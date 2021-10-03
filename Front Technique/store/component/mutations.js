export default {
  setComponents (state, data) {
    state.components = data
  },

  add (state, data) {
    state.components.push(data)
  },

  delete (state, data) {
    const index = state.components.findIndex((item) => {
      return item._id === data._id
    })
    state.components.splice(index, 1)
  }
}
