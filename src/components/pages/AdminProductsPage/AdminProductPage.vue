<template>
  <v-card>
    <v-card-title>
      <h2>{{product.id}}</h2>
    </v-card-title>
    <v-card-text>
      <v-form ref="productInfoForm">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs6>
              <v-card-media>
                <img class="container-image" :src="imageSrc">
              </v-card-media>
              <v-card-actions class="btn-container">
                <v-btn round color="error" @click="removeImage()">Remove image</v-btn>
                <input type="file" class="image-input" @change="uploadImage()">
                <v-btn round color="info" @click="openUploadInput()">Upload image</v-btn>
              </v-card-actions>
            </v-flex>
            <v-flex xs6>
              <v-text-field type="text" v-model="name" label="name" required/>
              <v-text-field type="text" v-model="type" label="type of product" required/>
              <v-text-field type="text" v-model="description" label="description" required/>
              <v-text-field
                type="number"
                v-model="avaliableCount"
                label="avaliable count"
                required
              />
              <v-text-field type="number" v-model="price" label="product price" required/>

              <v-checkbox v-model="isActive">Is product active</v-checkbox>
              <v-text-field type="text" v-model="isActive" label="is product active" required/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions class="btn-container">
      <v-btn round color="warning">Save changes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";

export default {
  name: "AdminProductPage",
  props: ["product"],
  mounted() {
    this.name = this.product.name;
    this.type = this.product.type;
    this.description = this.product.description;
    this.avaliableCount = this.product.avaliableCount;
    this.price = this.product.price;
    this.image = this.product.image;
    this.isActive = this.product.active;

    this.input = this.$el.querySelector("input[type=file]");
  },
  data: () => ({
    name: "",
    type: "",
    description: "",
    avaliableCount: 0,
    price: 0,
    image: "",
    imageFromBase64: "data:image/jpeg;base64,",
    isActive: "",

    newImage: "",

    input: ""
  }),
  computed: {
    imageSrc() {
      let imageBytes = "";
      if (this.newImage.length > 0) {
        return (imageBytes = this.newImage);
      } else {
        imageBytes = this.image;
        const fullSrc = this.imageFromBase64 + imageBytes;
        return fullSrc;
      }
    }
  },
  methods: {
    updateProduct() {},
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
          this.newImage = imageBytes;
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
    }
  }
};
</script>

<style scoped>
.container-image {
  width: 400px;
  height: 400px;
}
.image-input {
  display: none;
}
.btn-container {
  justify-content: flex-end;
}
.btn-container > * {
  margin: 5px;
}
</style>