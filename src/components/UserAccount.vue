<template>
  <v-menu
    min-width="200"
    offset-y
    nudge-top="0"
    nudge-width="2000"
    style="width: 1000px"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar size="48" style="border: 2px solid grey">
          <v-img
            :src="
              user.image
                ? user.image
                : 'https://th.bing.com/th/id/R.96c6aa5e2175aa803494d1b1b2cbf875?rik=32IVDXcAG9PjVQ&pid=ImgRaw&r=0'
            "
          ></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card style="border: 1px solid red">
      <v-list-item-content>
        <div class="text-center">
          <v-avatar color="brown">
            <v-img
              :src="
                user.image
                  ? user.image
                  : 'https://th.bing.com/th/id/R.96c6aa5e2175aa803494d1b1b2cbf875?rik=32IVDXcAG9PjVQ&pid=ImgRaw&r=0'
              "
            ></v-img>
          </v-avatar>
          <h3>{{ user.firstName + " " + user.lastName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-1"></v-divider>
          <v-btn depressed rounded text to="/editaccount" link
            >Edit Account</v-btn
          >
          <v-divider class="my-1"></v-divider>

          <v-btn depressed rounded text to="/changepassword" link
            >Change Password</v-btn
          >
          <v-divider class="my-1"></v-divider>
          <v-btn depressed rounded text @click="logOut()"> Log out </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
import decode from "vue-jwt-decode";
export default {
  data() {
    return {
      //user info
      user: {
        firstName: "",
        lastName: "",
        email: "",
        image: "",
      },
    };
  },
  created() {
    this.getUser();
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "refreshData") {
        this.getUser();
      }
    });
  },
  methods: {
    logOut() {
      sessionStorage.clear();
      document.location.reload();
      setInterval(() => {
        router.push({ path: "/auth/login" });
      }, 3000);
    },

    getUser() {
      let decoder = decode.decode(sessionStorage.getItem("token"));
      this.axios
        .get(this.$url + "/user/get/" + decoder.data.user.id)
        .then((res) => {
          if (res.data.success) {
            this.user = res.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
