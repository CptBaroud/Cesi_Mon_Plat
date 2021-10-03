<template>
  <v-container class="mt-2" style="min-height: 800px">
    <v-row align="center" justify="start">
      <v-col cols="4">
        <v-card
          class="mt-24"
          flat
          rounded
          color="background"
        >
          <v-card-title class="font-weight-bold text-h4">
            <img width="386" height="196" :src="logo" alt="Login">
          </v-card-title>
          <v-card-text>
            <v-form class="mt-12">
              <v-text-field
                v-model="email"
                rounded
                filled
                placeholder="exemple@mail.com"
                label="Adresse mail"
              />
              <v-text-field
                v-model="password"
                type="password"
                rounded
                filled
                label="Mot de passe"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              rounded
              @click="login()"
            >
              Se connecter
            </v-btn>
            <v-btn
              text
              rounded
              nuxt
              to="/register"
            >
              S'inscrire
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    logo () {
      return this.$vuetify.theme.dark ? process.env.api_url + '/svg/logoTextLivreurDark.svg' : process.env.api_url + '/svg/logoTextLivreurLight.svg'
    }
  },
  methods: {
    login () {
      this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then((response) => {
          if (response.status !== 200) {
            this.$toast.error(response.data.message)
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
          this.$toast.error(err.message)
        })
    }
  }
}
</script>

<style scoped>

</style>
