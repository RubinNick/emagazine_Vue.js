<template>
  <v-card class="card-container">
    <v-card-text>
      Item name: <strong>{{item.assignedProducts.name}}</strong> <br>
      Item count: <strong>{{item.productCount}}</strong> <br>
      Item price: <strong>{{item.productPrice}}</strong> <br>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AssignedOrderItems",
  props: ["item"]
};
</script>

<style scoped>
.card-container {
  margin: 5px;
}
</style>
