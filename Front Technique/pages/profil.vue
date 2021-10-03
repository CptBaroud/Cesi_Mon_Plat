<template>
  <v-container class="mt-2">
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card
          color="secondary"
          rounded="xl"
          flat
        >
          <v-card-title class="mb-4">
            Editer vos informations
          </v-card-title>
          <v-card-text>
            <v-list style="background: transparent">
              <div class="mb-8">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>
                      mdi-account-settings
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Parmètres du compte
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Modifier votre nom, prénom ..
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-row>
                  <v-col md="12" lg="6">
                    <v-text-field
                      v-model="name"
                      filled
                      rounded
                      placeholder="Prénom"
                    />
                  </v-col>
                  <v-col md="12" lg="6">
                    <v-text-field
                      v-model="surname"
                      filled
                      rounded
                      placeholder="Nom"
                    />
                  </v-col>
                </v-row>

                <v-list-item class="mb-4">
                  <v-list-item-avatar style="border: solid var(--v-primary-base) 2px" size="96">
                    <v-img v-if="avatar" :src="avatar" />
                    <v-icon v-else>
                      mdi-account
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-form
                      ref="uploadProfilePictureForm"
                      v-model="uploadProfilPictureValid"
                      lazy-validation
                    >
                      <v-file-input
                        v-model="uploadProfilPictureItem"
                        style="max-width: 356px"
                        accept="image/png, image/jpeg, image/bmp"
                        rounded
                        hide-details
                        filled
                      />
                    </v-form>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      class="ml-4"
                      rounded
                      color="primary"
                      :disabled="!uploadProfilPictureValid"
                      @click="uploadPicture"
                    >
                      Modifier
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-text-field
                  v-model="phone"
                  filled
                  rounded
                  placeholder="Numéro de telephone"
                />
              </div>
              <div class="mb-8">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>
                      mdi-lock
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Paramètres de sécurité
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Modifier votre mot de passe, votre adresse de connexion ..
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="changePasswordItem.old"
                      filled
                      rounded
                      type="password"
                      placeholder="Mot de passe actuel"
                      style="max-width: 356px"
                    />
                    <v-btn
                      text
                      rounded
                      color="primary"
                    >
                      Mot de passe oublié ?
                    </v-btn>
                  </v-col>
                  <v-col md="12" lg="6">
                    <v-text-field
                      v-model="changePasswordItem.new"
                      filled
                      rounded
                      placeholder="Nouveau mot de passe"
                    />
                  </v-col>
                  <v-col md="12" lg="6">
                    <v-text-field
                      v-model="changePasswordItem.verifyNew"
                      filled
                      rounded
                      placeholder="Confirmer le nouveau mot de passe"
                    />
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="mail"
                  filled
                  rounded
                  placeholder="Adresse Mail"
                  append-icon="mdi-check"
                />
              </div>
              <div class="mb-8">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>
                      mdi-qrcode
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Parainage
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Récuperer votre lien de parainage
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-row>
                  <v-col cols="12">
                    <v-hover v-slot="{ hover }">
                      <v-text-field
                        v-model="$auth.user.referalCode"
                        filled
                        rounded
                        :disabled="hover ? false : hover"
                        placeholder="Adresse Mail"
                      >
                        <template #append-outer>
                          <v-btn
                            icon
                            small
                            @click="copyUrl"
                          >
                            <v-icon>
                              mdi-clipboard
                            </v-icon>
                          </v-btn>
                        </template>
                      </v-text-field>
                    </v-hover>
                  </v-col>
                </v-row>
              </div>

              <div class="mb-8">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>
                      mdi-delete-outline
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Supprimer
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Supprimer votre compte et les données vous concernant
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-row>
                  <v-col cols="12">
                    <v-spacer />
                    <v-btn
                      color="error"
                      rounded
                      x-large
                      @click="deleteAccount()"
                    >
                      Supprimer
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Profil',
  middleware: 'auth',
  data () {
    return {
      uploadProfilPictureItem: {},
      uploadProfilPictureValid: false,

      changePasswordItem: {
        old: '',
        new: '',
        verifyNew: ''
      },

      windowSize: {
        x: 0,
        y: 1
      }
    }
  },
  computed: {
    name: {
      get () {
        return this.$auth.user.firstName
      },
      set (value) {
        this.$store.dispatch('user/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, firstName: value })
      }
    },

    surname: {
      get () {
        return this.$auth.user.lastName
      },
      set (value) {
        this.$store.dispatch('user/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, lastName: value })
      }
    },

    phone: {
      get () {
        return this.$auth.user.phone
      },
      set (value) {
        this.$store.dispatch('user/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, phone: value })
      }
    },

    mail: {
      get () {
        return this.$auth.user.email
      },
      set (value) {
        this.$store.dispatch('user/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, mail: value })
      }
    },

    avatar: {
      get () {
        return this.$auth.user.avatar
      },
      set (value) {
        this.$store.dispatch('user/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, avatar: value })
      }
    }
  },
  mounted () {
    this.onResize()
  },
  methods: {
    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
      }
    },

    uploadPicture () {
      const user = this.$auth.user

      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })

      toBase64(this.uploadProfilPictureItem).then((response) => {
        this.$store.dispatch('user/updateProfilePicture', {
          token: this.$auth.getToken('local'),
          type: this.uploadProfilPictureItem.type,
          name: this.uploadProfilPictureItem.name,
          user,
          file: response
        })
      })
    },

    deleteAccount () {
      this.$store.dispatch('user/delete', {
        token: this.$auth.getToken('local'),
        user: this.$auth.user.id
      })
        .then((response) => {
          if (response.status === 200) {
            this.$auth.logout()
          }
        })
    },

    copyUrl () {
      this.$toast.success('Lien copier dans le presse papier')
      const el = document.createElement('textarea')
      el.value = process.env.restaurantUrl + '/register?referalCode=' + this.$auth.user.referalCode
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }
    }
  }
}
</script>

<style scoped>
>>> .v-text-field--enclosed .v-input__append-inner {
  padding-top: 0 !important;
}
</style>
