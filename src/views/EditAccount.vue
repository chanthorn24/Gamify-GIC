<template>
    <div>
      <div class="d-flex justify-space-between align-center">
        <h1 style="font-weight: 500">Edit Account</h1>
      </div>
      <div style="display: flex; flex-direction: row" class="mb-8">
        <a routerLink="/" style="color: grey">Dashboard</a>
        <h4 style="margin-left: 3px">/ Edit Account</h4>
      </div>
      <!-- <v-container class="container" fluid>
          <v-col cols="6">
            <v-text-field
              v-model="message3"
              :rules="rules"
              outlined
              label="Old Password"
              clearable
            ></v-text-field>
          </v-col>
  
          <v-col cols="6">
            <v-text-field
              v-model="message3"
              :rules="rules"
              outlined
              label="New Password"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="message3"
              :rules="rules"
              outlined
              label="Confirmed Password"
              clearable
            ></v-text-field>
          </v-col>
        <v-btn class="btn" color="success" dark> Submit </v-btn>
      </v-container> -->
    </div>
  </template>
  
  <style scoped>
    .btn {
      left: 20%;
      width: 7%;
    } 
  
    .v-text-field--outlined >>> fieldset {
      border-color: rgb(22, 153, 171);
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        rules: [(value) => !!value || "Required."],
      };
    },
  };
  </script>
  