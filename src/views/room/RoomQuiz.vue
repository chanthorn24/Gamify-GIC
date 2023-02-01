<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Room</h1>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <router-link to="/" style="color: grey">Dashboard&nbsp;</router-link>
      <router-link to="/quiz" style="color: grey"
        >/ Room Quiz&nbsp;</router-link
      >
      <h4 style="margin-left: 3px">/ Room</h4>
    </div>

    <v-row>
      <v-col cols="12" lg="5">
        <v-card outlined elevation="1">
          <v-progress-linear
            v-show="show"
            color="#64B5F6"
            indeterminate
            reverse
          ></v-progress-linear>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ room.name }}
                <edit-room
                  v-if="room != ''"
                  :roomById="room"
                  :room-types="room_types"
                  @refreshData="getRoomById()"
                ></edit-room>
              </v-list-item-title>
              <v-list-item-subtitle>
                Type: {{ room?.room_type_id?.name || "N/A" }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Status:
                <span v-if="room.status" style="color: #0999ab">Online</span>
                <span v-else>Offline</span>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile width="120" size="80" color="grey">
              <v-img :src="room.image" style="border: 2px solid #0999ad">
                <v-file-input
                  class="d-flex justify-center align-center"
                  style="
                    margin-top: -15px;
                    padding: 40px 60px;
                    padding-left: 65px;
                    background-color: rgba(0, 0, 0, 0.1);
                  "
                  v-model="files"
                  @change="uploadImage()"
                  color="white"
                  prepend-icon="mdi-camera"
                  :loading="loading"
                  :disabled="disabled"
                  hide-input
                  outlined
                  hide-details
                  height="110"
                  accept="image/*"
                  :clearable="false"
                ></v-file-input>
              </v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions class="d-flex justify-space-between pr-4">
            <v-card-actions>
              <v-btn
                v-if="!room.status"
                @click="openServer()"
                outlined
                rounded
                text
                style="background-color: #fb8c00; color: white"
              >
                Open Server
              </v-btn>
              <v-btn
                outlined
                v-else
                @click="openServer()"
                rounded
                text
                style="background-color: red; color: white"
              >
                Close Server
              </v-btn>
              <copy-to-clipboard :text="String(room.pin)" @copy="handleCopy">
                <v-btn
                  outlined
                  rounded
                  text
                  color="#0999ad"
                  class="ml-2"
                  style="border: 1px solid #0999ad"
                >
                  Copy Pin
                </v-btn>
              </copy-to-clipboard>
            </v-card-actions>
            <router-link
              :to="`/room/playquiz/${room._id}`"
              style="text-decoration: none"
            >
              <v-btn
                v-if="room.status"
                color="success"
                dark
                height="40"
                class="px-3"
              >
                <i class="fa-duotone fa-play mr-2"></i> Play
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
        <h3 class="mt-6 mb-2">User ({{ userInRooms.length }})</h3>
        <div
          class="pa-4 d-flex justify-center flex-wrap"
          style="
            box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px inset !important;
            border-radius: 6px !important;
          "
        >
          <v-btn
            elevation="0"
            v-for="player in userInRooms"
            :key="player.id"
            class="ma-1"
            style="
              border: 1px solid #fb8c00;
              color: orange;
              background-color: white;
            "
            rounded
            >{{ player.name }}</v-btn
          >
          <div v-show="userInRooms == ''" style="color: orange">No User</div>
        </div>
      </v-col>
      <v-col cols="12" lg="7">
        <div
          style="
            box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px inset !important;
            border-radius: 6px !important;
            max-height: 95vh;
            overflow-y: auto;
          "
        >
          <div class="d-flex justify-space-between align-center pa-5 pb-0">
            <h3>Questions ({{ questions.length }})</h3>
            <add-question
              @refreshData="getRoomById()"
              :id="id"
              :question_types="question_types"
            ></add-question>
          </div>
          <div
            v-if="!questions[0]"
            class="d-flex pa-5 justify-center align-center"
            style="width: 100%; color: orange"
          >
            No data
          </div>
          <div v-for="(question, i) in questions" :key="i" outline>
            <div class="question pa-5" style="width: 100%">
              <div
                style="width: 100%"
                class="text--primary d-flex justify-space-between"
              >
                <v-list-group style="width: 93%" append-icon="">
                  <template v-slot:activator>
                    <div class="mr-2">
                      <h1 class="number">{{ i + 1 }}</h1>
                    </div>
                    <v-list-item-title>{{ question.name }}</v-list-item-title>
                  </template>
                  <v-list-item
                    v-show="
                      question.question_type_id._id ==
                      '63aab18d9623da7bb82bf0a4'
                    "
                    v-for="(title, j) in answers[i]"
                    :key="j"
                    link
                    :class="j % 2 == 0 ? ' grey lighten-5' : ''"
                  >
                    <v-list-item-title
                      class="pl-15"
                      v-text="title"
                    ></v-list-item-title>

                    <v-list-item-icon v-if="j == mark_answer[i] - 1">
                      <v-icon style="color: #0999ad">mdi-check</v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item
                    v-show="
                      question.question_type_id._id ==
                      '63aab1939623da7bb82bf0a8'
                    "
                    link
                    class="grey lighten-5"
                  >
                    <v-list-item-title
                      class="pl-15"
                      v-text="mark_answer[i]"
                    ></v-list-item-title>

                    <v-list-item-icon>
                      <v-icon style="color: #0999ad">mdi-check</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>
                <div class="d-flex mt-3">
                  <edit-question
                    @refreshData="getRoomById()"
                    :question_types="question_types"
                    :questionOne="question"
                  ></edit-question>
                  <delete-question
                    @refreshData="getRoomById()"
                    :id="question._id"
                  ></delete-question>
                </div>
              </div>
            </div>
            <div class="px-5">
              <hr style="border: 1px solid #eeeeee" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import EditQuestion from "../../components/room/EditQuestion.vue";
import DeleteQuestion from "../../components/room/DeleteQuestion.vue";
import AddQuestion from "../../components/room/AddQuestion.vue";
import EditRoom from "../../components/room/EditRoom.vue";

import io from "socket.io-client";
import CopyToClipboard from "vue-copy-to-clipboard";
import { mapActions } from "vuex";
export default {
  components: {
    AddQuestion,
    EditQuestion,
    DeleteQuestion,
    EditRoom,
    CopyToClipboard,
  },
  data() {
    return {
      answers: [],
      question_types: [],
      room_types: [],
      questions: [],
      id: this.$route.params.id,
      room: [],
      mark_answer: [],

      //image room
      files: [],
      loading: false,
      disabled: false,
      show: false,

      //websocket
      userInRooms: [],

      user: {
        name: "",
        email: "",
        room_id: this.$route.params.id,
      },
    };
  },

  created() {
    this.getQuestionType();
    this.getRoomType();
    this.getRoomById();

    this.socket = io(this.$url, { transports: ["websocket"] });
    this.socket.on("in_room", (msg) => {
      if (this.id == msg.room) {
        this.userInRooms = msg.data;
      }
    });
    this.initial();
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

    openServer() {
      try {
        this.loading = true;
        let data = {
          status: 1,
        };
        this.axios
          .put(this.$url + "/room/update/" + this.room._id, data)
          .then((res) => {
            if (res.data.success) {
              this.loading = false;
              this.getRoomById();
            }
          })
          .catch((error) => {
            //snackbar error
            this.loading = false;
            this.saveDetails(error.message, "error", "#EF9A9A");
          });
      } catch (error) {
        //snackbar error
        this.loading = false;
        this.saveDetails("Oopa, something went wrong", "error", "#EF9A9A");
      }
    },
    uploadImage() {
      try {
        if (this.files) {
          this.show = true;
          this.loading = true;
          this.disabled = true;
          let form = new FormData();
          form.append("image_file", this.files);

          this.axios
            .post(this.$url + "/image/upload", form)
            .then((res) => {
              if (res.data.success) {
                let data = {
                  image: res.data.data,
                };
                this.axios
                  .put(this.$url + "/room/update/" + this.room._id, data)
                  .then((res) => {
                    if (res.data.success) {
                      this.loading = false;
                      this.disabled = false;
                      this.show = false;

                      //call snackbar success
                      this.saveDetails("Image updated", "primary", "#90CAF9");
                      this.getRoomById();
                    }
                  });
              }
            })
            .catch((error) => {
              //snackbar error
              this.loading = false;
              this.show = false;
              this.saveDetails(error.message, "error", "#EF9A9A");
            });
        }
      } catch (error) {
        //snackbar error
        this.loading = false;
        this.show = false;
        this.saveDetails("Oops, something went wrong", "error", "#EF9A9A");
      }
    },

    getQuestionType() {
      try {
        this.axios
          .get(this.$url + "/question/type/get-all")
          .then((res) => {
            if (res.data.success) {
              this.question_types = res.data.data;
            }
          })
          .catch((error) => {
            //snackbar error
            this.loading = false;
            this.saveDetails(error.message, "error", "#EF9A9A");
          });
      } catch (error) {
        //snackbar error
        this.loading = false;
        this.saveDetails(error.message, "error", "#EF9A9A");
      }
    },
    getRoomType() {
      try {
        this.axios
          .get(this.$url + "/room/type/get-all")
          .then((res) => {
            if (res.data.success) {
              this.room_types = res.data.data;
            }
          })
          .catch((error) => {
            //snackbar error
            this.loading = false;
            this.saveDetails(error.message, "error", "#EF9A9A");
          });
      } catch (error) {
        //snackbar error
        this.loading = false;
        this.saveDetails("Oops, something went wrong", "error", "#EF9A9A");
      }
    },
    getRoomById() {
      this.show = true;
      this.questions = [];
      this.answers = [];
      this.mark_answer = [];
      this.axios
        .get(this.$url + "/room/get/" + this.id)
        .then(async (res) => {
          if (res.data.success) {
            this.room = await res.data.data;
            this.show = false;
            if (this.room.image) {
              this.room.image =
                this.room.image.slice(0, 60) +
                "/w_200/q_auto:best/" +
                this.room.image.slice(61, 200);
            } else {
              this.room.image =
                "https://res.cloudinary.com/image-cloudinary-itc/image/upload/w_200/q_auto:best/v1672905417/yojjiryfu4m6lyonzmhu.jpg";
            }
            let tmp_arr = [];
            this.questions = this.room.question_id;
            this.questions.forEach((question) => {
              this.mark_answer.push(question.correct_answer);
              question.chosen_answer.forEach((ans) => {
                tmp_arr.push(ans);
              });
              this.answers.push(tmp_arr);
              tmp_arr = [];
            });
          }
        })
        .catch((error) => {
          //snackbar error
          this.loading = false;
          this.show = false;
          this.saveDetails(error.message, "error", "#EF9A9A");
        });
    },

    handleCopy() {
      alert("Copy PIN");
    },

    initial() {
      this.socket.emit("in_room", this.user);
    },
  },
};
</script>

<style scoped>
.question {
  display: flex;
  height: auto;
}
.number {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0999ad;
  height: 60px;
  width: 50px;
  color: white;
}
a {
  text-decoration: none;
}
</style>
