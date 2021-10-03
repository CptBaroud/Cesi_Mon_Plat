<template>
  <v-card
    color="secondary"
    flat
    rounded="xl"
  >
    <v-card-title>
      <v-list-item style="padding: 0">
        <v-list-item-action-text class="mr-2">
          <v-sheet :color="item.accepted ? 'success' : 'error'" rounded="lg" width="64" height="64">
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
        v-if="item.article || item.menu"
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
      if (this.item.article) {
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
      }

      // On copue chaque objets de menu
      if (this.item.menu) {
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
      }
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
    }
  }
}
</script>

<style scoped>

</style>
