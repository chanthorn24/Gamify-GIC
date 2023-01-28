<template>
  <v-app id="inspire" style="zoom: 80%">
    <div v-if="loggin">
      <!-- Left side bar -->
      <v-navigation-drawer
        v-model="drawer"
        app
        style="height: 140vh; box-shadow: rgba(0, 0, 0, 0.1) 2.4px 2.4px 3.2px"
      >
        <nav-bar></nav-bar>
      </v-navigation-drawer>

      <v-app-bar app class="gradient-color" style="color: white">
        <div
          class="d-flex justify-space-between align-center"
          style="width: 100%"
        >
          <div class="d-flex align-center">
            <v-app-bar-nav-icon
              @click="drawer = !drawer"
              style="color: white"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>Admin Dashboard</v-toolbar-title>
          </div>

          <!-- User account -->
          <div class="mr-10">
            <div>
              <user-account></user-account>
            </div>
          </div>
        </div>
      </v-app-bar>

      <v-main style="margin: 20px">
        <router-view></router-view>
      </v-main>
    </div>

    <!-- Display page -->
    <div v-else>
      <router-view></router-view>
    </div>

    <!-- Snackbar -->
    <snack-bar></snack-bar>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import UserAccount from "./components/UserAccount.vue";
import SnackBar from "./components/SnackBar.vue";
export default {
  name: "Home-page",
  components: {
    NavBar,
    UserAccount,
    SnackBar,
  },
  data() {
    return {
      drawer: true,
      loggin: null,
    };
  },

  created() {
    this.isLoggedIn();
  },

  methods: {
    isLoggedIn() {
      const token = sessionStorage.getItem("token");

      if (token) {
        this.loggin = true;
      } else {
        this.loggin = false;
      }
    },
  },
};
</script>

<style>
@import url("https://kit-pro.fontawesome.com/releases/v6.1.2/css/pro.min.css");
.v-list-group--active
  > .v-list-group__header
  > .v-list-group__header__append-icon
  .v-icon {
  transform: rotate(90deg);
}
.gradient-color {
  background: rgb(22, 153, 171);
  background: linear-gradient(
    90deg,
    rgba(22, 153, 171, 1) 0%,
    rgba(30, 168, 185, 1) 43%,
    rgba(8, 110, 123, 1) 100%,
    rgba(154, 59, 170, 1) 100%,
    rgba(111, 78, 209, 1) 100%
  );
}
::-webkit-scrollbar {
  width: 5px;
}

/* Track */

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */

::-webkit-scrollbar-thumb {
  background: rgb(194, 190, 190);
}

/* Handle on hover */

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.v-file-input .v-file-input__text {
  display: none !important;
}

* {
  text-transform: none !important;
}
</style>
