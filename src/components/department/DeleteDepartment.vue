<template>
  <v-dialog v-model="dialog" max-width="40vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#E53935"
        class="ml-1"
        v-bind="attrs"
        v-on="on"
        @click="disableButton($event)"
        dark
      >
        Delete
      </v-btn>
    </template>
    <v-card class="pt-5 pb-3">
      <v-container class="d-flex justify-center flex-column align-center">
        <div style="width: 120px">
          <v-img src="@/assets/cancel.png"></v-img>
        </div>
        <h2 class="mt-3">Are you sure?</h2>
        <h4 style="color: grey" class="mt-2">You want to delete this item!</h4>
        <div class="d-flex mt-4">
          <v-btn
            width="18vw"
            class="mr-2"
            style="color: red; border: 1px solid red"
            @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn
            width="18vw"
            class="ml-2"
            style="color: white; background-color: red"
            @click="deleteDepartment()"
            :loading="loading"
            :disabled="loading"
            >Delete</v-btn
          >
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
      loading: false,
      target: [],
    };
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.target.style.visibility = "";
      }
    },
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

    disableButton(event) {
      this.target = event.currentTarget;
      event.currentTarget.style.visibility = "hidden";
    },

    deleteDepartment() {
      try {
        this.loading = true;
        this.axios
          .delete(this.$url + `/department/delete/${this.id}`)
          .then((res) => {
            if (res.data.success) {
              this.$emit("refreshData", "");
              this.dialog = false;
              this.loading = false;

              //call snackbar success
              this.saveDetails("Deleted successfully", "warning", "#FFCC80");
            }
          })
          .catch((error) => {
            this.loading = false;
            this.saveDetails(error.message, "error", "#EF9A9A");
          });
      } catch (error) {
        this.loading = false;
        this.saveDetails("Oops, something went wrong", "error", "#EF9A9A");
      }
    },
  },
};
</script>

<style scoped></style>
