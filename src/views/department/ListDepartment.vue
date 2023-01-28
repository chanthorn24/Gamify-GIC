<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Department</h1>
      <add-department @refreshData="getDepartment()"></add-department>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/ Department</h4>
    </div>
    <v-data-table
      :headers="headers"
      :items="departments"
      :search="search"
      :loading="loading"
      class="elevation-1 table"
    >
      <template v-slot:top>
        <v-card-title style="padding-top: 0">
          <div class="d-flex align-center">
            <div>List Department</div>
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
      <template v-slot:[`item.description`]="{ item }">
        <div>{{ item.description || "N/A" }}</div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <edit-department
          :item="item"
          @refreshData="getDepartment()"
        ></edit-department>
        <delete-department
          :id="item._id"
          @refreshData="getDepartment()"
        ></delete-department>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" style="color: orange">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import DeleteDepartment from "../../components/department/DeleteDepartment.vue";
import AddDepartment from "../../components/department/AddDepartment.vue";
import EditDepartment from "../../components/department/EditDepartment.vue";
import { mapActions } from "vuex";
export default {
  components: { DeleteDepartment, AddDepartment, EditDepartment },
  data: () => ({
    loading: true,
    search: "",
    headers: [
      {
        text: "No",
        value: "_id",
      },
      {
        text: "Department",
        value: "name",
      },
      {
        text: "Description",
        value: "description",
      },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    departments: [],
  }),

  created() {
    this.getDepartment();
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

    getDepartment() {
      try {
        this.axios
          .get(this.$url + "/department/get-all")
          .then((res) => {
            if (res.data.success) {
              this.departments = res.data.data;
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
