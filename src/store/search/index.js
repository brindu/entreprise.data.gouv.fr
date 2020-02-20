import axios from "axios";

const http = axios.create({
  baseURL: "https://sandbox1.entreprise.data.gouv.fr/api/sirene/v1/",
  timeout: 30000
});

const state = {
  results: {
    metadata: {},
    etablissements: []
  }
};

const getters = {
  getResults(state) {
    return state.results.etablissements;
  }
};

const mutations = {
  fillEtablissements(state, etablissements) {
    state.results.etablissements = etablissements;
  }
};

const actions = {
  //index({ commit, dispatch }) {
  //  dispatch("api/admin/get", { url: "/roles" }, { root: true }).then(data =>
  //    commit("fill", { roles: data })
  //  );
  //}
  fulltextSearch({ commit }, searchInput) {
    const url = "full_text/" + searchInput;
    http.get(url)
      // TODO fill metadata
      .then(response => commit("fillEtablissements", response.data.etablissement))
      .catch(error => console.error(error));
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
