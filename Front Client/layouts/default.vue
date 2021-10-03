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
      <v-navigation-drawer
        v-show="$auth.loggedIn"
        width="25em"
        color="secondary"
        absolute
        permanent
        right
        app
      >
        <v-toolbar
          class="px-4 mt-8"
          style="transition: background-color 0s"
          flat
          color="secondary"
        >
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
                  :content="notification.length"
                  style="border-color: var(v--background-color)"
                  :value="notification.length"
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
                <template v-for="(item, a) in notification">
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
            <v-list color="secondary" dense rounded class="mr-8">
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
                    to="/profil"
                    nuxt
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
        </v-toolbar>
        <v-card
          class="pt-6"
          flat
          color="secondary"
          rounded="xl"
        >
          <v-card-title>
            <v-list-item>
              <v-list-item-title class="text-h5 font-weight-bold">
                Votre Commande
              </v-list-item-title>
              <v-list-item-action>
                <v-btn
                  color="primary"
                  small
                  icon
                >
                  <v-icon
                    small
                  >
                    mdi-cart
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card-title>
          <v-card-text class="my-4">
            <v-data-iterator
              :items="orderItem"
              no-data-text="Tu n'as encore rien commandé"
              hide-default-footer
              :items-per-page="orderItem.length"
            >
              <template #default="{items}">
                <v-row align="center" justify="center">
                  <v-col
                    v-for="(item, i) in items"
                    :key="i"
                    cols="12"
                  >
                    <order-card
                      :item="item"
                    />
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-card-text>
          <v-card-actions class="mt-8">
            <v-row
              align="center"
              justify="end"
              class="mb-16"
            >
              <p class="text-h6">
                <span class="font-weight-bold">Total: </span>{{ totalPrice }}<span style="color: var(--v-primary-base)">€</span>
              </p>
            </v-row>
            <v-row
              align="center"
              justify="end"
            >
              <v-btn
                color="primary"
                large
                rounded
                @click="makeOrder"
              >
                Confirmer
              </v-btn>
              <v-btn
                text
                large
                rounded
                @click="cancelOrder"
              >
                Annuler
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-navigation-drawer>
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
        <v-btn-toggle
          background-color="secondary"
          borderless
          rounded
          class="mx-4"
        >
          <v-btn color="background" rounded>
            <v-icon>
              mdi-scooter
            </v-icon>
            <span class="hidden-sm-and-down">Livraison</span>
          </v-btn>

          <v-btn rounded>
            <span class="hidden-sm-and-down">A emporter</span>

            <v-icon right>
              mdi-food-variant
            </v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-btn
          rounded
          color="background"
          label="Albert de Mun"
          elevation="0"
          class="mx-4"
        >
          <v-icon>
            mdi-map-marker
          </v-icon>
          <span v-if="$auth.loggedIn">
            {{ $auth.user.address }}
          </span>
        </v-btn>
        <v-autocomplete
          ref="restaurantSearch"
          v-model="goToRestaurant"
          rounded
          filled
          placeholder="Rechercher un restaurant"
          :items="restaurant"
          item-text="name"
          item-value="_id"
          append-icon=""
          hide-details
          prepend-inner-icon="mdi-magnify"
          @change="goTo"
        />
      </v-app-bar>
    </v-app>
  </client-only>
</template>

<script>
import orderCard from '../components/orderItemCard'
import notification from '../components/notification'

export default {
  components: {
    orderCard,
    notification
  },
  data () {
    return {
      drawer: true,
      orderDrawer: true,
      fixed: false,
      goToRestaurant: '',
      items: [
        {
          icon: 'mdi-home-outline',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'mdi-food',
          title: 'Restaurants',
          to: '/restaurant'
        },
        {
          icon: 'mdi-clipboard-text-multiple-outline',
          title: 'Commandes',
          to: '/order'
        },
        {
          icon: 'mdi-scooter',
          title: 'Livraisons',
          to: '/delivery'
        }
      ],
      miniVariant: true
    }
  },
  computed: {
    order: {
      get () {
        return this.$store.getters['order/order']
      }
    },

    notification: {
      get () {
        return this.$store.getters['notification/notifications']
      }
    },

    restaurant: {
      get () {
        return this.$store.getters['restaurant/restaurant']
      }
    },

    orderItem: {
      get () {
        return this.$store.getters['order/order'].menu.concat(this.$store.getters['order/order'].article)
      }
    },

    totalPrice () {
      return this.$store.getters['order/totalPrice']
    },

    logo () {
      return this.$vuetify.theme.dark ? process.env.api_url + '/images/logoDark.svg' : process.env.api_url + '/images/logoLight.svg'
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.$store.dispatch('restaurant/fetch', this.$auth.getToken('local'))
      this.$store.dispatch('order/fetch', { token: this.$auth.getToken('local'), user: this.$auth.user.id })
      this.$store.dispatch('category/fetchCategory', { token: this.$auth.getToken('local'), user: this.$auth.user.id })
      this.$store.dispatch('delivery/fetch', { token: this.$auth.getToken('local'), user: this.$auth.user.id })
      this.$store.dispatch('notification/fetch', { token: this.$auth.getToken('local'), user: this.$auth.user.id })
    }

    // On ecoute le socket
    this.socket = this.$nuxtSocket({
      name: 'main'
    })

    this.socket.on('delivery', (data) => {
      if (data.update) {
        this.$store.dispatch('delivery/fetch', {
          token: this.$auth.getToken('local'),
          user: this.$auth.user.id
        })
      }
    })

    this.socket.on('order', (data) => {
      if (data.update) {
        this.$store.dispatch('order/fetch', {
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
    /**
     * Redirige vers le restaurant via la barre de recherche
     */
    goTo () {
      this.$router.push('/restaurant/' + this.goToRestaurant)
      this.$refs.restaurantSearch.reset()
      this.goToRestaurant = null
    },

    switchTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },

    makeOrder () {
      const finalOrder = Object.assign({}, this.order)
      const articleTemp = []
      const menuTemp = []

      // On copie chaque objets d'article
      this.order.article.forEach((item) => {
        const copy = Object.assign({}, item)
        delete copy.quantity
        for (let i = 1; i <= item.quantity; i++) {
          articleTemp.push(copy)
        }
      })

      // On copue chaque objets de menu
      this.order.menu.forEach((item) => {
        const copy = Object.assign({}, item)
        delete copy.quantity
        for (let i = 1; i <= item.quantity; i++) {
          menuTemp.push(copy)
        }
      })

      finalOrder.article = articleTemp
      finalOrder.menu = menuTemp
      finalOrder.user = this.$auth.user.id
      finalOrder.address = this.$auth.user.address
      finalOrder.price = this.totalPrice
      finalOrder.token = this.$auth.getToken('local')

      this.$store.dispatch('order/add', finalOrder).then((response) => {
        if (response.status === 200) {
          this.$store.commit('order/clearOrder')
          this.$store.dispatch('notification/create', {
            token: this.$auth.getToken('local'),
            user: finalOrder.restaurantUser,
            title: 'Une commande à été passée',
            to: '',
            type: 0,
            icon: 'mdi-clipboard-text'
          })
        }
      })
    },

    cancelOrder () {
      this.$store.commit('order/clearOrder')
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
