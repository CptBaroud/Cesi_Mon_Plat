<template>
  <v-layout fill-height>
    <v-container class="mt-2">
      <v-row justify="center">
        <v-col
          cols="3"
        >
          <v-card
            flat
            color="background"
            rounded="xl"
          >
            <v-card-title>
              Qr code de validation
            </v-card-title>
            <v-card-text>
              <v-card
                flat
                color="secondary"
                rounded="xl"
              >
                <v-card-text v-if="delivery">
                  <v-row justify="center" align="center">
                    <v-col cols="6">
                      <VueQr
                        :text="src"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                rounded
                color="primary"
                @click="delivered"
              >
                La commande est livrée
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card
            class="mt-4"
            flat
            color="background"
            rounded="xl"
          >
            <v-card-title>
              La commande
            </v-card-title>
            <v-card-text>
              <v-card
                flat
                color="secondary"
                rounded="xl"
              >
                <v-card-text v-if="order">
                  <orderCard
                    v-if="order.article"
                    :item="order"
                    :show-button="false"
                  />
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="9"
        >
          <v-card color="background" flat>
            <v-card-title>
              Adresse de la commande
            </v-card-title>
            <v-card-text>
              <v-card
                color="secondary"
                flat
                rounded="xl"
              >
                <v-card-text>
                  <gmap-map
                    :center="{lat: 47.283329, lng:-2.2}"
                    :zoom="15"
                    styles="dark"
                    style="width: 1228px; height: 700px"
                  />
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
import orderCard from '../../components/orderCard'
export default {
  name: 'Id',
  components: {
    orderCard
  },
  middleware: 'auth',
  computed: {
    delivery: {
      get () {
        return this.$store.getters['delivery/delivery'].filter(i => i._id === this.$route.params.id)[0]
      }
    },

    order: {
      get () {
        return this.$store.getters['order/order'].filter(i => i._id === this.delivery.order._id)[0]
      }
    },

    src () {
      return process.env.client_url + '/delivery/' + this.delivery._id
    }
  },
  methods: {
    delivered () {
      this.$store.dispatch('delivery/closeDeliveryMan', {
        token: this.$auth.getToken('local'),
        _id: this.delivery._id
      })
    }
  }
}
</script>

<style scoped>

</style>
