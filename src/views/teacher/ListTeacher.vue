<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Teachers</h1>
      <add
        :isAdmin="isAdmin"
        :departments="departments"
        :roles="roles"
        @refreshData="getAllTeacher()"
      ></add>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/ Teacher</h4>
    </div>

    <v-data-table
      :headers="headers"
      :items="teachers"
      :search="search"
      :loading="table_loading"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-card-title style="padding-top: 0">
          <div class="d-flex align-center">
            <div>List Teacher</div>
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
      <template v-slot:[`item.index`]="{ index }">
        <div>{{ index + 1 }}</div>
      </template>
      <template v-slot:[`item.firstName`]="{ item }">
        <div class="p-2">
          <div>{{ item.firstName + " " + item.lastName }}</div>
        </div>
      </template>

      <template v-slot:[`item.actions`]="{ item }" style="align-items: center">
        <edit
          :item="item"
          :departments="departments"
          :roles="roles"
          :isAdmin="isAdmin"
          @refreshData="getAllTeacher()"
        ></edit>
        <delete
          :id="item._id"
          :isAdmin="isAdmin"
          @refreshData="getAllTeacher()"
        ></delete>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getAllTeacher"> Refresh </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Add from "../../components/teacher/Add.vue";
import Delete from "../../components/teacher/Delete.vue";
import Edit from "../../components/teacher/Edit.vue";
import decode from "vue-jwt-decode";
export default {
  components: { Add, Edit, Delete },
  data: () => ({
    search: "",
    table_loading: true,
    headers: [
      {
        text: "No",
        value: "index",
      },
      {
        text: "Name",
        align: "left",
        value: "firstName",
      },
      { text: "Gender", value: "gender" },
      { text: "Phone", value: "phone" },
      { text: "Department", value: "department_id.name" },
      { text: "Email", value: "email" },
      { text: "Role", value: "user_role_id.name" },
      {
        text: "Actions",
        align: "right",
        value: "actions",
        sortable: false,
      },
    ],
    num_page: "",
    teachers: [],
    departments: [],
    roles: [],
    isAdmin: false,
  }),

  created() {
    this.getDepartment();
    this.getRole();
    this.getAllTeacher();
    this.decodeToken();
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

    decodeToken() {
      let decoder = "";
      decoder = decode.decode(sessionStorage.getItem("token"));
      if (decoder.data.user.role == "ADMIN_ROLE") {
        this.isAdmin = true;
      }
    },

    getAllTeacher() {
      this.$axios
        .get(this.$url + "/user/get-all")
        .then((res) => {
          this.table_loading = false;
          this.teachers = res.data.data;
        })
        .catch((error) => {
          //snackbar error
          this.table_loading = false;
          this.saveDetails(error.message, "error", "#EF9A9A");
        });
    },

    getDepartment() {
      try {
        this.$axios
          .get(this.$url + "/department/get-all")
          .then(async (res) => {
            if (res.data.success) {
              this.departments = await res.data.data;
            }
          })
          .catch((error) => {
            //snackbar error
            this.saveDetails(error.message, "error", "#EF9A9A");
          });
      } catch (error) {
        //snackbar error
        this.saveDetails("Oops, something went wrong", "error", "#EF9A9A");
      }
    },
    getRole() {
      try {
        this.axios
          .get(this.$url + "/user/role/get-all")
          .then((res) => {
            if (res.data.success) {
              this.roles = res.data.data;
            }
          })
          .catch((error) => {
            //snackbar error
            this.saveDetails(error.message, "error", "#EF9A9A");
          });
      } catch (error) {
        //snackbar error
        this.saveDetails("Oops, something went wrong", "error", "#EF9A9A");
      }
    },
  },
};
</script>
