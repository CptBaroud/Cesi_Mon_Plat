<template>
  <v-container fluid>
    <v-row>
      <v-col
        lg="12"
        md="12"
      >
        <v-card rounded="xl" flat color="background">
          <v-card-title>
            Toutes les livraisons en attente
          </v-card-title>
          <v-card
            rounded="xl"
            flat
            color="secondary"
          >
            <v-card-text>
              <v-data-iterator
                :items="order"
                no-data-text="Aucune livraison pour l'instant"
              >
                <template #default="{items}">
                  <v-row>
                    <v-col
                      v-for="item in items"
                      :key="item._id"
                    >
                      <orderCard
                        :item="item"
                        color="background"
                      />
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import orderCard from '../components/orderCard.vue'

export default {
  components: {
    orderCard
  },
  middleware: 'auth',
  computed: {
    delivery: {
      get () {
        return this.$store.getters['delivery/delivery']
      }
    },

    order: {
      get () {
        return this.$store.getters['order/order'].filter(i => i.accepted === false)
      }
    },

    doneFalse () {
      return this.delivery.filter(item => item.done === false && item.status === 0)
    }
  },
  mounted () {
    this.$store.dispatch('delivery/fetch', {
      token: this.$auth.getToken('local'),
      user: this.$auth.user.id
    })
  }
}

</script>

<style scoped>

</style>
