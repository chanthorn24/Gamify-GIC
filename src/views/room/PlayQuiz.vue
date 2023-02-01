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
      <router-link to="/quiz" style="color: grey">/ Room&nbsp;</router-link>
      <h4 style="margin-left: 3px">/ Play 723310</h4>
    </div>
    <v-row>
      <v-col cols="12" lg="6" md="12" sm="12">
        <v-card outlined elevation="2">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Q: {{ question.name }}
              </v-list-item-title>
              <div v-if="question.chosen_answer">
                <v-list-item-subtitle
                  v-if="
                    question.question_type_id._id == '63aab18d9623da7bb82bf0a4'
                  "
                  >Ans: 1. {{ question.chosen_answer[0] }} 2.
                  {{ question.chosen_answer[1] }} 3.
                  {{ question.chosen_answer[2] }} 4.
                  {{ question.chosen_answer[3] }}</v-list-item-subtitle
                >
                <v-list-item-subtitle v-else
                  >Ans: 1. True 2. False
                </v-list-item-subtitle>
              </div>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            User answer(s):
            <h2 style="color: orange" class="ml-2">
              100 / {{ userInRooms.length }}
            </h2>
          </v-list-item>
        </v-card>
        <br />
        <v-card width="400px" color="#0999AD" class="py-1">
          <v-list-item class="d-flex justify-space-between white--text">
            <v-list-item-title class="text-h5"> Total </v-list-item-title>
            <v-list-item-subtitle class="text-h6 white--text"
              >{{ userInRooms.length }} People(s)</v-list-item-subtitle
            >
          </v-list-item>
        </v-card>
        <br />
        <v-card width="400px" class="py-3">
          <v-list-item class="d-flex justify-space-between">
            <v-list-item-title class="text-h5">
              <h4>Time: {{ countDown }}s</h4>
            </v-list-item-title>
            <v-list-item-subtitle class="text-h6"
              >Question {{ start }}</v-list-item-subtitle
            >
          </v-list-item>
        </v-card>
        <v-btn
          :disabled="cooldown"
          class="mt-4"
          color="primary"
          @click="playGame()"
        >
          Next Question
        </v-btn>

        <hr class="mt-7" />
        <!-- v-if="countDown == 0" -->
        <div
          v-if="countDown == 0"
          class="mt-7 mb-4 d-flex align-center"
          style="color: #0999ad"
        >
          <i class="fa-solid fa-clipboard-list-check"></i>
          <h2 v-if="start < numOfQuestion" class="ml-2">Scoreboard</h2>
          <h2 v-else class="ml-2">Final Scoreboard</h2>
        </div>
        <v-card v-if="countDown == 0" color="#0999AD">
          <v-list-item class="d-flex justify-space-between white--text">
            <div>
              <v-list-item-title class="text-h6" style="width: 10vw">
                Name
              </v-list-item-title>
            </div>
            <div>
              <v-list-item-subtitle class="text-h6 white--text"
                >Score</v-list-item-subtitle
              >
            </div>
          </v-list-item>
          <v-list-item
            class="d-flex justify-space-between"
            v-for="(user, i) in userInRooms"
            :key="i"
            outline
            style="background-color: white"
          >
            <div>
              <v-list-item-title
                style="width: 10vw"
                v-text="user.name"
              ></v-list-item-title>
            </div>
            <div>
              <v-list-item-title v-text="user.score"></v-list-item-title>
            </div>
          </v-list-item>
        </v-card>
        <br />
      </v-col>
      <v-col cols="12" lg="1" class="d-none d-lg-flex justify-center">
        <v-divider vertical></v-divider>
      </v-col>
      <v-col cols="12" lg="5">
        <div
          style="
            box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px inset !important;
            border-radius: 6px !important;
            max-height: 95vh;
            overflow-y: auto;
            overflow-x: hidden;
          "
        >
          <div class="d-flex justify-space-between align-center pa-5 pb-0">
            <h3>Questions ({{ questions.length }})</h3>
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
                <!-- <div class="d-flex mt-3">
                  <edit-question
                    @refreshData="getRoomById()"
                    :question_types="question_types"
                    :questionOne="question"
                  ></edit-question>
                  <delete-question
                    @refreshData="getRoomById()"
                    :id="question._id"
                  ></delete-question>
                </div> -->
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
// import TimeCounter from '../../components/TimeCounter.vue'

import io from "socket.io-client";
export default {
  components: {
    EditQuestion,
    DeleteQuestion,
    AddQuestion,
    EditRoom,
  },
  data() {
    return {
      countDown: 0,
      cooldown: false,
      start: 0,

      answers: [],
      question_types: [],
      room_types: [],
      question: [],
      id: this.$route.params.id,
      room: [],
      mark_answer: [],

      userInRooms: [],
      questions: [],
      numOfQuestion: "",

      user: {
        name: "",
        email: "",
        room_id: this.$route.params.id,
      },
    };
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
      if (this.countDown == 0 && this.start < this.numOfQuestion) {
        this.cooldown = false;
      }
    },

    // getQuestionType() {
    //   try {
    //     this.axios.get(this.$url + "/question/type/get-all").then((res) => {
    //       if (res.data.success) {
    //         this.question_types = res.data.data;
    //       }
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // getRoomType() {
    //   try {
    //     this.axios.get(this.$url + "/room/type/get-all").then((res) => {
    //       if (res.data.success) {
    //         this.room_types = res.data.data;
    //       }
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    getRoomById() {
      this.questions = [];
      this.answers = [];
      this.mark_answer = [];
      this.axios.get(this.$url + "/room/get/" + this.id).then((res) => {
        if (res.data.success) {
          this.room = res.data.data;
          this.questions = res.data.data.question_id;

          //push question to user
          this.playGame();
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
          this.numOfQuestion = this.questions.length;
          this.questions.forEach((question) => {
            this.mark_answer.push(question.correct_answer);
            question.chosen_answer.forEach((ans) => {
              tmp_arr.push(ans);
            });
            this.answers.push(tmp_arr);
            tmp_arr = [];
          });
        }
      });
    },

    initial() {
      this.cooldown = true;
      this.socket.emit("in_room", this.user);
    },
    playGame() {
      this.cooldown = true;
      let data = {
        data: this.questions[this.start],
        room_id: this.$route.params.id,
      };
      this.socket.emit("play", data);
      this.start++;
    },
  },
  created() {
    // this.getQuestionType();
    // this.getRoomType();
    this.getRoomById();

    this.socket = io("http://localhost:3001/", { transports: ["websocket"] });
    this.socket.on("in_room", (msg) => {
      if (this.id == msg.room) {
        this.userInRooms = msg.data;

        console.log(msg);
      }
    });

    this.socket.on("play", (msg) => {
      if (this.user.room_id == msg.room) {
        this.question = msg.data;

        this.countDown = this.question.time;
        this.countDownTimer();
        console.log(msg.data, "Question");
      }
    });
    this.initial();
  },
};
</script>

<style scoped>
.question {
  margin-left: 10px;
  width: 500px;
}
.number {
  margin-top: 13px;
  width: 20px;
  height: 55px;
}
#question {
  width: 500px;
}

.question {
  display: flex;
  align-items: center;
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
