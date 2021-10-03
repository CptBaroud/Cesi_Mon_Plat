<template>
  <v-container class="mt-2">
    <v-row>
      <v-col
        lg="6"
        md="12"
      >
        <v-card
          flat
          color="background"
        >
          <v-card-title>
            Vos commandes en attente
          </v-card-title>
          <v-card-text>
            <v-data-iterator
              :items="order"
              no-data-text="Vous n'avez pas encore de commande en attente"
              no-results-text="Aucune commande ne correspond a votre recherche"
            >
              <template #default="{items}">
                <v-row>
                  <v-col
                    v-for="item in items"
                    :key="item._id"
                    cols="6"
                  >
                    <orderCard
                      :item="item"
                    />
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        lg="6"
        md="12"
      >
        <v-card
          flat
          color="background"
        >
          <v-card-title>
            Vos commandes à préparer
          </v-card-title>
          <v-card-text>
            <v-data-iterator
              :items="deliveries"
              no-data-text="Vous n'avez pas encore de commande à préparer"
              no-results-text="Aucune commande ne correspond a votre recherche"
            >
              <template #default="{items}">
                <v-row>
                  <v-col
                    v-for="item in items"
                    :key="item._id"
                    cols="6"
                  >
                    <deliveryCard
                      :item="item"
                    />
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
import orderCard from '../components/orderCard'
import deliveryCard from '../components/deliveryCard'

export default {
  components: {
    orderCard,
    deliveryCard
  },
  middleware: 'auth',
  computed: {
    order: {
      get () {
        return this.$store.getters['order/order'].filter(object => object.status === 'pending')
      }
    },

    deliveries: {
      get () {
        return this.$store.getters['delivery/deliveries'].filter(o => o.status === 1)
      }
    }
  }
}
</script>
