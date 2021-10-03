<template>
  <v-container class="mt-2">
    <v-row style="padding-top: 0" justify="center" align="center">
      <v-col cols="8">
        <v-card
          rounded="xl"
          flat
          color="background"
        >
          <v-card-title>
            Vos livraisons
          </v-card-title>
          <v-card-text>
            <v-card
              rounded="xl"
              color="secondary"
              flat
            >
              <v-card-text>
                <v-data-iterator
                  :items="delivery"
                  :search="search"
                  no-data-text="Vous n'avez pas encore passé de commandes"
                  no-results-text="Aucun résultat trouvé"
                >
                  <template #header>
                    <v-spacer />
                    <v-text-field
                      v-model="search"
                      rounded
                      filled
                      prepend-inner-icon="mdi-magnify"
                      label="Recherche"
                    />
                  </template>
                  <template #default="{items}">
                    <v-row>
                      <v-col v-for="(item,i) in items" :key="i">
                        <delivery-card
                          :item="item"
                        />
                      </v-col>
                    </v-row>
                  </template>
                </v-data-iterator>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import deliveryCard from '../../components/deliveryCard'

export default {
  name: 'Index',
  components: {
    deliveryCard
  },
  middleware: 'auth',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    delivery: {
      get () {
        return this.$store.getters['delivery/deliveries']
      }
    }
  }
}
</script>

<style scoped>

</style>
