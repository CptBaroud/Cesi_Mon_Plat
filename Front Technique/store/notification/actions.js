import axios from 'axios'

export default {
  fetch (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/notification/' + data.user, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setNotification', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  create (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/notification', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
