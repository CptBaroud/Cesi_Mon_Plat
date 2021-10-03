<template>
  <v-container class="mt-2">
    <v-row style="padding-top: 0">
      <v-col cols="2">
        <v-card
          color="background"
          flat
        >
          <v-card-title>
            Catégories
          </v-card-title>
          <v-card-text
            v-if="restaurant"
          >
            <v-list
              rounded
              color="background"
            >
              <v-list-item
                v-for="(item,i ) in restaurant.category"
                :key="i"
                @click="selectedCategory = item.name"
              >
                <v-list-item-title>
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-card
          rounded
          flat
          color="background"
        >
          <v-card-title>
            Nos Menu
          </v-card-title>
          <v-card-text
            v-if="restaurant"
          >
            <v-data-iterator
              :items="menu"
              no-data-text="Aucun menus pour l'instant"
            >
              <template #default="{items}">
                <v-row>
                  <v-col
                    v-for="item in items"
                    :key="item._id"
                    cols="4"
                  >
                    <menuCard
                      :item="item"
                    />
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
        <v-card
          rounded
          flat
          color="background"
        >
          <v-card-title>
            Nos Articles
          </v-card-title>
          <v-card-text
            v-if="restaurant"
          >
            <v-data-iterator
              :items="restaurant.article"
              no-data-text="Aucun articles pour l'instant"
            >
              <template #default="{items}">
                <v-row>
                  <v-col
                    v-for="item in items"
                    :key="item._id"
                    cols="4"
                  >
                    <item-card :item="item" />
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import itemCard from '../../components/itemCard'
import menuCard from '../../components/menuCard'

export default {
  name: 'Id',
  components: {
    itemCard,
    menuCard
  },
  beforeRouteLeave (to, from, next) {
    if (this.order.article.concat(this.order.menu).length >= 1) {
      const answer = window.confirm('Etes vous sur de vouloir quitter ? Votre panier sera vidé si vous changer de restaurant')
      if (answer) {
        this.$store.commit('order/clearOrder')
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  middleware: 'auth',
  data () {
    return {
      selectedCategory: ''
    }
  },
  computed: {
    order: {
      get () {
        return this.$store.getters['order/order']
      }
    },

    restaurant: {
      get () {
        return this.$store.getters['restaurant/restaurant'].filter(object => object._id === this.$route.params.id)[0]
      }
    },

    menu: {
      get () {
        return this.$store.getters['menu/menu']
      }
    }
  },
  mounted () {
    this.$store.dispatch('restaurant/fetch', this.$auth.getToken('local')).then(() => {
      this.$store.commit('order/initOrder', this.restaurant)
    })
    this.$store.dispatch('menu/fetch', { token: this.$auth.getToken('local'), restaurant: this.$route.params.id })
  }
}
</script>

<style scoped>

</style>
