<template>
  <v-dialog class="flex-container" v-model="addressDialog">
    <v-card>
      <v-card-title class="flex-container-center">
        <span>
          <h2>My addresses</h2>
          <br>
          <h3 v-if="forOrder">Click to choose one for delivery</h3>
        </span>
      </v-card-title>
      <v-card-text>
        <div>
          <div class="flex-item" v-for="address in addresses" :key="address.id">
            <address-item :address="address" @selectedAddress="shippingAddress"/>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="flex-container-center">
        <v-btn color="primary">Create new one</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import store from "../../../store/store";
import AddressItem from "./AddressesPageItem";

export default {
  name: "AddressesDialogPage",
  components: {
    addressItem: AddressItem
  },
  data: () => ({
    addressDialog: false,
    forOrder: false
  }),
  computed: {
    addresses() {
      const stateAddresses = this.$store.state.addressStore.addresses;
      console.log("addresses", stateAddresses);
      return stateAddresses;
    }
  },
  methods: {
    showDialog(isOrder = false) {
      this.$store.dispatch("getAddresses");

      this.addressDialog = true;
      this.forOrder = isOrder;
    },
    hideDialog() {
        this.addressDialog = false;
    },
    shippingAddress(id) {
        debugger;
        if(this.forOrder === true) {
            this.$emit('orderAddress', id);
        }
    }
  }
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.flex-container-center {
  justify-content: center;
}
.flex-item {
  margin: 10px;
}
</style>
