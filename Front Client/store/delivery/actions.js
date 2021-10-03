import axios from 'axios'

export default {
  fetch (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/delivery/user/' + data.user, {
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

  close (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/delivery/close/' + data.delivery, data, {
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
  }
}
