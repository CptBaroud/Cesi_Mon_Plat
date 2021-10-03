<template>
  <v-container fluid>
    <v-row>
      <v-col
        lg="12"
        md="12"
      >
        <v-card rounded="xl" flat color="background">
          <v-card-title>
            Tout les composants disponibles
          </v-card-title>
          <v-card
            rounded="xl"
            flat
            color="secondary"
          >
            <v-card-text>
              <v-data-iterator
                :items="component"
                no-data-text="Aucun composants pour l'instant"
              >
                <template #default="{items}">
                  <v-row>
                    <v-col
                      v-for="item in items"
                      :key="item._id"
                      cols="3"
                    >
                      <v-card
                        rounded="xl"
                        color="background"
                        flat
                      >
                        <v-card-title>
                          {{ item.name }}
                        </v-card-title>
                        <v-card-text>
                          Pour installer le component faite simplement la commande
                          <code>npm i {{ item.name }}</code>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            color="primary"
                            rounded
                            :href="item.link"
                            target="_blank"
                          >
                            Télecharger
                          </v-btn>
                        </v-card-actions>
                      </v-card>
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
export default {
  middleware: 'auth',
  computed: {
    component: {
      get () {
        return this.$store.getters['component/components']
      }
    }
  },
  mounted () {
    this.$store.dispatch('component/fetch', this.$auth.getToken('local'))
  }
}

</script>

<style scoped>

</style>
