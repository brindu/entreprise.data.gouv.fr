import axios from "axios";

const httpEtablissement = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_ETABLISSEMENT}`,
  timeout: 30000
});

const httpUniteLegale = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_UNITE_LEGALE}`,
  timeout: 30000
});

const httpGeoJson = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_GEOJSON}`,
  timeout: 30000
});

const state = {
  etablissement: {},
  uniteLegale: {},
  etablissementsNearby: {}
};

const getters = {
  getEtablissement(state) {
    return state.etablissement;
  },

  getUniteLegale(state) {
    return state.uniteLegale;
  },

  getEtablissementsNearby(state) {
    return state.etablissementsNearby;
  }
};

const mutations = {
  fillEtablissement(state, etablissement) {
    state.etablissement = etablissement;
  },

  fillUniteLegale(state, uniteLegale) {
    state.uniteLegale = uniteLegale;
  },

  fillEtablissementsNearby(state, geoJson) {
    state.etablissementsNearby = geoJson;
  }
};

const actions = {
  async fetchEtablissement({ commit }, siret) {
    const response = await httpEtablissement.get(`${siret}`);
    const etablissement = response.data.etablissement;
    commit("fillEtablissement", etablissement);
  },

  async fetchUniteLegale({ commit }, siren) {
    const response = await httpUniteLegale.get(`${siren}`);
    commit("fillUniteLegale", response.data.unite_legale);
  },

  async fetchEtablissementsNearby({ commit }, siren) {
    const url = `${siren}/etablissements_geojson`;
    const response = await httpGeoJson.get(url);
    commit("fillEtablissementsNearby", response.data);
  },

  async fetchAllData({ dispatch, state }, siret) {
    await dispatch("fetchEtablissement", siret);
    const siren = state.etablissement.siren;
    await Promise.all([
      dispatch("fetchUniteLegale", siren),
      dispatch("fetchEtablissementsNearby", siren)
    ]);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
