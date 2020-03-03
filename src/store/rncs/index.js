import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_FICHE_IDENTITE_RNCS}`,
  timeout: 30000
});

const state = {
  dossierPrincipal: {}
};

const getters = {
};

const mutations = {
  fillRncsData(state, data) {
    state.dossierPrincipal = data;
  }
};

const actions = {
  async fetchData({ commit }, siren) {
    const response = await http.get(`${siren}`);
    commit("fillRncsData", response.data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
