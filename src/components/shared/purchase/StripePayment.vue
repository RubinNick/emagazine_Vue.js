<template>
  <div class="text-xs-center">
      <v-btn color="red lighten-2" dark @click="dialog = true">Click Me</v-btn>
    <v-dialog v-model="dialog" width="500">
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">Click Me</v-btn>
      </template> -->

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Stripe invoice</v-card-title>

        <v-card-text>
          <label>
            <v-text-field placeholder="Owner name" v-model="cardholderName"/>
          </label>
          <div ref="card"></div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="primary" flat @click="processPayment()">Give me your money!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
let card = undefined;

let style = {
  base: {
    border: "1px solid #D8D8D8",
    borderRadius: "4px",
    color: "#000"
  },

  invalid: {
    // All of the error styles go inside of here.
  }
};

export default {
  mounted() {
    //stripe part
    card = elements.create("card", style);
    card.mount(this.$refs.card);
  },
  name: "Invoice",
  props: ["amount"],
  data: () => ({
      dialog: false,
    cardholderName: "",
    price: 15.0
  }),
  computed: {
    intentStatus() {
      const status = this.$store.state.intentStore.status;
      return status;
    }
  },
  methods: {
    usdToCents(usdCount) {
      return usdCount * 100;
    },
    processPayment() {
      const amount = this.usdToCents(this.price);
      const name = this.cardholderName;

      this.$store.dispatch("newIntent", { amount, card, name });
    },
    /// not really needed to tokenize, except of store card!
    tokenizeCard() {
      /// WORKED PART
      stripe.createToken(card, { name: this.cardholderName }).then(
        response => {
          console.log("Success token", response);
        },
        errorResponse => {
          console.log("error response", errorResponse);
        }
      );
    }
    //intent client secret from created by server payment intent
    //purchase() {

    /// WORKING PART
    // await stripe.handleCardPayment(
    //     clientSecret, this.card, {
    //         source_data: {
    //             owner: {name: this.cardholderName}
    //         }
    //     }
    // ).then(
    //     response => {

    //     },
    //     errorResponse => {

    //     }
    // );
    //}
  },
  beforeDestroy() {
    //change intent status in store and clear it!!
  }
};
</script>

<style scoped>
</style>
