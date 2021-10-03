<template>
  <v-hover
    v-slot="{ hover }"
  >
    <v-card
      rounded="xl"
      :style="hover ? 'transition: background-color ease-in-out 0.2s' : ''"
      :color="hover ? 'background' : 'secondary'"
      :ripple="false"
      flat
    >
      <v-card-text
        style="border-radius: 20px; flex-grow: 1; transition: all 0ms ease;"
      >
        <v-list-item style="padding: 0">
          <v-list-item-action-text v-if="item.picture" class="mr-2">
            <v-sheet color="primary" rounded="lg" width="64" height="64">
              <v-img :src="item.picture" max-width="64" min-width="64" />
            </v-sheet>
          </v-list-item-action-text>
          <v-list-item-content style="padding-top: 0; padding-bottom: 0">
            <v-list-item-title
              class="text-h6 font-weight-bold d-inline-block text-truncate list-title-ticket mb-1"
            >
              {{ item.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-subtitle-2">
              <v-list-item v-for="(item, i) in item.ingredient" :key="i">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action-text class="text-h6 font-weight-bold">
            {{ item.price }}<span style="color: var(--v-primary-base)">€</span>
          </v-list-item-action-text>
        </v-list-item>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object,
      default () {
        return {
          name: 'item',
          quantity: 0,
          price: 0,
          ingredient: [],
          picture: 'http://localhost:3000/images/pizza1.png'
        }
      },
      required: true
    }
  }
}
</script>

<style scoped>

</style>
