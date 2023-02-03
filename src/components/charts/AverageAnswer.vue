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
        Average Score: {{ averageTotal }} %
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["averageTotal"],
  data() {
    return {
      series: [this.averageTotal * 100, 100 - this.averageTotal * 100],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        colors: ["#0999AD", "#F44336"],
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
  created() {
    console.log(this.series);
  },
};
</script>

<style scoped></style>
