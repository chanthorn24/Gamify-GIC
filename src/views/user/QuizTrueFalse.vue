<template>
  <main>
    <nav
      class="nav d-flex align-center justify-center pa-3"
      style="font-size: x-large; font-weight: 500"
    >
      {{ question.name }}
    </nav>
    <div class="img d-flex justify-center align-center">
      <v-avatar
        tile
        style="height: 400px; width: 820px; background-color: #fafafa"
      >
        <v-img
          gradient="to top right, #BDBDBD, #BDBDBD"
          src="https://res.cloudinary.com/image-cloudinary-itc/image/upload/v1673793525/wblfuwwebmhcdowdndvl.jpg"
        />
      </v-avatar>
    </div>

    <v-card
      class="member d-flex justify-center align-center flex-row pa-8 rounded-circle flex-column"
      style="width: 110px; height: 110px"
    >
      <div style="font-size: 40px; font-weight: 500">{{ countDown }}</div>
    </v-card>
    <v-card
      elevation="0"
      class="answer d-flex justify-center align-center flex-column flex-row pa-8 rounded-circle"
      style="width: 110px; height: 110px"
    >
      <div style="font-size: 60px; color: #228895; font-weight: 500">0</div>
      <div style="font-size: 20px; font-style: oblique; color: #228895">
        Answer(s)
      </div>
    </v-card>

    <div>
      <v-row no-gutters>
        <v-col class="ma-1 ms-1" lg="5.9">
          <v-btn
            @click="answer(1, $event)"
            width="100%"
            :disabled="loading"
            class="pa-2 m-3 d-flex justify-center align-center"
            style="
              background-color: red;
              color: white;
              font-size: x-large;
              font-weight: 500;
            "
            height="95"
            outlined
          >
            {{ question.chosen_answer[0] }}
            <i v-if="user.answer == 1" class="fa-solid fa-check ml-2"></i>
          </v-btn>
        </v-col>
        <v-col class="ma-1 me-1" lg="5.9">
          <v-btn
            :disabled="loading"
            @click="answer(2, $event)"
            width="100%"
            class="pa-2 d-flex justify-center align-center"
            style="
              background-color: #2e71c2;
              color: white;
              font-size: x-large;
              font-weight: 500;
            "
            height="95"
            outlined
          >
            {{ question.chosen_answer[1] }}
            <i v-if="user.answer == 2" class="fa-solid fa-check ml-2"></i>
          </v-btn>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col class="ma-1 ms-1" lg="5.9">
          <v-btn
            :disabled="loading"
            @click="answer(3, $event)"
            width="100%"
            class="pa-2 d-flex justify-center align-center"
            style="
              background-color: #ffbb00;
              color: white;
              font-size: x-large;
              font-weight: 500;
            "
            height="95"
            outlined
          >
            {{ question.chosen_answer[2] }}
            <i v-if="user.answer == 3" class="fa-solid fa-check ml-2"></i>
            <i class="fa-solid fa-xmark"></i>
          </v-btn>
        </v-col>
        <v-col class="ma-1 me-1" lg="5.9">
          <v-btn
            :disabled="loading"
            @click="answer(4, $event)"
            width="100%"
            class="pa-2 d-flex justify-center align-center"
            style="
              background-color: #eb6440;
              color: white;
              font-size: x-large;
              font-weight: 500;
            "
            height="95"
            outlined
          >
            {{ question.chosen_answer[3] }}
            <i v-if="user.answer == 4" class="fa-solid fa-check ml-2"></i>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </main>
</template>

<script>
export default {
  props: ["question", "user"],
  data() {
    return {
      loading: false,
      countDown: this.question.time,
    };
  },

  created() {
    this.countDownTimer();
    console.log(this.user);
  },

  methods: {
    answer(number, event) {
      try {
        this.loading = true;
        this.user.name = number;
        this.user.question_id = this.question._id;
        this.user.score = this.question.score;
        event.currentTarget.id = "selected";
        this.axios.post(this.$url + "/answer/create", this.user).then((res) => {
          console.log(res);
        });
        // event.target.classList.toggle("selected");
        console.log(event.currentTarget.id);
        // document.getElementById(event.currentTarget.id).removeAttribute(style);
      } catch (error) {
        console.log(error);
      }
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
      if (this.countDown == 0) {
        setInterval(() => {
          this.$emit("update", "");
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.nav {
  background-color: #ffffff;
  width: 100%;
  height: 90px;
  color: #424242;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.img {
  width: 100%;
  height: 610px;
}
img {
  width: 100%;
  height: 100%;
}
#selected {
  color: white !important;
}

.member {
  position: absolute;
  left: 10px;
  top: 30%;
  width: 35px;
  height: 35px;
  background-color: #228895;
  font-size: 0.75rem;
  color: #ffffff;
}
.answer {
  position: absolute;
  right: 10px;
  top: 30%;
  width: 35px;
  height: 35px;
  background-color: white;
  font-size: 0.75rem;
  color: black;
}
</style>
