<template>
  <v-card>
    <v-card-title class="container-title">
      <h2>Create new product</h2>
    </v-card-title>
    <v-card-text>
      <v-form ref="addProductForm">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs6>
              <v-card-media>
                <img class="container-image" :src="image">
              </v-card-media>
              <v-card-actions class="btn-container">
                <v-btn round color="error" @click="removeImage()">Remove image</v-btn>
                <input type="file" class="image-input" @change="uploadImage()">
                <v-btn round color="info" @click="openUploadInput()">Upload image</v-btn>
              </v-card-actions>
            </v-flex>
            <v-flex xs6>
              <v-text-field type="text" v-model="name" :rules="nameRules" label="name" required/>
              <v-text-field
                type="text"
                v-model="type"
                :rules="typeRules"
                label="type of product e.g. Smartphone"
                required
              />
              <v-text-field
                type="text"
                v-model="description"
                :rules="descriptionRules"
                label="description"
                required
              />
              <div class="count-container">
                <v-btn @click="decreaseCount()" round>
                  <v-icon>remove</v-icon>
                </v-btn>
                <v-text-field
                  type="number"
                  v-model="avaliableCount"
                  :rules="avaliableCountRules"
                  label="avaliable count"
                  required
                  disabled
                >Enter count here</v-text-field>
                <v-btn @click="increaseCount()" round>
                  <v-icon>add</v-icon>
                </v-btn>
              </div>

              <v-text-field
                type="number"
                v-model="price"
                :rules="priceRules"
                label="product price"
                required
              />

              <v-checkbox
                v-model="isActive"
                :label="`Product active: ${this.isActive}`"
              >Is product active</v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions class="btn-container">
      <v-btn round color="warning" @click="addProduct()">Add product</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";

export default {
  name: "AdminAddProductPage",
  mounted() {
    this.input = this.$el.querySelector("input[type=file]");
  },
  data: () => ({
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length > 5) || `Name must have more than 5 symbols`
    ],

    type: "",
    typeRules: [v => !!v || "Type is required"],

    description: "",
    descriptionRules: [
      v => !!v || "Description is required",
      v => (v && v.length > 20) || `Description must have more than 20 symbols`
    ],

    avaliableCount: 0,
    avaliableCountRules: [
      v => !!v || "Avaliable count is required",
      v => /^[1-9]\d*$/g.test(v) || `Must be only positive digits`,
      v => v > 0 || `Must be non-zero value`
    ],

    price: 0,
    priceRules: [
      v => !!v || "Price is required",
      v => /^[1-9]\d*$/g.test(v) || `Must be only positive digits`,
      v => v > 0 || `Must be non-zero value`
    ],

    image: "",

    isActive: false,

    input: ""
  }),
  methods: {
    addProduct() {
      if (this.$refs.addProductForm.validate()) {
        const product = {
          name: this.name,
          type: this.type,
          description: this.description,
          avaliableCount: this.avaliableCount,
          price: this.price,
          image: this.image,
          active: this.isActive
        };

        this.$store.dispatch("addProduct", product);
      } else {
        this.requiredNotify();
      }
    },
    requiredNotify() {
      this.$store.dispatch(
        "showSnackbar",
        "All fields except image are required!"
      );
    },

    removeImage() {
      this.image = "";
    },
    uploadImage() {
      let reader = new FileReader();

      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);

        reader.onload = result => {
          const imageBytes = result.currentTarget.result;
          console.log("image", imageBytes);
          this.image = imageBytes;
        };
      }
    },

    openUploadInput() {
      const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true
      });

      this.input.dispatchEvent(event);
    },
    increaseCount() {
      const newValue = this.avaliableCount + 1;
      this.avaliableCount = newValue;
    },
    decreaseCount() {
      const newValue = this.avaliableCount - 1;
      if (newValue > 0) {
        this.avaliableCount = newValue;
      } else {
        this.$store.dispatch(
          "showSnackbar",
          "You can't select less than one =("
        );
      }
    }
  }
};
</script>

<style scoped>
.container-title {
  display: flex;
  justify-content: center;
}
.container-image {
  width: 600px;
  height: 400px;
}
.image-input {
  display: none;
}
.btn-container {
  justify-content: center;
}
.btn-container > * {
  margin: 5px;
}
.container-active {
  display: flex;
  flex-direction: row;
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