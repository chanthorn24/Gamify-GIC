<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Question Type</h1>
      <add-question-type @refreshData="getQuestionType()"></add-question-type>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/ Question Type</h4>
    </div>
    <v-data-table
      :headers="headers"
      :items="questionTypes"
      :search="search"
      :loading="loading"
      class="elevation-1 table"
    >
      <template v-slot:top>
        <v-card-title style="padding-top: 0">
          <div class="d-flex align-center">
            <div>List Question Type</div>
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
        <edit-question-type
          :item="item"
          @refreshData="getQuestionType()"
        ></edit-question-type>
        <delete-question-type
          :id="item._id"
          @refreshData="getQuestionType()"
        ></delete-question-type>
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
import DeleteQuestionType from "../../components/questiontype/DeleteQuestionType.vue";
import AddQuestionType from "../../components/questiontype/AddQuestionType.vue";
import EditQuestionType from "../../components/questiontype/EditQuestionType.vue";
import { mapActions } from "vuex";
export default {
  components: { DeleteQuestionType, AddQuestionType, EditQuestionType },
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
    questionTypes: [],
  }),

  created() {
    this.getQuestionType();
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

    getQuestionType() {
      try {
        this.axios
          .get(this.$url + "/question/type/get-all")
          .then((res) => {
            if (res.data.success) {
              this.questionTypes = res.data.data;
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
