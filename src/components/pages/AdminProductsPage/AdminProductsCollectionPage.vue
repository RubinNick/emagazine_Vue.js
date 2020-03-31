<template>
  <div class="container">
    <v-expansion-panel v-model="panel">
      <v-expansion-panel-content v-for="product in products" :key="product.id">
        <template v-slot:header>
          <v-layout align-center>
            <span>
              Product id:
              <strong>{{product.id}}</strong>
            </span>
          </v-layout>
        </template>
        <v-card class="flex-container" v-if="product.fullInfo">
          <product-page :product="product.fullInfo"></product-page>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-pagination v-model="currentPage" :length="totalPages" @input="moveToPage"></v-pagination>
    <leave-dialog :dialog="dialog" :routeName="routeName" @disagree-to-leave="closeLeaveDialog"/>
  </div>
</template>



<script>
import AdminProductPage from "./AdminProductPage";
import LeavePageDialog from "../../shared/leavePage/LeavePageDialog";

export default {
  name: "AdminProductsCollectionPage",
  components: {
    productPage: AdminProductPage,
    leaveDialog: LeavePageDialog
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
  data: () => ({
    currentPage: 1,
    panel: [],
    dialog: false,
    routeName: ''
  }),
  watch: {
    panel: function(value) {
      if (value !== null) {
        const id = this.products[value].id;
        this.$store.dispatch("getProduct", id);
      }
    }
  },
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
    },
    openLeaveDialog(routeName) {
        this.routeName = routeName;
        this.dialog = true;
    },
    closeLeaveDialog(e) {
        this.routeName = '';
        this.dialog = false;
    }
  },
  beforeRouteLeave(to, from, next) {
      if(this.routeName === '') {
          this.openLeaveDialog(to.name);
      }else {
          next();
      }
  }
};
</script>


<style scoped>
</style>
