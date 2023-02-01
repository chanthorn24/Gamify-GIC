<template>
  <div>
    <in-room v-if="component == 1" :user="user"></in-room>
    <quiz-true-false
      v-if="
        component == 2 &&
        question.question_type_id._id == '63aab18d9623da7bb82bf0a4'
      "
      :question="question"
      :user="user"
      @update="component = 3"
    ></quiz-true-false>
    <quiz-question
      v-if="
        component == 2 &&
        question.question_type_id._id == '63aab1939623da7bb82bf0a8'
      "
      :question="question"
      :user="user"
      @update="component = 3"
    ></quiz-question>
    <user-score-board v-if="component == 3"></user-score-board>
  </div>
</template>

<script>
import InRoom from "./InRoom.vue";
import QuizTrueFalse from "./QuizTrueFalse.vue";
import QuizQuestion from "./QuizQuestion.vue";
import UserScoreBoard from "./UserScoreBoard.vue";

import io from "socket.io-client";
import decode from "vue-jwt-decode";
export default {
  components: { InRoom, QuizTrueFalse, UserScoreBoard, QuizQuestion },
  data() {
    return {
      component: 1,
      question: [],

      user: {
        name: "",
        email: "",
        room_id: this.$route.params.id,
        user_id: "",
      },
    };
  },

  created() {
    this.socket = io(this.$url, { transports: ["websocket"] });
    this.socket.on("play", (msg) => {
      if (this.user.room_id == msg.room) {
        this.question = msg.data;
        this.component = 2;
        console.log(msg, "Question");
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
        console.log(this.decoder);
        this.user.user_id = this.decoder.data.user.id;
        console.log(this.user, "User");
      }
    },
  },
};
</script>

<style scoped></style>
