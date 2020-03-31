<template>
  <div class="container">
    <v-expansion-panel>
      <v-expansion-panel-content v-for="(cartItem, i) in cartItems" :key="i">
        <template v-slot:header>
          <v-layout align-center>
            <v-checkbox color="red derken-3" @change="changeOrderIds($event, cartItem.id, cartItem.productCount * cartItem.productPrice)">
              <template v-slot:label>
                <span>
                  Item(s) updated: {{orderDate(cartItem.updatedDate)}}
                  <br>
                  Total item(s) price: {{cartItem.productCount * cartItem.productPrice}} $
                </span>
              </template>
            </v-checkbox>
          </v-layout>
        </template>
        <v-card class="flex-container">
          <v-card-media>
            <img class="container-image" :src="getImageSrc(cartItem.assignedProducts)">
          </v-card-media>
          <v-card-text></v-card-text>
          <v-card-actions class="btn-container">
            <v-btn color="error" round @click="deleteFromCart(cartItem.id)">Delete from cart</v-btn>
            <v-btn color="warning" round @click="buyFromCart(cartItem.id)">Buy now</v-btn>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-btn color="error" large round @click="orderAll()">Order all</v-btn>
    <addresses-dialog ref="addrDialog" @orderAddress="setOrderAddress"></addresses-dialog>
  </div>
</template>

<script>
import AddressesPageCollection from '../AddressPage/AddressesPageCollection';

export default {
  name: "ShoppingCartPage",
  components: {
      addressesDialog: AddressesPageCollection
  },
  mounted() {
    this.$store.dispatch("getShoppingCart");

    //stripe part
    card = elements.create('card');
    card.mount(this.$refs.card);
  },
  data: () => ({
    imageFromBase64: "data:image/jpeg;base64,",
    orderIds: [],
    shippingAddress: "",
    totalOrderPrice: 0
  }),
  computed: {
    cartItems() {
      const stateCartItems = this.$store.state.shoppingCartStore.shoppingCart;
      console.log("cartItems", stateCartItems);
      return stateCartItems;
    }
  },
  methods: {
    orderDate(utcDate) {
      return new Date(utcDate).toLocaleString();
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
    deleteFromCart(id) {
      this.$store.dispatch('removeCartItem', id);
    },
    buyFromCart() {
        /// Maybe, just call dispatch method...?
        this.orderAddressDialog();
      this.orderRequest();
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
    },
    orderRequest() {
        const requestData = {
            shippingAddressId: this.shippingAddress,
            orderTotalPrice: 100,
            orderedItemsId: this.orderIds
        }
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
