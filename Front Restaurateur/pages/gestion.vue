<template>
  <v-container class="mt-2">
    <v-row>
      <v-col
        cols="8"
      >
        <!-- Menu Card -->
        <v-card
          class="mt-2"
          color="background"
          flat
          rounded="xl"
        >
          <v-card-title>
            Vos menu
            <v-spacer />
            <v-dialog
              v-model="menuModal"
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
                  :disabled="article.length < 1"
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
                  Ajouter un Menu
                </v-card-title>
                <v-card-text>
                  <v-form
                    ref="menuForm"
                    v-model="menuValid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="menuAdd.name"
                      :rules="requiredRules"
                      filled
                      rounded
                      label="Nom du menu"
                    />
                    <v-textarea
                      v-model="menuAdd.description"
                      auto-grow
                      filled
                      rounded
                      label="Description"
                    />
                    <v-autocomplete
                      v-model="menuAdd.category"
                      filled
                      rounded
                      item-text="name"
                      item-value="_id"
                      :items="category.filter(i => i.type === 2)"
                      label="Categories"
                    >
                      <template #selection="data">
                        {{ data.item.name }}
                      </template>
                      <template #item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item" />
                        </template>
                        <template v-else>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ data.item.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                    <v-autocomplete
                      v-model="menuAdd.article"
                      multiple
                      :filter="articleFilter"
                      :rules="requiredRules"
                      filled
                      rounded
                      :items="article"
                      label="Articles"
                      @change="updateMenuPrice"
                    >
                      <template #selection="data">
                        <v-chip>
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template #item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item" />
                        </template>
                        <template v-else>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ data.item.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                    <v-text-field
                      v-model="menuAdd.price"
                      :rules="requiredRules"
                      filled
                      rounded
                      type="number"
                      label="Prix de l'article"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    rounded
                    color="primary"
                    :disabled="!menuValid"
                    @click="addMenu"
                  >
                    Ajouter
                  </v-btn>
                  <v-btn
                    text
                    rounded
                    @click="menuModal = false"
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
                  @click="menuModal = false"
                >
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-card
              color="secondary"
              flat
              rounded="xl"
            >
              <v-card-title>
                <v-text-field
                  v-model="menuSearch"
                  rounded
                  filled
                  prepend-inner-icon="mdi-magnify"
                  label="Recherche"
                />
                <v-spacer />
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :items="menu"
                  :search="menuSearch"
                  :headers="menuHeader"
                  :page="menuPage"
                  :items-per-page="menuItemPerPages"
                  hide-default-footer
                  no-data-text="Vous n'avez pas encore d'article ajoutez en !"
                  no-results-text="Aucune commande ne correspond a votre recherche"
                >
                  <template #[`item.action`]="{item}">
                    <v-btn
                      icon
                      small
                      @click="openMenuEdit(item)"
                    >
                      <v-icon color="primary">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                      @click="deleteMenu(item)"
                    >
                      <v-icon color="error">
                        mdi-delete-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <template #[`item.article`]="{item}">
                    <v-chip-group column>
                      <v-chip v-for="(object, i) in item.article" :key="i">
                        {{ object.name }}
                      </v-chip>
                    </v-chip-group>
                  </template>
                  <template #footer>
                    <v-pagination
                      v-model="menuPage"
                      class="mt-2"
                      :length="menuLength"
                      :total-visible="3"
                      circle
                    />
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
        <!-- Article Card -->
        <v-card
          class="mt-2"
          color="background"
          flat
          rounded="xl"
        >
          <v-card-title>
            Vos articles
            <v-spacer />
            <v-dialog
              v-model="articleModal"
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
                  Ajouter un article
                </v-card-title>
                <v-card-text>
                  <v-form
                    ref="articleForm"
                    v-model="articleValid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="articleAdd.name"
                      :rules="requiredRules"
                      :hint="article.filter(e => e.name.toLowerCase() === articleAdd.name.toLowerCase()).length > 0 ? 'Un article avec le meme nom existe déjà' : ''"
                      filled
                      rounded
                      label="Nom de l'article"
                    />
                    <v-textarea
                      v-model="articleAdd.description"
                      auto-grow
                      filled
                      rounded
                      label="Description"
                    />
                    <v-autocomplete
                      v-model="articleAdd.category"
                      filled
                      rounded
                      item-text="name"
                      item-value="_id"
                      :items="category.filter(i => i.type === 1)"
                      label="Categorie"
                    />
                    <v-autocomplete
                      v-model="articleAdd.type"
                      filled
                      rounded
                      :items="typeArray"
                      label="Type"
                    />
                    <v-chip-group>
                      <v-chip
                        v-for="(item,i) in articleAdd.ingredient"
                        :key="i"
                        close
                        @click:close="pullIngredient(i)"
                      >
                        {{ item }}
                      </v-chip>
                    </v-chip-group>
                    <v-text-field
                      v-model="articleIngredient"
                      filled
                      rounded
                      hint="Appuyer sur entré pour ajouter un ingredient"
                      label="Ingredient"
                      @keydown.enter="pushIngredient()"
                    />
                    <v-text-field
                      v-model="articleAdd.price"
                      :rules="requiredRules"
                      filled
                      rounded
                      type="number"
                      label="Prix de l'article"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    rounded
                    color="primary"
                    :disabled="!articleValid"
                    @click="addArticle"
                  >
                    Ajouter
                  </v-btn>
                  <v-btn
                    text
                    rounded
                    @click="articleModal = false"
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
                  @click="articleModal = false"
                >
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-card
              color="secondary"
              flat
              rounded="xl"
            >
              <v-card-title>
                <v-text-field
                  v-model="articleSearch"
                  filled
                  rounded
                  prepend-inner-icon="mdi-magnify"
                  label="Recherche"
                />
                <v-spacer />
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :items="article"
                  :headers="articleHeader"
                  :page="articlePage"
                  :items-per-page="articleItemPerPages"
                  :search="articleSearch"
                  hide-default-footer
                  no-data-text="Vous n'avez pas encore d'article ajoutez en !"
                  no-results-text="Aucune commande ne correspond a votre recherche"
                >
                  <template #[`item.ingredient`]="{item}">
                    <v-chip-group column>
                      <v-chip v-for="(object, i) in item.ingredient" :key="i">
                        {{ object }}
                      </v-chip>
                    </v-chip-group>
                  </template>
                  <template #[`item.type`]="{item}">
                    {{ typeText(item.type) }}
                  </template>
                  <template #[`item.action`]="{item}">
                    <v-btn
                      icon
                      small
                      @click="openArticleEdit(item)"
                    >
                      <v-icon color="primary">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                      @click="deleteArticle(item)"
                    >
                      <v-icon color="error">
                        mdi-delete-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <template #footer>
                    <v-pagination
                      v-model="articlePage"
                      class="mt-2"
                      :length="articleLength"
                      :total-visible="3"
                      circle
                    />
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="4"
      >
        <v-card
          class="mt-2"
          color="background"
          flat
          rounded="xl"
        >
          <v-card-title>
            Informations de l'entreprise
          </v-card-title>
          <v-card-text>
            <v-card
              rounded="xl"
              flat
              color="secondary"
            >
              <v-card-text>
                <v-text-field
                  v-model="restaurantName"
                  filled
                  rounded
                  placeholder="Prénom"
                />
                <v-textarea
                  v-model="restaurantDescription"
                  filled
                  auto-grow
                  rounded
                  placeholder="Description du restaurant"
                />
                <v-list-item class="mb-4">
                  <v-list-item-avatar style="border: solid var(--v-primary-base) 2px" size="96">
                    <v-img v-if="restaurantData.logo" :src="restaurantData.logo" />
                    <v-icon v-else>
                      mdi-camera
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-form
                      ref="uploadProfilePictureForm"
                      v-model="uploadLogoValid"
                      lazy-validation
                    >
                      <v-file-input
                        v-model="uploadLogoItem"
                        style="max-width: 356px"
                        accept="image/png, image/jpeg, image/bmp"
                        rounded
                        hide-details
                        filled
                      />
                    </v-form>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      class="ml-4"
                      rounded
                      color="primary"
                      :disabled="!uploadLogoValid"
                      @click="uploadPicture"
                    >
                      Modifier
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
        <!-- Category card -->
        <!--<v-card
          class="mt-2"
          color="background"
          flat
          rounded="xl"
        >
          <v-card-title>
            Vos categories
            <v-spacer />
            <v-dialog
              v-model="categoryModal"
              persistent
              width="500"
              style="border-radius: 20px"
            >
              <template #activator="{on, attrs}">
                <v-btn
                  v-bind="attrs"
                  icon
                  text
                  color="primary"
                  v-on="on"
                >
                  <v-icon>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </template>
              <v-card
                rounded="xl"
                color="background"
              >
                <v-card-title>
                  Ajouter une Catégorie
                </v-card-title>
                <v-card-text>
                  <v-form
                    ref="categoryForm"
                    v-model="categoryValid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="categoryAdd.name"
                      :rules="requiredRules"
                      :hint="category.filter(e => e.name.toLowerCase() === categoryAdd.name.toLowerCase()).length > 0 ? 'Une categorie avec le meme nom existe déjà' : ''"
                      filled
                      rounded
                      label="Nom de la catégorie"
                    />
                    <v-textarea
                      v-model="categoryAdd.description"
                      :rules="requiredRules"
                      auto-grow
                      filled
                      rounded
                      label="Description"
                    />
                    <v-autocomplete
                      v-model="categoryAdd.type"
                      :rules="requiredRules"
                      :items="categoryArray"
                      label="Type"
                      rounded
                      filled
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    rounded
                    color="primary"
                    :disabled="!categoryValid"
                    @click="addCategory()"
                  >
                    Ajouter
                  </v-btn>
                  <v-btn
                    text
                    rounded
                    @click="categoryModal = false"
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
                  @click="categoryModal = false"
                >
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-card
              color="secondary"
              flat
              rounded="xl"
            >
              <v-card-text>
                <v-data-iterator
                  :items="category"
                  no-data-text="Vous n'avez pas encore crée de catégories"
                  no-results-text="Aucune commande ne correspond a votre recherche"
                >
                  <template #default="{items}">
                    <v-list
                      rounded
                      color="secondary"
                    >
                      <v-list-item
                        v-for="item in items"
                        :key="item.name"
                        color="background"
                      >
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.description }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-icon class="ml-1" small>
                            mdi-pencil
                          </v-icon>
                        </v-list-item-action>
                        <v-list-item-action>
                          <v-icon color="error" small>
                            mdi-delete
                          </v-icon>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </template>
                </v-data-iterator>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>-->
      </v-col>
    </v-row>

    <!-- Edit Article Modal -->
    <v-dialog
      v-model="articleEditModal"
      persistent
      width="500"
      style="border-radius: 20px"
    >
      <v-card
        rounded="xl"
        color="background"
      >
        <v-card-title>
          Editer un article
        </v-card-title>
        <v-card-text>
          <v-form
            ref="articleEditForm"
            v-model="articleEditValid"
            lazy-validation
          >
            <v-text-field
              v-model="articleEditData.name"
              :rules="requiredRules"
              :hint="article.filter(e => e.name.toLowerCase() === articleAdd.name.toLowerCase()).length > 0 ? 'Un article avec le meme nom existe déjà' : ''"
              filled
              rounded
              label="Nom de l'article"
            />
            <v-textarea
              v-model="articleEditData.description"
              auto-grow
              filled
              rounded
              label="Description"
            />
            <v-autocomplete
              v-model="articleEditData.category"
              filled
              rounded
              :items="articleCategories"
              label="Categorie"
            />
            <v-autocomplete
              v-model="articleEditData.type"
              filled
              rounded
              :items="typeArray"
              label="Type"
            />
            <v-chip-group>
              <v-chip
                v-for="(item,i) in articleEditData.ingredient"
                :key="i"
              >
                {{ item }}
              </v-chip>
            </v-chip-group>
            <v-text-field
              v-model="articleEditData.price"
              :rules="requiredRules"
              filled
              rounded
              type="number"
              label="Prix de l'article"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            rounded
            color="primary"
            :disabled="!articleEditValid"
            @click="editArticle"
          >
            Valider
          </v-btn>
          <v-btn
            text
            rounded
            @click="articleEditModal = false"
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
          @click="menuEditModal = false"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
    <!-- Edit Menu Modal -->
    <v-dialog
      v-model="menuEditModal"
      persistent
      width="500"
      style="border-radius: 20px"
    >
      <v-card
        rounded="xl"
        color="background"
      >
        <v-card-title>
          Editer un Menu
        </v-card-title>
        <v-card-text>
          <v-form
            ref="menuForm"
            v-model="menuEditValid"
            lazy-validation
          >
            <v-text-field
              v-model="menuEditData.name"
              :rules="requiredRules"
              filled
              rounded
              label="Nom du menu"
            />
            <v-textarea
              v-model="menuEditData.description"
              auto-grow
              filled
              rounded
              label="Description"
            />
            <v-autocomplete
              v-model="menuEditData.category"
              filled
              rounded
              :items="menuCategories"
              label="Categories"
            >
              <template #selection="data">
                {{ data.item.name }}
              </template>
              <template #item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item" />
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ data.item.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
            <v-autocomplete
              v-model="menuEditData.article"
              multiple
              :rules="requiredRules"
              filled
              rounded
              :items="article"
              label="Articles"
              @change="updateMenuPrice"
            >
              <template #selection="data">
                <v-chip>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template #item="data">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ data.item.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
            <v-text-field
              v-model="menuEditData.price"
              :rules="requiredRules"
              filled
              rounded
              type="number"
              label="Prix de l'article"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            rounded
            color="primary"
            :disabled="!menuEditValid"
            @click="editMenu"
          >
            Valider
          </v-btn>
          <v-btn
            text
            rounded
            @click="menuEditModal = false"
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
          @click="menuEditModal = false"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Gestion',
  middleware: 'auth',
  data () {
    return {
      // Ajout d'un article
      articleAdd: {
        name: '',
        description: '',
        ingredient: []
      },
      articleIngredient: '',
      articleModal: '',
      articleValid: false,

      // Affichage des articles
      articleSearch: '',
      articlePage: 1,
      articleItemPerPages: 10,
      articleHeader: [
        {
          text: 'Nom',
          value: 'name'
        },
        {
          text: 'Description',
          value: 'description'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Ingrédients',
          value: 'ingredient'
        },
        {
          text: 'Prix',
          value: 'price'
        },
        {
          text: '',
          value: 'action',
          sortable: false,
          width: 100
        }
      ],

      // Edit d'un article
      articleEditData: {
        name: '',
        description: '',
        ingredient: []
      },
      articleEditModal: false,
      articleEditValid: false,

      // Ajout d'un menu
      menuAdd: {
        name: '',
        description: '',
        article: [],
        price: 0
      },
      menuModal: '',
      menuValid: false,

      // Affichage des menu
      menuSearch: '',
      menuPage: 1,
      menuItemPerPages: 10,
      menuHeader: [
        {
          text: 'Nom',
          value: 'name'
        },
        {
          text: 'Description',
          value: 'description'
        },
        {
          text: 'Articles',
          value: 'article'
        },
        {
          text: 'Prix',
          value: 'price'
        },
        {
          text: '',
          value: 'action',
          sortable: false
        }
      ],

      // Edit d'un article
      menuEditData: {
        name: '',
        description: '',
        article: [],
        price: 0
      },
      menuEditModal: false,
      menuEditValid: false,

      // Ajout d'une catégorie
      categorySearch: '',
      categoryAdd: {
        name: '',
        description: '',
        type: 0
      },
      categoryModal: '',
      categoryValid: false,

      // Upload d'un logo pour pour le restaurant
      uploadLogoItem: {},
      uploadLogoValid: false,

      // Data
      categoryArray: [
        {
          value: 1,
          text: 'Catégorie de plat'
        },
        {
          value: 2,
          text: 'Catégorie de menu'
        }
      ],
      typeArray: [
        {
          value: 0,
          text: 'Plat principal'
        },
        {
          value: 1,
          text: 'Accompagnement'
        },
        {
          value: 2,
          text: 'Boisson'
        },
        {
          value: 3,
          text: 'Sauce'
        }
      ],

      // Regles de vérifications
      requiredRules: [
        v => !!v || 'Ce champ est requis'
      ]
    }
  },
  computed: {
    article: {
      get () {
        return this.$store.getters['article/article']
      }
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
    },

    category: {
      get () {
        return this.$store.getters['category/categories'].filter(object => object.type !== 0)
      }
    },

    menuCategories () {
      return this.$store.getters['category/menuCategories']
    },

    articleCategories () {
      return this.$store.getters['category/articleCategories']
    },

    articleLength () {
      return Math.ceil(this.article.length / this.articleItemPerPages)
    },

    menuLength () {
      return Math.ceil(this.menu.length / this.menuItemPerPages)
    },

    restaurantData: {
      get () {
        return this.$auth.user.restaurant
      }
    },

    restaurantName: {
      get () {
        return this.$auth.user.restaurant.name
      },

      set (value) {
        this.$store.dispatch('restaurant/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user.restaurant._id, name: value })
      }
    },

    restaurantDescription: {
      get () {
        return this.$auth.user.restaurant.description
      },

      set (value) {
        this.$store.dispatch('restaurant/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user.restaurant._id, description: value })
      }
    }
  },
  methods: {
    /**
       * Filtre permettant d'overide la recherche de l'autocomplete
       * On cherche par le nom de l'entreprise
       * @param item
       * @param queryText
       * @param itemText
       * @returns {boolean}
       */
    articleFilter (item, queryText, itemText) {
      return item.name.toLowerCase().includes(queryText.toLowerCase())
    },

    typeText (value) {
      switch (value) {
        case 0:
          return 'Plat principal'
        case 1:
          return 'Accompagnement'
        case 2:
          return 'Boisson'
        case 3:
          return 'Sauce'
      }
    },

    addCategory () {
      this.categoryAdd.token = this.$auth.getToken('local')
      this.categoryAdd.restaurant = this.$auth.user.restaurant._id

      this.$store.dispatch('category/add', this.categoryAdd)
        .then((response) => {
          if (response.status === 200) {
            this.categoryModal = false
            this.categoryAdd = {
              name: '',
              description: '',
              type: 0
            }
          }
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e)
          this.$toast.error(e.message)
        })
    },

    addMenu () {
      this.menuAdd.token = this.$auth.getToken('local')
      this.menuAdd.restaurant = this.$auth.user.restaurant._id

      this.$store.dispatch('menu/add', this.menuAdd)
        .then((response) => {
          if (response.status === 200) {
            this.menuModal = false
            this.menuAdd = {
              name: '',
              description: '',
              article: [],
              price: 0
            }
          }
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e)
          this.$toast.error(e.message)
        })
    },

    addArticle () {
      this.articleAdd.token = this.$auth.getToken('local')
      this.articleAdd.restaurant = this.$auth.user.restaurant._id

      this.$store.dispatch('article/add', this.articleAdd)
        .then((response) => {
          if (response.status === 200) {
            this.articleModal = false
            this.articleAdd = {
              name: '',
              description: '',
              ingredient: []
            }
          }
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e)
          this.$toast.error(e)
        })
    },

    openArticleEdit (item) {
      this.articleEditData = Object.assign({}, item)
      this.articleEditModal = true
    },

    editArticle () {
      this.$store.dispatch('article/edit', {
        token: this.$auth.getToken('local'),
        item: this.articleEditData
      })
        .then((response) => {
          if (response.status === 200) {
            this.articleEditModal = false
            this.articleEditData = {
              name: '',
              description: '',
              article: [],
              price: 0
            }
          }
        })
    },

    openMenuEdit (item) {
      this.menuEditData = Object.assign({}, item)
      this.menuEditModal = true
    },

    editMenu () {
      this.$store.dispatch('menu/edit', {
        token: this.$auth.getToken('local'),
        item: this.menuEditData
      })
        .then((response) => {
          if (response.status === 200) {
            this.menuEditModal = false
            this.menuEditData = {
              name: '',
              description: '',
              article: [],
              price: 0
            }
          }
        })
    },

    deleteArticle (item) {
      this.$store.dispatch('article/delete', {
        token: this.$auth.getToken('local'),
        _id: item._id
      })
    },

    deleteMenu (item) {
      this.$store.dispatch('menu/delete', {
        token: this.$auth.getToken('local'),
        _id: item._id
      })
    },

    pushIngredient () {
      this.articleAdd.ingredient.push(this.articleIngredient)
      this.articleIngredient = ''
    },

    pullIngredient (itemIndex) {
      this.articleAdd.ingredient.splice(itemIndex, 1)
    },

    pushEditIngredient () {
      this.articleEditData.ingredient.push(this.articleIngredient)
      this.articleIngredient = ''
    },

    pullEditIngredient (itemIndex) {
      this.articleEditData.ingredient.splice(itemIndex, 1)
    },

    uploadPicture () {
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })

      toBase64(this.uploadLogoItem).then((response) => {
        this.$store.dispatch('restaurant/updateLogo', {
          token: this.$auth.getToken('local'),
          type: this.uploadLogoItem.type,
          name: this.uploadLogoItem.name,
          restaurant: this.$auth.user.restaurant._id,
          file: response
        })
      })
    },

    /**
       * Pour changer automatiquement le prix d'un menu
       */
    updateMenuPrice () {
      this.menuAdd.price = 0
      this.menuAdd.article.forEach((item) => {
        this.menuAdd.price += item.price
      })
    }
  }
}
</script>

<style scoped>
>>> .theme--dark .v-data-table {
  background-color: var(--v-secondary-base) !important;
}

>>> .theme--light .v-data-table {
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
