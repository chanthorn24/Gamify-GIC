<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <h1 class="mb-2" style="font-weight: 500">Attendance</h1>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/</h4>
    </div>

    <v-row>
      <v-col cols="12" lg="3" md="3" sm="4">
        <v-card
          class="py-5 d-flex align-center justify-space-between"
          outlined
          elevation="1"
        >
          <v-progress-linear
            absolute
            top
            value="100"
            height="5"
            color="#66BB6A"
          ></v-progress-linear>
          <div class="d-flex align-center">
            <span class="lstick"></span>
            <div class="ml-10">
              <div style="font-size: x-large; font-weight: 500; color: #0999ad">
                Total Teacher(s)
              </div>
              <h1 style="color: #66bb6a">
                {{ numOfTeacher.toString().padStart(2, "0") }}
              </h1>
            </div>
          </div>
          <div class="my-2 pr-10">
            <v-btn color="#66BB6A" fab x-large dark>
              <i class="fa-duotone fa-chalkboard-user fa-xl"></i>
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="4">
        <v-card
          class="py-5 d-flex align-center justify-space-between"
          outlined
          elevation="1"
        >
          <v-progress-linear
            absolute
            top
            value="100"
            height="5"
            color="#7E57C2"
          ></v-progress-linear>
          <div class="d-flex align-center">
            <span class="lstick"></span>
            <div class="ml-10">
              <div style="font-size: x-large; font-weight: 500; color: #0999ad">
                Quiz Room(s)
              </div>
              <h1 style="color: #7e57c2">
                {{ numOfRoom.toString().padStart(2, "0") }}
              </h1>
            </div>
          </div>
          <div class="my-2 pr-10">
            <v-btn color="#7E57C2" fab x-large dark>
              <i class="fa-solid fa-chalkboard fa-xl"></i>
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="4">
        <v-card
          class="py-5 d-flex align-center justify-space-between"
          outlined
          elevation="1"
        >
          <v-progress-linear
            absolute
            top
            value="100"
            height="5"
            color="#1E88E5"
          ></v-progress-linear>
          <div class="d-flex align-center">
            <span class="lstick"></span>
            <div class="ml-10">
              <div style="font-size: x-large; font-weight: 500; color: #0999ad">
                Department(s)
              </div>
              <h1 style="color: #1e88e5">
                {{ numOfDeparment.toString().padStart(2, "0") }}
              </h1>
            </div>
          </div>
          <div class="my-2 pr-10">
            <v-btn color="#1E88E5" fab x-large dark>
              <i class="fa-sharp fa-solid fa-apartment fa-xl"></i>
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="4">
        <v-card
          class="py-5 d-flex align-center justify-space-between"
          outlined
          elevation="1"
        >
          <v-progress-linear
            absolute
            top
            value="100"
            height="5"
            color="orange"
          ></v-progress-linear>
          <div class="d-flex align-center">
            <span class="lstick"></span>
            <div class="ml-10">
              <div style="font-size: x-large; font-weight: 500; color: #0999ad">
                Global User(s)
              </div>
              <h1 style="color: orange">
                {{ numOfGlobal.toString().padStart(2, "0") }}
              </h1>
            </div>
          </div>
          <div class="my-2 pr-10">
            <v-btn color="orange" fab x-large dark>
              <i class="fa-duotone fa-users fa-xl"></i>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Chart -->
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card class="pa-2" outlined elevation="1">
          <ColumnChart></ColumnChart>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card class="pa-2" outlined elevation="1">
          <PieChart></PieChart>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import decode from "vue-jwt-decode";
import { mapActions } from "vuex";
import ColumnChart from "../components/charts/ColumnChart.vue";
import PieChart from "../components/charts/PieChart.vue";

import io from "socket.io-client";

export default {
  components: {
    ColumnChart,
    PieChart,
  },
  data() {
    return {
      numOfTeacher: 0,
      numOfRoom: 0,
      numOfDeparment: 0,
      numOfGlobal: 0,
    };
  },

  methods: {
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

    getTeacher() {
      this.axios
        .get(this.$url + "/user/get-all")
        .then((res) => {
          if (res.data.success) {
            this.numOfTeacher = res.data.data.length;
          }
        })
        .catch((error) => {
          //snackbar error
          this.saveDetails(error.message, "error", "#EF9A9A");
        });
    },

    getRoom() {
      this.decoder = decode.decode(sessionStorage.getItem("token"));
      this.axios
        .get(this.$url + "/room/get/by/" + this.decoder.data.user.id)
        .then((res) => {
          if (res.data.success) {
            this.numOfRoom = res.data.data.length;
          }
        })
        .catch((error) => {
          //snackbar error
          this.saveDetails(error.message, "error", "#EF9A9A");
        });
    },

    getDepartment() {
      this.axios
        .get(this.$url + "/department/get-all")
        .then((res) => {
          if (res.data.success) {
            this.numOfDeparment = res.data.data.length;
          }
        })
        .catch((error) => {
          //snackbar error
          this.saveDetails(error.message, "error", "#EF9A9A");
        });
    },

    initialize() {
      this.socket.emit("global_user", "");
    },

    snackBarLogin() {
      if (sessionStorage.getItem("login")) {
        sessionStorage.removeItem("login");
        this.saveDetails("Login successfully", "success", "orange");
      }
    },
  },
  mounted() {
    this.snackBarLogin();
  },
  created() {
    this.getTeacher();
    this.getRoom();
    this.getDepartment();

    this.socket = io(this.$url, { transports: ["websocket"] });
    this.socket.on("global_user", (msg) => {
      this.numOfGlobal = msg.length;
    });
    this.initialize();
  },
};
</script>

<style lang="scss" scoped>
a:hover {
  color: rgb(170, 198, 196) !important;
}

.lstick {
  width: 3px;
  background: #0999ad;
  height: 40px;
  position: absolute;
}
</style>
