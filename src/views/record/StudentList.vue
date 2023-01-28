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
      :loading="loading"
      :headers="headers"
      :items="rooms"
      :search="search"
      class="elevation-1 table"
    >
      <template v-slot:[`item._id`]="{ index }">
        <div>{{ index + 1 }}</div>
      </template>
      <template v-slot:[`item.actions`]="{}">
        <v-btn small color="primary">
          <i class="fa-sharp fa-solid fa-envelope"></i>
          <div>send mail</div>
        </v-btn>
        <detail-quiz></detail-quiz>
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
import decode from "vue-jwt-decode";
import { mapActions } from "vuex";
import DetailQuiz from "./DetailQuiz.vue";
export default {
  components: { DetailQuiz },
  data: () => ({
    search: "",
    loading: false,
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
      { text: "Answer(s)", value: "room_type_id.name" },
      { text: "Average(%)", value: "question_id.length" },
      { text: "Actions", value: "actions", sortable: false, align: "right" },
    ],
  }),

  created() {
    this.initialize();
  },

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

    initialize() {
      this.decoder = decode.decode(sessionStorage.getItem("token"));
      this.loading = true;
      try {
        this.axios
          .get(this.$url + `/room/get/by/${this.decoder.data.user.id}`)
          .then((res) => {
            if (res.data.success) {
              this.rooms = res.data.data;
              this.loading = false;
              console.log(this.rooms);
            }
          })
          .catch((error) => {
            //snackbar error
            this.loading = false;
            this.saveDetails(error.message, "error", "#EF9A9A");
          });
      } catch (error) {
        //snackbar error
        this.loading = false;
        this.saveDetails("Oops, something went wrong", "error", "#EF9A9A");
      }
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
