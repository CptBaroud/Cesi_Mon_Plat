<template>
  <v-card
    :color="color"
    flat
    rounded="xl"
  >
    <v-card-title>
      <v-list-item style="padding: 0">
        <v-list-item-action-text class="mr-2">
          <v-sheet :style="'background-color: #'+ item._id.substr(0, 6)" rounded="lg" width="64" height="64">
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
        :color="color"
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
      v-if="showButton"
    >
      <v-spacer />
      <v-btn
        color="primary"
        rounded
        @click="toDelivery"
      >
        Accepter
      </v-btn>
      <v-btn
        color="error"
        rounded
        @click="toDelivery"
      >
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
          restaurant: {
            name: ''
          },
          price: 0,
          article: [],
          address: '',
          menu: []
        }
      },
      required: true
    },
    color: {
      type: String,
      default: 'secondary',
      required: false
    },
    showButton: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      orderedItem: [],
      start: 0,
      end: 0
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

    declined (item) {
      this.$store.commit('delivery/refuseDelivery', item)
    },

    toDelivery () {
      const deliveryTime = new Date(new Date().getTime() + (30 * 60000))

      this.$store.dispatch('delivery/create', {
        token: this.$auth.getToken('local'),
        deliveryMan: this.$auth.user.id,
        restaurant: this.item.restaurant,
        client: this.item.user,
        address: this.item.address,
        order: this.item._id,
        deliveryTime
      })
        .then((response) => {
          if (response.status === 200) {
            this.$store.dispatch('order/toDelivery', {
              token: this.$auth.getToken('local'),
              _id: this.item._id
            })
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
