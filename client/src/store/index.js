import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      user: null,
      token: null,
      //count: 0,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    /*
    increment(state) {
      state.count++;
    },*/
  },
  actions: {
    firstToken({ commit, dispatch }, payload) {
      commit("setToken", payload);
      dispatch("autoRefreshToken");
    },
    refreshToken({ commit, state, dispatch }) {
      fetch("http://127.0.0.1:3000/refreshToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: state.token,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.result != "success") {
            console.log("invalid token at refresh");
            commit("setToken", null);
          } else {
            console.log("previous token: ", state.token);
            console.log("new token: ", response.token);
            commit("setToken", response.token);
            dispatch("autoRefreshToken");
          }
        })
        .catch((error) => console.log("error", error));
    },
    autoRefreshToken({ state, dispatch }) {
      console.log("starting auto refresh");
      setTimeout(() => {
        if (state.token != null) {
          dispatch("refreshToken");
        } else {
          console.log("user has no token, auto refresh cancelled");
        }
      }, 25000);
    },
    /*
    incrementAction({ commit }, payload) {
      commit("increment", payload);
    }*/
  },
  getters: {
    /*
    counter(state) {
      return state.count;
    },*/
    isLoggedIn(state) {
      return !!state.token;
    },
    getToken(state) {
      return state.token;
    },
  },
});
