import axios from 'axios'

export default {
  fetch (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/article/restaurant/' + data.restaurant, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setArticle', response.data)
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
      axios.post(process.env.api_url + '/article', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('addArticle', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  edit (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/article', data.item, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('addArticle', response.data)
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
      axios.delete(process.env.api_url + '/article/' + data._id, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('removeArticle', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
