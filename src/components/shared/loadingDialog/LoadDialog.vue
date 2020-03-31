<template>
  <v-dialog v-model="dialog" persistent width="300">
    <v-card color="blue darken-2" dark>
      <v-card-text>
        {{text}}
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Loader",
  data:() => ({
    text: 'Loading...'
  }),
  computed: {
    dialog() {
      console.log("loader", this.$store.state.loaderStore.loader)
      return this.$store.state.loaderStore.loader;
    }
  },
  methods: {
    closeDialog() {
      this.$store.dispatch("hideDialog");
    }
  }
};
</script>

<style scoped>
</style>
