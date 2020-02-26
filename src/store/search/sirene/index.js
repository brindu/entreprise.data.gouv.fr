import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_FULLTEXT}`,
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
  },

  getResultsNumber(state) {
    return parseInt(state.results.metadata.total_results);
  },

  getPagesNumber(state) {
    return parseInt(state.results.metadata.total_pages);
  }
};

const mutations = {
  fillEtablissements(state, etablissements) {
    state.results.etablissements = etablissements;
  },

  fillResultsMetadata(state, metadata) {
    state.results.metadata = metadata;
  }
};

const actions = {
  fulltextSearch({ dispatch }, { searchInput, pageNumber }) {
    const url = `${searchInput}?per_page=5&page=${pageNumber}`;
    http.get(url)
      .then(response => dispatch("fillResults", response.data))
      .catch(error => console.error(error));
  },

  fillResults({ commit }, response) {
    commit("fillEtablissements", response.etablissement);
    commit("fillResultsMetadata", {
      total_results: response.total_results,
      total_pages: response.total_pages,
      per_page: response.per_page,
      page: response.page
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
