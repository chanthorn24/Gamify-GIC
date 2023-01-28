<template>
  <v-dialog v-model="dialog" max-width="40vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        color="#E53935"
        class="ml-1"
        dark
        v-bind="attrs"
        v-on="on"
        @click="disableButton($event)"
      >
        <v-icon>mdi-delete-sweep</v-icon>
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
            @click="deleteUser()"
            >Delete</v-btn
          >
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
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
    disableButton(event) {
      this.target = event.currentTarget;
      event.currentTarget.style.visibility = "hidden";
    },

    deleteUser() {
      try {
        this.$axios
          .delete(this.$url + `/question/delete/${this.id}`)
          .then((res) => {
            if (res.data.success) {
              this.$emit("refreshData", "");
              this.dialog = false;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
