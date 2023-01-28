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
          <v-img src="@/assets/forget_password.png"></v-img>
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
                <h1 class="text-start mb-1 pl-8" style="color: #0999ad">
                  Forgot password
                </h1>
                <p class="pl-8" style="color: grey">
                  Enter your email below to get a reset link to change password
                </p>

                <div class="pt-4 px-8">
                  <v-text-field
                    outlined
                    v-model="user.email"
                    label="Email address"
                    :rules="emailRules"
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
                    dark
                    ><div style="font-size: medium">Submit</div></v-btn
                  >
                </div>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //button
      loading: false,
      //data
      user: {
        email: "",
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
    login() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
        }
      } catch (error) {
        console.log(error);
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
