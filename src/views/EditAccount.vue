<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Edit Account</h1>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/ Edit Account</h4>
    </div>
    <v-card class="pa-5">
      <v-row>
        <v-col cols="12" lg="5" md="12" sm="12">
          <div
            class="d-flex align-center justify-center flex-column"
            style="height: 100%"
          >
            <h3 class="mb-5" style="color: #0999ad">Profile Image</h3>
            <v-avatar size="140" style="position: relative">
              <v-img
                position="center"
                :src="user.image ? user.image : 'ddd'"
              ></v-img>
              <v-file-input
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-35%, -65%);
                "
                v-model="fileImage"
                accept="image/*"
                hide-input
                hide-details
                prepend-icon="mdi-camera"
                :loading="imageLoading"
                :disabled="imageLoading"
                @change="imageHandler"
              ></v-file-input>
            </v-avatar>
            <div class="mt-5">
              <v-btn
                elevation="0"
                color="primary--text"
                style="border: 1px solid #1976d2"
                :loading="saveImage"
                :disabled="saveImage"
                @click="updateProfileImage()"
              >
                Save
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="7" md="12" sm="12">
          <h3 class="mb-5" style="color: #0999ad">General Infromation</h3>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="12">
                <v-text-field
                  v-model="user.firstName"
                  label="First name *"
                  :rules="nameRules"
                  required
                  outlined
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" lg="6" md="6" sm="12">
                <v-text-field
                  v-model="user.lastName"
                  label="Last name *"
                  :rules="nameRules"
                  required
                  outlined
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" lg="6" md="6" sm="12">
                <v-select
                  v-model="user.gender"
                  :items="genders"
                  item-text="name"
                  item-value="name"
                  label="Gender *"
                  :rules="nameRules"
                  outlined
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" lg="6" md="6" sm="12">
                <v-text-field
                  v-model="user.phone"
                  label="Phone Number *"
                  :rules="nameRules"
                  required
                  outlined
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" lg="6" md="6" sm="12">
                <v-select
                  v-model="user.department_id"
                  :items="departments"
                  item-text="name"
                  item-value="_id"
                  label="Department *"
                  :rules="nameRules"
                  outlined
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" lg="6" md="6" sm="12">
                <v-select
                  v-model="user.user_role_id"
                  :items="roles"
                  item-text="name"
                  item-value="_id"
                  label="Role *"
                  :rules="nameRules"
                  required
                  disabled
                ></v-select>
              </v-col>
            </v-row>
            <h3 class="mb-5" style="color: #0999ad">Account Infromation</h3>
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="12">
                <v-text-field
                  disabled
                  v-model="user.email"
                  label="Email address *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <div class="d-flex justify-end">
            <v-btn style="border: 1px solid #1976d2" class="mr-3 primary--text">
              Clear
            </v-btn>
            <v-btn
              color="primary"
              :loading="userLoading"
              :disabled="userLoading"
              @click="updateUser()"
            >
              Update
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import decode from "vue-jwt-decode";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      nameRules: [(value) => !!value || "File is required"],
      imageLoading: false,
      userLoading: false,
      saveImage: false,
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
      fileImage: null,
      genders: ["Male", "Female", "Other"],
      departments: [],
      roles: [],
    };
  },

  created() {
    this.getDepartment();
    this.getRoles();
    this.getUser();
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

    imageHandler() {
      this.imageLoading = true;
      let formData = new FormData();
      formData.append("image_file", this.fileImage);
      this.axios.post(this.$url + "/image/upload", formData).then((res) => {
        if (res.data.success) {
          this.user.image = res.data.data;
          this.imageLoading = false;
        }
      });
    },
    updateUser() {
      this.userLoading = true;
      let decoder = decode.decode(sessionStorage.getItem("token"));
      this.axios
        .put(this.$url + `/user/update/${decoder.data.user.id}`, {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phone: this.user.phone,
          gender: this.user.gender,
          department_id: this.user.department_id,
        })
        .then((res) => {
          if (res.data.success) {
            this.getUser();
            //call snackbar success
            this.userLoading = false;
            this.saveDetails("Updated Successfully", "primary", "#90CAF9");
          }
        });
    },
    updateProfileImage() {
      if (this.fileImage) {
        this.saveImage = true;
        let decoder = decode.decode(sessionStorage.getItem("token"));
        this.axios
          .put(this.$url + `/user/update/${decoder.data.user.id}`, {
            image: this.user.image,
          })
          .then((res) => {
            if (res.data.success) {
              //call snackbar success
              this.saveImage = false;
              this.saveDetails("Updated Successfully", "primary", "#90CAF9");
              this.getUser();
            }
          });
      } else {
        this.saveDetails("Try to upload image first", "orange", "#FFE0B2");
      }
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
    getDepartment() {
      this.axios
        .get(this.$url + "/department/get-all")
        .then((res) => {
          if (res.data.success) {
            this.departments = res.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRoles() {
      this.axios
        .get(this.$url + "/user/role/get-all")
        .then((res) => {
          if (res.data.success) {
            this.roles = res.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
