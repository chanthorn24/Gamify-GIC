<template>
  <v-dialog v-model="dialog" persistent max-width="50vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        color="#0999ad"
        style="font-weight: 500"
        dark
        v-bind="attrs"
        v-on="on"
        @click="disableButton($event)"
      >
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title class="d-flex justify-center">
          <span class="text-h5" style="font-weight: 500; color: #0999ad"
            >Edit Question</span
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

              <v-col cols="12" lg="6" style="padding-top: 20px">
                <v-text-field
                  v-model="question.time"
                  label="Time (s)"
                  outlined
                  class="mt-n3"
                  :rules="nameRules"
                  type="number"
                  required
                  prepend-inner-icon="mdi-clock-time-four-outline"
                ></v-text-field>
              </v-col>
            </v-row>
            <div
              v-show="
                question.question_type_id._id == '63aab18d9623da7bb82bf0a4'
              "
            >
              <MultiQuestion :question="question"></MultiQuestion>
            </div>
            <div
              v-show="
                question.question_type_id._id == '63aab1939623da7bb82bf0a8'
              "
            >
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
            @click="UpdateNewQuestion()"
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
  props: ["question_types", "id", "questionOne"],
  data() {
    return {
      dialog: false,
      loading: false,
      target: [],
      nameRules: [(v) => !!v || "Field is required"],

      //data
      question: Object.assign({}, this.questionOne),

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

  created() {
    this.question.score = this.question.score.toString();
    console.log(this.question);
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

    myFunctionClick: function () {
      var hide = this.$el.querySelector("#hide");
      hide.style.display = "block";
    },
    UpdateNewQuestion() {
      try {
        this.loading = true;
        this.axios
          .put(
            this.$url + "/question/update/" + this.question._id,
            this.question
          )
          .then((res) => {
            if (res.data.success) {
              this.$emit("refreshData", "");
              this.loading = false;
              this.dialog = false;

              //call snackbar success
              this.saveDetails("Updated Successfully", "primary", "#90CAF9");
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

    disableButton(event) {
      this.target = event.currentTarget;
      event.currentTarget.style.visibility = "hidden";
    },
  },
};
</script>

<style scoped></style>
