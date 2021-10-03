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
          <v-list-item-action-text class="mr-2">
            <v-sheet color="primary" rounded="lg" width="64" height="64">
              <v-img v-if="item.picture" :src="item.picture" max-width="64" min-width="64" />
              <v-icon v-else size="64">
                mdi-food
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
              <v-btn
                icon
                x-small
                @click="decreaseQuantity"
              >
                <v-icon
                  small
                >
                  mdi-minus
                </v-icon>
              </v-btn>
              <span style="color: var(--v-primary-base)">x</span>{{ item.quantity }}
              <v-btn
                icon
                x-small
                @click="increaseQuantity"
              >
                <v-icon
                  small
                >
                  mdi-plus
                </v-icon>
              </v-btn>
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
  name: 'OrderCard',
  props: {
    item: {
      type: Object,
      default () {
        return {
          name: 'item',
          quantity: 0,
          price: 0,
          picture: 'http://localhost:3000/images/pizza1.png'
        }
      },
      required: true
    }
  },
  methods: {
    increaseQuantity () {
      if (this.item.elementType === 'menu') {
        this.$store.commit('order/addMenuToOrder', {
          item: this.item,
          type: 'menu'
        })
      } else {
        this.$store.commit('order/addArticleToOrder', {
          item: this.item,
          type: 'article'
        })
      }
      this.$store.commit('order/increaseTotalPrice', this.item.price)
    },

    decreaseQuantity () {
      if (this.item.elementType === 'menu') {
        this.$store.commit('order/removeMenuFromOrder', {
          item: this.item,
          type: 'menu'
        })
      } else {
        this.$store.commit('order/removeArticleFromOrder', {
          item: this.item,
          type: 'article'
        })
      }
      this.$store.commit('order/decreaseTotalPrice', this.item.price)
    }
  }
}
</script>

<style scoped>
/* Propriété CSS permettant a la bordure de l'alert de faire la meme taille que la liste */

>>> .v-alert {
  margin-bottom: 0;
  padding: 0 16px 0 16px;
}

>>> .v-alert .v-list-item__action {
  margin: 0;

}

>>> .v-alert .v-list-item__content {
  padding: 0;
}

>>> .v-alert__border {
  border-radius: 20px !important;
  border-width: 6px;
}

.list-date-ticket {
  color: var(--v-white-base);
  opacity: 0.48;
  max-width: 24em
}

.list-title-ticket {
  color: var(--v-white-base);
  max-width: 25em
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .list-date-ticket {
    width: 13em
  }

  .list-title-ticket {
    width: 6.5em
  }
}

/* Smartphones (landscape) ----------- */
@media only screen and (min-width : 321px) {
  /* Styles */
}

/* Smartphones (portrait) ----------- */
@media only screen and (max-width : 320px) {
  /* Styles */
}

/* iPads (portrait and landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
  /* Styles */
}

/* iPads (landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
  /* Styles */
}

/* iPads (portrait) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
  /* Styles */
}
/**********
iPad 3
**********/
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio : 2) {
  /* Styles */
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 2) {
  /* Styles */
}
/* Desktops and laptops ----------- */
@media only screen and (min-width : 1224px) {
  /* Styles */
}

/* Large screens ----------- */
@media only screen and (min-width : 1824px) {
  /* Styles */
}

/* iPhone 4 ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio : 2) {
  /* Styles */
}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 2) {
  /* Styles */
}

/* iPhone 5 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2){
  /* Styles */
}

@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2){
  /* Styles */
}

/* iPhone 6 ----------- */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2){
  /* Styles */
}

@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2){
  /* Styles */
}

/* iPhone 6+ ----------- */
@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2){
  /* Styles */
}

@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2){
  /* Styles */
}

/* Samsung Galaxy S3 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2){
  /* Styles */
}

@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2){
  /* Styles */
}

/* Samsung Galaxy S4 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 3){
  /* Styles */
}

@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 3){
  /* Styles */
}

/* Samsung Galaxy S5 ----------- */
@media only screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 3){
  /* Styles */
}

@media only screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 3){
  /* Styles */
}

</style>
