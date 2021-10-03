<template>
  <client-only>
    <v-app>
      <v-navigation-drawer
        v-show="$auth.loggedIn"
        v-model="drawer"
        :mini-variant="miniVariant"
        mini-variant-width="6em"
        fixed
        color="secondary"
        elevation="0"
        app
      >
        <v-list
          rounded
          class="my-4"
        >
          <img
            width="48"
            height="64"
            class="ml-4 mt-8 mb-8"
            alt="Login"
            :src="logo"
          >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            exact-active-class="selected"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
      <v-app-bar
        v-show="$auth.loggedIn"
        class="px-4 mb-8 mt-8"
        style="transition: color 0s"
        fixed
        flat
        absolute
        app
        color="background"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-spacer />
        <v-btn
          class="mr-2"
          icon
          @click="switchTheme()"
        >
          <v-icon>
            mdi-brightness-4
          </v-icon>
        </v-btn>
        <template class="d-block justify-end align-end">
          <v-menu open-on-hover bottom offset-y max-height="300">
            <template #activator="{ on, attrs }">
              <v-badge
                :content="notifications.length"
                style="border-color: var(v--background-color)"
                :value="notifications.length"
                class="mr-4"
                color="green"
                bordered
                overlap
              >
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-bell
                </v-icon>
              </v-badge>
            </template>
            <v-list rounded color="secondary" max-width="375">
              <template v-for="(item, a) in notifications">
                <notification
                  :key="a"
                  :notification="item"
                />
              </template>
              <v-list-item to="/notifications" class="d-flex justify-center">
                <v-list-item-content>
                  <v-list-item-title>
                    En voir plus
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-list color="background" dense rounded class="mr-8">
            <v-menu open-on-hover bottom offset-y>
              <template #activator="{ on, attrs }">
                <v-list-item
                  v-if="$auth.user"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-list-item-avatar style="border: solid var(--v-primary-base) 2px">
                    <v-img :src="$auth.user.avatar" />
                  </v-list-item-avatar>
                  <v-list-item-title v-if="on">
                    <h3>{{ $auth.user.firstName }}</h3>
                  </v-list-item-title>
                </v-list-item>
              </template>
              <v-list rounded color="background">
                <v-list-item
                  nuxt
                  to="/profil"
                >
                  <v-list-item-title>Mon compte</v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="$auth.logout()"
                >
                  <v-list-item-title>Deconnexion</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list>
        </template>
      </v-app-bar>
    </v-app>
  </client-only>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      orderDrawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-home-outline',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'mdi-truck-outline',
          title: 'Deliveries',
          to: '/delivery'
        }
      ],
      miniVariant: true
    }
  },
  computed: {
    notifications: {
      get () {
        return this.$store.getters['notification/notification']
      }
    },

    logo () {
      return this.$vuetify.theme.dark ? process.env.api_url + '/images/logoDark.svg' : process.env.api_url + '/images/logoLight.svg'
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.$store.dispatch('delivery/fetch', {
        token: this.$auth.getToken('local'),
        user: this.$auth.user.id
      })
      this.$store.dispatch('order/fetch', this.$auth.getToken('local'))
      this.$store.dispatch('notification/fetch', {
        token: this.$auth.getToken('local'),
        user: this.$auth.user.id
      })
    }

    // On ecoute le socket
    this.socket = this.$nuxtSocket({
      name: 'main'
    })

    this.socket.on('order', (data) => {
      if (data.update) {
        this.$store.dispatch('order/fetch', this.$auth.getToken('local'))
      }
    })

    this.socket.on('delivery', (data) => {
      if (data.update) {
        this.$store.dispatch('delivery/fetch', {
          token: this.$auth.getToken('local'),
          user: this.$auth.user.id
        })
      }
    })

    this.socket.on('notification', (data) => {
      if (data.update && data.user === this.$auth.user.id) {
        this.$store.dispatch('notification/fetch', {
          token: this.$auth.getToken('local'),
          user: this.$auth.user.id
        })
        if (data.data.info) {
          switch (data.data.info.type) {
            case 0:
              this.$toast.info(data.data.title)
              break
            case 1:
              this.$toast.success(data.data.title)
              break
            case 2:
              this.$toast.success(data.data.title)
              break
          }
        }
      }
    })
  },
  methods: {
    switchTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style scoped>
>>> .v-dialog {
  box-shadow: none;
}
/*Arriere plan de l'application*/

.theme--dark.v-application {
  background: var(--v-background-base);
}
.theme--light.v-application {
  background: var(--v-background-base);
}
/*Couleur du drawer*/
.theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
  background-color: rgba(255, 255, 255, 0);
}
.theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
  background-color: rgba(255, 255, 255, 0);
}
>>> .v-navigation-drawer__border {
  height: 0;
  width: 0;
}
</style>
