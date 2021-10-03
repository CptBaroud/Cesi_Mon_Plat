<template>
  <v-card
    color="secondary"
    flat
    rounded="xl"
  >
    <v-card-title>
      <v-list-item style="padding: 0">
        <v-list-item-action-text class="mr-2">
          <v-sheet :color="color(item.status)" rounded="lg" width="64" height="64">
            <v-icon size="64">
              mdi-clipboard-text-outline
            </v-icon>
          </v-sheet>
        </v-list-item-action-text>
        <v-list-item-content style="padding-top: 0; padding-bottom: 0">
          <v-list-item-title
            class="text-h6 font-weight-bold d-inline-block text-truncate list-title-ticket mb-1"
          >
            Commande #{{ item._id.substr(0, 6) }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action-text class="text-h6 font-weight-bold">
          {{ item.price }}<span style="color: var(--v-primary-base)">€</span>
        </v-list-item-action-text>
      </v-list-item>
    </v-card-title>
    <v-card-text>
      <v-divider />
      <v-list
        dense
        rounded
        color="secondary"
      >
        <v-list-item v-for="article in orderedItem" :key="article._id">
          <v-list-item-action-text class="mr-2">
            <v-icon color="accent">
              {{ icon(article.type) }}
            </v-icon>
          </v-list-item-action-text>
          <v-list-item-content>
            <v-list-item-title class="font-weight-light text-h6">
              {{ article.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text class="text-h6">
            <span style="color: var(--v-accent-base)">x</span>{{ article.quantity }}
          </v-list-item-action-text>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions
      v-if="item.status === 'pending'"
    >
      <v-spacer />
      <v-btn rounded color="success" small @click="accept">
        Accepter
      </v-btn>
      <v-btn rounded color="error" text small @click="decline">
        Refuser
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'OrderCard',
  props: {
    item: {
      type: Object,
      default () {
        return {
          _id: '',
          user: 0,
          restaurant: {
            name: ''
          },
          price: 0,
          article: [],
          menu: []
        }
      },
      required: true
    }
  },
  data () {
    return {
      orderedItem: []
    }
  },
  mounted () {
    this.prettierArray()
  },
  methods: {
    prettierArray () {
      // On copie chaque objets d'article
      this.item.article.forEach((item) => {
        const copy = Object.assign({}, item)
        const id = this.orderedItem.findIndex((idItem) => {
          return idItem._id === item._id
        })

        if (id !== -1) {
          this.orderedItem[id].quantity++
        } else {
          copy.quantity = 1
          this.orderedItem.push(copy)
        }
      })

      // On copue chaque objets de menu
      this.item.menu.forEach((item) => {
        const copy = Object.assign({}, item)
        const id = this.orderedItem.findIndex((idItem) => {
          return idItem._id === item._id
        })

        if (id !== -1) {
          this.orderedItem[id].quantity++
        } else {
          copy.quantity = 1
          this.orderedItem.push(copy)
        }
      })
    },

    accept () {
      this.$store.dispatch('order/accept', { token: this.$auth.getToken('local'), _id: this.item._id })
        .then((response) => {
          if (response.status === 200) {
            this.$store.dispatch('notification/create', {
              token: this.$auth.getToken('local'),
              user: this.item.user,
              title: 'Votre commande à été acceptée par le restaurateur',
              to: '',
              type: 1,
              icon: 'mdi-clipboard-text'
            })
          }
        })
    },

    decline () {
      this.$store.dispatch('order/decline', { token: this.$auth.getToken('local'), _id: this.item._id })
        .then((response) => {
          if (response.status === 200) {
            this.$store.dispatch('notification/create', {
              token: this.$auth.getToken('local'),
              user: this.item.user,
              title: 'Votre commande à été refusée par le restaurateur',
              to: '',
              type: 2,
              icon: 'mdi-clipboard-text'
            })
          }
        })
    },

    icon (item) {
      switch (item) {
        case 1:
          return 'mdi-food-variant'
        case 2:
          return 'mdi-bottle-soda'
        default:
          return 'mdi-food'
      }
    },

    color (item) {
      switch (item) {
        case 'accepted':
          return 'success'
        case 'declined':
          return 'error'
        case 'pending':
          return 'warning'
        default:
          return 'accent'
      }
    }
  }
}
</script>

<style scoped>

</style>
