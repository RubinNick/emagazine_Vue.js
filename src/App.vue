<template>
  <v-app>
    <div id="app">
      <app-bar/>
      <snackbar/>
      <loader/>
      <img src="./assets/logo.png">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import AppBar from './components/shared/appbar/AppBar.vue';
import Snackbar from './components/shared/snackbar/Snackbar.vue';
import Loader from './components/shared/loadingDialog/LoadDialog.vue';

export default {
  name: "App",
  components: {
    appBar: AppBar,
    snackbar: Snackbar,
    loader: Loader
  }
};
</script>

<style>
#app {
  font-family: 'Open Sans', sans-serif;
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
