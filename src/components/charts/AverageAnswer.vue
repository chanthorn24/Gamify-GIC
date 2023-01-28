<template>
  <v-row>
    <v-col cols="12" lg="6" sm="12" class="d-flex justify-center">
      <apexchart
        type="pie"
        style="width: 335px"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </v-col>
    <v-col cols="12" lg="6" sm="12" class="pa-6">
      <div class="pa-10" style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px">
        Average Score: 100
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      series: [45, 55],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        colors: ["#F44336", "#0999AD"],
        labels: ["Correct", "Wrong"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped></style>
