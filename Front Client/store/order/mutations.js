export default {
  setOrder (state, data) {
    state.order = data
  },

  setAllOrder (state, data) {
    state.allOrder = data
  },

  initOrder (state, data) {
    state.order.restaurant = data._id
    state.order.restaurantUser = data.user
  },

  addArticleToOrder (state, data) {
    const id = state.order.article.findIndex((item) => {
      return item._id === data.item._id
    })

    const item = data.item
    item.elementType = data.type

    if (id !== -1) {
      state.order.article[id].quantity++
    } else {
      item.quantity = 1
      state.order.article.push(item)
    }
  },

  removeArticleFromOrder (state, data) {
    const id = state.order.article.findIndex((item) => {
      return item._id === data.item._id
    })

    if (state.order.article[id].quantity > 1) {
      state.order.article[id].quantity--
    } else {
      state.order.article.splice(id, 1)
    }
  },

  addMenuToOrder (state, data) {
    const id = state.order.menu.findIndex((item) => {
      return item._id === data.item._id
    })

    const item = data.item
    item.elementType = data.type

    if (id !== -1) {
      state.order.menu[id].quantity++
    } else {
      item.quantity = 1
      state.order.menu.push(item)
    }
  },

  removeMenuFromOrder (state, data) {
    const id = state.order.menu.findIndex((item) => {
      return item._id === data.item._id
    })

    if (state.order.menu[id].quantity > 1) {
      state.order.menu[id].quantity--
    } else {
      state.order.menu.splice(id, 1)
    }
  },

  clearOrder (state) {
    state.order = {
      user: 0,
      accepted: false,
      price: 0,
      menu: [],
      article: []
    }
    state.totalPrice = 0
  },

  increaseTotalPrice (state, price) {
    state.totalPrice = Math.round((state.totalPrice + price) * 100) / 100
  },

  decreaseTotalPrice (state, price) {
    if (state.totalPrice > 0) {
      state.totalPrice = Math.round((state.totalPrice - price) * 100) / 100
    }
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
