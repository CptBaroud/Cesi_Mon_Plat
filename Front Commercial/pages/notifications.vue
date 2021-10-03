<template>
  <v-container class="mt-2">
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-card
          color="background"
          class="rounded-card"
          flat
          width="650"
        >
          <v-card-text>
            <v-virtual-scroll
              :items="notifications"
              :item-height="75"
              :class="scrollbarTheme"
              class="rounded-card"
              height="600"
            >
              <template #default="{ item }">
                <notification
                  :notification="item"
                />
              </template>
            </v-virtual-scroll>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import notification from '@/components/notification'
export default {
  name: 'Notifications',
  components: {
    notification
  },
  middleware: 'auth',
  data () {
    return {
      windowSize: {
        x: 0,
        y: 1
      }
    }
  },
  computed: {
    notifications: {
      get () {
        return this.$store.getters['notification/notifications']
      }
    },

    scrollbarTheme () {
      return this.$vuetify.theme.dark ? 'dark ' : 'light'
    }
  },
  mounted () {
    this.onResize()
  },
  methods: {
    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
      }
    }
  }
}
</script>

<style scoped>
.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #F8F8F8;
  border-left: 1px solid #F8F8F8;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #F8F8F8;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.dark::-webkit-scrollbar {
  width: 15px;
  border-radius: 20px;
}

.dark::-webkit-scrollbar-track {
  background: #2C2C2C;
  border-left: 1px solid #2c2c2c;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #2C2C2C;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
