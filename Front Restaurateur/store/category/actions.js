import axios from 'axios'

export default {
  fetch (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/category/restaurant/' + data.restaurant, {
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

  fetchRestaurantType (context, token) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/category/type/0', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setType', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  add (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/category/', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('addCategory', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
