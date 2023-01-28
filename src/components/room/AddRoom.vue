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
        New Room
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title class="d-flex justify-center">
          <span class="text-h5" style="font-weight: 500; color: #0999ad"
            >Add Room</span
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
            @click="addRoom()"
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
export default {
  props: ["roomTypes", "userId"],
  data() {
    return {
      dialog: false,
      loading: false,
      target: [],
      nameRules: [(v) => !!v || "Field is required"],

      //data
      room: {
        user_id: this.userId,
        room_type_id: "",
        name: "",
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
    addRoom() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          this.axios.post(this.$url + "/room/create", this.room).then((res) => {
            if (res.data.success) {
              this.$emit("refreshData", "");
              this.loading = false;
              this.dialog = false;

              //reset form
              this.$refs.form.reset();
            }
          });
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
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
