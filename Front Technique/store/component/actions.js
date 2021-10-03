import axios from 'axios'

export default {
  fetch (context, token) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/component/', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setComponents', response.data)
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
      axios.post(process.env.api_url + '/component/', data.item, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('add', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  delete (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.delete(process.env.api_url + '/component/' + data.component, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('delete', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
