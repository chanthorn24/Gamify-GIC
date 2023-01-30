<template>
  <div>
    <div
      style="
        height: 80px;
        background-color: #0999ad;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      "
      class="d-flex justify-center align-center"
    >
      <h2 style="font-style: italic; color: white">GIC FunQuiz &nbsp;</h2>
    </div>
    <v-row class="mt-10">
      <v-col cols="12" lg="1" sm="12"> </v-col>
      <v-col
        cols="12"
        lg="5"
        class="d-lg-flex justify-center align-center d-sm-none"
      >
        <div style="width: 600px">
          <v-img src="@/assets/login.png"></v-img>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="4"
        sm="12"
        class="d-flex justify-center align-center"
      >
        <v-row>
          <v-col cols="12" lg="12">
            <div
              class="pa-8 py-16"
              style="box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px"
            >
              <v-form ref="form" lazy-validation>
                <h1 class="text-center mb-1" style="color: #0999ad">Sign in</h1>
                <div class="pt-8 px-8">
                  <v-text-field
                    outlined
                    v-model="user.email"
                    label="Email address"
                    :rules="emailRules"
                    required
                    color="#0999ad"
                  />
                  <v-text-field
                    outlined
                    v-model="user.password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    label="Password"
                    :rules="passwordRules"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    required
                    color="#0999ad"
                  />
                </div>
                <div class="text-start pl-8 mt-1">
                  <v-btn
                    :loading="loading"
                    :disabled="loading"
                    @click="login()"
                    color="#0999ad"
                    width="200"
                    height="40"
                    style="color: white"
                    ><div style="font-size: medium">Login</div></v-btn
                  >
                </div>
                <router-link to="/auth/forget-password">
                  <div class="text-center mt-8">Forgot your password ?</div>
                </router-link>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      //button
      loading: false,
      //data
      user: {
        email: "",
        password: "",
      },

      show: false,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "Passsword is required"],
    };
  },

  methods: {
    //snackbar
    ...mapActions(["showSnack"]),
    saveDetails(text, color, progressColor) {
      this.showSnack({
        text: text,
        color: color,
        progressColor: progressColor,
        // color: "error",
        // color: "warning",
        timeout: 3500,
      });
    },

    login() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          this.axios
            .post(this.$url + "/user/auth/login", this.user)
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                sessionStorage.setItem("token", res.data.data);
                sessionStorage.setItem("user", JSON.stringify(res.data.user));

                document.location.reload();
                setInterval(() => {
                  router.push({ path: "/" });
                }, 3000);
                this.loading = false;
              }
            })
            .catch((error) => {
              this.loading = false;
              this.saveDetails(error.message, "error", "#EF9A9A");
            });
        }
      } catch (error) {
        this.loading = false;
        this.saveDetails("Oops! something went wrong", "error", "#EF9A9A");
      }
    },
  },
};
</script>

<style scoped>
a {
  color: #0999ad;
  text-decoration: none;
}
a:hover {
  color: blueviolet;
}
</style>
