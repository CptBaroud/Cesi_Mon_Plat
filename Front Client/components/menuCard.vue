<template>
  <v-card
    rounded="xl"
    color="secondary"
    flat
    @click="addToCart"
  >
    <v-card-text>
      <v-list-item style="padding: 0">
        <v-list-item-action-text class="mr-2">
          <v-sheet color="primary" rounded="lg" width="64" height="64">
            <v-img v-if="item.picture" :src="item.picture" max-width="64" min-width="64" />
            <v-icon v-else size="64">
              mdi-clipboard-list
            </v-icon>
          </v-sheet>
        </v-list-item-action-text>
        <v-list-item-content style="padding-top: 0; padding-bottom: 0">
          <v-list-item-title
            class="text-h6 font-weight-bold d-inline-block text-truncate list-title-ticket mb-1"
          >
            {{ item.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-subtitle-2">
            <v-chip-group
              column
            >
              <v-chip v-for="(menu, i) in item.article" :key="i" small>
                {{ menu.name }}
              </v-chip>
            </v-chip-group>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action-text class="text-h6 font-weight-bold">
          {{ item.price }}<span style="color: var(--v-primary-base)">€</span>
        </v-list-item-action-text>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'menuCard',
  props: {
    item: {
      type: Object,
      default () {
        return {
          name: 'item',
          quantity: 1,
          price: 0,
          article: [],
          picture: 'http://localhost:3000/images/pizza1.png'
        }
      },
      required: true
    }
  },
  methods: {
    addToCart () {
      this.$store.commit('order/addMenuToOrder', {
        item: this.item,
        type: 'menu'
      })
      this.$store.commit('order/increaseTotalPrice', this.item.price)
    }
  }
}
</script>

<style scoped>

</style>
