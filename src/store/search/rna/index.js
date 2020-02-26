import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_RNA_FULLTEXT}`,
  timeout: 30000
});

const state = {
  results: {
    metadata: {},
    associations: []
  }
};

const getters = {
  getResults(state) {
    return state.results.associations;
  },

  getResultsNumber(state) {
    return parseInt(state.results.metadata.total_results);
  },

  getPagesNumber(state) {
    return parseInt(state.results.metadata.total_pages);
  }
};

const mutations = {
  fillAssociations(state, associations) {
    state.results.associations = associations;
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
    commit("fillAssociations", response.association);
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
