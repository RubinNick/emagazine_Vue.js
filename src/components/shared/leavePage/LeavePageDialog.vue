<template>
     <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Are you sure want to leave this page?</v-card-title>

        <v-card-text>
          All unsaved changes well be undone!
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="disagree()"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="agree()"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
name: "LeavePageDialog",
props: ["dialog", "routeName"],
watch: {
    dialog: function(value) {
        if(!value && this.routeName !== '') {
            this.$emit('disagree-to-leave');
        }
    }
},
methods: {
    disagree() {
        this.$emit('disagree-to-leave', true);
    },
    agree() {
        debugger;
        this.dialog = false;
        this.$router.push({name: this.routeName})
    }
}

}
</script>


<style scoped>

</style>
