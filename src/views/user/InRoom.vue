<script>
import io from "socket.io-client";
import decode from "vue-jwt-decode";
import router from "@/router";
import UserRoom from "../../components/room/UserRoom.vue";
export default {
  components: { UserRoom },
  data() {
    return {
      user: {
        name: "",
        email: "",
        room_id: this.$route.params.id,
      },

      userInRooms: [],
      name: "",
      decoder: [],
      loading: false,

      //rule
      nameRules: [(v) => !!v || "Username is required"],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  created() {
    this.socket = io("http://localhost:3001/", { transports: ["websocket"] });
    this.socket.on("in_room", (msg) => {
      console.log(msg, "msg Parent");
      if (msg.token) {
        console.log(msg.token);
        localStorage.setItem("token" + this.$route.params.id, msg.token);
      } else if (msg.room == this.$route.params.id) {
        this.userInRooms = msg.data;
        if (localStorage.getItem("token" + this.$route.params.id)) {
          this.decoder = decode.decode(
            localStorage.getItem("token" + this.$route.params.id)
          );
          this.userInRooms.forEach((user) => {
            if (user._id == this.decoder.data.user.id) {
              this.name = user.name;
              user.name = "YOU";
            }
          });
        }
        console.log(this.userInRooms);
      }
    });
    this.initial();
  },

  methods: {
    disconnect() {
      localStorage.removeItem("token");
      this.socket.disconnect();
      router.push({ path: "/room/enter" });
    },

    initial() {
      if (localStorage.getItem("token" + this.$route.params.id)) {
        this.decoder = decode.decode(
          localStorage.getItem("token" + this.$route.params.id)
        );
        // console.log(decoder.exp);
        if (this.decoder.exp < (new Date().getTime() + 1) / 1000) {
          localStorage.removeItem("token" + this.$route.params.id);
          this.socket.emit("in_room", this.user);
        } else {
          console.log(this.decoder);
          this.socket.emit("in_room", {
            token: localStorage.getItem("token" + this.$route.params.id),
          });
        }
      }
    },
  },
};
</script>
<template>
  <div style="background-color: #0999ab; height: 125vh">
    <v-icon class="circle d-none d-lg-flex" style="font-size: 122px"
      >fa-solid fa-circle</v-icon
    >
    <v-icon class="star d-none d-lg-flex" style="font-size: 122px"
      >fa-solid fa-star</v-icon
    >
    <v-icon class="play d-none d-lg-flex" style="font-size: 122px"
      >fa-solid fa-play</v-icon
    >
    <v-card
      class="member d-flex justify-center align-center flex-row pa-8"
      style="width: 100px"
    >
      <h1>{{ userInRooms.length }}</h1>
      <v-icon style="font-size: 18px; margin-left: 6px; color: white">
        fa-solid fa-user-tie
      </v-icon>
    </v-card>
    <div
      style="height: 100%"
      class="d-flex flex-column align-center justify-center"
    >
      <div
        style="
          font-style: italic;
          color: white;
          font-size: 40px;
          font-weight: 500;
        "
        class="mb-5"
      >
        GIC FunQuiz &nbsp;
      </div>

      <div
        class="user_name mt-6 pa-4 d-flex justify-center flex-wrap"
        style="overflow: auto; width: 55%; height: 300px"
      >
        <v-btn
          v-for="user in userInRooms"
          :key="user._id"
          class="ma-1"
          color="orange"
          rounded
          dark
          >{{ user.name }}</v-btn
        >
      </div>
      <v-card v-if="name" class="mt-16" width="490" style="border-radius: 10px">
        <div class="container px-7 py-8">
          <v-col class="d-flex justify-center align-center" cols="12">
            <h2 style="color: #0999ab" class="mb-4">Join the game</h2>
          </v-col>
          <div
            style="width: 100%"
            class="d-flex flex-column justify-center align-center"
          >
            <h4 style="color: grey">
              {{ "Hi, " + name + ". You're in!" }}
            </h4>
            <h4 style="color: grey">Waiting quiz start...</h4>

            <v-btn
              color="#EF5350"
              style="width: 40%; color: white"
              class="mt-3"
              @click="disconnect()"
            >
              Exit
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>
    <user-room v-if="!name"></user-room>
  </div>
</template>
<style scoped>
.member {
  position: absolute;
  left: 10px;
  top: 40%;
  width: 35px;
  height: 35px;
  background-color: #067787;
  font-size: 0.75rem;
  color: #ffffff;
}
.circle {
  position: absolute;
  left: 50px;
  top: 10%;
  color: #0d92a5;
}
.star {
  position: absolute;
  right: 120px;
  top: 10%;
  color: #0d92a5;
}
.play {
  position: absolute;
  left: 200px;
  top: 65%;
  color: #0d92a5;
}
.user_number {
  width: 55%;
  height: 220px;
  background-color: #0999ad;
  border: 1px solid #ffffff;
  /* display: flex; */
  /* flex-direction: row; */
}
.user_name {
  background-color: #0999ad;
  color: #ffffff;

  border: 1px solid #ffffff;
}

/*
.centered-input >>> input {
  text-align: center;
}
*/
</style>
