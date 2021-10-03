export default {
  setOrder (state, data) {
    state.order = data
  },

  editOrder (state, data) {
    const index = state.order.findIndex((item) => {
      return item._id === data._id
    })
    state.order.splice(index, 1)
    state.order.push(data)
  },

  deleteOrder (state, data) {
    const index = state.order.findIndex((item) => {
      return item._id === data._id
    })
    state.order.splice(index, 1)
  }
}
