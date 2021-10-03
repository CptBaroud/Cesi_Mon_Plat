<template>
  <v-container class="mt-2">
    <v-row style="padding-top: 0" justify="center">
      <v-col cols="8">
        <v-card
          rounded="xl"
          flat
          color="background"
        >
          <v-card-title>
            Les commandes de votre restaurant
          </v-card-title>
          <v-card-text>
            <v-data-iterator
              :items="order"
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
                  <v-col v-for="item in items" :key="item.name">
                    <order-card
                      :item="item"
                    />
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
      </v-col>
      <!--<v-col cols="4">
        <v-card
          rounded="xl"
          flat
          color="background"
        >
          <v-card-title>
            Infos
          </v-card-title>
        </v-card>
      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import orderCard from '../../components/orderCard'
export default {
  name: 'Index',
  components: {
    orderCard
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    order: {
      get () {
        return this.$store.getters['order/order']
      }
    }
  }
}
</script>

<style scoped>

</style>
