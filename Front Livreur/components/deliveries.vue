<template>
<v-container>
    <v-card class="mx-auto my-8" max-width="374">

        <v-card-title>
            Course en attente
        </v-card-title>
        <v-card-subtitle style="padding-top: 0">
            Ajoutée le {{ dateCreated() }}
        </v-card-subtitle>
        <v-divider class="mx-12"></v-divider>
        <v-card-text>
            <div class="text-subtitle-1">
                Vous pouvez accepter ou refuser cette course. Le lieu de livraison est à l'adresse suivante :
            </div>
            <div class="text-subtitle-1 font-weight-bold mt-3 text-center">
                {{ item.address }}
            </div>
            </v-card-text>

            <v-card-actions v-if="item.status === 0">
      <v-spacer />
      <v-btn rounded color="success" small @click="open">
        Accepter
      </v-btn>
      <v-btn rounded color="error" small @click="close" disabled >
        Ne plus afficher
      </v-btn>
    </v-card-actions>
    </v-card>
</v-container>
</template>

<script>
export default {
  name: 'Deliveries',
  props: {
    item: {
      type: Object,
      default () {
        return {
          status: 0,
          created: '',
          done: false,
          _id: [],
          deliveryMan: 0,
          client: 0,
          address: '',
          deliveryTime: ''
        }
      }
    }
  },
  methods: {
    open () {
      this.$store.dispatch('delivery/open', { token: this.$auth.getToken('local'), _id: this.item._id })
    },
    close () {
      this.$store.dispatch('delivery/close', { token: this.$auth.getToken('local'), _id: this.item._id })
    },
    date () {
      const dateDelivery = new Date(this.item.deliveryTime)
      const options = { hour: '2-digit', minute: '2-digit' }
      const createdDate = dateDelivery.toLocaleDateString('fr-FR', options)
      return createdDate
    },
    dateCreated () {
      const dateCreated = new Date(this.item.created)
      const options = { hour: '2-digit', minute: '2-digit' }
      const createdDate = dateCreated.toLocaleDateString('fr-FR', options)
      return createdDate
    }
  }
}

</script>
<style scoped></style>
