import axios from 'axios'

export default {
  fetch (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/delivery/deliveryMan/' + data.user, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setDelivery', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(e)
        })
    })
  },

  create (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/delivery/', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('addDelivery', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  open (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/delivery/open', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('acceptDelivery', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  closeDeliveryMan (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/delivery/closeDeliveryMan/' + data._id, data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('refuseDelivery', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  taken (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/delivery/taken', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('takenDelivery', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
