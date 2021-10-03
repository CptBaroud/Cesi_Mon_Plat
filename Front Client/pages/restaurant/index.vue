<template>
  <v-layout fill-height>
    <v-container class="mt-2" fill-height>
      <v-row style="padding-top: 0" class="mt-4">
        <v-col cols="2">
          <v-card
            color="background"
            flat
          >
            <v-card-title>
              Options
            </v-card-title>
            <v-card-text>
              <v-radio-group v-model="options">
                <v-radio
                  v-for="(item,i) in restaurantCategories"
                  :key="'c'+i"
                  :label="item.name"
                  :value="item.name"
                  :ripple="false"
                />
              </v-radio-group>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="10">
          <v-data-iterator
            :items="restaurant"
            no-results-text="Aucun resultat ne correspond à ta recherche"
            :no-data-text="'Il n\'y a aucun restaurant de type ' + options"
          >
            <template #default="{items}">
              <v-row>
                <v-col
                  v-for="(item, i) in items"
                  :key="'r'+i"
                  cols="4"
                >
                  <restaurant-card
                    :item="item"
                  />
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import restaurantCard from '../../components/restaurantCard'
export default {
  name: 'Index',
  components: {
    restaurantCard
  },
  middleware: 'auth',
  data () {
    return {
      options: null
    }
  },
  computed: {
    restaurantCategories: {
      get () {
        return this.$store.getters['category/restaurantCategories']
      }
    },

    restaurant: {
      get () {
        return this.$store.getters['restaurant/restaurant'].filter(object => this.options ? object.type === this.options : object)
      }
    }
  },
  mounted () {
    this.$store.dispatch('restaurant/fetch', this.$auth.getToken('local'))
    if (this.$route.query) {
      this.options = this.$route.query.category
    } else {
      this.options = this.restaurantCategories[0].name
    }
  }
}
</script>

<style scoped>

</style>
