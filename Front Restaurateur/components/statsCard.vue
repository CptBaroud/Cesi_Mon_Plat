<template>
  <v-card
    rounded="xl"
    class="mb-4"
    elevation="2"
    :color="light ? color : color + ' darken-2'"
  >
    <v-card-title>
      <v-icon>
        {{ icon }}
      </v-icon>
      <v-spacer />
      <v-icon x-small class="mr-2">
        mdi-chart-pie
      </v-icon>
      {{ evolution }}%
    </v-card-title>
    <v-card-text style="color: var(--v-text-base)">
      <span :class="subtitle === null ? 'text-h2 font-weight-normal' : 'text-h3 font-weight-normal'">
        {{ value }}
      </span>
      <br>
      <span class="text-subtitle-1 font-weight-light">
        {{ subtitle }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'StatsCard',
  props: {
    evolution: {
      type: Number,
      default: NaN,
      required: false
    },
    light: {
      type: Boolean,
      default: true,
      required: false
    },
    icon: {
      type: String,
      default: 'mdi-pie',
      required: false
    },
    value: {
      type: [Number, String],
      default: NaN,
      required: false
    },
    subtitle: {
      type: String,
      default: null,
      required: false
    },
    color: {
      type: String,
      default: 'secondary',
      required: false
    }
  }
}
</script>

<style scoped>

</style>
