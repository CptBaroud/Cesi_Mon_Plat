<template>
  <v-container class="mt-2">
    <v-row
      class="mb-6"
    >
      <v-col col="6">
        <v-card
          rounded="xl"
          flat
          class="mt-4"
          color="background"
          max-height="500"
        >
          <v-card-title>
            Livraisons acceptées
          </v-card-title>
          <deliveries-table :item="deliveriesNotDone" />
        </v-card>
      </v-col>
      <v-col col="6">
        <v-card
          rounded="xl"
          flat
          class="mt-4"
          color="background"
          max-height="500"
        >
          <v-card-title>
            Livraisons finies
          </v-card-title>
          <deliveries-table :item="deliveriesDone" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import deliveriesTable from '../../components/deliveriesTable'

export default {
  name: 'Index',
  components: {
    deliveriesTable
  },
  middleware: 'auth',
  computed: {
    delivery: {
      get () {
        return this.$store.getters['delivery/delivery']
      }
    },

    deliveriesDone () {
      return this.$store.getters['delivery/delivery'].filter(object => object.done === true)
    },
    deliveriesNotDone () {
      return this.$store.getters['delivery/delivery'].filter(object => object.done === false)
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
