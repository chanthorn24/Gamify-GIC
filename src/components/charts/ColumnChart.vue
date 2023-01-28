<template>
  <div>
    <apexchart
      type="bar"
      style="max-width: 775px"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        colors: ["#0999AD"],
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60],
        },
      ],
    };
  },
};
</script>

<style scoped></style>
