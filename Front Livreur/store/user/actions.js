import axios from 'axios'

export default {
  fetch (context, token) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/users/restaurateur', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setAgent', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(e)
        })
    })
  },

  delete (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.delete(process.env.api_url + '/users/' + data.user, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(e)
        })
    })
  },

  createAccount (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/users/', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
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
      axios.put(process.env.api_url + '/users/', data, {
        headers: {
          authorization: token
        }
      }).then((response) => {
        const updatedUser = { ...this.$auth.user }
        delete data._id
        updatedUser[Object.keys(data)[0]] = data[Object.keys(data)[0]]
        this.$auth.setUser(updatedUser)
        resolve(response)
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(e)
      })
    })
  },

  updateProfilePicture (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/users/profilePicture/' + data.user.id, data, {
        headers: {
          authorization: token
        }
      }).then((response) => {
        const updatedUser = { ...this.$auth.user }
        delete response.data._id
        updatedUser.avatar = response.data.avatar
        this.$auth.setUser(updatedUser)
        resolve(response)
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(e)
      })
    })
  },

  resetPassword (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/users/resetPassword', data, {
        headers: {
          authorization: token
        }
      }).then((response) => {
        resolve(response)
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(e)
      })
    })
  }
}
