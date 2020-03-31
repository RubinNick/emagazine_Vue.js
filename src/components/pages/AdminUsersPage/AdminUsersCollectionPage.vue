<template>
  <div class="container">
    <v-expansion-panel v-model="panel">
      <v-expansion-panel-content v-for="user in users" :key="user.id">
        <template v-slot:header>
          <v-layout align-center>
            <span>
              Username:
              <strong>{{user.username}}</strong>
            </span>
          </v-layout>
        </template>
        <v-card class="flex-container" v-if="user.fullInfo">
          <user-page :user="user.fullInfo"></user-page>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-pagination v-model="currentPage" :length="totalPages" @input="moveToPage"></v-pagination>
    <leave-dialog :dialog="dialog" :routeName="routeName" @disagree-to-leave="closeLeaveDialog"/>
  </div>
</template>



<script>
import AdminUserPage from "./AdminUserPage";
import LeavePageDialog from "../../shared/leavePage/LeavePageDialog";

export default {
  name: "AdminUsersCollectionPage",
  components: {
    userPage: AdminUserPage,
    leaveDialog: LeavePageDialog
  },
  mounted() {
    this.$store.dispatch("getUsers");
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
        const id = this.users[value].id;
        this.$store.dispatch("getUserData", id);
      }
    }
  },
  computed: {
    users() {
      const stateUsers = this.$store.state.userStore.users.users;
      console.log("users", stateUsers);
      return stateUsers;
    },
    totalPages() {
      return this.$store.state.userStore.users.pageCount;
    }
  },
  methods: {
    moveToPage(page) {
      this.$store.dispatch("getUsers", page - 1);
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
