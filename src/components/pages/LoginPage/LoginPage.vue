<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title>
            <v-toolbar color="pink">
                <v-card-text>
                    <h2 class="text-xs-center">Login</h2>
                </v-card-text>
            </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-form 
            ref="loginForm"
            v-model="valid"
            lazy-validation>
            <v-text-field v-model="username" :rules="usernameRules" label="Enter username here" required/>
            <v-text-field type="password" v-model="password" :rules="passwordRules" label="Enter password here" required/>

            <v-btn color="info" @click="redirectToRegister()">Register</v-btn>
            <v-btn color="success" @click="validate()">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '../../../store/store'

export default {
  name: "LoginPage",
  data: () => ({
    valid: true,

    username: "",
    usernameRules: [
      v => !!v || "E-mail is required"
      //v => /.+@.+/.test(v) || "E-mail must be valid"
    ],

    password: "",
    passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length > 5) || `Password must have more than 5 symbols ${v.length}`
    ]
  }),

  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
          const loginData = {
              username: this.username,
              password: this.password
          };
          console.log('store', this.$store);
          console.log('state', this.$store.state);

          this.$store.dispatch('login', loginData);
      }
    },
    redirectToRegister() {
        this.$router.push({name: 'RegisterPage'});
    }
  }
};
</script>

<style scoped>
</style>
