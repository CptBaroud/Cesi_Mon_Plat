export default {
  setUser (state, data) {
    state.user = data
  },

  addUser (state, data) {
    state.user.push(data.data)
  },

  editUser (state, data) {
    const index = state.user.findIndex((item) => {
      return item._id === data._id
    })
    state.user.splice(index, 1)
    state.user.push(data)
  },

  removeUser (state, data) {
    const index = state.user.findIndex((item) => {
      return item._id === data._id
    })
    state.user.splice(index, 1)
  }
}
