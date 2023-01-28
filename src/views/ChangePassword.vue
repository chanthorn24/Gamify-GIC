<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 style="font-weight: 500">Change Password</h1>
    </div>
    <div style="display: flex; flex-direction: row" class="mb-8">
      <a routerLink="/" style="color: grey">Dashboard</a>
      <h4 style="margin-left: 3px">/ Change password</h4>
    </div>
    <v-container class="container" fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="message3"
            :rules="rules"
            filled
            label="Old Password"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="message3"
            :rules="rules"
            filled
            label="New Password"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="message3"
            :rules="rules"
            filled
            label="Confirmed Password"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="success" dark> Submit </v-btn>
    </v-container>
  </div>
</template>

<style scoped></style>

<script>
export default {
  data() {
    return {
      rules: [(value) => !!value || "Required."],
    };
  },
};
</script>
