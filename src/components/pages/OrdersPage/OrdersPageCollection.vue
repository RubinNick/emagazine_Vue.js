<template>
  <div class="container">
    <v-expansion-panel v-model="panel">
      <v-expansion-panel-content v-for="(order, i) in orders" :key="i">
        <template v-slot:header>
          <v-layout align-center>
            <v-checkbox
              color="red derken-3"
              @change="changeOrderIds($event, order.id, order.orderTotalPrice)"
            >
              <template v-slot:label>
                <span>
                  Item(s) updated: {{orderDate(order.orderDate)}}
                  <br>Current order status:
                  <strong>{{orderStatus(order.orderStatus)}}</strong>
                  <br>
                  Total item(s) price: {{order.orderTotalPrice}} $
                </span>
              </template>
            </v-checkbox>
          </v-layout>
        </template>
        <v-card class="flex-container" v-if="order.orderedItems.length > 0">
            <div v-for="orderedItem in order.orderedItems" :key="orderedItem.id">
              <order-items :item="orderedItem"></order-items>
            </div>
            <v-card-actions class="btn-container">
              <v-btn color="error" round @click="cancelOrder(order.id)">Cancel order</v-btn>
              <v-btn color="warning" round @click="payForOrder(order.id)" :disabled="order.orderStatus !== 0">Pay now</v-btn>
            </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-btn color="error" large round @click="orderAll()">Order all</v-btn>
    <addresses-dialog ref="addrDialog" @orderAddress="setOrderAddress"></addresses-dialog>
  </div>
</template>

<script>
import AddressesPageCollection from "../AddressPage/AddressesPageCollection";
import AssignedOrderItemsPage from "./AssignedOrderItemsPage";

export default {
  name: "OrdersPageCollection",
  components: {
    addressesDialog: AddressesPageCollection,
    orderItems: AssignedOrderItemsPage
  },
  mounted() {
    this.$store.dispatch("getOrders");
  },
  data: () => ({
    imageFromBase64: "data:image/jpeg;base64,",
    orderIds: [],
    shippingAddress: "",
    totalOrderPrice: 0,
    panel: [],
    currentExpanded: null
  }),
  watch: {
    panel: function(value) {
      if (value !== null) {
        const id = this.orders[value].id;
        this.$store.dispatch("getOrderFullData", id);
      }
      this.currentExpanded = value;
    }
  },
  computed: {
    orders() {
      const stateOrders = this.$store.state.orderStore.orders;
      console.log("orders", stateOrders);
      return stateOrders;
    }
  },
  methods: {
    orderDate(utcDate) {
      return new Date(utcDate).toLocaleString();
    },
    orderStatus(id) {
      const statuses = [
        "Waiting for payment",
        "Waiting to be sent",
        "Sended",
        "Delivered",
        "Cancelled"
      ];

      return statuses[id];
    },
    changeOrderIds(checked, id, computedPrice) {
      debugger;
      if (checked) {
        this.orderIds.push(id);
        this.totalOrderPrice = this.totalOrderPrice + computedPrice;
      } else {
        this.orderIds = this.orderIds.filter(function(value) {
          return value !== id;
        });
        this.totalOrderPrice = this.totalOrderPrice - computedPrice;
      }
      debugger;
    },
    getImageSrc(product) {
      const image = product.image;
      const fullSrc = this.imageFromBase64 + image;
      return fullSrc;
    },
    orderAddressDialog() {
      this.$refs.addrDialog.showDialog(true);
    },
    setOrderAddress(id) {
      this.shippingAddress = id;
      this.$refs.addrDialog.hideDialog();
      debugger;
    },
    cancelOrder(id) {
      this.$store.dispatch("cancelOrder", id);
    },
    payForOrder(id) {
      /// Just pay for created early invoice!
      this.$store.dispatch('', id);
    },
    orderAll() {
      this.orderAddressDialog();
      this.orderIds = [];

      this.cartItems.forEach(item => {
        this.orderIds.push(item.id);
      });
      //this.$store.dispatch("showDialog");
      // this.orderIds = [];

      // this.cartItems.forEach(cartItem => {
      //     this.orderIds.push(cartItem.id);
      // });

      // const order = {
      //     orderedItemsIds = this.orderIds
      // };

      // this.$store.dispatch('addOrder', order);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.container-image {
  width: 400px;
  height: 400px;
}
.btn-container {
  display: flex;
  justify-content: flex-end;
}
</style>
