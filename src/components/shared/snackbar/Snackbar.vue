
<template>
  <v-card>
    <v-snackbar v-model="snackbar" :bottom="true" :left="true">
      {{ text }}
      <v-btn color="pink" flat @click="closeSnackbar()">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  computed: {
    text() {
      return this.$store.state.snackbarStore.snackText;
    },
    snackbar() {
      return this.$store.state.snackbarStore.isShowed;
    }
  },
  methods: {
    closeSnackbar() {
      this.$store.dispatch('hideSnackbar');
    }
  }
};
</script>