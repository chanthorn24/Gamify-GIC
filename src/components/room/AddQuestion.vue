<template>
  <v-dialog v-model="dialog" persistent max-width="50vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#0999ad"
        style="font-weight: 500"
        dark
        v-bind="attrs"
        v-on="on"
        @click="disableButton($event)"
      >
        Add Question
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title class="d-flex justify-center">
          <span class="text-h5" style="font-weight: 500; color: #0999ad"
            >Add Question</span
          >
        </v-card-title>
        <v-card-text>
          <v-container
            style="
              box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px inset;
              border-radius: 6px;
              overflow-y: auto;
              max-height: 500px;
            "
          >
            <v-row class="header">
              <v-col cols="6">
                <div class="select">
                  <v-select
                    item-text="name"
                    item-value="_id"
                    v-model="question.question_type_id"
                    :items="question_types"
                    label="Question Type *"
                    :rules="nameRules"
                    required
                  ></v-select>
                </div>
              </v-col>

              <v-col cols="12" lg="6">
                <!-- <v-text-field
                  v-model="question.time"
                  label="Time (s)"
                  outlined
                  class="mt-n3"
                  :rules="nameRules"
                  type="number"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                ></v-text-field> -->
                <v-autocomplete
                  v-model="question.time"
                  :items="times"
                  item-text="name"
                  item-value="time"
                  menu-props="auto"
                  label="Time"
                  hide-details
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  :rules="nameRules"
                  single-line
                ></v-autocomplete>
              </v-col>
            </v-row>
            <div v-if="question.question_type_id == '63aab18d9623da7bb82bf0a4'">
              <MultiQuestion :question="question"></MultiQuestion>
            </div>
            <div v-if="question.question_type_id == '63aab1939623da7bb82bf0a8'">
              <TrueFalse :question="question"></TrueFalse>
            </div>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between pb-5 mx-3">
          <v-btn
            elevation="1"
            style="color: #0999ad; border: 1px solid #0999ad"
            text
            @click="dialog = false"
            width="47%"
          >
            Cancel
          </v-btn>
          <v-btn
            elevation="2"
            style="background-color: #0999ad; color: white"
            text
            @click="addNewQuestion()"
            :loading="loading"
            :disabled="loading"
            width="47%"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import MultiQuestion from "../../components/MultiQuestion.vue";
import TrueFalse from "../../components/TrueFalse.vue";
export default {
  components: {
    MultiQuestion,
    TrueFalse,
  },
  props: ["question_types", "id"],
  data() {
    return {
      dialog: false,
      loading: false,
      target: [],
      nameRules: [(v) => !!v || "Field is required"],

      //data
      question: {
        name: "",
        question_type_id: "",
        chosen_answer: [],
        correct_answer: "",
        room_id: this.id,
        time: "30",
        score: "20",
      },

      times: [
        {
          name: "5 seconds",
          time: "5",
        },
        {
          name: "10 seconds",
          time: "10",
        },
        {
          name: "20 seconds",
          time: "20",
        },
        {
          name: "30 seconds",
          time: "30",
        },
        {
          name: "45 seconds",
          time: "45",
        },
        {
          name: "1 minutes",
          time: "60",
        },
        {
          name: "1.5 minutes",
          time: "90",
        },
        {
          name: "2 minutes",
          time: "120",
        },
      ],

      //status
      loading: false,
    };
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.target.style.visibility = "";
      }
    },
  },

  created() {},

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

    addNewQuestion() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          this.axios
            .post(this.$url + "/question/create", this.question)
            .then((res) => {
              if (res.data.success) {
                this.$emit("refreshData", "");
                this.loading = false;
                this.dialog = false;

                //call snackbar success
                this.saveDetails("Created Successfully", "success", "#A5D6A7");
                //reset form

                this.$refs.form.reset();
                this.question.time = "30";
                this.question.score = "20";
              }
            })
            .catch((error) => {
              //snackbar error
              this.loading = false;
              this.saveDetails(error.message, "error", "#EF9A9A");
            });
        }
      } catch (error) {
        //snackbar error
        this.loading = false;
        this.saveDetails("Something, went wrong", "error", "#EF9A9A");
      }
    },

    disableButton(event) {
      this.target = event.currentTarget;
      event.currentTarget.style.visibility = "hidden";
    },
  },
};
</script>

<style scoped></style>
