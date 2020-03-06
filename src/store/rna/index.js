import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_RNA_ID_ASSOCIATION}`,
  timeout: 30000
});

const state = {
  association: {}
};

const getters = {
  getAssociation(state) {
    return state.association;
  }
};

const mutations = {
  fillRnaData(state, assoData) {
    state.association = assoData.association;
  }
};

const actions = {
  async fetchData({ commit }, assoId) {
    const response = await http.get(`${assoId}`);
    commit("fillRnaData", response.data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
