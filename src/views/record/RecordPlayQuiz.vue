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
        <v-card elevation="2">
          <v-list-item>
            <v-list-item-content three-line>
              <v-row>
                <v-col cols="12" lg="5" sm="12" class="my-4 pb-0">
                  <v-list-item-title
                    ><div
                      style="font-size: 24px; width: 190px"
                      class="mb-2 d-flex justify-center"
                    >
                      GIC Room
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
                      src="https://th.bing.com/th/id/OIP.nu3oSm6bAp3dMfW_JERm3AHaEc?pid=ImgDet&rs=1"
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
                      >Type: Classroom</v-list-item-subtitle
                    >
                    <v-list-item-subtitle class="py-2"
                      >Status: Online</v-list-item-subtitle
                    >
                    <v-list-item-subtitle class="py-2"
                      >Pin: 907432</v-list-item-subtitle
                    >
                  </div>
                  <div>
                    <v-list-item-subtitle class="py-2"
                      >Students: 907432</v-list-item-subtitle
                    >
                    <v-list-item-subtitle class="py-2"
                      >Question: 10</v-list-item-subtitle
                    >
                    <v-list-item-subtitle style="color: white" class="py-2"
                      >.</v-list-item-subtitle
                    >
                  </div>
                </v-col>
              </v-row>
              <div class="mt-1 d-flex justify-end">Created At: 10 Jan 2022</div>
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
          <average-answer></average-answer>
        </v-card>
      </v-col>
    </v-row>
    <student-list></student-list>
  </div>
</template>

<script>
import AverageAnswer from "@/components/charts/AverageAnswer.vue";
import StudentList from "./StudentList.vue";
export default {
  components: { AverageAnswer, StudentList },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
