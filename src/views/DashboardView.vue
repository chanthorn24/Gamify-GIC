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
        <v-card class="py-5 d-flex align-center" outlined tile>
          <span class="lstick"></span>
          <div class="ml-10">
            <h3>Total Teachers</h3>
            10
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="4">
        <v-card class="pa-2" outlined tile> One of three columns </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="4">
        <v-card class="pa-2" outlined tile> One of three columns </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="4">
        <v-card class="pa-2" outlined tile> One of three columns </v-card>
      </v-col>
    </v-row>

    <!-- Chart -->
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card class="pa-2" outlined tile>
          <ColumnChart></ColumnChart>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card class="pa-2" outlined tile>
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
  width: 2px;
  background: black;
  height: 30px;
  position: absolute;
}
</style>
