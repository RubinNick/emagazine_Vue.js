<template>
  <v-card>
    <v-card-title>
      <h2>{{user.username}}</h2>
    </v-card-title>
    <v-card-text>
      <v-form ref="userInfoForm">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                type="email"
                v-model="email"
                :rules="emailRules"
                label="email"
                required
              />
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Enter provided username here"
                required
              />
              <v-text-field
                type="number"
                v-model="phone"
                :rules="phoneRules"
                label="Enter your contact phone here"
                required
              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="firstName"
                :rules="firstNameRules"
                label="Enter your first name here"
                required
              />
              <v-text-field
                v-model="lastName"
                :rules="lastNameRules"
                label="Enter your last name here"
                required
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions class="btn-container">
      <v-btn round color="error" v-if="user.active" @click="deactivateUser()">Deactivate user</v-btn>
      <v-btn round color="success" v-if="!user.active" @click="activateUser()">Activate user</v-btn>
      <v-btn round color="warning" @click="updateUser()">Save changes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";

export default {
  name: "AdminUserPage",
  props: ["user"],
  mounted() {
    //set initial value from user passed data
    this.email = this.user.eMail;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.phone = this.user.phone;
    this.username = this.user.username;
  },
  data: () => ({
    //login form
    email: "",
    emailRules: [
      v => !!v || "E-mail is incorrect",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],

    firstName: "",
    firstNameRules: [v => !!v || "First name is incorrect"],

    lastName: "",
    lastNameRules: [v => !!v || "Last name is incorrect"],

    phone: "",
    phoneRules: [
      v => !!v || "Phone number is incorrect",
      v => (v && /^\d+$/.test(v)) || `Phone number must have only numbers`
    ],

    username: "",
    usernameRules: [
      v => !!v || "Username is incorrect",
      v => (v && v.length > 5) || `Username must have more than 5 symbols`
    ]
  }),
  methods: {
    deactivateUser() {
      this.$store.dispatch('deactivateUser', this.user.id);
    },
    deactivateUser() {
      this.$store.dispatch('activateUser', this.user.id);
    },
    updateUser() {
      let user = this.user;

      user.eMail = this.email;
      user.firstName = this.firstName;
      user.lastName = this.lastName;
      user.phone = this.phone;
      user.username = this.username

      this.$store.dispatch('updateUser', user);
      debugger;
    }
  }
};
</script>

<style scoped>
.btn-container {
  justify-content: flex-end;
}
</style>
