<template>
  <v-card
    rounded="xl"
    flat
    class="mt-4"
    color="secondary"
  >
    <v-card-title>
      <v-text-field
        v-model="search"
        rounded
        filled
        prepend-inner-icon="mdi-magnify"
        label="Recherche"
        single-line
        hide-details
      />
      <v-spacer />
    </v-card-title>
    <v-card-text>
      <v-data-table
        :items="item"
        :headers="headers"
        :search="search"
        :page="page"
        :items-per-page="itemPerPages"
        hide-default-footer
        no-data-text="Aucune données disponibles"
        no-results-text="Aucune données ne correspond a votre recherche"
        @click:row="openDeliveries"
      >
        <template #[`item.end`]="{item}">
          <span v-if="item.end">
            {{ new Date(item.end).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            }) }}
          </span>
          <span v-else>
            Pas encore livré
          </span>
        </template>
        <template #[`item.status`]="{item}">
          <v-chip
            :color="statusColor(item.status)"
          >
            {{ statusText(item.status) }}
          </v-chip>
        </template>
        <template #[`item.deliveryTime`]="{item}">
          {{ new Date(item.deliveryTime).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          }) }}
        </template>
        <template #[`item.done`]="{item}">
          <v-chip
            :color="item.done ? 'success' : 'error'"
          >
            <span v-if="item.done">
              Livré
            </span>
            <span v-else>
              Non livré
            </span>
          </v-chip>
        </template>
        <template #footer>
          <v-pagination
            v-model="page"
            class="mt-2"
            :length="itemsLength"
            :total-visible="3"
            circle
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DeliveriesTable',
  search: '',
  props: {
    item: {
      type: Array,
      default () {
        return [{
          deliveryMan: NaN,
          client: NaN,
          restaurant: {
            name: ''
          },
          status: NaN,
          address: '',
          deliveryTime: Date,
          end: Date,
          done: false,
          order: []
        }]
      }
    }
  },
  data () {
    return {
      search: '',
      page: 1,
      itemPerPages: 10,
      headers: [
        {
          text: 'Livreur',
          align: 'start',
          filterable: false,
          value: 'deliveryMan'
        },
        {
          text: 'Client',
          value: 'client'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Restaurant',
          value: 'restaurant.name'
        },
        {
          text: 'Adresse',
          value: 'address'
        },
        {
          text: 'Heure de livraison',
          value: 'deliveryTime'
        },
        {
          text: 'Livré le',
          value: 'end'
        },
        {
          text: 'Terminé',
          value: 'done'
        }
      ]
    }
  },
  computed: {
    itemsLength () {
      return Math.ceil(this.item.length / this.itemPerPages)
    }
  },
  methods: {
    statusColor (item) {
      switch (item) {
        case 0:
          return 'accent'
        case 1:
          return 'warning'
        case 3:
          return 'info'
        case 5:
          return 'info'
        case 6:
          return 'success'
        default:
          return 'primary'
      }
    },

    statusText (item) {
      switch (item) {
        case 1:
          return 'En attente'
        case 2:
          return 'En préparation'
        case 3:
          return 'En livraison'
        case 5:
          return 'Livrée'
        case 6:
          return 'livrée'
        default:
          return 'Indéfinis'
      }
    },

    openDeliveries (item) {
      console.log(item)
      if (item.status === 1) {
        this.$toast.error('Le restaurant ne prepare pas encore la commande')
      } else {
        this.$store.dispatch('delivery/taken', {
          token: this.$auth.getToken('local'),
          _id: item._id
        })
          .then((response) => {
            if (response.status === 200) {
              this.$router.push('/delivery/' + item._id)
            }
          })
      }
    }
  }
}

</script>

<style scoped>
>>> .v-data-table {
  background: var(--v-secondary-base) !important;
}

>>> .v-data-table table {
  border-collapse: separate;
  border-radius: 25px;
  background: var(--v-secondary-base) !important;
  margin-top: -4px; /* correct offset on first border spacing if desired */
}

>>> .v-data-table table th {
  background: var(--v-background-base);
  border-style: none;
}

>>> .v-data-table table th:first-child {
  border-top-left-radius: 28px;
}

>>> .v-data-table table th:last-child {
  border-top-right-radius: 28px;
}

>>> .v-data-table tbody {
  border-radius: 28px;
}

>>> .v-data-table td {
  border-style: none;
}

>>> .v-data-table tr {
  background: var(--v-secondary-base);
}

>>> .v-data-table__wrapper tr {
  background: var(--v-secondary-base);
}

>>> .v-data-table tr:hover {
  background: var(--v-background-base);
}

>>> .v-data-table tbody:hover {
  background: var(--v-background-base);
  cursor: pointer;
}

>>> .v-data-table__wrapper tr:hover {
  background: var(--v-background-base);
}

>>> .v-data-table tr:first-child td:first-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 28px;
}

>>> .v-data-table tr:first-child td:last-child {
  border-bottom-right-radius: 28px;
  border-top-right-radius: 0;
}

>>> .v-data-table tr:last-child td:first-child {
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
}

>>> .v-data-table tr:last-child td:last-child {
  border-bottom-right-radius: 28px;
  border-top-right-radius: 28px;
}

>>> .v-data-table td:first-child {
  border-left-style: none;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
}

>>> .v-data-table td:last-child {
  border-right-style: none;
  border-bottom-right-radius: 28px;
  border-top-right-radius: 28px;
}

>>> .theme--light.v-data-table >
.v-data-table__wrapper > table > tbody > tr:not(:last-child)
> td:not(.v-data-table__mobile-row), .theme--light.v-data-table >
.v-data-table__wrapper > table > tbody > tr:not(:last-child) >
th:not(.v-data-table__mobile-row) {
  border-bottom: none !important;
}

>>> .theme--dark.v-data-table >
.v-data-table__wrapper > table > tbody > tr:not(:last-child)
> td:not(.v-data-table__mobile-row), .theme--dark.v-data-table >
.v-data-table__wrapper > table > tbody > tr:not(:last-child) >
th:not(.v-data-table__mobile-row) {
  border-bottom: none !important;
}

>>> .theme--dark.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
  border-bottom: none !important;
}

>>> .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
  border-bottom: none !important;
}

>>> .theme--dark.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: var(--v-background-base) !important;
}

>>> .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: var(--v-background-base) !important;
}

>>> .v-data-table tbody tr.v-data-table__expanded__content {
  box-shadow: none;
}

</style>
