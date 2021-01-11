import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
      isUnlock: false,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    unlock(state, isUnlock) {
      state.isUnlock = isUnlock;
    },
  },
});

export default store;
