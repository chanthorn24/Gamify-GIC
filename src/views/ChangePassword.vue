<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Change Password</h1>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/ Change password</h4>
    </div>
    <v-card class="py-5 px-10" elevation="1">
      <v-form lazy-validation ref="form">
        <h3 class="mb-4" style="color: #0999ad">Current password:</h3>
        <v-row>
          <v-col cols="12" lg="6" sm="12">
            <v-text-field
              v-model="user.old_password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              label="Old password *"
              :rules="nameRules"
              outlined
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="1" class="d-md-none d-lg-flex"></v-col>
          <v-col
            cols="5"
            class="d-md-none d-lg-flex"
            style="box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 2px inset"
          >
            <h3 style="color: #0999ad">Notice:</h3>
            <v-card-text
              style="font-size: large; margin-top: 10px; color: #757575"
              >Change your new password. We highly recommend
              <div class="mt-2">
                you change a strong one and make sure, your
                <span class="primary--text">current password</span>
                is
              </div>
              <div class="mt-2 primary--text">correct.</div>
            </v-card-text>
          </v-col>
        </v-row>

        <h3 class="mb-4" style="color: #0999ad">New password:</h3>
        <v-row>
          <v-col cols="12" lg="6" sm="12">
            <v-text-field
              v-model="user.new_password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              label="New password *"
              :rules="nameRules"
              outlined
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="margin-top: -15px">
          <v-col cols="12" lg="6" sm="12">
            <v-text-field
              v-model="confirm_password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordMatch()"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              label="Confirmed Password *"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col cols="12" lg="6" sm="12" class="d-flex justify-end">
            <v-btn
              color="primary--text"
              style="border: 1px solid #1976d2"
              class="mr-3"
              @click="$refs.form.reset()"
            >
              Clear
            </v-btn>
            <v-btn
              color="primary white--text"
              :loading="loading"
              :disabled="loading"
              @click="changePassword()"
            >
              Update Change
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import decode from "vue-jwt-decode";
export default {
  data() {
    return {
      nameRules: [(value) => !!value || "Field is required"],
      show: false,
      loading: false,

      //data
      user: {
        old_password: "",
        new_password: "",
      },
      confirm_password: "",
    };
  },
  created() {},

  methods: {
    //rule match password
    passwordMatch: function () {
      if (!this.confirm_password) {
        return ["Field is required"];
      }
      if (this.user.new_password !== this.confirm_password) {
        return ["Passwords does not match."];
      }
    },

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

    changePassword() {
      let decoder = decode.decode(sessionStorage.getItem("token"));
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.axios
          .put(this.$url + "/user/update/" + decoder.data.user.id, this.user)
          .then((res) => {
            if (res.data.success) {
              this.loading = false;
              //call snackbar success
              this.saveDetails("Updated Successfully", "primary", "#90CAF9");
              this.$refs.form.reset();
            }
          })
          .catch(() => {
            this.loading = false;
            this.saveDetails("Oops! something went wrong", "error", "#EF9A9A");
          });
      }
    },
  },
};
</script>

<style scoped></style>
