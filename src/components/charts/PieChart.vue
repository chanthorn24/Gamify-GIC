<template>
  <div>
    <apexchart
      type="pie"
      style="max-width: 625px"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [44, 55, 13],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        colors: ["#F44336", "#0999AD", "#ffd966"],
        labels: ["Team A", "Team B", "Team C"],
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
