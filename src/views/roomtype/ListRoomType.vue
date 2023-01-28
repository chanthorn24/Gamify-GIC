<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Room Type</h1>
      <add-room-type @refreshData="getRoomType()"></add-room-type>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/ Room Type</h4>
    </div>

    <v-data-table
      :headers="headers"
      :items="roomTypes"
      :search="search"
      :loading="loading"
      class="elevation-1 table"
    >
      <template v-slot:top>
        <v-card-title style="padding-top: 0">
          <div class="d-flex align-center">
            <div>List Room Type</div>
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
        <edit-room-type
          :item="item"
          @refreshData="getRoomType()"
        ></edit-room-type>
        <delete-room-type
          :id="item._id"
          @refreshData="getRoomType()"
        ></delete-room-type>
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
import AddRoomType from "../../components/roomtype/AddRoomType.vue";
import DeleteRoomType from "../../components/roomtype/DeleteRoomType.vue";
import EditRoomType from "../../components/roomtype/EditRoomType.vue";
export default {
  components: { AddRoomType, DeleteRoomType, EditRoomType },
  data: () => ({
    loading: true,
    search: "",
    headers: [
      {
        text: "No",
        value: "_id",
      },
      {
        text: "Type",
        value: "name",
      },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    roomTypes: [],
  }),

  created() {
    this.getRoomType();
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

    getRoomType() {
      try {
        this.axios
          .get(this.$url + "/room/type/get-all")
          .then((res) => {
            if (res.data.success) {
              this.roomTypes = res.data.data;
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
</style>
