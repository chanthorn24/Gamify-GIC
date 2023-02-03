<template>
  <div>
    <div class="mt-10 mb-2"><h3>Student Record</h3></div>
    <v-text-field
      style="width: 20%"
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      class="mb-5"
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="students"
      :search="search"
      class="elevation-1 table"
    >
      <template v-slot:[`item._id`]="{ index }">
        <div>{{ index + 1 }}</div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <!-- <v-btn small color="primary">
          <i class="fa-sharp fa-solid fa-envelope"></i>
          <div>send mail</div>
        </v-btn> -->
        <detail-quiz :student="item"></detail-quiz>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DetailQuiz from "./DetailQuiz.vue";
export default {
  components: { DetailQuiz },
  props: ["students"],
  data() {
    return {
      search: "",
      rooms: [],
      headers: [
        {
          text: "No",
          value: "_id",
        },
        {
          text: "Student Name",
          value: "name",
        },
        { text: "Score(s)", value: "score" },
        { text: "Average(%)", value: "totalCorrect" },
        { text: "Actions", value: "actions", sortable: false, align: "right" },
      ],
    };
  },

  created() {},

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
  },
};
</script>

<style scoped>
.table {
  padding-left: 20px;
  padding-right: 20px;
}

a {
  text-decoration: none;
}
</style>
