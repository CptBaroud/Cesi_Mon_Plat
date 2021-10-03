<template>
  <v-container class="mt-2">
    <v-row>
      <v-col cols="2">
        <statsCard
          :evolution="0"
          :value="orderNumber"
          subtitle="Commandes"
          color="primary"
        />
        <statsCard
          :evolution="0"
          :value="orderAcceptedNumber"
          subtitle="Commandes acceptées"
          color="accent"
        />
        <statsCard
          :evolution="0"
          :value="orderDeniedNumber"
          subtitle="Commandes refusées"
          color="accent"
        />
      </v-col>
      <v-col cols="3">
        <!-- Commandes acceptées par jours-->
        <v-card
          color="background"
          flat
          rounded="xl"
        >
          <v-card-title>
            Commandes acceptées par jours
          </v-card-title>
          <v-card-text>
            <v-card
              flat
              color="secondary"
              rounded="xl"
            >
              <v-card-text>
                <apexchart ref="accepted" type="line" :options="$vuetify.theme.dark ? areaDayDarkChartOptions : areaDayLightChartOptions" :series="series1" />
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
        <!-- Commandes refusées par jours-->
        <v-card
          color="background"
          flat
          rounded="xl"
        >
          <v-card-title>
            Commandes refusées par jours
          </v-card-title>
          <v-card-text>
            <v-card
              flat
              color="secondary"
              rounded="xl"
            >
              <v-card-text>
                <apexchart ref="declined" type="line" :options="$vuetify.theme.dark ? areaDayDarkChartOptions : areaDayLightChartOptions" :series="series2" />
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import statsCard from '../components/statsCard'

export default {
  name: 'Stats',
  middleware: 'auth',
  components: {
    statsCard,
    apexchart: () => import('vue-apexcharts')
  },
  data () {
    return {
      // Option des chart apex chart style dark
      areaDayDarkChartOptions: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          events: {
            mounted: () => {
              this.fillDayAcceptedData()
              this.fillDayDeclinedData()
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          show: true,
          theme: 'dark'
        },
        grid: {
          show: false
        },
        yaxis: {
          show: false,
          min: 0
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          categories: []
        }
      },
      // Option des chart apex chart style night
      areaDayLightChartOptions: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          events: {
            mounted: () => {
              this.fillDayAcceptedData()
              this.fillDayDeclinedData()
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          show: true,
          theme: 'light'
        },
        grid: {
          show: false
        },
        yaxis: {
          show: false,
          min: 0
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          categories: []
        }
      },
      areaBarChartOptions: {
        chart: {
          type: 'bar',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          events: {
            mounted: () => {
              this.fillMenuData()
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          show: true,
          theme: 'light'
        },
        grid: {
          show: false
        },
        yaxis: {
          show: false,
          min: 0
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          categories: []
        }
      },
      series1: [{
        name: 'Commande',
        data: []
      }],
      series2: [{
        name: 'Commande',
        data: []
      }],
      seriesTest: [{
        name: 'Commande',
        data: []
      }]
    }
  },
  computed: {
    orderNumber () {
      return this.$store.getters['order/order'].length
    },

    orderAcceptedNumber () {
      return this.$store.getters['order/order'].filter(object => object.status === 'accepted').length
    },

    orderDeniedNumber () {
      return this.$store.getters['order/order'].filter(object => object.status === 'declined').length
    },

    order: {
      get () {
        return this.$store.getters['order/order']
      }
    },

    menu: {
      get () {
        return this.$store.getters['menu/menu']
      }
    }
  },
  mounted () {
    this.fillMenuData()
  },
  methods: {
    fillDayAcceptedData () {
      // Tableau contenant les données a update
      const newData = []
      const newLabels = []

      // On clones les donnée pour eviter de modifier le store a un endroit ou il est pas senser etre modifier
      let orders = this.order.slice()

      // On groupe les ticket par leur date de création via un map Reduce
      orders = orders.sort(function (a, b) {
        const dateA = new Date(a.created)
        const dateB = new Date(b.created)
        return dateA - dateB
      }).reduce((groups, item) => {
        const created = new Date(item.created)

        const createdDate = created.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })

        // Si on le tableau est vide on l'initialise
        if (groups === null) {
          groups = []
        }

        if (item.status === 'accepted') {
          if (!groups[createdDate]) {
            groups[createdDate] = 0
          }
          groups[createdDate]++
        }

        return groups
      }, {})

      // On remplis les tableaux
      Object.entries(orders).forEach((item) => {
        newLabels.push(item[0])
        newData.push(item[1])
      })

      // On réassigne les nouvelles valeurs
      this.series1 = [{
        name: 'Test 1',
        data: newData
      }]
      // On update les labels
      this.$refs.accepted.updateOptions({ labels: newLabels })
    },

    fillDayDeclinedData () {
      // Tableau contenant les données a update
      const newData = []
      const newLabels = []

      // On clones les donnée pour eviter de modifier le store a un endroit ou il est pas senser etre modifier
      let orders = this.order.slice()

      // On groupe les ticket par leur date de création via un map Reduce
      orders = orders.sort(function (a, b) {
        const dateA = new Date(a.created)
        const dateB = new Date(b.created)
        return dateA - dateB
      }).reduce((groups, item) => {
        const created = new Date(item.created)

        const createdDate = created.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })

        // Si on le tableau est vide on l'initialise
        if (groups === null) {
          groups = []
        }

        if (item.status === 'declined') {
          if (!groups[createdDate]) {
            groups[createdDate] = 0
          }
          groups[createdDate]++
        }

        return groups
      }, {})

      // On remplis les tableaux
      Object.entries(orders).forEach((item) => {
        newLabels.push(item[0])
        newData.push(item[1])
      })

      // On réassigne les nouvelles valeurs
      this.series2 = [{
        name: 'Test 1',
        data: newData
      }]
      // On update les labels
      this.$refs.declined.updateOptions({ labels: newLabels })
    },

    fillMenuData () {
      // Tableau contenant les données a update
      const newData = []
      const newLabels = []

      // On clones les donnée pour eviter de modifier le store a un endroit ou il est pas senser etre modifier
      let orders = this.order.slice()

      // On groupe les ticket par leur date de création via un map Reduce
      // On remplis les tableaux

      orders = orders
        .sort(function (a, b) {
          const dateA = new Date(a.created)
          const dateB = new Date(b.created)
          return dateA - dateB
        })
        .reduce((groups, item) => {
          const created = new Date(item.created)

          const createdDate = created.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          })

          // Si le tableau est vide on l'initialise
          if (groups === null) {
            groups = []
          }

          if (!groups[createdDate]) {
            groups[createdDate] = {}
          }

          // On compte Chaque menu
          item.menu.forEach((item) => {
            if (!groups[createdDate][item.name]) {
              groups[createdDate][item.name] = 0
            }
            groups[createdDate][item.name]++
          })

          return groups
        }, {})
      // Ok donc pour l'instant on a aun objet avec ce qu'on veut dedans
      // Mais c'est pas ce qu'il faut a chercher
      console.log(newData)
      console.log(newLabels)
      console.log(orders)
      // this.$refs.menuDataChart.updateOptions({ labels: newLabels })
    }

  }
}
</script>

<style scoped>

</style>
