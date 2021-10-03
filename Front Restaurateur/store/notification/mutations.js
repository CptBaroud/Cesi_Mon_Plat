export default {
  setNotification (state, data) {
    state.notifications = data
  },

  add (state, data) {
    state.notification.push(data)
  },

  /**
   * Edit d'une notification
   * @param state
   * @param data
   */
  edit (state, data) {
    const index = state.notifications.findIndex((item) => {
      return item._id === data._id
    })
    state.notifications[index] = data
  }
}
