import axios from 'axios'

export default {
  fetch (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/menu/restaurant/' + data.restaurant, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setMenu', response.data)
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
      axios.post(process.env.api_url + '/menu', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('addMenu', response.data)
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
      axios.put(process.env.api_url + '/menu', data.item, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('editMenu', response.data)
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
      axios.delete(process.env.api_url + '/menu/' + data._id, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('removeMenu', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
