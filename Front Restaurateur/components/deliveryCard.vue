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
      </v-list-item>
    </v-card-title>
    <v-card-text>
      <v-chip-group
        column
      >
        <v-chip
          v-for="article in orderedItem"
          :key="article._id"
          :filter-icon="icon(article.type)"
        >
          {{ article.name }}
          <span style="color: var(--v-accent-base)">x</span>{{ article.quantity }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn rounded color="success" small @click="toPrep">
        Préparer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DeliveryCard',
  props: {
    item: {
      type: Object,
      default () {
        return {
          order: {},
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
  computed: {
    order: {
      get () {
        return this.$store.getters['order/order'].filter(i => i._id === this.item.order._id)[0]
      }
    }
  },
  mounted () {
    this.prettierArray()
  },
  methods: {
    prettierArray () {
      console.log(this.order)
      if (this.order) {
        // On copie chaque objets d'article
        this.order.article.forEach((item) => {
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
        this.order.menu.forEach((item) => {
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
      }
    },

    toPrep () {
      this.$store.dispatch('delivery/prepare', { token: this.$auth.getToken('local'), _id: this.item._id })
        .then((response) => {
          if (response.status === 200) {
            this.$store.dispatch('notification/create', {
              token: this.$auth.getToken('local'),
              user: this.item.user,
              title: 'La commande est en cours de préparation',
              to: '',
              type: 0,
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
