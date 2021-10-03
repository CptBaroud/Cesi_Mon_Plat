import axios from 'axios'

export default {
  fetch (context, token) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/order/status/accepted', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setOrder', response.data)
          resolve(response)
        })
        .catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  toDelivery (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/order/toDelivery/', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('editOrder', response.data)
          resolve(response)
        })
        .catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
