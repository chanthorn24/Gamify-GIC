<template>
  <v-dialog v-model="dialog" persistent max-width="50vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#01579B"
        class="mr-1 white--text"
        @click="disableButton($event)"
        :disabled="!isAdmin"
        v-bind="attrs"
        v-on="on"
      >
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title class="d-flex justify-center">
          <span class="text-h5" style="color: #01579b; font-weight: 500"
            >Edit User</span
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
                  disabled
                  v-model="user.email"
                  label="Email address *"
                  :rules="emailRules"
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
            style="color: #01579b; border: 1px solid #01579b"
            text
            @click="dialog = false"
            width="47%"
          >
            Cancel
          </v-btn>
          <v-btn
            elevation="2"
            style="background-color: #01579b; color: white"
            text
            @click="updateUser"
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
  props: ["item", "departments", "roles", "isAdmin"],
  data() {
    return {
      dialog: false,
      target: [],
      loading: false,

      //user data
      user: Object.assign({}, this.item),
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

    updateUser() {
      if (this.$refs.form.validate() && this.isAdmin) {
        this.loading = true;
        try {
          this.axios
            .put(this.$url + `/user/update/${this.user._id}`, this.user)
            .then((res) => {
              if (res.data.success) {
                this.$emit("refreshData", "");

                this.dialog = false;
                this.loading = false;

                //call snackbar success
                this.saveDetails("Updated Successfully", "primary", "#90CAF9");
              }
            })
            .catch((error) => {
              //snackbar error
              this.loading = false;
              this.saveDetails(error.message, "error", "#EF9A9A");
            });
        } catch (error) {
          //snackbar error
          this.loading = false;
          this.saveDetails("Oops, something went wrong", "error", "#EF9A9A");
        }
      } else {
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
