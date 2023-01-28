<template>
  <div>
    <h3 class="mb-4">Input Question</h3>
    <v-row>
      <v-col cols="12" lg="12">
        <v-textarea
          label="Question"
          :rules="nameRules"
          hide-details="auto"
          v-model="question.name"
          auto-grow
          rows="1"
          row-height="15"
        ></v-textarea>
      </v-col>
    </v-row>
    <br />
    <v-row>
      <v-col cols="12" lg="1">
        <div class="question">
          <h1 class="number">1</h1>
        </div>
      </v-col>
      <v-col cols="12" lg="11">
        <v-text-field
          v-model="question.chosen_answer[0]"
          filled
          label="Answer 1"
          clearable
          :rules="nameRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" lg="1">
        <div class="question">
          <h1 class="number">2</h1>
        </div>
      </v-col>
      <v-col cols="12" lg="11">
        <v-text-field
          v-model="question.chosen_answer[1]"
          filled
          label="Answer 2"
          clearable
          :rules="nameRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" lg="1">
        <div class="question">
          <h1 class="number">3</h1>
        </div>
      </v-col>
      <v-col cols="12" lg="11">
        <v-text-field
          v-model="question.chosen_answer[2]"
          filled
          label="Answer 3"
          clearable
          :rules="nameRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" lg="1">
        <div class="question">
          <h1 class="number">4</h1>
        </div>
      </v-col>
      <v-col cols="12" lg="11">
        <v-text-field
          v-model="question.chosen_answer[3]"
          filled
          label="Answer 4"
          clearable
          :rules="nameRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" lg="6">
        <div class="answer">
          <h3>Correct Answer</h3>
        </div>
        <v-autocomplete
          v-model="question.correct_answer"
          :items="answers"
          label="Correct answer"
          :rules="nameRules"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" lg="6">
        <div class="answer">
          <h3>Score</h3>
        </div>
        <v-autocomplete
          v-model="question.score"
          :items="scores"
          item-text="name"
          item-value="score"
          menu-props="auto"
          label="Score"
          hide-details
          prepend-inner-icon="mdi-clock-time-four-outline"
          :rules="nameRules"
          single-line
        ></v-autocomplete>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["question"],
  data() {
    return {
      nameRules: [(v) => !!v || "Field is required"],
      answers: ["1", "2", "3", "4"],

      scores: [
        {
          name: "5 points",
          score: "5",
        },
        {
          name: "10 points",
          score: "10",
        },
        {
          name: "20 points",
          score: "20",
        },
        {
          name: "50 points",
          score: "30",
        },
      ],
    };
  },
};
</script>
<style scoped>
.number {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0999ad;
  padding-left: 20px;
  padding-right: 20px;
  height: 57px;
  color: white;
}
.question {
  display: flex;
}
.answer {
  margin-bottom: 12px;
}
</style>
