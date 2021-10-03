<template>
  <v-container class="mt-2" style="min-height: 800px">
    <v-row align="center" justify="center">
      <v-col cols="4" class="mr-8">
        <v-card
          flat
          rounded
          color="background"
        >
          <v-card-title class="font-weight-bold text-h4">
            Se créer un compte
          </v-card-title>
          <v-card-text>
            <v-form class="mt-12">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-account
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Informations de votre compte livreur
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-text-field
                v-model="registerPayload.firstName"
                :rules="requiredRules"
                rounded
                filled
                label="Prenom"
              />
              <v-text-field
                v-model="registerPayload.lastName"
                :rules="requiredRules"
                rounded
                filled
                label="Nom"
              />
              <v-text-field
                v-model="registerPayload.email"
                :rules="emailRules"
                rounded
                filled
                placeholder="exemple@mail.com"
                label="Adresse mail"
              />
              <v-text-field
                v-model="registerPayload.password"
                :rules="passwordRules"
                type="password"
                rounded
                filled
                label="Mot de passe"
              />
              <v-text-field
                v-model="registerPayload.referalCode"
                rounded
                filled
                label="Code de parrainage"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              rounded
              @click="register()"
            >
              Créer le compte
            </v-btn>
            <v-btn
              text
              rounded
              nuxt
              to="/login"
            >
              Se connecter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <img width="1024" height="256" :src="logo" alt="Login">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      registerPayload: {
        referalCode: ''
      },

      // Règles de vérification
      requiredRules: [
        v => !!v || 'Ce champ est requis'
      ],
      emailRules: [
        v => !!v || 'Il faut rentrer un email',
        v => /.+@.+\..+/.test(v) || 'L\'email doit etre valide'
      ],
      phoneRules: [
        v => !!v || 'Il faut rentrer un numéro de télélphone',
        v => /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(v) || 'Le numéro de téléphone doit être valide'
      ],
      passwordRules: [
        v => !!v || 'Il faut rentrer un numéro de télélphone',
        v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(v) || 'Votre mot de passe doit contenir 8 Charactères dont une majuscule un chiffre et un charactère spécial'
      ]
    }
  },
  computed: {
    logo () {
      return this.$vuetify.theme.dark ? process.env.api_url + '/svg/logoTextDark.svg' : process.env.api_url + '/svg/logoTextLight.svg'
    }
  },
  mounted () {
    this.registerPayload.referalCode = this.$route.query.referalCode
  },
  methods: {
    register () {
      this.registerPayload.token = this.$auth.getToken('local')
      this.registerPayload.address = ''
      this.registerPayload.role = 1

      this.$store.dispatch('user/createAccount', this.registerPayload).then((response) => {
        if (response.status === 200) {
          this.$auth.loginWith('local', {
            data: {
              email: this.registerPayload.email,
              password: this.registerPayload.password
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
      })
    }
  }
}
</script>

<style scoped>

</style>
