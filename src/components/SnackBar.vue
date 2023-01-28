<template>
  <div name="snackbars">
    <v-snackbar
      v-model="show"
      :color="color"
      :timeout="timeout"
      :top="'top'"
      :right="'right'"
      class="mt-16"
      elevation="3"
    >
      <v-progress-linear
        absolute
        bottom
        :color="progressColor"
        :value="Math.floor(100 * (currentTime / timeout))"
      />
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="show = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      color: "",
      progressColor: "",
      text: "",
      timeout: -1,
      currentTime: 0,
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "showMessage") {
        this.text = state.text;
        this.color = state.color;
        this.timeout = state.timeout;
        this.progressColor = state.progressColor;
        this.currentTime = state.timeout;

        this.show = true;

        const value = setInterval(() => {
          this.currentTime = this.currentTime - 100;
          if (this.currentTime <= 0) {
            clearInterval(value);
          }
        }, 100);
      }
    });
  },
};
</script>
