export default {
  deliveries (state) {
    return state.deliveries
  },

  getLast (state) {
    const out = state.deliveries.slice()
    if (out.length >= 1) {
      return out.sort(function (a, b) {
        const dateA = new Date(a.created)
        const dateB = new Date(b.created)
        return dateB - dateA
      })[0]
    }
    return out
  }
}
