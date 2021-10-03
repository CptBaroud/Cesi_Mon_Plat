<template>
  <v-container class="mt-2">
    <v-row style="padding-top: 0">
      <v-col cols="8">
        <v-card
          rounded="xl"
          flat
          color="background"
        >
          <v-card-title>
            Votre livraison
          </v-card-title>
          <v-card-text>
            <v-btn
              rounded
              color="primary"
              @click="close"
            >
              Livrer
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Id',
  middleware: 'auth',
  computed: {
    delivery: {
      get () {
        return this.$store.getters['delivery/deliveries'].filter(i => i._id === this.$route.params.id)[0]
      }
    }
  },
  methods: {
    close () {
      this.$store.dispatch('delivery/close', {
        token: this.$auth.getToken('local'),
        delivery: this.delivery._id
      })
    }
  }
}
</script>

<style scoped>

</style>
