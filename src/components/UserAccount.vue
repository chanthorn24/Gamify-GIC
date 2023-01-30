<template>
  <v-menu
    min-width="200"
    offset-y
    nudge-top="10"
    nudge-width="2000"
    style="width: 1000px"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar size="48" style="border: 2px solid grey">
          <v-img
            src="https://4.bp.blogspot.com/-wN6sPoR72uw/UMrWOVsLdII/AAAAAAAAArE/UOcdoA0X8jI/s1600/balloons-sunset-view-facebook-cover.jpg"
          ></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card style="border: 1px solid red">
      <v-list-item-content>
        <div class="text-center">
          <v-avatar color="brown">
            <v-img
              src="https://4.bp.blogspot.com/-wN6sPoR72uw/UMrWOVsLdII/AAAAAAAAArE/UOcdoA0X8jI/s1600/balloons-sunset-view-facebook-cover.jpg"
            ></v-img>
          </v-avatar>
          <h3>{{ user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text to="/editaccount" link>Edit Account</v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text @click="logOut()"> Log out </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      //user info
      user: {
        initials: "JD",
        fullName: "John Doe",
        email: "john.doe@doe.com",
      },
    };
  },
  methods: {
    logOut() {
      sessionStorage.clear();
      document.location.reload();
      setInterval(() => {
        router.push({ path: "/auth/login" });
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-menu__content {
  margin-left: 20%;
}
// .edit {
//   text-decoration: none;
//   color: black;
// }
</style>
