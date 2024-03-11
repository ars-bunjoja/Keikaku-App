import { createStore } from 'vuex'

export default createStore({
  state: {
    apiKey: '',
    apiURL: 'http://localhost:8653/api'
  },
  mutations: {
    setApiKey(state, key) {
      state.apiKey = key
    },
    setApiURL(state, url) {
      state.apiURL = url
      console.log(state.apiURL)
    }
  },
  actions: {
  },
  getters: {
    apiKey(state) {
      return state.apiKey
    },
    apiURL(state) {
      return state.apiURL
    }
  }
});

