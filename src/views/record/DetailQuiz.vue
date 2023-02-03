<template>
  <v-dialog v-model="dialog" max-width="50vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ml-2"
        small
        color="success"
        v-bind="attrs"
        v-on="on"
        @click="disableButton($event)"
      >
        view Details
      </v-btn>
    </template>
    <v-card style="overflow: hidden">
      <v-card-title class="d-flex justify-center">
        <span class="text-h5" style="font-weight: 500; color: #0999ad"
          >View Quiz</span
        >
      </v-card-title>

      <v-card-text>
        <div>Student Name: {{ student.name }}</div>
        <div>Student Name: {{ student.email }}</div>
        <div class="mb-3">Score: {{ student.score }}</div>
        <v-container
          style="
            box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px inset;
            border-radius: 6px;
            height: 70vh;
            overflow-y: auto;
          "
        >
          <div v-for="(record, i) in history" :key="i" outline>
            <div class="question pa-5" style="width: 100%">
              <div
                style="width: 100%"
                class="text--primary d-flex justify-space-between"
              >
                <v-list-group style="width: 93%" append-icon="" value="1">
                  <template v-slot:activator>
                    <div class="mr-2">
                      <h1 class="number">{{ i + 1 }}</h1>
                    </div>
                    <v-list-item-title>{{
                      record.answer_id.question_id.name
                    }}</v-list-item-title>
                    <span style="color: orange; width: 90px"
                      >{{ record.answer_id.score }} Point(s)
                    </span>
                  </template>
                  <v-list-item
                    v-show="
                      record.answer_id.question_id.question_type_id._id ==
                      '63aab18d9623da7bb82bf0a4'
                    "
                    v-for="(title, j) in record.answer_id.question_id
                      .chosen_answer"
                    :key="j"
                    link
                    :class="j % 2 == 0 ? ' grey lighten-5' : ''"
                  >
                    <v-list-item-title
                      class="pl-15"
                      v-text="title"
                    ></v-list-item-title>

                    <v-list-item-icon v-if="j + 1 == record.answer_id.name">
                      <v-icon
                        style="color: #0999ad"
                        v-if="record.answer_id.is_correct"
                        >mdi-check</v-icon
                      >
                      <v-icon style="color: red" v-else>mdi-close</v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item
                    v-show="
                      record.answer_id.question_id.question_type_id._id ==
                      '63aab1939623da7bb82bf0a8'
                    "
                    link
                    class="grey lighten-5"
                  >
                    <v-list-item-title
                      class="pl-15"
                      v-text="record.answer_id.name"
                    ></v-list-item-title>

                    <v-list-item-icon>
                      <v-icon
                        style="color: #0999ad"
                        v-if="record.answer_id.is_correct"
                        >mdi-check</v-icon
                      >
                      <v-icon style="color: red" v-else>mdi-close</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>
              </div>
            </div>
          </div>
        </v-container>
        <div style="width: 100%" class="mt-3 d-flex justify-center">
          <v-btn color="#0999ad" class="white--text" @click="closeDiaglog()"
            >Close</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["student"],
  data() {
    return {
      dialog: false,
      history: [],
    };
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.target.style.visibility = "";
      }
    },
  },

  created() {
    this.getUserQuestions();
  },

  methods: {
    disableButton(event) {
      this.target = event.currentTarget;
      event.currentTarget.style.visibility = "hidden";
    },

    closeDiaglog() {
      this.dialog = false;
    },

    getUserQuestions() {
      this.axios
        .get(this.$url + "/user/answer-history/get/" + this.student._id)
        .then((res) => {
          if (res.data.success) {
            this.history = res.data.data;
            console.log(res.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
