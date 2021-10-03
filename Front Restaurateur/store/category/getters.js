export default {
  categories (state) {
    return state.categories
  },

  articleCategories (state) {
    return state.categories.filter(i => i.type === 1)
  },

  menuCategories (state) {
    return state.categories.filter(i => i.type === 2)
  },

  typeCategory (state) {
    return state.typeCategory
  }
}
