<template>
  <v-dialog v-model="dialog" persistent max-width="40vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#01579B"
        class="mr-1"
        @click="disableButton($event)"
        v-bind="attrs"
        v-on="on"
        disabled
      >
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title class="d-flex justify-center">
          <span class="text-h5" style="font-weight: 500; color: #0999ad"
            >Update Room Type</span
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
                  v-model="roomType.name"
                  label="Room type *"
                  :rules="nameRules"
                  required
                  clearable
                ></v-text-field>
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
            @click="updateRoomType()"
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
  props: ["item"],
  data() {
    return {
      dialog: false,
      loading: false,
      target: [],
      nameRules: [(v) => !!v || "Field is required"],

      //data
      roomType: Object.assign({}, this.item),
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

    updateRoomType() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          this.axios
            .put(
              this.$url + "/room/type/update/" + this.roomType._id,
              this.roomType
            )
            .then((res) => {
              if (res.data.success) {
                this.$emit("refreshData", "");
                this.loading = false;
                this.dialog = false;

                //call snackbar success
                this.saveDetails("Updated Successfully", "primary", "#90CAF9");
              }
            })
            .catch((error) => {
              //snackbar error
              this.loading = false;
              this.saveDetails(error.message, "error", "#EF9A9A");
            });
        }
      } catch (error) {
        //snackbar error
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
