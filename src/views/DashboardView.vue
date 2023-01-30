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
              <h1 style="color: #66bb6a">10</h1>
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
              <h1 style="color: #7e57c2">10</h1>
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
              <h1 style="color: #1e88e5">10</h1>
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
              <h1 style="color: orange">10</h1>
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
    <v-row class="mt-6">
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
import { mapActions } from "vuex";
import ColumnChart from "../components/charts/ColumnChart.vue";
import PieChart from "../components/charts/PieChart.vue";

export default {
  components: {
    ColumnChart,
    PieChart,
  },
  data() {
    return {};
  },

  methods: {
    ...mapActions(["showSnack"]),
    saveDetails() {
      console.log("hello");
      this.showSnack({
        text: "Successfully Saved!",
        color: "success",
        progressColor: "#A5D6A7",
        // color: "error",
        // color: "warning",
        timeout: 3500,
      });
    },
  },
  created() {},
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
