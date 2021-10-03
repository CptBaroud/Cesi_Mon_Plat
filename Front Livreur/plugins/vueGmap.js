import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCj1LzdqEeQCss9JoDtIseGnqOt2sA19ek',
    libraries: 'places'
  }
})
