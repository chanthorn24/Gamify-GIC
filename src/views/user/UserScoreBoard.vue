<template>
  <main>
    <nav
      class="nav d-flex justify-center align-center"
      style="font-size: xx-large; font-weight: 600"
    >
      SCOREBOARD
    </nav>
    <div class="rank_point">
      <v-simple-table
        class="table"
        height="73vh"
        width="75%"
        style="overflow: auto; background-color: #0999ad"
      >
        <template v-slot:default>
          <tbody>
            <tr
              style="
                background-color: #0d6874;
                position: sticky;
                top: 0;
                z-index: 999;
              "
            >
              <th><h1 style="color: white">Student Name</h1></th>
              <th><h1 style="color: white">Score</h1></th>
            </tr>
            <tr v-for="(item, index) in userInRooms" :key="item.id">
              <td
                style="font-size: x-large; font-weight: 500; color: white"
                :style="
                  index == 0
                    ? ' color: #DCE775'
                    : '' || index == 1
                    ? ' color: #69F0AE'
                    : '' || index == 2
                    ? ' color: #81D4FA'
                    : ''
                "
              >
                {{ index + 1 }} .{{ item.name }}
              </td>
              <td
                style="font-size: x-large; font-weight: 500; color: white"
                :style="
                  index == 0
                    ? ' color: #DCE775'
                    : '' || index == 1
                    ? ' color: #69F0AE'
                    : '' || index == 2
                    ? ' color: #81D4FA'
                    : ''
                "
              >
                {{ item.score }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </main>
</template>
<script>
import io from "socket.io-client";
import decode from "vue-jwt-decode";
export default {
  data() {
    return {
      desserts: [
        {
          id: 1,
          name: "Frozen Yogurt",
          score: 159,
        },
      ],

      userInRooms: [],
    };
  },

  created() {
    this.socket = io(this.$url, { transports: ["websocket"] });
    this.socket.on("in_room", (msg) => {
      if (msg.room == this.$route.params.id) {
        this.userInRooms = msg.data;
      }
    });
    this.initial();
  },

  methods: {
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
      } else {
        this.socket.emit("in_room", this.user);
      }
    },
  },
};
</script>

<style scoped>
main {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #0999ad;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  color: #ffffff;
}
.nav {
  background-color: #0999ad;
  width: 100%;
  height: 75px;
  color: white;
}
.rank_point {
  width: 100%;
  height: 100%;
  background-color: #12abc0;
}
.table {
  width: 60%;
  margin: 8% auto;
  border-radius: 10px;
}
tr {
  background-color: #0999ad;
  border-radius: 40px;
  height: 60px;
}
tr:hover {
  background-color: #12abc0 !important;
}
</style>
