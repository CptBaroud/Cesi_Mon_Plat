<template>
  <v-card
    :color="color"
    flat
    rounded="xl"
    @click="$router.push('/delivery/' + item._id)"
  >
    <v-card-title>
      <v-list-item style="padding: 0">
        <v-list-item-action-text class="mr-2">
          <v-sheet :color="colorIcon(item.status)" rounded="lg" width="32" height="32">
            <v-icon size="32">
              mdi-clipboard-text-outline
            </v-icon>
          </v-sheet>
        </v-list-item-action-text>
        <v-list-item-content style="padding-top: 0; padding-bottom: 0">
          <v-list-item-title
            class="font-weight-bold d-inline-block text-truncate list-title-ticket mb-1"
          >
            Livraison #{{ item._id.substr(0, 6) }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Arrive a {{ new Date(item.deliveryTime).toLocaleTimeString('FR-fr') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-card-text v-if="order">
      <v-chip-group column>
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
    },
    color: {
      type: String,
      default: 'background',
      required: false
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
        return this.$store.getters['order/allOrder'].filter(i => i._id === this.item.order._id)[0]
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

    icon (item) {
      switch (item) {
        case 1:
          return 'En attente'
        case 2:
          return 'En préparation'
        case 3:
          return 'En livraison'
        case 5:
          return 'Livrée'
        case 6:
          return 'livrée'
        default:
          return 'Indéfinis'
      }
    },

    colorIcon (item) {
      switch (item) {
        case 0:
          return 'accent'
        case 1:
          return 'warning'
        case 3:
          return 'info'
        case 5:
          return 'info'
        case 6:
          return 'success'
        default:
          return 'primary'
      }
    }
  }
}
</script>

<style scoped>

</style>
