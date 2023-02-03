<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Record</h1>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <router-link to="/" style="color: grey">Dashboard&nbsp;</router-link>
      <h4 style="margin-left: 3px">/ Quiz Record</h4>
    </div>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="rooms"
      :search="search"
      class="elevation-1 table"
    >
      <template v-slot:top>
        <v-card-title style="padding-top: 0">
          <div class="d-flex align-center">
            <div>List Quiz Record</div>
          </div>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </template>
      <template v-slot:[`item._id`]="{ index }">
        <div>{{ index + 1 }}</div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <router-link
          :to="'/viewrecord/' + item._id"
          style="text-decoration: none"
        >
          <v-btn small color="success"> view Details </v-btn>
        </router-link>
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
export default {
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
        text: "Room Name",
        value: "name",
      },
      { text: "Room Type", value: "room_type_id.name" },
      { text: "Questions(s)", value: "question_id.length" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
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
