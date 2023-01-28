<template>
  <v-dialog v-model="dialog" persistent max-width="40vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#0999ad"
        style="font-weight: 500"
        dark
        v-bind="attrs"
        v-on="on"
        @click="disableButton($event)"
      >
        New Department
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title class="d-flex justify-center">
          <span class="text-h5" style="font-weight: 500; color: #0999ad"
            >Add Department</span
          >
        </v-card-title>
        <v-card-text>
          <v-container
            style="
              box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px inset;
              border-radius: 6px;
            "
          >
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="department.name"
                  label="Role name *"
                  :rules="nameRules"
                  required
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-textarea
                  v-model="department.description"
                  outlined
                  label="Description"
                  clearable
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between pb-5 mx-3">
          <v-btn
            elevation="1"
            style="color: #0999ad; border: 1px solid #0999ad"
            text
            @click="dialog = false"
            width="47%"
          >
            Cancel
          </v-btn>
          <v-btn
            elevation="2"
            style="background-color: #0999ad; color: white"
            text
            @click="addDepartment()"
            :loading="loading"
            :disabled="loading"
            width="47%"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      target: [],
      nameRules: [(v) => !!v || "Field is required"],

      //data
      department: {
        name: "",
        description: "",
      },

      //status
      loading: false,
    };
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.target.style.visibility = "";
      }
    },
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

    addDepartment() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          this.axios
            .post(this.$url + "/department/create", this.department)
            .then((res) => {
              if (res.data.success) {
                this.$emit("refreshData", "");
                this.loading = false;
                this.dialog = false;

                //call snackbar success
                this.saveDetails("Created Successfully", "success", "#A5D6A7");

                //reset form
                this.$refs.form.reset();
              }
            })
            .catch((error) => {
              //snackbar error
              this.loading = false;
              this.saveDetails(error.message, "error", "#EF9A9A");
            });
        }
      } catch (error) {
        this.loading = false;
        this.saveDetails("Oops, something went wrong", "error", "#EF9A9A");
      }
    },

    disableButton(event) {
      this.target = event.currentTarget;
      event.currentTarget.style.visibility = "hidden";
    },
  },
};
</script>

<style scoped></style>
