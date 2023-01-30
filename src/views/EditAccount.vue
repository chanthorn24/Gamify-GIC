<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Edit Account</h1>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/ Edit Account</h4>
    </div>
    <v-container class="container" fluid>
      <v-row>
        <v-col>
          <v-sheet class="text-center">
            <v-avatar size="250" style="position: relative">
              <v-img
                position="center"
                contain
                v-if="userInfo.image"
                :src="userInfo.image"
              ></v-img>
              <v-icon v-else size="100">mdi-account-circle</v-icon>
              <v-file-input
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-35%, -65%);
                "
                accept="image/*"
                hide-input
                hide-details
                prepend-icon="mdi-camera"
                @change="imageHandler"
              ></v-file-input>
            </v-avatar>
          </v-sheet>
        </v-col>
        <v-col>
          <v-text-field
            v-model="userInfo.firstName"
            outlined
            label="First Name"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="userInfo.lastName"
            outlined
            label="Last Name"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="userInfo.email"
            outlined
            label="Email"
            clearable
            readonly
            disabled
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn @click="updateUser" class="btn" color="success" dark>
        Submit
      </v-btn>
    </v-container>
  </div>
</template>
  
  <style scoped>
    .btn {
        left: 65%;
        width: 6%;
    }
    .v-text-field--outlined {
        width: 70%;
    }
</style>
  
  <script>
export default {
  data() {
    return {
      rules: [(value) => !!value || "Required."],
      userInfo: {},
      user_id: "",
    };
  },

  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.user_id = user._id;
    console.log("user id", this.user_id);
    this.getUser(this.user_id);
  },

  methods: {
    imageHandler(e) {
      console.log(e);
      let formData = new FormData();
      formData.append("image_file", e);
      this.axios
        .post(this.$url + "/image/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("upload image", res);
          this.userInfo.image = res.data.data;
        });
    },

    getUser(user_id) {
      this.axios.get(this.$url + `/user/get/${user_id}`).then((res) => {
        console.log("get user", res);
        this.userInfo = res.data.data;
      });
    },

    updateUser() {
      this.axios
        .put(this.$url + `/user/update/${this.user_id}`, {
          firstName: this.userInfo.firstName,
          lastName: this.userInfo.lastName,
          image: this.userInfo.image,
          phone: this.userInfo.phone,
        })
        .then((res) => {
          console.log("get user", res);
        });
    },
  },
};
</script>
  