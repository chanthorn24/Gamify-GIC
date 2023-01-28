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
      <v-col cols="12" lg="6">
        <div class="answer">
          <h3>Correct Answer</h3>
        </div>
        <v-autocomplete
          v-model="question.correct_answer"
          :items="items"
          :rules="nameRules"
          label="Correct answer"
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
      items: ["True", "False"],

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
.question {
  padding: 0 50px 0 50px;
  display: flex;
}
.answer {
  margin-bottom: 12px;
}
</style>
