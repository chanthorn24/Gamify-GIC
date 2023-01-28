<template>
  <div>
    <v-btn color="success" @click="connect">connect</v-btn>
    <v-row>
      <v-col cols="12" lg="3" md="6" sm="1">
        <v-card>Hello</v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6" sm="1">
        <v-card>Hello</v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6" sm="1">
        <v-card>Hello</v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6" sm="1">
        <v-card>Hello</v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: null,
    };
  },
  created() {
    this.socket = io("http://localhost:3001/", { transports: ["websocket"] });
    this.socket.on("chat message", (msg) => {
      console.log(msg);
    });
  },

  methods: {
    connect() {
      this.socket.emit("chat message", "test");
    },
  },
};
</script>
