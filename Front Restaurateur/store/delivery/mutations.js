export default {
  setDeliveries (state, data) {
    state.deliveries = data
  },

  editDelivery (state, data) {
    const index = state.deliveries.findIndex((item) => {
      return item._id === data._id
    })
    state.deliveries.splice(index, 1)
    state.deliveries.push(data)
  }
}
