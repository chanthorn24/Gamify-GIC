<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Record</h1>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <router-link to="/" style="color: grey">Dashboard&nbsp;</router-link>
      <router-link to="/" style="color: grey">/ Quiz Record&nbsp;</router-link>
      <h4 style="margin-left: 3px">/ Room Record</h4>
    </div>

    <v-row>
      <v-col cols="12" lg="6" sm="12">
        <v-card elevation="2" :loading="loading">
          <v-list-item>
            <v-list-item-content three-line>
              <v-row>
                <v-col cols="12" lg="5" sm="12" class="my-4 pb-0">
                  <v-list-item-title
                    ><div
                      style="font-size: 24px; width: 190px"
                      class="mb-2 d-flex justify-center"
                    >
                      {{ room.name }}
                    </div></v-list-item-title
                  >
                  <v-list-item-avatar
                    tile
                    width="190"
                    size="90"
                    color="grey"
                    class="ml-0"
                  >
                    <v-img
                      :src="
                        room.image
                          ? room.image
                          : 'https://res.cloudinary.com/image-cloudinary-itc/image/upload/w_200/q_auto:best/v1672905417/yojjiryfu4m6lyonzmhu.jpg'
                      "
                      style="border: 2px solid #0999ad"
                    >
                    </v-img>
                  </v-list-item-avatar>
                </v-col>

                <v-col
                  cols="12"
                  lg="7"
                  sm="12"
                  class="d-flex justify-space-around align-center my-4"
                  style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <div>
                    <v-list-item-subtitle class="py-2"
                      >Type: {{ room.room_type_id.name }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="py-2"
                      >Status: Online</v-list-item-subtitle
                    >
                    <v-list-item-subtitle class="py-2"
                      >Pin: {{ room.pin }}
                    </v-list-item-subtitle>
                  </div>
                  <div>
                    <v-list-item-subtitle class="py-2"
                      >Students: {{ students.length }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="py-2"
                      >Question:
                      {{ room.question_id.length }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle style="color: white" class="py-2"
                      >.</v-list-item-subtitle
                    >
                  </div>
                </v-col>
              </v-row>
              <div class="mt-1 d-flex justify-end">
                Created At:
                <span class="primary--text ml-1">{{ room.createdAt }}</span>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" sm="12">
        <v-card
          class="pa-2"
          outlined
          tile
          style="box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset"
        >
          <average-answer
            v-if="loadStudent"
            :averageTotal="averageTotal"
          ></average-answer>
        </v-card>
      </v-col>
    </v-row>
    <student-list
      v-if="room"
      :students="students"
      @refreshData="getStudent()"
    ></student-list>
  </div>
</template>

<script>
import moment from "moment";
import AverageAnswer from "@/components/charts/AverageAnswer.vue";
import StudentList from "./StudentList.vue";
export default {
  components: { AverageAnswer, StudentList },
  data() {
    return {
      room: {
        name: "",
        pin: "",
        room_type_id: "",
        question_id: [],
        status: false,
        loading: false,
      },
      averageTotal: 0,
      loadStudent: false,
      students: [],
    };
  },
  methods: {
    getRoom() {
      this.loading = true;

      this.axios
        .get(this.$url + "/room/get/" + this.$route.params.id)
        .then((res) => {
          if (res.data.success) {
            this.room = res.data.data;
            this.room.createdAt = moment(this.room.createdAt).format(
              "DD MMMM YYYY"
            );
            this.loading = false;
            this.getStudent();
          }
        });
    },

    getStudent() {
      this.axios
        .get(this.$url + "/user/in-room/room/" + this.$route.params.id)
        .then((res) => {
          if (res.data.success) {
            this.students = res.data.data;
            console.log(this.students);
            this.students.forEach((student) => {
              student.totalCorrect = (
                student.totalCorrect / this.room.question_id.length
              ).toFixed(2);
              this.averageTotal =
                parseFloat(this.averageTotal) +
                parseFloat(student.totalCorrect);
            });
            this.averageTotal = this.averageTotal / this.students.length;
            this.loadStudent = true;
          }
        })
        .catch((error) => {
          this.saveDetails(error.message, "error", "#EF9A9A");
        });
    },
  },
  created() {
    this.getRoom();
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
