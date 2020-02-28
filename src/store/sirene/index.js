import axios from "axios";

const httpEtablissement = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_ETABLISSEMENT}`,
  timeout: 30000
});

const httpUniteLegale = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_UNITE_LEGALE}`,
  timeout: 30000
});

const state = {
  etablissement: {},
  uniteLegale: {}
};

const getters = {
  getEtablissement(state) {
    return state.etablissement;
  }
};

const mutations = {
  fillEtablissement(state, etablissement) {
    state.etablissement = etablissement;
  },

  fillUniteLegale(state, uniteLegale) {
    state.uniteLegale = uniteLegale;
  }
};

const actions = {
  fetchEtablissement({ commit }, siret) {
    const url = `${siret}`;
    console.log("start fetch etablissement");
    return new Promise((resolve, reject) => {
      httpEtablissement.get(url)
        .then((response) => {
          console.log("got data etablissement!");
          commit("fillEtablissement", response.data.etablissement);
          resolve(response.data.etablissement);
        })
        .catch(() => reject())
    });
  },

  fetchUniteLegale({ dispatch, commit }, siret) {
    return new Promise((resolve, reject) => {
      dispatch("fetchEtablissement", siret)
        .then(etablissement => {
          console.log("start fetch unite legale");
          const url = `${etablissement.siren}`;
          httpUniteLegale.get(url)
            .then((response) => {
              console.log("got data unite legale!");
              commit("fillUniteLegale", response.data.unite_legale);
              resolve();
            })
            .catch(() => reject())
          });
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
