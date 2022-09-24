import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    options: [
      { id: 1, name: 'Москва' },
      { id: 2, name: 'Санкт-Петербург' },
      { id: 3, name: 'Казань' },
    ],
    currentOptionId: '',
    phone: '',
    name: '',
    email: '',
    requestData: '',
    requestError: '',
    currentModal: 'my-form',
  },
  getters: {
    sortedOptions(state) {
      return state.currentOptionId
        ? [
            ...state.options.filter(({ id }) => id === state.currentOptionId),
            ...state.options.filter(({ id }) => id !== state.currentOptionId),
          ]
        : state.options;
    },
  },
  mutations: {
    SET_CURRENT_OPTION_ID(state, payload) {
      state.currentOptionId = payload;
    },
    SET_PHONE(state, payload) {
      state.phone = payload;
    },
    SET_EMAIL(state, payload) {
      state.email = payload;
    },
    SET_NAME(state, payload) {
      state.name = payload;
    },
    SET_REQUEST_DATA(state, payload) {
      state.requestData = payload;
    },
    SET_REQUEST_ERROR(state, payload) {
      state.requestError = payload;
    },
    SET_CURRENT_MODAL(state, payload) {
      state.currentModal = payload;
    },
  },
  actions: {
    sendData({ commit, state }) {
      axios({
        method: 'post',
        url: 'http://hh.autodrive-agency.ru/test-tasks/front/task-7/',
        params: {
          name: state.name,
          phone: state.phone,
          email: state.email,
          city_id: state.currentOptionId,
        },
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
        .then((response) => {
          commit('SET_REQUEST_DATA', response.data);
        })
        .catch((error) => commit('SET_REQUEST_ERROR', error.response.data))
        .finally(
          (state.name = ''),
          (state.phone = ''),
          (state.email = ''),
          (state.currentOptionId = '')
        );
    },
  },
});
