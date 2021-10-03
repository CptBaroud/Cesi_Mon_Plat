<template>
  <v-list-item
    router
    :to="notification.to"
    @mouseover="!notification.seen ? markNotificationAsSeen() : null"
    @click="markNotificationAsRead()"
  >
    <v-badge
      v-if="!notification.seen"
      class="pr-2"
      inline
      left
      dot
      color="greenPastel"
    />
    <v-list-item-avatar style="border: solid var(--v-primary-base) 2px">
      <v-icon>
        {{ notification.info.icon }}
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-content class="pl-2">
      <v-list-item-subtitle>
        Le {{ new Date(notification.created).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })
        }}
      </v-list-item-subtitle>
      <v-list-item-title>
        {{ notification.title }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    notification: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  },
  methods: {
    markNotificationAsSeen () {
      this.$store.dispatch('notification/seen', { token: this.$auth.getToken('local'), _id: this.notification._id })
    },

    markNotificationAsRead () {
      this.$store.dispatch('notification/read', { token: this.$auth.getToken('local'), _id: this.notification._id })
    }
  }
}
</script>
