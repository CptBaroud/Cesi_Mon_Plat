export default {
  setOrder (state, data) {
    state.order = data
  },

  setOneOrder (state, data) {
    state.oneOrder = data
  },

  addOrder (state, data) {
    state.order.push(data)
  },

  editOrder (state, data) {
    const index = state.order.findIndex((item) => {
      return item._id === data._id
    })
    state.order.splice(index, 1)
    state.order.push(data)
  },

  removeOrder (state, data) {
    const index = state.order.findIndex((item) => {
      return item._id === data._id
    })
    state.order.splice(index, 1)
  }
}
