<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title class="title-container" v-if="product">
          <h2>{{product.fullInfo.name}}</h2>
        </v-card-title>
        <div class="flex-container" v-if="product">
          <v-card-media class="table-blocks">
            <img class="container-image" :src="imageSrc">
          </v-card-media>
          <div class="table-blocks">
            <v-card-text class="text-md-center">
              <span>
                <h3>Description:</h3>
                {{product.fullInfo.description}}
                <br>
                <br>
              </span>
              <span>
                <h4>
                  We have:
                  {{product.fullInfo.avaliableCount}}
                  pieces left
                </h4>
                <br>
              </span>
              <div class="count-container">
                <v-btn @click="decreaseCount()" round>
                  <v-icon>remove</v-icon>
                </v-btn>
                <v-text-field
                  type="number"
                  v-model="selectedCount"
                  :rules="selectedCountRules"
                  disabled
                >Enter count here</v-text-field>
                <v-btn @click="increaseCount()" round>
                  <v-icon>add</v-icon>
                </v-btn>
              </div>
              <span>
                <h4>Total price: {{product.fullInfo.price * selectedCount}} $</h4>
                <br>
              </span>
            </v-card-text>
            <v-card-actions class="title-container">
              <v-btn color="warning" round>Add to shopping cart</v-btn>
              <v-btn color="info" round>Buy now</v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "../../../store/store";

export default {
  name: "ProductPage",
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch("getProduct", id);
  },
  data: () => ({
    imageFromBase64: "data:image/jpeg;base64,",
    selectedCount: 1
  }),
  computed: {
    product() {
      const stateProducts = this.$store.state.productStore.products.products;

      const id = this.$route.params.id;
      const index = stateProducts.findIndex(item => item.id === id);

      return stateProducts[index];
    },
    imageSrc() {
      if (this.product) {
        const fullSrc = this.imageFromBase64 + this.product.fullInfo.image;
        return fullSrc;
      } else {
        return null;
      }
    },
    selectedCountRules() {
      return [
        v => !!v || "Count is required",
        v =>
          (v && v > 0 && v <= this.product.avaliableCount) ||
          `Count must be more than 0 and less or equals then ${
            this.product.avaliableCount
          }`
      ];
    }
  },
  methods: {
    increaseCount() {
      const newValue = this.selectedCount + 1;
      if (newValue <= this.product.avaliableCount) {
        this.selectedCount = newValue;
      } else {
        this.$store.dispatch("showSnackbar", "You wanna too much =(");
      }
    },
    decreaseCount() {
      const newValue = this.selectedCount - 1;
      if (newValue > 0) {
        this.selectedCount = newValue;
      } else {
        this.$store.dispatch(
          "showSnackbar",
          "You can't select less than one =("
        );
      }
    }
  },
  beforeRouteLeave(to, from, next) {}
};
</script>

<style scoped>
.title-container {
  justify-content: center;
}
.container-image {
  width: 400px;
  height: 400px;
}
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.table-blocks {
  width: 50%;
}
.count-container {
  display: flex;
}

/* hide arrows*/
v-text-field::-webkit-outer-spin-button,
v-text-field::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

v-text-field[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
