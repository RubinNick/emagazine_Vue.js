<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div class="flex-container">
        <div class="flex-item" v-for="product in products" :key="product.id">
          <product-cart :product="product"/>
        </div>
      </div>
      <v-pagination v-model="currentPage" :length="totalPages" @input="moveToPage"></v-pagination>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "../../../store/store";
import HomePageProduct from "./HomePageProduct";

export default {
  name: "HomePage",
  components: {
    productCart: HomePageProduct
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
  data: () => ({
    currentPage: 1
  }),
  computed: {
    products() {
      const stateProducts = this.$store.state.productStore.products.products;
      console.log("products", stateProducts);
      return stateProducts;
    },
    totalPages() {
      return this.$store.state.productStore.products.pageCount;
    }
  },
  methods: {
    moveToPage(page) {
      this.$store.dispatch("getProducts", page - 1);
    }
  }
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.flex-item {
  margin: 10px;
}
</style>
