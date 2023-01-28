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
          <v-img src="@/assets/reset_password.png"></v-img>
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
                <h1 class="mb-1 pl-8" style="color: #0999ad">Reset password</h1>
                <p class="pl-8" style="color: grey">
                  You can reset the new password for your account by completing
                  this form
                </p>
                <div class="pt-4 px-8">
                  <v-text-field
                    outlined
                    v-model="user.password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    label="Confirm password"
                    :rules="passwordRules"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    required
                    color="#0999ad"
                  />
                  <v-text-field
                    outlined
                    v-model="user.confirm_password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    label="Confirm password"
                    :rules="passwordMatch()"
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
                    ><div style="font-size: medium">Change password</div></v-btn
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
        confirm_password: "",
        password: "",
      },

      show: false,
      passwordRules: [(v) => !!v || "Passsword is required"],
    };
  },

  methods: {
    //rule match password
    passwordMatch: function () {
      if (!this.user.confirm_password) {
        return ["Field is required"];
      }
      if (this.user.password !== this.user.confirm_password) {
        return ["Passwords does not match."];
      }
    },
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
