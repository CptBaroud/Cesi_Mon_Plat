import axios from 'axios'

export default {
  fetch (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/delivery/restaurant/' + data.restaurant, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setDeliveries', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  prepare (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/delivery/prepare', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('editDelivery', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
