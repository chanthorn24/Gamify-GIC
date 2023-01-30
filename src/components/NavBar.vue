<template>
  <v-card elevation="0">
    <v-toolbar
      elevation="0"
      class="d-flex align-center justify-center"
      style="height: 80px"
    >
      <v-toolbar-title>
        <h2 style="font-style: italic; color: #0999ad">GIC FunQuiz &nbsp;</h2>
      </v-toolbar-title>
    </v-toolbar>
    <v-list expand>
      <v-list-item to="/" link>
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <v-list-item to="/listteacher" link>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Teachers</v-list-item-title>
      </v-list-item>

      <v-list-group
        prepend-icon="mdi-help-box-multiple"
        append-icon="fa-sharp fa-solid fa-caret-right"
        no-action
        :value="true"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Quiz</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item to="/room" link>
          <v-list-item-icon style="margin-right: 10px">
            <v-icon size="22px">mdi-home-analytics</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Room</v-list-item-title>
        </v-list-item>
        <v-list-item to="/listrecordquiz" link>
          <v-list-item-icon style="margin-right: 10px">
            <v-icon size="20px">mdi-clipboard-text-clock</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Record</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group
        prepend-icon="mdi-cog-outline"
        append-icon="fa-sharp fa-solid fa-caret-right"
        no-action
        :value="true"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item to="/department" link>
          <v-list-item-icon style="margin-right: 10px">
            <v-icon size="20px">mdi-home-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Department</v-list-item-title>
        </v-list-item>
        <v-list-item to="/questiontype" link>
          <v-list-item-icon style="margin-right: 10px">
            <v-icon size="20px">mdi-help-box</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Question Type</v-list-item-title>
        </v-list-item>
        <v-list-item to="/roomtype" link>
          <v-list-item-icon style="margin-right: 10px">
            <v-icon size="20px">mdi-home-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Room Type</v-list-item-title>
        </v-list-item>
        <v-list-item to="/listusertype" link>
          <v-list-item-icon style="margin-right: 10px">
            <v-icon size="20px">mdi-account-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-title>User Type</v-list-item-title>
        </v-list-item>
        <v-list-item to="/changepassword" link>
          <v-list-item-icon style="margin-right: 10px">
            <v-icon size="20px">mdi-lock-reset</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Change password</v-list-item-title>
        </v-list-item>
        <v-list-item to="/editaccount" link>
          <v-list-item-icon style="margin-right: 10px">
            <v-icon size="20px">mdi-information-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Edit Account</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "nav-bar",
  data() {
    return {};
  },
};
</script>

<style scoped>
.v-list-item--active {
  color: white;
  background-color: #0999ad;
  border-left: 10px solid #086e7b;
  border-top: 0.2px solid orange;
  border-bottom: 0.2px solid orange;
}
.v-application .primary--text {
  color: #0999ad !important;
}
</style>
