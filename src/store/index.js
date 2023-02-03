import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    state: {
        text: "",
        color: "",
        progressColor: "",
        timeout: "",
    },
    mutations: {
        showMessage(state, payload) {
            state.text = payload.text;
            state.color = payload.color;
            state.timeout = payload.timeout;
            state.progressColor = payload.progressColor;
        },
        refreshData() {},
    },
    actions: {
        showSnack({ commit }, payload) {
            commit("showMessage", payload);
        },
        saveUser({ commit }) {
            commit("refreshData", "");
        },
    },
    getters: {
        getMessage(state) {
            return state;
        },
    },
    modules: {},
});