<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">User Role</h1>
      <add @refreshData="getUserRole()"></add>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/ User Role</h4>
    </div>
    <v-data-table
      :headers="headers"
      :items="userRoles"
      :search="search"
      :loading="loading"
      class="elevation-1 table"
    >
      <template v-slot:top>
        <v-card-title style="padding-top: 0">
          <div class="d-flex align-center">
            <div>List User Role</div>
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
        <edit-role :item="item" @refreshData="getUserRole()"></edit-role>
        <delete-role :id="item._id" @refreshData="getUserRole()"></delete-role>
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
import Add from "../../components/usertype/AddRole.vue";
import DeleteRole from "../../components/usertype/DeleteRole.vue";
import EditRole from "../../components/usertype/EditRole.vue";
export default {
  components: { Add, DeleteRole, EditRole },
  data: () => ({
    search: "",
    headers: [
      {
        text: "No",
        value: "_id",
      },
      {
        text: "Role",
        value: "name",
      },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    userRoles: [],
    loading: false,
  }),

  created() {
    this.getUserRole();
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

    getUserRole() {
      try {
        this.loading = true;
        this.axios
          .get(this.$url + "/user/role/get-all")
          .then((res) => {
            if (res.data.success) {
              this.userRoles = res.data.data;
              this.loading = false;
            }
          })
          .catch((error) => {
            //snackbar errorl
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
