import axios from "axios";
import { frenchDateFormat } from "@/helpers";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_FICHE_IDENTITE_RNCS}`,
  timeout: 30000
});

const state = {
  dossierPrincipal: {}
};

const getters = {
  getLastUpdate(state) {
    return frenchDateFormat(state.dossierPrincipal.db_current_date);
  }
};

const mutations = {
  fillRncsData(state, data) {
    state.dossierPrincipal = data.dossier_entreprise_greffe_principal;
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
