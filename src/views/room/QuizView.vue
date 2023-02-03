<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Room</h1>
      <add-room
        :roomTypes="roomTypes"
        :userId="this.decoder.data.user.id"
        @refreshData="getAllRoom()"
      ></add-room>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/ Room Quiz</h4>
    </div>

    <v-list expand width="200px" color="white" style="color: black">
      <v-list-group
        color="black"
        @click="current = !current"
        prepend-icon="fa-sharp fa-solid fa-caret-down"
        no-action
        :value="true"
        sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Your rooms</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-group>
    </v-list>
    <v-container style="border: 2px solid #fafafa" v-show="current" fluid>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          md="3"
          sm="2"
          v-for="(room, i) in rooms"
          :key="i"
          outline
        >
          <v-card max-width="800">
            <v-card-text>
              <div class="d-flex justify-space-between">
                <p class="text-h4 text--primary">{{ room.name }}</p>
                <v-spacer></v-spacer>
                <v-menu top right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#0999ad" icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item link>
                      <v-list-item-title @click="hideRoom(room._id)"
                        >Hide room</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>

              <div class="text--primary d-flex justify-space-between">
                {{ room?.room_type_id?.name || "N/A" }}
                <div>
                  <router-link
                    :to="`/room/in/${room._id}`"
                    style="text-decoration: none"
                  >
                    <v-btn icon>
                      <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                  </router-link>

                  <v-btn icon>
                    <delete-room :id="room._id"></delete-room>
                  </v-btn>
                  <copy-to-clipboard
                    :text="
                      'http://localhost:8080/#/room/enter?pin=' +
                      String(room.pin)
                    "
                    @copy="handleCopy"
                  >
                    <v-btn icon>
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </copy-to-clipboard>
                  <!-- <router-link
                    :to="`/room/playquiz/${room._id}`"
                    style="text-decoration: none"
                  >
                    <v-btn color="success" dark> Play </v-btn>
                  </router-link> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <div
          v-if="rooms == ''"
          style="width: 100%"
          class="my-4 d-flex justify-center orange--text"
        >
          No data
        </div>
      </v-row>
    </v-container>

    <v-list expand width="200px" color="white" style="color: black">
      <v-list-group
        color="black"
        @click="hidden = !hidden"
        prepend-icon="fa-sharp fa-solid fa-caret-down"
        no-action
        :value="true"
        sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Hidden Rooms</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-group>
    </v-list>
    <v-container style="border: 2px solid #fafafa" v-show="hidden" fluid>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          md="3"
          sm="2"
          v-for="(room, i) in hiddens"
          :key="i"
          outline
        >
          <v-card max-width="800">
            <v-card-text>
              <div class="d-flex justify-space-between">
                <p class="text-h4 text--primary">{{ room.name }}</p>
                <v-spacer></v-spacer>
                <v-menu top right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#0999ad" icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item link>
                      <v-list-item-title @click="hideRoom(room._id)"
                        >Show room</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div class="text--primary d-flex justify-space-between">
                {{ room?.room_type_id?.name || "N/A" }}
                <div>
                  <router-link
                    :to="`/room/in/${room._id}`"
                    style="text-decoration: none"
                  >
                    <v-btn icon>
                      <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                  </router-link>

                  <v-btn icon>
                    <delete-room :id="room._id"></delete-room>
                  </v-btn>
                  <copy-to-clipboard
                    :text="$url + '/#/room/enter/' + String(room.pin)"
                    @copy="handleCopy"
                  >
                    <v-btn icon>
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </copy-to-clipboard>
                  <!-- <router-link
                    :to="`/room/playquiz/${room._id}`"
                    style="text-decoration: none"
                  >
                    <v-btn color="success" dark> Play </v-btn>
                  </router-link> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <div
          v-if="hiddens == ''"
          style="width: 100%"
          class="my-4 d-flex justify-center orange--text"
        >
          No data
        </div>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AddRoom from "../../components/room/AddRoom.vue";
import DeleteRoom from "../../components/room/DeleteRoom.vue";

import decode from "vue-jwt-decode";
import { mapActions } from "vuex";
import CopyToClipboard from "vue-copy-to-clipboard";

export default {
  components: { AddRoom, DeleteRoom, CopyToClipboard },
  data() {
    return {
      current: true,
      hidden: false,
      rooms: [],
      hiddens: [],

      roomTypes: [],
      decoder: "",
    };
  },

  created() {
    this.getAllRoomType();
    this.getAllRoom();
    this.getHidden();
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

    hideRoom(id) {
      this.axios
        .put(this.$url + "/room/update/" + id, { hidden: true })
        .then((res) => {
          if (res.data.success) {
            //call snackbar success
            this.saveDetails("Updated Successfully", "primary", "#90CAF9");
            this.getAllRoom();
            this.getHidden();
          }
        })
        .catch((error) => {
          this.saveDetails(error.message, "error", "#EF9A9A");
        });
    },

    handleCopy() {
      alert("Pin compied");
    },

    getAllRoomType() {
      this.axios
        .get(this.$url + "/room/type/get-all")
        .then((res) => {
          if (res.data.success) {
            this.roomTypes = res.data.data;
          }
        })
        .catch((error) => {
          //snackbar error
          this.loading = false;
          this.saveDetails(error.message, "error", "#EF9A9A");
        });
    },
    getAllRoom() {
      this.decoder = decode.decode(sessionStorage.getItem("token"));
      this.axios
        .get(this.$url + "/room/get/by/" + this.decoder.data.user.id)
        .then((res) => {
          if (res.data.success) {
            this.rooms = res.data.data;
          }
        })
        .catch((error) => {
          //snackbar error
          this.loading = false;
          this.saveDetails(error.message, "error", "#EF9A9A");
        });
    },
    getHidden() {
      this.decoder = decode.decode(sessionStorage.getItem("token"));
      this.axios
        .get(this.$url + "/room/get/hidden/" + this.decoder.data.user.id)
        .then((res) => {
          if (res.data.success) {
            this.hiddens = res.data.data;
          }
        })
        .catch((error) => {
          //snackbar error
          this.loading = false;
          this.saveDetails(error.message, "error", "#EF9A9A");
        });
    },
  },
};
</script>

<style scoped></style>
