import axios from 'axios'

export default {
  fetch (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/order/restaurant/' + data.restaurant, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setOrder', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  fetchOne (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/one/' + data.order, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setOrder', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  accept (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/order/accept', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('editOrder', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  decline (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/order/decline', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('editOrder', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
