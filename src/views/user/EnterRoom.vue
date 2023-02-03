<script>
import router from "@/router";
export default {
  data() {
    return {
      first: "John",
      last: "Doe",
      dialog: false,
      dialog1: false,

      loading: false,

      //data
      pin: this.$route.query.pin || "",

      //rule form validate
      nameRules: [(v) => !!v || "Field is required"],
    };
  },

  methods: {
    enterRoom() {
      try {
        if (this.$refs.form.validate()) {
          this.axios.post(this.$url + "/room/join/" + this.pin).then((res) => {
            console.log(res.data);
            if (res.data.success) {
              router.push({
                path: `/user/room/in/play/${res.data.data[0]?._id}`,
              });
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<template>
  <div style="background-color: #0999ab; height: 125vh; zoom: 100%">
    <v-icon class="circle animation2" style="font-size: 162px"
      >fa-solid fa-circle</v-icon
    >
    <v-icon class="star animation1" style="font-size: 162px"
      >fa-solid fa-star</v-icon
    >
    <v-icon class="play animation1" style="font-size: 162px"
      >fa-solid fa-play</v-icon
    >
    <div
      style="height: 80%"
      class="d-flex flex-column align-center justify-center"
    >
      <div
        style="
          font-style: italic;
          color: white;
          font-size: 40px;
          font-weight: 500;
        "
        class="mb-5"
      >
        GIC FunQuiz &nbsp;
      </div>
      <v-card width="600" class="px-5">
        <v-form ref="form" lazy-validation>
          <v-col>
            <v-text-field
              v-model="pin"
              color="#0999ab"
              placeholder="Game Pin"
              class="centered-input text--darken-3 mt-3"
              style="font-size: 20px; font-weight: 500"
              single-line
              :rules="nameRules"
              outlined
            ></v-text-field>
            <v-btn
              depressed
              color="#0999ab"
              width="100%"
              height="40"
              dark
              class="mb-3 white--text"
              style="font-size: 20px"
              :loading="loading"
              :disabled="loading"
              @click="enterRoom()"
            >
              Enter
            </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </div>
    <div
      style="width: 100%"
      class="policy d-flex justify-center align-center flex-row py-4"
    >
      <a style="border-right: 1px solid #f5f5f5">
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <a
                color="red lighten-2"
                style="font-size: 16px"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Terms
              </a>
            </template>
            <v-card>
              <v-card-title class="text-h5"> Terms Policy </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </a>
      <a>
        <div class="text-center">
          <v-dialog v-model="dialog1" width="500">
            <template v-slot:activator="{ on, attrs }">
              <a
                color="red lighten-2"
                dark
                v-bind="attrs"
                v-on="on"
                style="font-size: 16px"
              >
                Privacy
              </a>
            </template>
            <v-card>
              <v-card-title class="text-h5 green green-2">
                Privacy Policy
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog1 = false">
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </a>
    </div>
  </div>
</template>
<style scoped>
.animation1 {
  animation: animation1 3s linear 1s infinite normal both;
  transform: translate3d(0, 0, 0);
}
.animation2 {
  animation: animation2 3s linear 1s infinite normal none;
  transform: translate3d(0, 0, 0);
}

@keyframes animation1 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animation2 {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

.policy {
  position: absolute;
  bottom: 0;
  text-align: center;
}

.centered-input >>> input {
  text-align: center;
}
.policy a {
  text-decoration: none;
  color: #f5f5f5;
  font-size: 0.7rem;
  padding: 0 8px;
}
.circle {
  position: absolute;
  left: 320px;
  top: 10%;
  color: #0d92a5;
}
.star {
  position: absolute;
  right: 120px;
  top: 10%;
  color: #0d92a5;
}
.play {
  position: absolute;
  left: 500px;
  top: 65%;
  color: #0d92a5;
}
</style>
