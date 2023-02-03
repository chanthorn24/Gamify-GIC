import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue-apexcharts";
import axios from "axios";
import VueAxios from "vue-axios";

// //snack bar
// import snackbarPlugin from "./plugins/snackbar";
// Vue.use(snackbarPlugin, { store });

//socket io

Vue.use(VueApexCharts);
Vue.use(VueAxios, axios);

Vue.component("apexchart", VueApexCharts);

Vue.config.productionTip = false;

// global variable
Vue.prototype.$axios = axios;
// Vue.prototype.$url = "http://localhost:3001";
Vue.prototype.$url = "http://52.91.151.159";

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
