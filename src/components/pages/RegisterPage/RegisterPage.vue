<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-stepper v-model="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1">Personal information</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 2" step="2">
            Address information
            <small>Optional</small>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form ref="userInfoForm">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-text-field
                      type="email"
                      v-model="email"
                      :rules="emailRules"
                      label="Enter email here"
                      required
                    />

                    <v-text-field
                      type="email"
                      v-model="emailCopy"
                      :rules="emailCopyRules"
                      label="Re-enter email here"
                      required
                    />

                    <v-text-field
                      type="password"
                      v-model="password"
                      :rules="passwordRules"
                      label="Enter password here"
                      required
                    />

                    <v-text-field
                      type="password"
                      v-model="passwordCopy"
                      :rules="passwordCopyRules"
                      label="Re-enter password here"
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
                    <v-text-field
                      type="number"
                      v-model="phone"
                      :rules="phoneRules"
                      label="Enter your contact phone here"
                      required
                    />
                    <v-text-field
                      v-model="username"
                      :rules="usernameRules"
                      label="Enter provided username here"
                      required
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>

            <v-btn color="primary" @click="moveToAddressStep()">Continue</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-form ref="userAddressForm">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-text-field
                      type="text"
                      v-model="contactName"
                      :rules="contactNameRules"
                      label="Enter contact name here"
                      required
                    />

                    <v-text-field
                      type="text"
                      v-model="country"
                      :rules="countryRules"
                      label="Enter country here"
                      required
                    />

                    <v-text-field
                      type="text"
                      v-model="region"
                      :rules="regionRules"
                      label="Enter region here"
                      required
                    />

                    <v-text-field
                      type="text"
                      v-model="city"
                      :rules="cityRules"
                      label="Enter city here"
                      required
                    />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      v-model="streetAddress"
                      :rules="streetAddressRules"
                      label="Enter your street address here"
                      required
                    />
                    <v-text-field
                      v-model="zip"
                      :rules="zipRules"
                      label="Enter your zip here"
                      required
                    />
                    <v-text-field
                      type="number"
                      v-model="contactPhone"
                      :rules="contactPhoneRules"
                      label="Enter your contact phone here"
                      required
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>

            <v-btn color="primary" @click="finishRegistration()">Finish registration</v-btn>

            <v-btn flat @click="currentStep = 1">Back to previous step</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "../../../store/store";

export default {
  name: "RegisterForm",
  data: () => ({
    currentStep: 1,

    //login form
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],

    emailCopy: "",

    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length > 5) || `Password must have more than 5 symbols`
    ],

    passwordCopy: "",

    firstName: "",
    firstNameRules: [v => !!v || "First name is required"],

    lastName: "",
    lastNameRules: [v => !!v || "Last name is required"],

    phone: "",
    phoneRules: [
      v => !!v || "Phone number is required",
      v => (v && v.length > 5) || `Phone number must have more than 5 symbols`,
      v => (v && /^\d+$/.test(v)) || `Phone number must have only numbers`
    ],

    username: "",
    usernameRules: [
      v => !!v || "Username is required",
      v => (v && v.length > 5) || `Username must have more than 5 symbols`
    ],

    //address from
    contactName: "",
    contactNameRules: [
      v => !!v || "Contact name is required",
      v => (v && v.length > 5) || `Contact name must have more than 5 symbols`
    ],

    country: "",
    countryRules: [
      v => !!v || "Country name is required",
      v => (v && v.length > 5) || `Country name must have more than 5 symbols`
    ],

    region: "",
    regionRules: [
      v => !!v || "Region name is required",
      v => (v && v.length > 5) || `Region name must have more than 5 symbols`
    ],

    city: "",
    cityRules: [
      v => !!v || "City name is required",
      v => (v && v.length > 5) || `City name must have more than 5 symbols`
    ],

    streetAddress: "",
    streetAddressRules: [
      v => !!v || "Street address is required",
      v => (v && v.length > 5) || `Street address must have more than 5 symbols`
    ],

    zip: "",
    zipRules: [
      v => !!v || "Zip is required",
      v => (v && /^\d+$/.test(v)) || `Zip must have only numbers`,
      v => (v && v.length == 5) || `Zip must have 5 symbols`
    ],

    contactPhone: "",
    contactPhoneRules: [
      v => !!v || "Contact phone is required",
      v => (v && /^\d+$/.test(v)) || `Contact phone must have only numbers`,
      v => (v && v.length > 5) || `Contact phone must have more than 5 symbols`
    ]
  }),
  computed: {
    emailCopyRules() {
      return [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid",
        () => this.email === this.emailCopy || `Emails doesn't match`
      ];
    },
    passwordCopyRules() {
      return [
        v => !!v || "Password is required",
        v => (v && v.length > 5) || `Password must have more than 5 symbols`,
        () => this.password === this.passwordCopy || `Passwords doesn't match`
      ];
    }
  },
  methods: {
    moveToAddressStep() {
      if (this.$refs.userInfoForm.validate()) {
        this.currentStep = this.currentStep + 1;
      } else {
        this.requiredNotify();
      }
    },
    finishRegistration() {
      if (this.$refs.userAddressForm.validate()) {
        const address = {
          contactName: this.contactName,
          country: this.country,
          region: this.region,
          city: this.city,
          streetAddress: this.streetAddress,
          zip: this.zip,
          phone: this.contactPhone
        };

        const user = {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          contactPhone: this.contactPhone,
          userName: this.username,
          address: address
        };

        this.$store.dispatch("register", user);
      } else {
        this.requiredNotify();
      }
    },
    requiredNotify() {
      this.$store.dispatch("showSnackbar", "All fields are required!");
    }
  }
};
</script>

<style scoped>
</style>