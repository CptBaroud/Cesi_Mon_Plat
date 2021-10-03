export default {
  setDelivery (state, data) {
    state.delivery = data
  },

  addDelivery (state, data) {
    state.delivery.push(data)
  },

  acceptDelivery (state, data) {
    const index = state.delivery.findIndex((item) => {
      return item._id === data._id
    })
    state.delivery.splice(index, 1)
    state.delivery.push(data)
  },

  refuseDelivery (state, data) {
    const index = state.delivery.findIndex((item) => {
      return item._id === data._id
    })
    state.delivery.splice(index, 1)
  },

  takenDelivery (state, data) {
    const index = state.delivery.findIndex((item) => {
      return item._id === data._id
    })
    state.delivery.splice(index, 1)
    state.delivery.push(data)
  }
}
