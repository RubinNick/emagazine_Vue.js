<template>
  <v-card v-if="address" @click="selectAddress(address.id)">
    <v-card-text>
      <span>
        <strong>Country:</strong>
        {{address.country}}
      </span>
      <br>
      <span>
        <strong>Region:</strong>
        {{address.region}}
      </span>
      <br>
      <span>
        <strong>City:</strong>
        {{address.city}}
      </span>
      <br>
      <span>
        <strong>Street address:</strong>
        {{address.streetAddress}}
      </span>
      <br>
      <span>
        <strong>Zip:</strong>
        {{address.zip}}
      </span>
      <br>
      <span>
        <strong>Contact name:</strong>
        {{address.contactName}}
      </span>
      <br>
      <span>
        <strong>Contact phone:</strong>
        {{address.contactPhone}}
      </span>
      <br>
      <span>
        <strong>Used as default address:</strong>
        {{address.isDefault}}
      </span>
      <br>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AddressItem",
  props: ["address"],
  methods: {
    selectAddress(id) {
        debugger;
      this.$emit("selectedAddress", id);
    }
  }
};
</script>

<style scoped>
</style>
