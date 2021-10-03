<template>
  <v-container fluid>
    <v-row>
      <v-col
        lg="12"
        md="12"
      >
        <v-card rounded="xl" flat color="background">
          <v-card-title>
            Tout les composants
            <v-spacer />
            <v-dialog
              v-model="modal"
              persistent
              width="500"
              style="border-radius: 20px"
            >
              <template #activator="{on, attrs}">
                <v-btn
                  v-bind="attrs"
                  text
                  rounded
                  color="primary"
                  v-on="on"
                >
                  Ajouter
                </v-btn>
              </template>
              <v-card
                rounded="xl"
                color="background"
              >
                <v-card-title>
                  Ajouter un composant
                </v-card-title>
                <v-card-text>
                  <v-form
                    ref="articleForm"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="add.name"
                      :rules="requiredRules"
                      filled
                      rounded
                      label="Nom du composant"
                    />
                    <v-text-field
                      v-model="add.link"
                      filled
                      rounded
                      label="Description"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    rounded
                    color="primary"
                    :disabled="!valid"
                    @click="addComponent"
                  >
                    Ajouter
                  </v-btn>
                  <v-btn
                    text
                    rounded
                    @click="modal = false"
                  >
                    Annuler
                  </v-btn>
                </v-card-actions>
                <v-btn
                  absolute
                  elevation="0"
                  top
                  right
                  icon
                  color="error"
                  @click="modal = false"
                >
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card
            rounded="xl"
            flat
            color="secondary"
          >
            <v-card-text>
              <v-data-iterator
                :items="component"
                no-data-text="Aucune livraison pour l'instant"
              >
                <template #default="{items}">
                  <v-row>
                    <v-col
                      v-for="item in items"
                      :key="item._id"
                      cols="3"
                    >
                      <v-card
                        rounded="xl"
                        color="background"
                        flat
                      >
                        <v-card-title>
                          {{ item.name }}
                        </v-card-title>
                        <v-card-text>
                          Pour installer le component faite simplement la commande
                          <code>npm i {{ item.name }}</code>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            color="error"
                            rounded
                            @click="deleteComponent(item)"
                          >
                            Supprimer
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      valid: false,
      modal: false,
      add: {}
    }
  },
  computed: {
    component: {
      get () {
        return this.$store.getters['component/components']
      }
    }
  },
  mounted () {
    this.$store.dispatch('component/fetch', this.$auth.getToken('local'))
  },
  methods: {
    addComponent () {
      this.$store.dispatch('component/create', {
        token: this.$auth.getToken('local'),
        item: this.add
      })
        .then((response) => {
          if (response.status === 200) {
            this.modal = false
          }
        })
    },

    deleteComponent (item) {
      this.$store.dispatch('component/delete', {
        token: this.$auth.getToken('local'),
        component: item._id
      })
    }
  }
}

</script>

<style scoped>

</style>
