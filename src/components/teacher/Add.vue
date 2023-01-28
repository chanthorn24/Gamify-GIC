<template>
  <v-dialog v-model="dialog" persistent max-width="50vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#0999ad"
        style="font-weight: 500"
        dark
        v-bind="attrs"
        v-on="on"
        @click="disableButton($event)"
      >
        New User
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title class="d-flex justify-center">
          <span class="text-h5" style="font-weight: 500; color: #0999ad"
            >Add User</span
          >
        </v-card-title>
        <v-card-text>
          <v-container
            style="
              box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px inset;
              border-radius: 6px;
            "
          >
            <v-row>
              <v-col cols="6" sm="6">
                <v-text-field
                  v-model="user.firstName"
                  label="First name *"
                  :rules="nameRules"
                  required
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="6">
                <v-text-field
                  v-model="user.lastName"
                  label="Last name *"
                  :rules="nameRules"
                  required
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="6">
                <v-select
                  v-model="user.gender"
                  :items="genders"
                  item-text="name"
                  item-value="name"
                  label="Gender *"
                  :rules="nameRules"
                  required
                ></v-select>
              </v-col>

              <v-col cols="6" sm="6">
                <v-text-field
                  v-model="user.phone"
                  label="Phone Number *"
                  :rules="nameRules"
                  required
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="6">
                <v-select
                  v-model="user.department_id"
                  :items="departments"
                  item-text="name"
                  item-value="_id"
                  label="Department *"
                  :rules="nameRules"
                  required
                ></v-select>
              </v-col>

              <v-col cols="6" sm="6">
                <v-select
                  v-model="user.user_role_id"
                  :items="roles"
                  item-text="name"
                  item-value="_id"
                  label="Role *"
                  :rules="nameRules"
                  required
                ></v-select>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="user.email"
                  label="Email address *"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="6">
                <v-text-field
                  v-model="user.password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Password *"
                  :rules="nameRules"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="6">
                <v-text-field
                  v-model="confirm_password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordMatch()"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  label="Confirmed Password *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between pb-5 mx-3">
          <v-btn
            elevation="1"
            style="color: #0999ad; border: 1px solid #0999ad"
            text
            @click="dialog = false"
            width="47%"
          >
            Cancel
          </v-btn>
          <v-btn
            elevation="2"
            style="background-color: #0999ad; color: white"
            text
            @click="addNewUser"
            :loading="loading"
            :disabled="loading"
            width="47%"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["departments", "roles"],
  data() {
    return {
      dialog: false,
      loading: false,
      target: [],
      //user data
      user: {
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        image: "",
        email: "",
        password: "",
        user_role_id: "",
        department_id: "",
      },
      confirm_password: "",
      genders: ["Male", "Female", "Other"],

      //validator
      show: false,
      nameRules: [(v) => !!v || "Field is required"],
      emailRules: [
        (v) => !!v || "Field is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.target.style.visibility = "";
      }
    },
  },

  created() {},
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

    //rule match password
    passwordMatch: function () {
      if (!this.confirm_password) {
        return ["Field is required"];
      }
      if (this.user.password !== this.confirm_password) {
        return ["Passwords does not match."];
      }
    },
    addNewUser() {
      try {
        if (this.user.password != this.confirm_password) {
          // alert("Password is not match!");
        } else if (this.$refs.form.validate()) {
          this.loading = true;

          this.$axios
            .post(this.$url + "/user/create", this.user)
            .then((res) => {
              if (res.data.success) {
                this.$emit("refreshData", "");
                this.dialog = false;
                this.loading = false;

                //call snackbar success
                this.saveDetails("Created Successfully", "success", "#A5D6A7");

                this.$refs.form.reset();
              }
            })
            .catch((error) => {
              //snackbar error
              this.loading = false;
              this.saveDetails(error.message, "error", "#EF9A9A");
            });
        }
      } catch (error) {
        //snackbar error
        this.loading = false;
        this.saveDetails("Oops, something went wrong", "error", "#EF9A9A");
      }
    },

    disableButton(event) {
      this.target = event.currentTarget;
      event.currentTarget.style.visibility = "hidden";
    },
  },
};
</script>

<style scoped></style>
