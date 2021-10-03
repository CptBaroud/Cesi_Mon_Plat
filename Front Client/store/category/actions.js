import axios from 'axios'

export default {
  fetch (context, token) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/category', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setCategory', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  fetchCategory (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/category/type/0', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setRestaurantCategories', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
