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
            Vos commandes
          </v-card-title>
          <v-card-text>
            <v-data-iterator>
              <template #default="{items}">
                <v-row>
                  <v-col v-for="(item,i) in items" :key="i">
                    <v-card>
                      <v-card-title>
                        <v-list-item style="padding: 0">
                          <v-list-item-action-text class="mr-2">
                            <v-sheet color="primary" rounded="lg" width="64" height="64">
                              <v-icon>
                                mdi-clipboard-text-outline
                              </v-icon>
                            </v-sheet>
                          </v-list-item-action-text>
                          <v-list-item-content style="padding-top: 0; padding-bottom: 0">
                            <v-list-item-title
                              class="text-h6 font-weight-bold d-inline-block text-truncate list-title-ticket mb-1"
                            >
                              {{ item.restaurant.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="text-subtitle-2">
                              <v-list-item v-for="article in item.article" :key="article._id">
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ article.name }}
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-for="menu in item.menu" :key="menu._id">
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ menu.name }}
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action-text class="text-h6 font-weight-bold">
                            {{ item.price }}<span style="color: var(--v-primary-base)">€</span>
                          </v-list-item-action-text>
                        </v-list-item>
                      </v-card-title>
                    </v-card>
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
export default {
  name: 'Id'
}
</script>

<style scoped>

</style>
