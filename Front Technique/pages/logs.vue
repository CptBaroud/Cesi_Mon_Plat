<template>
  <v-layout fill-height>
    <v-container class="mt-2">
      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-card
            color="background"
            flat
          >
            <v-card-title>
              Logs
            </v-card-title>
            <v-card-text>
              <v-card
                rounded="xl"
                flat
                color="secondary"
              >
                <v-card-text>
                  <v-list
                    rounded
                    color="secondary"
                  >
                    <v-list-item v-for="item in logs" :key="item._id">
                      <v-list-item-action>
                        <v-chip color="info">
                          {{ item.level }}
                        </v-chip>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.message }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          à {{ new Date(item.timestamp).toLocaleString('FR-fr') }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'Logs',
  computed: {
    logs: {
      get () {
        return this.$store.getters['logs/logs']
      }
    }
  }
}
</script>

<style scoped>

</style>
