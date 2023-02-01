<template>
  <v-dialog v-model="dialog" persistent max-width="40vw">
    <v-card style="border-radius: 10px">
      <div class="container px-7 py-8">
        <v-form class="row" ref="form" lazy-validation>
          <v-col class="d-flex justify-center align-center" cols="12">
            <h2 style="color: #0999ab" class="mb-4">Join the game</h2>
          </v-col>

          <div
            style="
              width: 100%;
              padding: 20px;
              box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
            "
          >
            <v-col cols="12" style="padding: 0">
              <v-text-field
                v-model="user.name"
                class="centered-input text--darken-3"
                label="Enter nickname"
                outlined
                :rules="nameRules"
                dense
                color="#0999ad"
              ></v-text-field>
            </v-col>
            <v-col cols="12" style="padding: 0">
              <v-text-field
                outlined
                class="centered-input text--darken-3"
                v-model="user.email"
                label="Your email"
                :rules="emailRules"
                required
                color="#0999ad"
                dense
              />
            </v-col>
            <div class="d-flex justify-end" style="width: 100%">
              <v-btn
                color="#0999ab"
                dark
                style="width: 40%; color: white"
                @click="connect()"
                :loading="loading"
                :disabled="loading"
                >Confirm</v-btn
              >
            </div>
          </div>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      nameRules: [(v) => !!v || "Field is required"],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      //data
      user: {
        name: "",
        email: "",
        room_id: this.$route.params.id,
      },

      //status
    };
  },

  created() {
    this.dialog = true;

    this.socket = io(this.$url, { transports: ["websocket"] });
    this.socket.on("in_room", (msg) => {
      console.log(msg, "msg Parent");
      if (msg.token) {
        console.log(msg.token);
        localStorage.setItem("token" + this.$route.params.id, msg.token);
      }
    });
  },

  methods: {
    connect() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.socket.emit("in_room", this.user);
        this.$emit("refreshData", "");
        this.socket.emit("global_user", "");
        this.dialog = false;
      }
    },
  },
};
</script>

<style scoped></style>
