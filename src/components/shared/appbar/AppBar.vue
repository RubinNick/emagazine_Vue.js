<template>
  <v-toolbar dark color="primary">
    <v-bottom-sheet v-model="sheet">
      <template v-slot:activator>
        <v-toolbar-side-icon></v-toolbar-side-icon>
      </template>
      <v-list>
        <v-subheader>Sign in or sign up</v-subheader>
        <v-list-tile v-for="tile in tiles" :key="tile.title" @click="sheet = false">
          <v-list-tile-title @click="redirectTo(tile.route)">{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>

    <v-toolbar-title @click="redirectTo('/')">E-magazine</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn dark icon v-on="on" flat @click="redirectTo('/ShoppingCart')">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <v-btn dark icon v-on="on" flat>
        <v-icon>notifications_active</v-icon>
      </v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on" flat>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile v-for="(item, i) in menuItems" :key="i">
            <v-list-tile-title @click="redirectTo(item.route)">{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "AppBar",
  props: [],
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.userRole;

    if (role === 0) {
      const editUsers = {
        title: "Edit users",
        route: "/editUsers"
      };

      const addProduct = {
        title: "Add product",
        route: "/addProduct"
      };

      const editProducts = {
        title: "Edit products",
        route: "/editProducts"
      };

      this.menuItems.push(editUsers);
      this.menuItems.push(addProduct);
      this.menuItems.push(editProducts);
    }
  },
  data: function() {
    return {
      userRole: "",
      menuItems: [
        {
          title: "Profile",
          route: "/profile"
        },
        {
          title: "My addresses",
          route: "/myAddresses"
        },
        {
          title: "My orders",
          route: "/orders"
        }
      ],
      sheet: false,
      tiles: [
        {
          title: "Login",
          route: "/login"
        },
        {
          title: "Register",
          route: "/register"
        }
      ]
    };
  },
  methods: {
    redirectTo: function(path) {
      this.$router.push({path: path});
    }
  }
};
</script>

<style scoped>
</style>