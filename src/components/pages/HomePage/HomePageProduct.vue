<template>
  <v-card @click="redirectToProductPage(product.id)">
    <v-card-title>
      <h2>{{product.name}}</h2>
    </v-card-title>
    <v-card-media>
      <img class="container-image" :src="imageSrc">
    </v-card-media>
    <v-btn class="btn-add-to-cart" color="warning" round>
      <v-icon>add_shopping_cart</v-icon>
      <span class="span-in-btn"> Add to cart </span>
    </v-btn>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "HomePageCart",
  props: ["product"],
  data: () => ({
    imageFromBase64: "data:image/jpeg;base64,"
  }),
  computed: {
    imageSrc() {
      const fullSrc = this.imageFromBase64 + this.product.image;
      return fullSrc;
    }
  },
  methods: {
    addToShoppingCart() {
      ///TODO ADD TO SHOPPING CART
    },
    redirectToProductPage(id) {
        this.$router.push({name: 'ProductPage', params: {id: id}});
    }
  }
};
</script>

<style scoped>
.container-image {
  width: 400px;
  height: 400px;
}
.btn-add-to-cart {
  padding-left: 25px;
  padding-right: 25px;
}
.span-in-btn {
    margin: 5px;
    font-weight: 700;
}
</style>
