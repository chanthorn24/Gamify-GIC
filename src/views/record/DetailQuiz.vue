<template>
  <v-dialog v-model="dialog" max-width="50vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ml-2"
        small
        color="success"
        v-bind="attrs"
        v-on="on"
        @click="disableButton($event)"
      >
        view Details
      </v-btn>
    </template>
    <v-card style="overflow: hidden">
      <v-card-title class="d-flex justify-center">
        <span class="text-h5" style="font-weight: 500; color: #0999ad"
          >View Quiz</span
        >
      </v-card-title>

      <v-card-text>
        <div>Student Name: LCT</div>
        <div>Score: 900</div>
        <div>Grade: 10</div>
        <v-container
          style="
            box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px inset;
            border-radius: 6px;
          "
        >
          Hello</v-container
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
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
  },
};
</script>

<style lang="scss" scoped></style>
