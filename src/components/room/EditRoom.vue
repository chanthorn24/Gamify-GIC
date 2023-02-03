<template>
  <v-dialog v-model="dialog" persistent max-width="40vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        color="#0999ad"
        style="font-weight: 500"
        dark
        v-bind="attrs"
        v-on="on"
        @click="disableButton($event)"
      >
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title class="d-flex justify-center">
          <span class="text-h5" style="font-weight: 500; color: #0999ad"
            >Edit Room</span
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
              <v-col cols="12" lg="12">
                <v-text-field
                  v-model="room.name"
                  label="Name *"
                  :rules="nameRules"
                  required
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="12">
                <v-select
                  v-model="room.room_type_id"
                  :items="roomTypes"
                  item-text="name"
                  item-value="_id"
                  label="Room type *"
                  :rules="nameRules"
                  required
                ></v-select>
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
            @click="updateRoom()"
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
  props: ["roomTypes", "roomById"],
  data() {
    return {
      dialog: false,
      loading: false,
      target: [],
      nameRules: [(v) => !!v || "Field is required"],

      //data
      room: Object.assign({}, this.roomById),

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

    updateRoom() {
      try {
        if (this.$refs.form.validate()) {
          this.room.image = null;
          console.log(this.room);

          this.loading = true;
          this.axios
            .put(this.$url + "/room/update/" + this.room._id, this.room)
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
