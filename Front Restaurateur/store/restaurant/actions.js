import axios from 'axios'

export default {
  fetch (context, token) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/restaurant', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setRestaurant', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  updateLogo (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/restaurant/logo', data, {
        headers: {
          authorization: token
        }
      }).then((response) => {
        const updatedUser = { ...this.$auth.user }
        delete response.data._id
        updatedUser.restaurant.logo = response.data.logo
        this.$auth.setUser(updatedUser)
        resolve(response)
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(e)
      })
    })
  },

  updateData (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/restaurant/', data, {
        headers: {
          authorization: token
        }
      }).then((response) => {
        const updatedUser = { ...this.$auth.user }
        updatedUser.restaurant = response.data
        this.$auth.setUser(updatedUser)
        resolve(response)
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(e)
      })
    })
  }
}
